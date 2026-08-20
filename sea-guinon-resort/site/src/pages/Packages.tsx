import PageIntro from '../components/PageIntro';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { PACKAGES } from '../data/content';
import { useBooking } from '../lib/booking';

export default function Packages() {
  const ref = usePageAnimations<HTMLElement>();
  const { openBooking } = useBooking();

  return (
    <main ref={ref} className="bg-ink-950">
      <PageIntro
        num="03"
        kicker="Packages"
        title={<>Three ways<br />to stay.</>}
        lead="Each one is fully customizable. Group discounts for ten or more, and custom quotes for weddings, multi-week stays, and full-resort buyouts."
        meta="All prices in USD · taxes included · no resort fees"
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky aside */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28" data-reveal>
            <h2 className="font-display font-bold text-foam-100 text-2xl leading-[1.1] tracking-tight mb-5">
              Every rate includes the beach, the pool, and the WiFi you actually need.
            </h2>
            <p className="text-foam-500 leading-relaxed text-[15px] mb-8">
              Kayaks, paddleboards, and snorkel gear are free for all guests — motorized
              sports are bookable at the shed. Nothing on this page surprises you at checkout.
            </p>
            <div className="border-l-2 border-dune-400 pl-5 py-1">
              <p className="text-foam-300 text-[15px] leading-relaxed mb-3">
                Planning for a team or a big family? Write to us and we'll shape a package
                around your dates, not the other way around.
              </p>
              <a href="mailto:reservations@seaguinon.com" className="text-dune-400 font-medium text-[15px] hover:text-foam-100 transition-colors">
                reservations@seaguinon.com →
              </a>
            </div>
          </aside>

          {/* Stacked rate cards */}
          <div className="lg:col-span-8 space-y-5" data-stagger>
            {PACKAGES.map((p) => (
              <article
                key={p.name}
                data-sc
                className={`rounded-xl p-7 sm:p-9 transition-all duration-300 ${
                  p.featured
                    ? 'bg-ink-800 ring-1 ring-dune-400/50'
                    : 'bg-ink-900 border border-foam-100/10 hover:border-foam-100/25'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-5">
                  <div>
                    {p.featured && (
                      <p className="text-dune-400 font-display text-xs font-semibold tracking-[0.2em] uppercase mb-2.5">
                        Most booked
                      </p>
                    )}
                    <h3 className={`font-display font-extrabold uppercase tracking-tight text-2xl sm:text-3xl ${p.featured ? 'text-dune-400' : 'text-foam-100'}`}>
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-extrabold text-foam-100 text-4xl sm:text-5xl tracking-tight">
                      ${p.price}
                    </span>
                    <span className="text-sm text-foam-500">{p.unit}</span>
                  </div>
                </div>

                <div className="border-t border-foam-100/10 pt-6">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {p.items.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-foam-300">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-lagoon-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-foam-600">Free cancellation · 72h before check-in</p>
                  <a
                    href="mailto:reservations@seaguinon.com"
                    className={`flex-shrink-0 px-6 py-3 rounded-lg font-bold text-[15px] transition-colors text-center ${
                      p.featured
                        ? 'bg-dune-400 text-ink-950 hover:bg-foam-100'
                        : 'bg-ink-700 text-foam-100 hover:bg-ink-600'
                    }`}
                  >
                    Book this package
                  </a>
                </div>
              </article>
            ))}

            <p data-sc className="text-sm text-foam-600 pt-3">
              Rates shown are per room unless noted. Corporate Elite is priced per person on
              double occupancy; single rooms available at a supplement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
