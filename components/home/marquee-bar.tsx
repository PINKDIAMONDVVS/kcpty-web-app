const ITEMS = [
  '刻线 · KPCTY',
  '韩巷 · BROOKLYN',
  'S1 / 2026 · LIVE',
  'ONE-OF-ONE',
  'CERTIFIED',
  'ETHICALLY SOURCED',
  'CORD-STRUNG BY HAND',
  '29 OBJECTS · 8 WISHES',
  'SIG. 0x9F·KPC·S1',
];

// Doubled for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export function MarqueeBar() {
  return (
    <div className="marquee-wrap">
      <div className="kpcty-marquee">
        {TRACK.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem' }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cinnabar)', flexShrink: 0, display: 'inline-block', boxShadow: '0 0 6px var(--cinnabar)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}
