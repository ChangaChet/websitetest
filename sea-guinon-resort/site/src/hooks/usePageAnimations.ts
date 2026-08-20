import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Shared per-page scroll choreography. Pages opt in via data attributes:
   [data-reveal]   fade + rise on enter
   [data-stagger]  staggers [data-sc] children
   [data-parallax] image drifts inside its parent
   [data-step]     timeline step toggles data-active
   [data-feat]     amenity row toggles data-active
   [data-mq]       marquee slides with scroll
   [data-line]     line-mask reveal (wrap in .line-mask)
   [data-count]    number counts up on enter (data-suffix optional)
   [data-zoom]     pinned slow-zoom inside nearest [data-zoom-section]
   [data-vtext]    text panel fading in/out at scroll windows
                   (data-enter, data-leave in %, data-target = scrub container)
*/
export function usePageAnimations<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current?.querySelectorAll<HTMLElement>('[data-vtext]').forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((parent) => {
        gsap.from(parent.querySelectorAll('[data-sc]'), {
          y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: parent, start: 'top 86%', toggleActions: 'play none none none' },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
        /* Optional per-element speed: data-parallax="-18" */
        const raw = img.dataset.parallax;
        const amt = raw && raw !== 'true' && !Number.isNaN(parseFloat(raw)) ? parseFloat(raw) : -14;
        gsap.to(img, {
          yPercent: amt, ease: 'none',
          scrollTrigger: { trigger: img.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      const setActive = (el: HTMLElement, v: boolean) => el.setAttribute('data-active', String(v));

      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
        ScrollTrigger.create({
          trigger: step, start: 'top 62%', end: 'bottom 38%',
          onEnter: () => setActive(step, true),
          onEnterBack: () => setActive(step, true),
          onLeave: () => setActive(step, false),
          onLeaveBack: () => setActive(step, false),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-feat]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 60%', end: 'bottom 40%',
          onEnter: () => setActive(el, true),
          onEnterBack: () => setActive(el, true),
          onLeave: () => setActive(el, false),
          onLeaveBack: () => setActive(el, false),
        });
      });

      gsap.to('[data-mq-inner]', {
        xPercent: -25, ease: 'none',
        scrollTrigger: { trigger: '[data-mq]', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* Line-mask reveals */
      gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el, i) => {
        gsap.from(el, {
          yPercent: 112, duration: 1.1, ease: 'power4.out',
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
        });
      });

      /* Count-up spec numbers */
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const to = parseFloat(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const state = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: 'top 86%', once: true,
          onEnter: () => {
            gsap.to(state, {
              v: to, duration: 1.6, ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(state.v) + suffix; },
            });
          },
        });
      });

      /* Pinned slow-zoom media */
      gsap.utils.toArray<HTMLElement>('[data-zoom]').forEach((img) => {
        const section = img.closest('[data-zoom-section]');
        if (!section) return;
        gsap.fromTo(img, { scale: 1 }, {
          scale: 1.2, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: true },
        });
      });

      /* Scroll-window text panels over pinned media */
      gsap.utils.toArray<HTMLElement>('[data-vtext]').forEach((el) => {
        const target = el.dataset.target;
        if (!target) return;
        const enter = parseFloat(el.dataset.enter || '0') / 100;
        const leave = parseFloat(el.dataset.leave || '100') / 100;
        const fade = 0.045;
        ScrollTrigger.create({
          trigger: target, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            let o = 0;
            if (p >= enter - fade && p <= enter) o = (p - (enter - fade)) / fade;
            else if (p > enter && p < leave) o = 1;
            else if (p >= leave && p <= leave + fade) o = 1 - (p - leave) / fade;
            el.style.opacity = String(Math.max(0, Math.min(1, o)));
          },
        });
      });
    }, ref);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1200);

    return () => {
      ctx.revert();
      window.removeEventListener('load', refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return ref;
}
