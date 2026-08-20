import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lenis = new Lenis({
    duration: reduce ? 0 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduce,
  });
  lenis.on('scroll', ScrollTrigger.update);
  // Drive Lenis from GSAP's ticker so scrub/pin stay in lockstep
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}
