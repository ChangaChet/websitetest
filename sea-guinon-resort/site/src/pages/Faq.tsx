import { useState } from 'react';
import PageIntro from '../components/PageIntro';
import { usePageAnimations } from '../hooks/usePageAnimations';
import { FAQS } from '../data/content';
import { useBooking } from '../lib/booking';

export default function Faq() {
  const ref = usePageAnimations<HTMLElement>();
  const [open, setOpen] = useState<number | null>(0);
  const { openBooking } = useBooking();

  return (
    <main ref={ref} className="bg-ink-950">
      <PageIntro
        num="05"
        kicker="FAQ"
        title={<>Common questions,<br />honest answers.</>}
        lead="Everything people ask before they book. If it isn't here, we're a short email away."
      />

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-24 sm:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7" data-reveal>
          {FAQS.map((f, i) => (
            <div key={f.q} className="border-b border-foam-100/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-start justify-between gap-4 py-6 text-left"
              >
                <span className={`font-display font-bold text-lg sm:text-xl tracking-tight transition-colors ${open === i ? 'text-dune-400' : 'text-foam-100'}`}>
                  {f.q}
                </span>
                <span className={`text-foam-500 text-2xl leading-none flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45 text-dune-400' : ''}`}>
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '260px' : '0', opacity: open === i ? 1 : 0 }}
              >
                <p className="pb-6 text-foam-500 leading-relaxed text-[15px] pr-10 max-w-xl">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-5 lg:sticky lg:top-28" data-reveal>
          <div className="bg-ink-900 border border-foam-100/10 rounded-xl p-7 sm:p-9">
            <h2 className="font-display font-extrabold uppercase tracking-tight text-foam-100 text-2xl leading-[1.0] mb-4">
              Still deciding?
            </h2>
            <p className="text-foam-500 leading-relaxed text-[15px] mb-7">
              Tell us your dates and who's coming — a family, a team of forty, a class of
              teenagers — and we'll answer with a real plan, not a brochure.
            </p>
            <a
              href="mailto:reservations@seaguinon.com"
              className="block text-center px-6 py-3.5 rounded-lg bg-dune-400 text-ink-950 font-bold text-[15px] hover:bg-foam-100 transition-colors mb-3"
            >
              Email the team
            </a>
            <p className="text-center text-sm text-foam-600">or call +63 912 345 6789 · we pick up</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
