const ITEMS = [
  '⦿ NATURAL STONE · 天然石',
  '⦿ HAND-STRUNG · 手串',
  '⦿ AGARWOOD · 沉香',
  '⦿ HETIAN JADE · 碧玉',
  '⦿ CINNABAR · 朱砂',
  '⦿ QINAN · 奇楠',
  '⦿ AMAZONITE · 天河石',
  '⦿ SEASON ONE · 一季',
  '⊕ KPCTY · 刻线',
  '⦿ BEESWAX AMBER · 蜜蜡',
];

const TRACK = [...ITEMS, ...ITEMS];

export function MarqueeBar() {
  return (
    <div className="marquee-wrap">
      <div className="kpcty-marquee">
        {TRACK.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              gap: '3rem',
              color: i % 5 === 0 ? 'var(--cinnabar)' : 'var(--fg-2)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
