'use client';

import type { Product } from 'lib/shopify/types';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';

/* ── Intent → Chinese seal map ── */
const INTENT_ZH: Record<string, string> = {
  luck: '福', love: '爱', calm: '静', courage: '勇',
  wealth: '财', wisdom: '慧', protection: '护', wish: '愿',
};

/* ── Intent filter config ── */
const INTENTIONS = [
  { key: 'luck',       zh: '福', label: 'Luck' },
  { key: 'love',       zh: '爱', label: 'Love' },
  { key: 'calm',       zh: '静', label: 'Calm' },
  { key: 'courage',    zh: '勇', label: 'Courage' },
  { key: 'wealth',     zh: '财', label: 'Wealth' },
  { key: 'wisdom',     zh: '慧', label: 'Wisdom' },
  { key: 'protection', zh: '护', label: 'Protection' },
  { key: 'wish',       zh: '愿', label: 'Wish' },
];

/* ── Collection filter config ── */
const COLLECTIONS = [
  { id: 'jade',     name: 'Jade',     zh: '玉石' },
  { id: 'agarwood', name: 'Agarwood', zh: '沉香' },
  { id: 'crystal',  name: 'Crystal',  zh: '水晶' },
  { id: 'obsidian', name: 'Obsidian', zh: '黑曜石' },
  { id: 'cinnabar', name: 'Cinnabar', zh: '朱砂' },
];

function productTags(p: Product) {
  return p.tags.map((t) => t.toLowerCase());
}

function getIntentZh(p: Product): string {
  const tags = productTags(p);
  for (const k of Object.keys(INTENT_ZH)) {
    if (tags.includes(k)) return INTENT_ZH[k]!;
  }
  return '';
}

function formatPrice(amount: string, currencyCode: string) {
  const n = parseFloat(amount);
  return currencyCode === 'USD' ? `$${n.toFixed(0)}` : `${currencyCode} ${n.toFixed(0)}`;
}

type SortKey = 'default' | 'price-asc' | 'price-desc';
type ViewKey = 'grid' | 'list';

