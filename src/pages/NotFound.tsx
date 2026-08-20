import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="bg-ink-950 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-32">
        <p className="text-dune-400 font-display text-sm font-semibold tracking-[0.2em] uppercase mb-5">
          404
        </p>
        <h1 className="font-display font-extrabold uppercase text-foam-100 leading-[0.95] text-[clamp(2.4rem,7vw,5.5rem)] tracking-tight max-w-3xl">
          That path doesn’t<br />reach the water.
        </h1>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-3 font-display font-bold text-foam-100"
        >
          <span className="w-11 h-11 rounded-full border border-foam-100/25 flex items-center justify-center">
            →
          </span>
          Back to the coast
        </Link>
      </div>
    </main>
  );
}
