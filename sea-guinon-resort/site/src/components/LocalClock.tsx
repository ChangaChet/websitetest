import { useEffect, useState } from 'react';

export default function LocalClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => {
      setT(
        new Intl.DateTimeFormat('en-PH', {
          timeZone: 'Asia/Manila',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };
    tick();
    const id = window.setInterval(tick, 1000 * 30);
    return () => window.clearInterval(id);
  }, []);
  if (!t) return null;
  return (
    <span>
      Resort time · {t} PHT
    </span>
  );
}