export function ShopClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('all');
  const [intent, setIntent] = useState('all');
  const [sort,   setSort]   = useState<SortKey>('default');
  const [view,   setView]   = useState<ViewKey>('grid');

  const filtered = useMemo(() => {
    let arr = [...products];
    if (filter !== 'all') arr = arr.filter((p) => productTags(p).includes(filter));
    if (intent !== 'all') arr = arr.filter((p) => productTags(p).includes(intent));
    if (sort === 'price-asc')  arr.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
    if (sort === 'price-desc') arr.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
    return arr;
  }, [products, filter, intent, sort]);

  /* compute live counts from actual products */
  const intentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const intn of INTENTIONS) {
      counts[intn.key] = products.filter((p) => productTags(p).includes(intn.key)).length;
    }
    return counts;
  }, [products]);

  const collectionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const col of COLLECTIONS) {
      counts[col.id] = products.filter((p) => productTags(p).includes(col.id)).length;
    }
    return counts;
  }, [products]);

  return (
    <div className="page-wrap">

      {/* ── Header ── */}
      <div className="kpcty-container" style={{ padding: '48px 0 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <div className="mono up" style={{ fontSize: 11, opacity: 0.55 }}>§ Shop · 店</div>
            <h1 className="display" style={{ fontSize: 'clamp(72px,10vw,160px)', marginTop: 10, lineHeight: 0.92 }}>
              Season One{' '}
              <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>archive</em>
            </h1>
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textAlign: 'right', opacity: 0.65, textTransform: 'uppercase' }}>
            {products.length} pieces<br />5 families<br />Cut in Suzhou · Strung in Brooklyn
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', background: 'var(--rice)' }}>

        {/* Intent row */}
        <div
          className="kpcty-container"
          style={{ display: 'flex', alignItems: 'center', padding: '12px 0', gap: 12, borderBottom: '1px dashed var(--ink-2)', flexWrap: 'wrap' }}
        >
          <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--cinnabar)', marginRight: 8 }}>
            Intent · 意 ·
          </span>
          <SwatchBtn active={intent === 'all'} onClick={() => setIntent('all')}>Any wish</SwatchBtn>
          {INTENTIONS.filter((i) => intentCounts[i.key]! > 0).map((intn) => (
            <SwatchBtn key={intn.key} active={intent === intn.key} onClick={() => setIntent(intn.key)}>
              <span style={{ fontFamily: 'Noto Serif SC, serif', fontWeight: 600, marginRight: 4 }}>{intn.zh}</span>
              {intn.label}{' '}
              <span style={{ opacity: 0.55, marginLeft: 4 }}>[{intentCounts[intn.key]}]</span>
            </SwatchBtn>
          ))}
        </div>

        {/* Material + sort + view */}
        <div
          className="kpcty-container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', gap: 32 }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.55, marginRight: 8 }}>Material ·</span>
            <button
              className="swatch"
              onClick={() => setFilter('all')}
              style={{ background: filter === 'all' ? 'var(--ink)' : 'var(--rice)', color: filter === 'all' ? 'var(--rice)' : 'var(--ink)', borderColor: 'var(--ink)' }}
            >
              All / 全部 <span style={{ opacity: 0.6, marginLeft: 4 }}>[{products.length}]</span>
            </button>
            {COLLECTIONS.filter((c) => collectionCounts[c.id]! > 0).map((col) => (
              <button
                key={col.id}
                className="swatch"
                onClick={() => setFilter(col.id)}
                style={{ background: filter === col.id ? 'var(--ink)' : 'var(--rice)', color: filter === col.id ? 'var(--rice)' : 'var(--ink)', borderColor: 'var(--ink)' }}
              >
                {col.name} / {col.zh}{' '}
                <span style={{ opacity: 0.6, marginLeft: 4 }}>[{collectionCounts[col.id]}]</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
            <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              style={{ padding: '8px 10px', border: '1px solid var(--ink)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: 'var(--rice)', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
            </select>
            <div style={{ display: 'flex', border: '1px solid var(--ink)' }}>
              <ViewBtn active={view === 'grid'} onClick={() => setView('grid')}>⊞ Grid</ViewBtn>
              <ViewBtn active={view === 'list'} onClick={() => setView('list')} borderLeft>≡ Index</ViewBtn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Noto Serif SC, serif', fontSize: 64, color: 'var(--cinnabar)', opacity: 0.3 }}>空</div>
          <div className="mono up" style={{ marginTop: 16, fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.2em' }}>
            No pieces match this filter.
          </div>
        </div>
      )}

      {/* ── Grid view ── */}
      {view === 'grid' && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--line)' }}>
          {filtered.map((p) => <ShopifyCard key={p.id} product={p} />)}
        </div>
      )}

      {/* ── List / index view ── */}
      {view === 'list' && filtered.length > 0 && (
        <div className="kpcty-container" style={{ padding: '20px 0 60px' }}>
          <div style={{ borderTop: '2px solid var(--line)' }}>
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.handle}`}
                className="lift"
                style={{ display: 'grid', gridTemplateColumns: '80px 1.6fr 0.9fr 1.4fr 80px', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ aspectRatio: '1', background: 'var(--bg-2)', overflow: 'hidden' }}>
                  {p.featuredImage?.url && (
                    <Image src={p.featuredImage.url} alt={p.featuredImage.altText || p.title} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1.1, color: 'var(--fg)' }}>{p.title}</div>
                  {getIntentZh(p) && (
                    <div className="serif-sc" style={{ fontSize: 13, color: 'var(--cinnabar)', marginTop: 4 }}>{getIntentZh(p)}</div>
                  )}
                </div>
                <div>
                  {p.tags.slice(0, 3).map((tag) => (
                    <div key={tag} className="mono" style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', lineHeight: 1.6 }}>⦿ {tag}</div>
                  ))}
                </div>
                <div className="serif" style={{ fontSize: 13, fontStyle: 'italic', lineHeight: 1.4, opacity: 0.72, color: 'var(--fg-2)' }}>
                  {p.description ? `"${p.description.slice(0, 80)}${p.description.length > 80 ? '…' : ''}"` : ''}
                </div>
                <div className="mono" style={{ fontSize: 13, textAlign: 'right', color: 'var(--fg)' }}>
                  {formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Archive footnote ── */}
      <div style={{ background: 'var(--bg-2)', padding: '40px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="kpcty-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <div className="vert-zh serif-sc" style={{ fontSize: 24, color: 'var(--cinnabar)' }}>尾声</div>
          <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, maxWidth: '56ch', textAlign: 'center', color: 'var(--fg-2)' }}>
            Everything here is one of one. Once a piece leaves Brooklyn we cannot
            re-run it — the stones we buy are older than the re-order button.
          </p>
          <div className="mono up" style={{ fontSize: 11, letterSpacing: '0.16em', opacity: 0.55 }}>END OF INDEX</div>
        </div>
      </div>

    </div>
  );
}

/* ── Shopify product card (KPCTY style) ── */
function ShopifyCard({ product: p }: { product: Product }) {
  const intentZh  = getIntentZh(p);
  const price     = formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode);
  const tags      = productTags(p);
  const isNew     = tags.includes('new');
  const isHot     = tags.includes('hot');
  const isSold    = !p.availableForSale;
  const badgeTag  = isSold ? 'SOLD' : isHot ? 'HOT' : isNew ? 'NEW' : null;

  return (
    <Link href={`/product/${p.handle}`} className="pcard lift">
      <div className="pcard__media">
        {p.featuredImage?.url ? (
          <Image
            src={p.featuredImage.url}
            alt={p.featuredImage.altText || p.title}
            width={600}
            height={600}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : null}
        {badgeTag && <span className="pcard__tag">{badgeTag}</span>}
        {intentZh && <div className="pcard__seal">{intentZh}</div>}
      </div>
      <div className="pcard__meta">
        <div>
          <div className="pcard__name">{p.title}</div>
          {p.description && (
            <div className="serif" style={{ fontSize: 13, marginTop: 8, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--fg-3)' }}>
              "{p.description.slice(0, 72)}{p.description.length > 72 ? '…' : ''}"
            </div>
          )}
          {p.tags.length > 0 && (
            <div className="pcard__stones">
              {p.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="stone-dot">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="pcard__price">{price}</div>
      </div>
    </Link>
  );
}

/* ── Small helper buttons ── */
function SwatchBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button className="swatch" onClick={onClick} style={{ background: active ? 'var(--cinnabar)' : 'var(--rice)', color: active ? 'var(--rice)' : 'var(--ink)', borderColor: active ? 'var(--cinnabar)' : 'var(--ink)' }}>
      {children}
    </button>
  );
}

function ViewBtn({ active, onClick, children, borderLeft }: { active: boolean; onClick: () => void; children: React.ReactNode; borderLeft?: boolean }) {
  return (
    <button onClick={onClick} style={{ padding: '8px 14px', background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--rice)' : 'var(--ink)', border: 'none', borderLeft: borderLeft ? '1px solid var(--ink)' : undefined, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {children}
    </button>
  );
}
