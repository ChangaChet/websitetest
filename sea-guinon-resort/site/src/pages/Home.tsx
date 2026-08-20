import { Link } from 'react-router-dom';
import ScrollVideo from '../components/ScrollVideo';
import Marquee from '../components/Marquee';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { VIDEO1_SRCS, VIDEO1_POSTER, NAV_LINKS } from '../data/content';
import { useBooking } from '../lib/booking';

export default function Home() {
  const ref = usePageAnimations<HTMLElement>();
  const { openBooking } = useBooking();

  return (
    <main ref={ref}>
      {/* ─── The scrub film: scroll = playback ─── */}
      <section id="vs-home" style={{ height: '420vh' }}>
        <ScrollVideo srcs={VIDEO1_SRCS} poster={VIDEO1_POSTER} scrollContainerId="vs-home">
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/30 pointer-events-none" />

          {/* Opening */}
          <div data-vtext data-target="#vs-home" data-enter="1" data-leave="26" className="absolute inset-0 flex items-end opacity-0 pointer-events-none">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 w-full">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">
                Coastal Philippines · Est. 2019
              </p>
              <h1 className="font-display font-extrabold uppercase text-foam-100 leading-[0.93] tracking-tight text-[clamp(2.6rem,7.5vw,6.5rem)] max-w-4xl">
                A place to gather,<br />rest &amp; <span className="text-outline-dune">return.</span>
              </h1>
            </div>
          </div>

          {/* Coastline */}
          <div data-vtext data-target="#vs-home" data-enter="34" data-leave="54" className="absolute inset-0 flex items-center justify-end opacity-0 pointer-events-none">
            <div className="max-w-sm mr-6 sm:mr-16 lg:mr-24 text-right">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-3">The coastline</p>
              <p className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] tracking-tight text-[clamp(2rem,4.5vw,3.6rem)]">
                Warm water.<br />White sand.<br />No crowds.
              </p>
            </div>
          </div>

          {/* The retreat */}
          <div data-vtext data-target="#vs-home" data-enter="60" data-leave="80" className="absolute inset-0 flex items-center opacity-0 pointer-events-none">
            <div className="max-w-sm ml-6 sm:ml-16 lg:ml-24">
              <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-3">The retreat</p>
              <p className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] tracking-tight text-[clamp(2rem,4.5vw,3.6rem)]">
                Holidays, off-sites &amp; teen adventures.
              </p>
            </div>
          </div>

          {/* Landing */}
          <div data-vtext data-target="#vs-home" data-enter="86" data-leave="101" className="absolute inset-0 flex items-end justify-center opacity-0 pointer-events-none">
            <div className="text-center px-5 pb-20 sm:pb-28 pointer-events-auto">
              <Link to="/resort" className="group inline-flex flex-col items-center gap-4 text-foam-100">
                <span className="font-display font-bold uppercase tracking-[0.15em] text-sm">Step inside</span>
                <span className="w-12 h-12 rounded-full border border-foam-100/40 flex items-center justify-center transition-all duration-300 group-hover:bg-dune-400 group-hover:border-dune-400 group-hover:text-ink-950">
                  ↓
                </span>
              </Link>
            </div>
          </div>
        </ScrollVideo>
      </section>

      {/* ─── A little info ─── */}
      <Marquee />

      <section className="bg-ink-950 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7" data-reveal>
            <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">What this is</p>
            <h2 className="font-display font-extrabold uppercase tracking-tight text-foam-100 leading-[0.95] text-[clamp(2rem,4.5vw,3.6rem)] mb-6">
              One good escape,<br />not a checklist.
            </h2>
            <p className="text-foam-500 leading-relaxed max-w-xl">
              A small beachfront resort with a restaurant worth the trip alone — built for
              families, corporate teams, and younger travelers who want the coast without
              the crowds. Everything else lives behind the links.
            </p>
          </div>

          <nav className="lg:col-span-5" data-stagger>
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                data-sc
                className="group flex items-baseline justify-between gap-4 py-4 border-b border-foam-100/10 first:border-t"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-xs font-semibold text-foam-600">0{i + 1}</span>
                  <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-foam-100 transition-colors duration-200 group-hover:text-dune-400">
                    {l.label}
                  </span>
                </span>
                <span className="text-foam-600 transition-all duration-200 group-hover:text-dune-400 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
            <p data-sc className="pt-5 text-sm text-foam-600">
              +63 912 345 6789 · reservations@seaguinon.com
            </p>
            <button
              data-sc
              type="button"
              onClick={() => openBooking()}
              className="mt-6 px-6 py-3 rounded-lg bg-dune-400 text-ink-950 font-bold hover:bg-foam-100 transition-colors"
            >
              Request dates
            </button>
          </nav>
        </div>
      </section>
    </main>
  );
}
