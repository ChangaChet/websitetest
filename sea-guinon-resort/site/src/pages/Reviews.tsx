import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro';
import Marquee from '../components/Marquee';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { REVIEWS } from '../data/content';

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-1 text-dune-400">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = usePageAnimations<HTMLElement>();
  const [featured, ...rest] = REVIEWS;

  return (
    <main ref={ref} className="bg-ink-950">
      <PageIntro
        num="04"
        kicker="Reviews"
        title={<>What guests say<br />after they leave.</>}
        lead="Unedited, from the guest book and post-stay notes. We publish the good and the fair."
      />

      {/* Featured pull-quote */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <figure className="border-l-2 border-dune-400 pl-6 sm:pl-10 py-2" data-reveal>
          <blockquote className="font-display font-bold text-foam-100 text-[clamp(1.4rem,3vw,2.3rem)] leading-[1.2] tracking-tight max-w-3xl">
            "{featured.quote}"
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Stars n={featured.stars} />
            <span className="text-foam-100 font-semibold text-sm">{featured.name}</span>
            <span className="text-foam-600 text-sm">{featured.role}</span>
          </figcaption>
        </figure>
      </section>

      {/* Guest notes — two columns */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
          {rest.map((r, i) => (
            <figure key={r.name} data-reveal style={{ transitionDelay: `${(i % 2) * 60}ms` }}>
              <Stars n={r.stars} />
              <blockquote className="mt-4 text-foam-300 leading-relaxed text-[17px]">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="text-foam-100 font-semibold">{r.name}</span>
                <span className="text-foam-600"> · {r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Marquee />

      {/* Handoff */}
      <section className="bg-ink-900 border-t border-foam-100/10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8" data-reveal>
          <h2 className="font-display font-extrabold uppercase tracking-tight text-foam-100 leading-[0.95] text-[clamp(2rem,5vw,3.8rem)]">
            The next entry could<br />be <span className="text-outline-dune">yours.</span>
          </h2>
          <Link
            to="/packages"
            className="group inline-flex items-center gap-3 font-display font-bold text-foam-100 flex-shrink-0"
          >
            <span className="w-12 h-12 rounded-full border border-foam-100/25 flex items-center justify-center transition-all duration-300 group-hover:bg-dune-400 group-hover:border-dune-400 group-hover:text-ink-950">
              →
            </span>
            Pick a package
          </Link>
        </div>
      </section>
    </main>
  );
}
