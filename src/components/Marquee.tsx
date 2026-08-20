const WORDS = 'Sea Guinon — Beach — Restaurant — Retreat — Spa — Adventure — ';

export default function Marquee() {
  return (
    <div data-mq className="py-8 sm:py-12 overflow-hidden bg-ink-950 border-y border-foam-100/10">
      <div className="flex whitespace-nowrap will-change-transform" data-mq-inner>
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            className="font-display font-extrabold uppercase tracking-tight text-[clamp(2.2rem,6vw,4.2rem)] mx-3 select-none text-foam-100/15"
          >
            {WORDS}
          </span>
        ))}
      </div>
    </div>
  );
}
