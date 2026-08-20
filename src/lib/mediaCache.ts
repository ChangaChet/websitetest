import {
  VIDEO1_SRCS,
  VIDEO2_SRCS,
  VIDEO3_SRCS,
  VIDEO4_SRCS,
  VIDEO1_POSTER,
} from '../data/content';

const blobByRemote = new Map<string, string>();

export const ALL_VIDEO_GROUPS = [VIDEO1_SRCS, VIDEO2_SRCS, VIDEO3_SRCS, VIDEO4_SRCS];

export function resolveVideoSrc(remote: string): string {
  return blobByRemote.get(remote) || remote;
}

async function cacheOne(url: string): Promise<void> {
  if (blobByRemote.has(url)) return;
  const res = await fetch(url, { mode: 'cors', credentials: 'omit' });
  if (!res.ok) throw new Error(`fetch ${res.status}`);
  const blob = await res.blob();
  blobByRemote.set(url, URL.createObjectURL(blob));
}

function warmVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.src = src;
    const done = () => {
      v.removeAttribute('src');
      v.load();
      resolve();
    };
    v.addEventListener('canplaythrough', done, { once: true });
    v.addEventListener('error', done, { once: true });
    setTimeout(done, 8000);
    v.load();
  });
}

function loadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export async function preloadSiteMedia(onProgress: (p: number) => void): Promise<void> {
  const remotes = ALL_VIDEO_GROUPS.map((g) => g[0]);
  const total = remotes.length + 2; // videos + poster + decode home
  let done = 0;
  const tick = () => {
    done += 1;
    onProgress(Math.min(1, done / total));
  };

  await loadImage(VIDEO1_POSTER);
  tick();

  await Promise.all(
    remotes.map(async (url, i) => {
      try {
        await cacheOne(url);
      } catch {
        /* keep remote URL */
      }
      tick();
      if (i === 0) {
        try {
          await warmVideo(resolveVideoSrc(url));
        } catch {
          /* ignore */
        }
        tick();
      }
    })
  );

  onProgress(1);
}
