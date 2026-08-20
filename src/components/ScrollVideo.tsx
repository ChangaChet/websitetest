import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { resolveVideoSrc } from '../lib/mediaCache';

let captureLock: Promise<void> = Promise.resolve();
function withCaptureLock<T>(fn: () => Promise<T>): Promise<T> {
  let release!: () => void;
  const next = new Promise<void>((res) => {
    release = res;
  });
  const prev = captureLock;
  captureLock = next;
  return prev.then(fn).finally(release);
}

const SEEK_TIMEOUT = 900;

function isPhone() {
  return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}

function seekOnce(video: HTMLVideoElement, t: number): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      video.removeEventListener('seeked', finish);
      resolve();
    };
    const timer = setTimeout(finish, SEEK_TIMEOUT);
    video.addEventListener('seeked', finish, { once: true });
    try {
      video.currentTime = t;
    } catch {
      finish();
    }
  });
}

function captureOrder(N: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  let stride = 1;
  while (stride < N) stride <<= 1;
  for (let s = stride; s >= 1; s >>= 1) {
    for (let i = 0; i < N; i += s) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

function usable(f: ImageBitmap | null): f is ImageBitmap {
  return !!f && f.width > 0;
}

function waitForBuffer(video: HTMLVideoElement, duration: number, timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const check = () => {
      try {
        const b = video.buffered;
        if (b.length && b.end(b.length - 1) >= duration * 0.75) {
          resolve();
          return;
        }
      } catch {
        /* ignore */
      }
      if (performance.now() - start > timeoutMs) {
        resolve();
        return;
      }
      requestAnimationFrame(check);
    };
    check();
  });
}

function yieldMain() {
  return new Promise<void>((r) => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => r(), { timeout: 32 });
    } else {
      setTimeout(r, 16);
    }
  });
}

