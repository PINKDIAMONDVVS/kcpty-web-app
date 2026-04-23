'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  { k: '⊕ LIVE', v: 'S1 · 29 pieces · shipping from Brooklyn' },
  { k: '⊕ NEW',  v: 'Code TIANYI — 15% off first stack · 新款' },
  { k: '⊕ LOT',  v: 'S1-017 · Shuǐ · last 1 of 1' },
];

export function Announce() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((x) => (x + 1) % MESSAGES.length), 3800);
    return () => clearInterval(t);
  }, []);

  const m = MESSAGES[idx]!;

  return (
    <div
      style={{
        background: 'var(--bg-1)',
        color: 'var(--fg-2)',
        padding: '9px 0',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 10.5,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="kpcty-container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="dot" />
          <span style={{ color: 'var(--cinnabar)' }}>{m.k}</span>
          <span style={{ color: 'var(--fg)' }}>{m.v}</span>
        </span>
        <span style={{ opacity: 0.65, display: 'flex', gap: 28, color: 'var(--fg-3)' }}>
          <span>04·22·26 · 刻线 studio / Bushwick</span>
          <span>lat 40.69° · lon -73.93°</span>
        </span>
        <span style={{ display: 'flex', gap: 16, color: 'var(--fg-3)' }}>
          <span>EN · 中</span>
          <span>USD $</span>
        </span>
      </div>
    </div>
  );
}
