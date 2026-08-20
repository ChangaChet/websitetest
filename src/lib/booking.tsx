import { createContext, useContext, useMemo, useState } from 'react';

type BookingCtx = {
  open: boolean;
  preset: string;
  openBooking: (preset?: string) => void;
  closeBooking: () => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState('');
  const value = useMemo(
    () => ({
      open,
      preset,
      openBooking: (p = '') => {
        setPreset(p);
        setOpen(true);
      },
      closeBooking: () => setOpen(false),
    }),
    [open, preset]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useBooking');
  return ctx;
}
