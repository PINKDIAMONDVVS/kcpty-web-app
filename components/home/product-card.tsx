import { getIntentZh, parseList } from 'lib/intents';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

function fmt(amount: string, code: string) {
  const n = parseFloat(amount);
  return code === 'USD' ? `$${n.toFixed(0)}` : `${code} ${n.toFixed(0)}`;
}

export function ProductCard({ p }: { p: Product }) {
  const intents   = parseList(p.intents?.value);
  const materials = parseList(p.materials?.value);
  const intentZh  = getIntentZh(intents);
  const tagsLower = p.tags.map((t) => t.toLowerCase());
  const badge     = !p.availableForSale ? 'SOLD' : tagsLower.includes('hot') ? 'HOT' : tagsLower.includes('new') ? 'NEW' : null;

  return (
    <Link href={`/product/${p.handle}`} className="pcard lift">
      <div className="pcard__media">
        {p.featuredImage?.url && (
          <Image
            src={p.featuredImage.url}
            alt={p.featuredImage.altText || p.title}
            width={600}
            height={600}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {badge    && <span className="pcard__tag">{badge}</span>}
        {intentZh && <div className="pcard__seal">{intentZh}</div>}
      </div>
      <div className="pcard__meta">
        <div>
          {intents[0] && (
            <div
              className="mono"
              style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}
            >
              § {intents[0]}
            </div>
          )}
          <div className="pcard__name">{p.title}</div>
          {p.description && (
            <div
              className="serif"
              style={{ fontSize: 13, marginTop: 10, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--fg-3)' }}
            >
              "{p.description.slice(0, 90)}{p.description.length > 90 ? '…' : ''}"
            </div>
          )}
          {materials.length > 0 && (
            <div className="pcard__stones">
              {materials.slice(0, 3).map((s) => (
                <span key={s} className="stone-dot">{s}</span>
              ))}
            </div>
          )}
        </div>
        <div className="pcard__price">
          {fmt(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
        </div>
      </div>
    </Link>
  );
}
