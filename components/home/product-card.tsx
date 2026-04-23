import type { KpctyProduct } from 'lib/data/kpcty-data';
import Link from 'next/link';

export function ProductCard({ p }: { p: KpctyProduct }) {
  return (
    <Link href={`/product/${p.handle}`} className="pcard lift">
      <div className="pcard__media">
        <img src={`/products_sq/${p.img}.png`} alt={p.name} />
        {p.tag && (
          <span className="pcard__tag">{p.tag}</span>
        )}
        <div className="pcard__seal">{p.intentZh}</div>
      </div>
      <div className="pcard__meta">
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>
            {p.series} · {p.pinyin}
          </div>
          <div className="pcard__name">{p.name}</div>
          <div className="pcard__zh">{p.zh} · {p.intent.toLowerCase()}</div>
          <div className="pcard__stones">
            {p.stones.map((s) => (
              <span key={s} className="stone-dot">{s}</span>
            ))}
          </div>
          <div className="serif" style={{ fontSize: 13, marginTop: 10, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--fg-3)' }}>
            "{p.mantra}"
          </div>
        </div>
        <div className="pcard__price">${p.price}</div>
      </div>
    </Link>
  );
}
