import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/content';
import { useBooking } from '../lib/booking';

export default function Header() {
  const { pathname } = useLocation();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const s = y > 60;
      const h = y > 400 && y > lastY.current && !open;
      lastY.current = y;
      setScrolled((prev) => (prev === s ? prev : s));
      setHidden((prev) => (prev === h ? prev : h));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,20,18,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          boxShadow: scrolled ? 'inset 0 -1px 0 rgba(239,233,218,0.08)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-[72px]">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-display font-extrabold text-foam-100 text-xl tracking-tight uppercase">
              Sea Guinon
            </span>
            <span className="hidden sm:inline text-dune-400 text-[10px] font-semibold tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Resort
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-[14px] font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:transition-all after:duration-300 ${
                    isActive
                      ? 'text-dune-400 after:w-full after:bg-dune-400'
                      : 'text-foam-300 hover:text-foam-100 after:w-0 after:bg-foam-100 hover:after:w-full'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openBooking()}
              className="hidden md:inline-block px-5 py-2.5 rounded-lg bg-dune-400 text-ink-950 text-[14px] font-bold hover:bg-foam-100 transition-colors"
            >
              Book Your Stay
            </button>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[1.5px] bg-foam-100"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-[1.5px] bg-foam-100"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-[1.5px] bg-foam-100"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 bg-ink-900 border-b border-foam-100/10 pt-24 pb-10 px-6"
            >
              <nav className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `block py-3.5 font-display font-extrabold uppercase tracking-tight text-3xl border-b border-foam-100/10 transition-colors ${
                          isActive ? 'text-dune-400' : 'text-foam-100'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="inline-block px-6 py-3 rounded-lg bg-dune-400 text-ink-950 font-bold"
                >
                  Book Your Stay
                </button>
                <a href="mailto:reservations@seaguinon.com" className="text-sm text-foam-500">
                  reservations@seaguinon.com
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => openBooking()}
        className="md:hidden fixed z-50 px-5 py-3 rounded-full bg-dune-400 text-ink-950 text-sm font-bold shadow-lg right-4 bottom-[max(1rem,env(safe-area-inset-bottom))]"
      >
        Book
      </button>
    </>
  );
}
