/* Editorial page opener — numbered kicker, display headline, optional lead/meta. */
export default function PageIntro({
  num,
  kicker,
  title,
  meta,
  lead,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  meta?: string;
  lead?: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-12 sm:pb-16" data-reveal>
      <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">
        {num} — {kicker}
      </p>
      <h1 className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] tracking-tight max-w-4xl text-[clamp(2.4rem,6vw,5rem)]">
        {title}
      </h1>
      {lead && (
        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-foam-500">
          {lead}
        </p>
      )}
      {meta && (
        <p className="mt-6 text-sm font-medium text-foam-600">{meta}</p>
      )}
    </div>
  );
}
