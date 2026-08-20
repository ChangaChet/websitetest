import { VIDEO1_SRCS, VIDEO1_POSTER, VIDEO2_SRCS, VIDEO3_SRCS, VIDEO4_SRCS } from '../data/content';

const blobByRemote = new Map<string, string>();

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
    setTimeout(done, 6000);
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

function isPhone() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}

export async function preloadSiteMedia(onProgress: (p: number) => void): Promise<void> {
  const phone = isPhone();
  const home = VIDEO1_SRCS[0];

  await loadImage(VIDEO1_POSTER);
  onProgress(0.25);

  try {
    await cacheOne(home);
  } catch {
    /* keep remote */
  }
  onProgress(0.7);

  try {
    await warmVideo(resolveVideoSrc(home));
  } catch {
    /* ignore */
  }
  onProgress(1);

  if (!phone) {
    const rest = [VIDEO2_SRCS[0], VIDEO3_SRCS[0], VIDEO4_SRCS[0]];
    rest.forEach((url) => {
      cacheOne(url).catch(() => {});
    });
  }
}
