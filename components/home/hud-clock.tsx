'use client';

import { useEffect, useState } from 'react';

export function HudClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!time) return <span style={{ color: 'var(--fg-3)' }}>UTC --:--<span style={{ color: 'var(--cinnabar)' }}>:--</span></span>;

  const hh = String(time.getUTCHours()).padStart(2, '0');
  const mm = String(time.getUTCMinutes()).padStart(2, '0');
  const ss = String(time.getUTCSeconds()).padStart(2, '0');

  return (
    <span style={{ color: 'var(--fg-3)' }}>
      UTC {hh}:{mm}<span style={{ color: 'var(--cinnabar)' }}>:{ss}</span>
    </span>
  );
}
