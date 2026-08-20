import { useEffect, useState } from 'react';
import { preloadSiteMedia } from '../lib/mediaCache';

export default function BootLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let live = true;
    const phone = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const failSafe = window.setTimeout(() => {
      if (live) setReady(true);
    }, phone ? 8000 : 16000);

    preloadSiteMedia((p) => {
      if (live) setProgress(p);
    })
      .catch(() => {})
      .finally(() => {
        if (live) setReady(true);
      });

    return () => {
      live = false;
      window.clearTimeout(failSafe);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setHide(true), 700);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <>
      {children}
      {!hide && (
        <div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          style={{
            opacity: ready ? 0 : 1,
            pointerEvents: ready ? 'none' : 'auto',
            transition: 'opacity 0.65s ease',
          }}
        >
          <p className="font-display font-extrabold uppercase tracking-tight text-foam-100 text-3xl sm:text-5xl">
            Sea Guinon
          </p>
          <p className="mt-3 text-dune-400 text-[11px] font-semibold tracking-[0.28em] uppercase">
            Preparing the coast
          </p>
          <div className="mt-10 w-48 h-[2px] bg-foam-100/10 overflow-hidden">
            <div
              className="h-full bg-dune-400"
              style={{ width: `${Math.round(progress * 100)}%`, transition: 'width 0.3s ease' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
