import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/content';
import LocalClock from './LocalClock';

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-foam-100/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        {/* Big wordmark */}
        <p className="font-display font-extrabold uppercase tracking-tight leading-none text-[clamp(3rem,10vw,8.5rem)] text-outline select-none mb-14">
          Sea Guinon
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <p className="text-foam-300 text-sm leading-relaxed mb-5 max-w-xs">
              A beachfront resort and restaurant on a quiet stretch of the Philippine coast.
              Fifty rooms, one long beach, and a menu the boats write.
            </p>
            <div className="text-sm space-y-1.5">
              <p className="text-foam-100 font-medium">+63 912 345 6789</p>
              <a href="mailto:reservations@seaguinon.com" className="text-foam-500 hover:text-dune-400 transition-colors">
                reservations@seaguinon.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-dune-400 font-display text-xs font-semibold tracking-[0.2em] uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-foam-300 hover:text-foam-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-dune-400 font-display text-xs font-semibold tracking-[0.2em] uppercase mb-4">Experiences</h4>
            <ul className="space-y-2.5 text-sm text-foam-300">
              <li>Surf school & water sports</li>
              <li>Island tours</li>
              <li>Sunset cruises · Thu–Sun</li>
              <li>Corporate retreats</li>
            </ul>
          </div>

          <div>
            <h4 className="text-dune-400 font-display text-xs font-semibold tracking-[0.2em] uppercase mb-4">Visit</h4>
            <ul className="space-y-2.5 text-sm text-foam-300">
              <li>Sea Guinon Bay, Coastal Road</li>
              <li>Surigao del Sur, Philippines</li>
              <li className="pt-2 text-foam-600">Front desk · 24/7</li>
              <li className="text-foam-600">Restaurant · 6:00 – 23:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-foam-100/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-foam-600">
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Sea Guinon Resort. All rights reserved.</span>
            <LocalClock />
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foam-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-foam-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-foam-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
