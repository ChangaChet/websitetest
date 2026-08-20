import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from '../lib/booking';
import { PACKAGES } from '../data/content';
import { getLenis } from '../lib/lenis';

export default function BookModal() {
  const { open, preset, closeBooking } = useBooking();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [arrive, setArrive] = useState('');
  const [depart, setDepart] = useState('');
  const [guests, setGuests] = useState('2');
  const [pkg, setPkg] = useState(preset || PACKAGES[1].name);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open && preset) setPkg(preset);
  }, [open, preset]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBooking();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeBooking]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Arrive: ${arrive}`,
      `Depart: ${depart}`,
      `Guests: ${guests}`,
      `Package: ${pkg}`,
      '',
      note,
    ].join('\n');
    window.location.href = `mailto:reservations@seaguinon.com?subject=${encodeURIComponent(
      `Stay inquiry — ${pkg}`
    )}&body=${encodeURIComponent(body)}`;
    closeBooking();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/75 backdrop-blur-md" onClick={closeBooking} />
          <motion.form
            onSubmit={submit}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-ink-900 border border-foam-100/10 rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-dune-400 font-display text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  Reservations
                </p>
                <h2 className="font-display font-extrabold uppercase text-foam-100 text-2xl tracking-tight">
                  Request a stay
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                className="text-foam-500 hover:text-foam-100 text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block sm:col-span-1">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Name</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Arrive</span>
                <input required type="date" value={arrive} onChange={(e) => setArrive(e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Depart</span>
                <input required type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Guests</span>
                <input required value={guests} onChange={(e) => setGuests(e.target.value)} className="field" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Package</span>
                <select value={pkg} onChange={(e) => setPkg(e.target.value)} className="field">
                  {PACKAGES.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[11px] tracking-widest uppercase text-foam-600">Notes</span>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="field resize-none"
                  placeholder="Occasion, room preference, dietary notes…"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3.5 rounded-lg bg-dune-400 text-ink-950 font-bold hover:bg-foam-100 transition-colors"
            >
              Send inquiry
            </button>
            <p className="mt-3 text-center text-xs text-foam-600">
              Opens your mail app · we reply within a day
            </p>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
