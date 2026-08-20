import { Link } from 'react-router-dom';
import ScrollVideo from '../components/ScrollVideo';
import { usePageAnimations } from '../hooks/usePageAnimations';
import {
  VIDEO2_SRCS,
  VIDEO2_POSTER,
  VIDEO3_SRCS,
  VIDEO3_POSTER,
  VIDEO4_SRCS,
  VIDEO4_POSTER,
  IMG,
  MENU_GROUPS,
  DRINKS,
  TASTING,
  DINING_ROOMS,
} from '../data/content';

export default function Dining() {
  const ref = usePageAnimations<HTMLElement>();

  return (
    <main ref={ref} className="bg-ink-950">
      {/* ═══════════ 1 · THE TIDE — scrub film ═══════════ */}
      <section id="vs-dining" className="scrub-film">
        <ScrollVideo srcs={VIDEO2_SRCS} poster={VIDEO2_POSTER} scrollContainerId="vs-dining">
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/35 pointer-events-none" />

          <div data-vtext data-target="#vs-dining" data-enter="0" data-leave="34" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 w-full">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">01 — The tide</p>
              <h1 className="font-display font-extrabold text-foam-100 uppercase leading-[0.93] text-[clamp(2.6rem,7.5vw,6.5rem)] tracking-tight max-w-4xl">
                The boats decide<br />the menu.
              </h1>
            </div>
          </div>

          <div data-vtext data-target="#vs-dining" data-enter="42" data-leave="68" className="absolute inset-0 flex items-end justify-end opacity-0 pointer-events-none">
            <div className="max-w-md mx-5 sm:mx-0 sm:mr-16 lg:mr-24 pb-24 text-left sm:text-right">
              <p className="font-display font-bold text-foam-100 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.05]">
                If it didn't swim this morning, <span className="text-dune-400">it isn't on the plate tonight.</span>
              </p>
            </div>
          </div>

          <div data-vtext data-target="#vs-dining" data-enter="76" data-leave="101" className="absolute inset-0 flex items-end justify-center opacity-0 pointer-events-none">
            <p className="text-foam-500 text-sm pb-10">Keep scrolling — the kitchen story ↓</p>
          </div>
        </ScrollVideo>
      </section>

      {/* ═══════════ 2 · OVER THE COALS — scrubbed grilling footage, three moments ═══════════ */}
      <section id="vs-kitchen" className="scrub-film">
        <ScrollVideo srcs={VIDEO3_SRCS} poster={VIDEO3_POSTER} scrollContainerId="vs-kitchen" lazy>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/40 pointer-events-none" />

          <div data-vtext data-target="#vs-kitchen" data-enter="2" data-leave="30" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 w-full">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">02 — Over the coals</p>
              <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,6vw,5rem)] tracking-tight max-w-3xl">
                06:00 — the boats come in.
              </h2>
            </div>
          </div>

          <div data-vtext data-target="#vs-kitchen" data-enter="38" data-leave="62" className="absolute inset-0 flex items-center justify-end opacity-0 pointer-events-none">
            <div className="max-w-md mx-5 sm:mx-0 sm:mr-16 lg:mr-24 text-left sm:text-right">
              <p className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2rem,5vw,4rem)] tracking-tight">
                Noon — the<br />catch meets<br />the coals.
              </p>
              <p className="text-foam-300 mt-5 leading-relaxed">
                Coconut-husk charcoal, a grate ten steps from the tide line, and whatever Marco picked off the dock that morning.
              </p>
            </div>
          </div>

          <div data-vtext data-target="#vs-kitchen" data-enter="70" data-leave="101" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 w-full">
              <p className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,6vw,5rem)] tracking-tight">
                By sunset, it's <span className="text-outline-dune">gone.</span>
              </p>
            </div>
          </div>
        </ScrollVideo>
      </section>

      {/* ═══════════ 3 · THE CHEF ═══════════ */}
      <section className="bg-ink-900 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5" data-reveal>
            <div className="rounded-xl overflow-hidden h-[42vh] sm:h-[52vh]">
              <img src={IMG.dining1} alt="Signature lobster with cocktail" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">03 — The chef</p>
            <blockquote className="font-display font-bold text-foam-100 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.12] mb-6">
              "I cooked in Manila, Bangkok, and Barcelona for ten years. Then I found a stove ten steps from a tide line — <span className="text-dune-400">and stopped looking.</span>"
            </blockquote>
            <p className="text-foam-500 leading-relaxed max-w-lg mb-3">
              Marco Valencia cooks what the coast gives him — grilled lapu-lapu with coconut vinegar,
              slow pork belly with calamansi glaze, kinilaw that's only as fresh as the morning it's made.
            </p>
            <p className="text-foam-600 text-sm font-medium">— Executive Chef, Sea Guinon</p>
          </div>
        </div>
      </section>

      {/* ═══════════ 4 · TONIGHT'S CARD — the full menu ═══════════ */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14" data-reveal>
            <div>
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">04 — Tonight's card</p>
              <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,5vw,4rem)] tracking-tight">
                Written this morning.
              </h2>
            </div>
            <p className="text-foam-600 text-sm max-w-xs">
              A sample from last night's card. Yours will be different — that's the point.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
            {MENU_GROUPS.map((g, gi) => (
              <div key={g.group} data-reveal style={{ transitionDelay: `${(gi % 2) * 80}ms` }}>
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-dune-400/60 pb-3 mb-6">
                  <h3 className="font-display font-extrabold uppercase tracking-tight text-foam-100 text-2xl sm:text-3xl">
                    {g.group}
                  </h3>
                  <p className="text-foam-600 text-xs sm:text-sm text-right max-w-[180px]">{g.note}</p>
                </div>
                {g.dishes.map((d) => (
                  <div key={d.name} className="dish-row py-4 border-b border-foam-100/10 last:border-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex items-baseline gap-3 flex-wrap min-w-0">
                        <h4 className="font-display font-bold text-foam-100 text-lg sm:text-xl tracking-tight">{d.name}</h4>
                        {d.tag && (
                          <span className="text-dune-400 text-[11px] font-semibold tracking-[0.15em] uppercase">{d.tag}</span>
                        )}
                      </div>
                      <span className="font-display font-bold text-foam-300 flex-shrink-0">{d.price}</span>
                    </div>
                    <p className="text-foam-500 text-sm mt-1 leading-relaxed pr-16">{d.note}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-foam-100/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-reveal>
            <p className="text-foam-600 text-sm">Prices shift with the catch. Service is never added — tip who you like.</p>
            <p className="font-display font-bold text-dune-400 text-sm flex-shrink-0">KITCHEN CLOSES 23:00</p>
          </div>
        </div>
      </section>

      {/* ═══════════ 5 · THE TASTING — one big moment ═══════════ */}
      <section className="border-y border-foam-100/10 bg-ink-900 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">05 — The tasting</p>
            <h2 className="font-display font-extrabold uppercase text-foam-100 leading-[0.93] tracking-tight text-[clamp(2.4rem,6vw,5rem)]">
              <span className="line-mask"><span data-line>{TASTING.name}</span></span>
            </h2>
            <p className="text-foam-300 leading-relaxed max-w-lg mt-6 mb-8">{TASTING.note}</p>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <p>
                <span className="font-display font-extrabold text-dune-400 text-3xl sm:text-4xl">{TASTING.courses}</span>
                <span className="text-foam-500 text-sm ml-2">courses</span>
              </p>
              <p>
                <span className="font-display font-extrabold text-dune-400 text-3xl sm:text-4xl">{TASTING.price}</span>
                <span className="text-foam-500 text-sm ml-2">{TASTING.per}</span>
              </p>
              <p className="text-foam-500 text-sm">{TASTING.pairing}</p>
            </div>
          </div>
          <div className="lg:col-span-5" data-reveal>
            <div className="rounded-xl overflow-hidden h-[38vh] sm:h-[48vh]">
              <img src={IMG.dining3} alt="Chef's plating" className="w-full h-full object-cover will-change-transform" data-parallax />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6 · FROM THE BAR — scrubbed bartender footage ═══════════ */}
      <section id="vs-bar" className="scrub-bar">
        <ScrollVideo
          srcs={VIDEO4_SRCS}
          poster={VIDEO4_POSTER}
          scrollContainerId="vs-bar"
          lazy
          armMargin="60% 0px 60% 0px"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-ink-950/50 pointer-events-none" />

          <div data-vtext data-target="#vs-bar" data-enter="2" data-leave="36" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 w-full">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">06 — From the bar</p>
              <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,6vw,5rem)] tracking-tight">
                Shaken, stirred,<br /><span className="text-outline-dune">poured slow.</span>
              </h2>
            </div>
          </div>

          <div data-vtext data-target="#vs-bar" data-enter="44" data-leave="101" className="absolute inset-0 flex items-center opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full grid md:grid-cols-2 gap-x-16">
              {DRINKS.map((d) => (
                <div key={d.name} className="flex items-baseline justify-between gap-4 py-3.5 border-b border-foam-100/15">
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foam-100 text-lg tracking-tight">{d.name}</p>
                    <p className="text-foam-500 text-sm mt-0.5">{d.note}</p>
                  </div>
                  <span className="font-display font-bold text-foam-300 flex-shrink-0">{d.price}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollVideo>
      </section>

      {/* ═══════════ 7 · WHERE TO SIT ═══════════ */}
      <section className="border-t border-foam-100/10 bg-ink-900 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">07 — Where to sit</p>
            <h2 className="font-display font-extrabold text-foam-100 uppercase leading-[0.95] text-[clamp(2.2rem,4.5vw,3.6rem)] tracking-tight mb-6">
              Three rooms,<br />one kitchen.
            </h2>
            <p className="text-foam-500 leading-relaxed text-[15px]">
              Every seat faces the water or the fire. Sunset tables book out first — reserve with your room.
            </p>
          </div>
          <div className="lg:col-span-8" data-stagger>
            {DINING_ROOMS.map((r) => (
              <div key={r.name} data-sc className="border-t border-foam-100/10 py-8 first:border-t-0 grid sm:grid-cols-12 gap-3 sm:gap-6">
                <div className="sm:col-span-4">
                  <h3 className="font-display font-bold text-foam-100 text-2xl tracking-tight">{r.name}</h3>
                </div>
                <div className="sm:col-span-4">
                  <p className="text-dune-400 text-sm font-medium">{r.when}</p>
                </div>
                <div className="sm:col-span-4">
                  <p className="text-foam-500 text-[15px] leading-relaxed">{r.note}</p>
                </div>
              </div>
            ))}
            <div data-sc className="border-t border-foam-100/10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <p className="text-foam-300 leading-relaxed max-w-md">
                Most packages include breakfast. The good ones include every meal — and a sunset table with your name on it.
              </p>
              <Link
                to="/packages"
                className="group inline-flex items-center gap-3 font-display font-bold text-foam-100 flex-shrink-0"
              >
                <span className="w-11 h-11 rounded-full border border-foam-100/25 flex items-center justify-center transition-all duration-300 group-hover:bg-dune-400 group-hover:border-dune-400 group-hover:text-ink-950">
                  →
                </span>
                What's included
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