export default function ScrollVideo({
  srcs,
  poster,
  scrollContainerId,
  children,
  lazy = false,
  armMargin = '80% 0px 80% 0px',
}: {
  srcs: string[];
  poster: string;
  scrollContainerId: string;
  children?: React.ReactNode;
  lazy?: boolean;
  armMargin?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const framesRef = useRef<(ImageBitmap | null)[] | null>(null);
  const countRef = useRef(0);
  const modeRef = useRef<'capturing' | 'frames' | 'live'>('capturing');
  const targetRef = useRef(0);
  const lastKeyRef = useRef(-1);
  const rafRef = useRef(0);
  const visibleRef = useRef(!lazy);
  const phoneRef = useRef(false);

  const [srcIdx, setSrcIdx] = useState(0);
  const [armed, setArmed] = useState(!lazy);
  const [painted, setPainted] = useState(false);
  const [liveLayer, setLiveLayer] = useState(false);

  useEffect(() => {
    if (!lazy) return;
    const el = document.getElementById(scrollContainerId);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: isPhone() ? '40% 0px 40% 0px' : armMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy, scrollContainerId, armMargin]);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(320, Math.round(window.innerWidth * dpr));
    const h = Math.max(480, Math.round(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      lastKeyRef.current = -1;
    }
  }, []);

  const drawCover = useCallback((src: CanvasImageSource, w: number, h: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !w || !h) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / w, ch / h);
    ctx.drawImage(src, (cw - w * s) / 2, (ch - h * s) / 2, w * s, h * s);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    phoneRef.current = isPhone();
    if (phoneRef.current) setLiveLayer(true);
    sizeCanvas();
    ctxRef.current = canvas.getContext('2d', { alpha: true });
    let cancelled = false;
    const listeners: Array<() => void> = [];

    let lastSeekAt = 0;
    let settleTimer = 0;
    const seekTo = (p: number) => {
      if (!video.duration || !isFinite(video.duration)) return;
      const t = Math.min(Math.max(p, 0), 1) * Math.max(video.duration - 0.08, 0);
      if (Math.abs(video.currentTime - t) > 0.05) video.currentTime = t;
    };
    const setupLiveMode = () => {
      modeRef.current = 'live';
      const drawCurrent = () => {
        if (video.readyState >= 2) {
          if (!phoneRef.current) {
            drawCover(video, video.videoWidth, video.videoHeight);
          }
          setPainted(true);
        }
      };
      video.addEventListener('seeked', drawCurrent);
      video.addEventListener('loadeddata', drawCurrent);
      listeners.push(() => {
        video.removeEventListener('seeked', drawCurrent);
        video.removeEventListener('loadeddata', drawCurrent);
      });
      if (video.readyState >= 2) drawCurrent();
    };

    const captureFrames = async () => {
      if (!video.duration || !isFinite(video.duration)) {
        await new Promise<void>((res) => {
          const ok = () => res();
          video.addEventListener('loadedmetadata', ok, { once: true });
          setTimeout(ok, 4000);
        });
      }
      const duration = video.duration;
      if (!duration || !isFinite(duration) || !video.videoWidth) {
        throw new Error('video not ready');
      }

      const phone = phoneRef.current;
      const fps = phone ? 2.5 : duration < 10 ? 5 : 3.5;
      const N = Math.min(Math.max(Math.round(duration * fps), phone ? 12 : 24), phone ? 28 : 64);
      countRef.current = N;

      const ratio = video.videoHeight / video.videoWidth;
      const cw = phone ? 480 : 640;
      const ch = Math.round(cw * ratio);
      const off = document.createElement('canvas');
      off.width = cw;
      off.height = ch;
      const octx = off.getContext('2d', { alpha: false, willReadFrequently: false });
      if (!octx) throw new Error('no 2d context');

      const frames: (ImageBitmap | null)[] = new Array(N).fill(null);
      framesRef.current = frames;

      const captureIndex = async (i: number) => {
        const t = (i / (N - 1)) * (duration - 0.12);
        await seekOnce(video, t);
        if (cancelled) return;
        octx.drawImage(video, 0, 0, cw, ch);
        try {
          frames[i] = await createImageBitmap(off);
        } catch {
          /* skip */
        }
        await yieldMain();
      };

      try {
        await captureIndex(0);
        setPainted(true);
      } catch {
        /* retry */
      }
      if (cancelled) return;

      await waitForBuffer(video, duration, phone ? 1200 : 2000);
      if (cancelled) return;

      for (const i of captureOrder(N)) {
        if (cancelled) return;
        if (frames[i]) continue;
        await captureIndex(i);
      }
      modeRef.current = 'frames';
    };

    if (phoneRef.current) {
      setupLiveMode();
    } else {
      withCaptureLock(() => captureFrames()).catch(() => {
        if (!cancelled && modeRef.current === 'capturing') {
          framesRef.current = null;
          setupLiveMode();
        }
      });
    }

    const st = ScrollTrigger.create({
      trigger: `#${scrollContainerId}`,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onToggle: (self) => {
        visibleRef.current = self.isActive;
      },
      onUpdate: (self) => {
        targetRef.current = self.progress;
        if (modeRef.current === 'live') {
          const now = performance.now();
          const gap = phoneRef.current ? 100 : 80;
          if (now - lastSeekAt >= gap) {
            lastSeekAt = now;
            seekTo(self.progress);
          }
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(() => seekTo(self.progress), 180);
        }
      },
    });

    const paint = () => {
      if (modeRef.current === 'live' || !framesRef.current || countRef.current <= 0) return;
      const frames = framesRef.current;
      const N = countRef.current;
      const exact = Math.min(N - 1, Math.max(0, targetRef.current * (N - 1)));
      const nearest = Math.round(exact);

      let pick: ImageBitmap | null = null;
      let pickI = -1;
      if (usable(frames[nearest])) {
        pick = frames[nearest];
        pickI = nearest;
      } else {
        for (let d = 1; d < N; d++) {
          const a = nearest - d;
          const b = nearest + d;
          if (a >= 0 && usable(frames[a])) {
            pick = frames[a];
            pickI = a;
            break;
          }
          if (b < N && usable(frames[b])) {
            pick = frames[b];
            pickI = b;
            break;
          }
        }
      }

      if (pick && pickI !== lastKeyRef.current) {
        lastKeyRef.current = pickI;
        drawCover(pick, pick.width, pick.height);
        setPainted(true);
      }
    };

    const loop = () => {
      if (visibleRef.current && !phoneRef.current) paint();
      rafRef.current = requestAnimationFrame(loop);
    };
    if (!phoneRef.current) rafRef.current = requestAnimationFrame(loop);

    const vis = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '20% 0px' }
    );
    vis.observe(canvas);

    const onResize = () => {
      sizeCanvas();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(settleTimer);
      window.removeEventListener('resize', onResize);
      listeners.forEach((off) => off());
      st.kill();
      vis.disconnect();
      framesRef.current?.forEach((f) => f?.close());
      framesRef.current = null;
      lastKeyRef.current = -1;
      modeRef.current = 'capturing';
    };
  }, [armed, srcIdx, scrollContainerId, drawCover, sizeCanvas]);

  return (
    <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#0a1a17]">
      <img
        src={poster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading={lazy ? 'lazy' : 'eager'}
      />
      {armed && (
        <>
          <video
            ref={videoRef}
            src={resolveVideoSrc(srcs[srcIdx])}
            onError={() => {
              if (srcIdx < srcs.length - 1) setSrcIdx(srcIdx + 1);
            }}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className={
              liveLayer
                ? 'absolute inset-0 w-full h-full object-cover pointer-events-none'
                : 'absolute opacity-0 pointer-events-none'
            }
            style={liveLayer ? undefined : { width: 2, height: 2 }}
            tabIndex={-1}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ opacity: painted && !liveLayer ? 1 : 0 }}
          />
        </>
      )}
      {children}
    </div>
  );
}
