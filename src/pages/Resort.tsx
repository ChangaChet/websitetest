import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { IMG, MOSAIC, DAY, SPECS, AMENITIES, ACTIVITIES } from '../data/content';

export default function Resort() {
  const ref = usePageAnimations<HTMLElement>();
  const [activeActivity, setActiveActivity] = useState(0);

  /* Crossfade the pinned activity image to match the active row */
  useEffect(() => {
    const ctx = gsap.context(() => {
      ACTIVITIES.forEach((_, i) => {
        const row = document.querySelector(`[data-activity="${i}"]`);
        if (!row) return;
        ScrollTrigger.create({
          trigger: row,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActiveActivity(i),
          onEnterBack: () => setActiveActivity(i),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  return (
    <main ref={ref} className="bg-ink-950">
      {/* ═══════════ 1 · THE FLYOVER — pinned aerial, scrub-zoomed ═══════════ */}
      <section id="flyover" data-zoom-section className="relative scrub-fly">
        <div className="sticky top-0 h-dvh overflow-hidden">
          <img
            src={IMG.aerial}
            alt="Aerial view of Sea Guinon's coastline"
            data-zoom
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/40" />

          {/* Stop 1 — arrival */}
          <div data-vtext data-target="#flyover" data-enter="0" data-leave="26" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 w-full">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">
                01 — The flyover
              </p>
              <h1 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.6rem,7.5vw,6.5rem)] tracking-tight max-w-4xl">
                Seen from above,<br />it's one long line.
              </h1>
            </div>
          </div>

          {/* Stop 2 — the scale */}
          <div data-vtext data-target="#flyover" data-enter="34" data-leave="58" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 w-full">
              <p className="font-display font-extrabold uppercase leading-[0.95] text-[clamp(2rem,5.5vw,4.6rem)] tracking-tight max-w-4xl">
                <span className="text-foam-100">Beach.</span>{' '}
                <span className="text-outline">Pool.</span>{' '}
                <span className="text-foam-100">Table.</span>
              </p>
              <p className="text-foam-300 mt-5 max-w-md leading-relaxed">
                Fifty rooms strung along the sand, the restaurant where the paths cross,
                and nothing that needs a map.
              </p>
            </div>
          </div>

          {/* Stop 3 — the promise */}
          <div data-vtext data-target="#flyover" data-enter="66" data-leave="101" className="absolute inset-0 flex items-end justify-end opacity-0 pointer-events-none">
            <div className="max-w-md px-5 sm:px-8 mr-0 sm:mr-16 lg:mr-24 pb-20 text-right">
              <p className="font-display font-bold text-foam-100 text-[clamp(1.6rem,3.5vw,2.6rem)] leading-[1.05]">
                Everything here is a five-minute walk. <span className="text-dune-400">Barefoot.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2 · SPEC MOMENTS — numbers that count up ═══════════ */}
      <section className="border-y border-foam-100/10 bg-ink-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12" data-stagger>
          {SPECS.map((s) => (
            <div key={s.label} data-sc>
              <p className="font-display font-extrabold text-foam-100 text-[clamp(2.4rem,5vw,4.2rem)] leading-none tracking-tight">
                <span data-count={String(s.to)} data-suffix={s.suffix}>0{s.suffix}</span>
              </p>
              <p className="text-foam-500 text-sm mt-3 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 3 · THE GROUNDS — pinned image, scrolling features ═══════════ */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Sticky media + heading */}
          <div className="lg:sticky lg:top-24 self-start" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              02 — The grounds
            </p>
            <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-tight mb-8">
              Built into<br />the landscape.
            </h2>
            <div className="rounded-xl overflow-hidden h-[38vh] sm:h-[46vh]">
              <img src={IMG.poolLounge} alt="The infinity pool at golden hour" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-foam-500 text-sm mt-4">
              Nothing was flattened for this resort. The paths follow the dunes; the pool follows the sightline to the horizon.
            </p>
          </div>

          {/* Scrolling amenity rows */}
          <div>
            {AMENITIES.map((a) => (
              <div key={a.n} data-feat data-active="false" className="border-t border-foam-100/10 py-8 first:border-t-0">
                <div className="flex items-baseline gap-5 mb-3">
                  <span className="font-display text-sm font-semibold text-dune-400">{a.n}</span>
                  <h3 className="font-display font-bold text-foam-100 text-2xl sm:text-3xl tracking-tight">{a.name}</h3>
                </div>
                <p className="text-foam-300 leading-relaxed max-w-md pl-0 sm:pl-12">{a.copy}</p>
              </div>
            ))}
            <div className="border-t border-foam-100/10 py-8">
              <p className="text-foam-600 text-sm">
                Scroll back up, or keep going — the grounds continue sideways below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 · THE ADRENALINE — pinned media, scrolling activities ═══════════ */}
      <section className="bg-ink-900 border-y border-foam-100/10 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-14" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">03 — The adrenaline</p>
            <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-tight max-w-3xl">
              For the ones who can't sit still.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Pinned media — crossfades with the active activity */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="relative rounded-xl overflow-hidden h-[42vh] sm:h-[54vh]">
                {ACTIVITIES.map((a, i) => (
                  <img
                    key={a.name}
                    src={a.img}
                    alt={a.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: activeActivity === i ? 1 : 0 }}
                  />
                ))}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {ACTIVITIES.map((a, i) => (
                    <span
                      key={a.n}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center font-display text-xs font-bold transition-all duration-500 ${
                        activeActivity === i
                          ? 'bg-dune-400 border-dune-400 text-ink-950'
                          : 'border-foam-100/30 text-foam-100/70'
                      }`}
                    >
                      {a.n}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-foam-600 text-sm mt-4">
                All gear is maintained on-site. Waivers take two minutes; stories last longer.
              </p>
            </div>

            {/* Scrolling activity rows */}
            <div>
              {ACTIVITIES.map((a, i) => (
                <div key={a.name} data-activity={i} data-feat data-active={i === 0 ? 'true' : 'false'} className="border-t border-foam-100/10 py-9 first:border-t-0">
                  <div className="flex items-baseline gap-5 mb-2.5">
                    <span className="font-display text-sm font-semibold text-dune-400">{a.n}</span>
                    <h3 className="font-display font-bold text-foam-100 text-2xl sm:text-3xl tracking-tight">{a.name}</h3>
                  </div>
                  <p className="text-dune-400/90 text-sm font-medium mb-3 pl-0 sm:pl-12">{a.meta}</p>
                  <p className="text-foam-300 leading-relaxed max-w-md pl-0 sm:pl-12">{a.copy}</p>
                </div>
              ))}
              <div className="border-t border-foam-100/10 py-8">
                <p className="text-foam-600 text-sm">
                  Book at the adventure shed or with the front desk. Weather cancellations are refunded, no questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5 · WANDER — drifting mosaic, every tile at its own speed ═══════════ */}
      <section className="bg-ink-900 border-b border-foam-100/10 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16" data-reveal>
            <div>
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">04 — Wander</p>
              <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,4.5vw,3.8rem)] tracking-tight">
                The grounds, at<br />walking pace.
              </h2>
            </div>
            <p className="text-foam-600 text-sm max-w-xs">
              Six corners of the resort. Each one drifts past at its own speed as you scroll.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            {MOSAIC.map((m, i) => (
              <figure
                key={m.n}
                data-reveal
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                className={`group ${m.span}`}
              >
                <div className={`relative rounded-xl overflow-hidden ${m.h}`}>
                  <img
                    src={m.img}
                    alt={m.cap}
                    data-parallax={String(m.par)}
                    className="absolute inset-0 w-full h-[125%] object-cover will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/10 transition-colors duration-500" />
                </div>
                <figcaption className="flex items-baseline gap-3 mt-3.5">
                  <span className="font-display text-sm font-semibold text-dune-400">{m.n}</span>
                  <span className="text-foam-300 text-sm font-medium">{m.cap}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 5 · THE ROOMS — full-bleed statement ═══════════ */}
      <section className="relative h-[92vh] overflow-hidden">
        <img src={IMG.suite} alt="An ocean-view suite" className="absolute inset-0 w-full h-[118%] object-cover will-change-transform" data-parallax />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">05 — The rooms</p>
            <h2 className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] text-[clamp(2.6rem,7vw,5.6rem)] tracking-tight">
              <span className="line-mask"><span data-line>Wake up</span></span>
              <span className="line-mask"><span data-line>to <span className="text-outline-dune">water.</span></span></span>
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <p className="text-foam-300 max-w-md leading-relaxed">
                Hardwood, linen, and a veranda wide enough for two chairs and one long view.
                Every room faces the water. No TVs — the sea is the screen.
              </p>
              <div className="flex gap-10 text-sm">
                <div>
                  <p className="font-display font-bold text-foam-100 text-xl">38 m²</p>
                  <p className="text-foam-500 mt-1">garden room</p>
                </div>
                <div>
                  <p className="font-display font-bold text-foam-100 text-xl">64 m²</p>
                  <p className="text-foam-500 mt-1">ocean suite</p>
                </div>
                <div>
                  <p className="font-display font-bold text-foam-100 text-xl">120 m²</p>
                  <p className="text-foam-500 mt-1">beach villa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6 · ONE GOOD DAY — the timeline ═══════════ */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24" data-reveal>
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">06 — A day here</p>
              <h2 className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] text-[clamp(2.2rem,4.5vw,3.6rem)] tracking-tight mb-6">
                One good day,<br /><span className="text-outline">mapped.</span>
              </h2>
              <p className="text-foam-500 leading-relaxed max-w-xs">
                A local route from first light to the bonfire. Scroll to walk it — the stops light up as you pass.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 relative">
            <div className="absolute left-[23px] sm:left-[27px] top-2 bottom-2 w-px bg-foam-100/10" />
            {DAY.map((s) => (
              <div key={s.time} data-step data-active="false" className="relative pl-14 sm:pl-16 py-6">
                <div className="step-dot absolute left-4 sm:left-5 top-8 w-[14px] h-[14px] rounded-full border-2" />
                <p className="text-foam-600 text-xs font-semibold tracking-wide mb-1.5">{s.time} · {s.label}</p>
                <h3 className="step-place font-display font-bold text-foam-100 text-xl mb-1">{s.place}</h3>
                <p className="text-foam-500 text-[15px] leading-relaxed max-w-md">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 7 · HANDOFF ═══════════ */}
      <section className="border-t border-foam-100/10 bg-ink-900 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-6" data-reveal>07 — Next stop</p>
          <h2 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[clamp(3rem,9vw,8rem)]" data-reveal>
            <span className="line-mask"><span data-line className="text-foam-100">Hungry</span></span>
            <span className="line-mask"><span data-line className="text-outline-dune">yet?</span></span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6" data-reveal>
            <p className="text-foam-300 max-w-md leading-relaxed">
              The kitchen is the heart of this place — and the menu is decided by the boats, not by us.
            </p>
            <Link
              to="/dining"
              className="group inline-flex items-center gap-3 font-display font-bold text-foam-100 text-lg flex-shrink-0"
            >
              <span className="w-12 h-12 rounded-full border border-foam-100/25 flex items-center justify-center transition-all duration-300 group-hover:bg-dune-400 group-hover:border-dune-400 group-hover:text-ink-950">
                →
              </span>
              See the restaurant
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
