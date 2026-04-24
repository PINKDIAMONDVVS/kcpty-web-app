'use client';

import { addItem } from 'components/cart/actions';
import { useCart } from 'components/cart/cart-context';
import type { Product, ProductOption, ProductVariant } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';

/* ── Helpers ── */
function parseList(value: string | null | undefined): string[] {
  if (!value) return [];
  try { return JSON.parse(value) as string[]; } catch { return []; }
}

const INTENT_ZH: Record<string, string> = {
  luck: '福', love: '爱', calm: '静', courage: '勇',
  wealth: '财', wisdom: '慧', protection: '护', wish: '愿',
};

function fmt(amount: string, code: string) {
  const n = parseFloat(amount);
  return code === 'USD' ? `$${n.toFixed(0)}` : `${code} ${n.toFixed(0)}`;
}

type Combination = { id: string; availableForSale: boolean; [key: string]: string | boolean };

/* ═══════════════════════════════════════════
   Main PDP client component
   ═══════════════════════════════════════════ */
export function PdpClient({
  product,
  recommendations,
}: {
  product: Product;
  recommendations: Product[];
}) {
  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);

  const images = product.images.length > 0
    ? product.images
    : product.featuredImage ? [product.featuredImage] : [];

  const intents   = parseList(product.intents?.value);
  const materials = parseList(product.materials?.value);
  const primaryIntent = intents[0]?.toLowerCase() ?? '';
  const intentZh      = INTENT_ZH[primaryIntent] ?? '';

  const price = product.priceRange.minVariantPrice;

  return (
    <div className="page-wrap">

      {/* ── Breadcrumb ── */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-1)' }}>
        <div
          className="kpcty-container mono"
          style={{ padding: '10px 0', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.65 }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          {' '}&nbsp;/{' '}&nbsp;
          <Link href="/search" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          {' '}&nbsp;/{' '}&nbsp;
          <span style={{ color: 'var(--cinnabar)' }}>{product.title}</span>
        </div>
      </div>

      {/* ── PDP two-column ── */}
      <section className="pdp">

        {/* Media panel */}
        <div className="pdp__media">
          <div className="pdp__thumbs no-scroll">
            {images.map((img, i) => (
              <div
                key={i}
                className={`pdp__thumb${mainImg === i ? ' active' : ''}`}
                onClick={() => setMainImg(i)}
              >
                <Image
                  src={img.url}
                  alt={img.altText || product.title}
                  width={80}
                  height={80}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div className="pdp__main">
            {images[mainImg]?.url && (
              <Image
                src={images[mainImg].url}
                alt={images[mainImg].altText || product.title}
                width={800}
                height={1000}
                priority
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}

            {/* Corner seal */}
            <div className="abs" style={{ bottom: 28, left: 28, display: 'flex', gap: 14, alignItems: 'flex-end', pointerEvents: 'none' }}>
              {intentZh && (
                <div style={{
                  width: 90, height: 90,
                  background: 'var(--cinnabar)', color: 'var(--fg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Noto Serif SC, serif', fontWeight: 700, fontSize: 54,
                  transform: 'rotate(-4deg)',
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                }}>
                  {intentZh}
                </div>
              )}
              <div style={{ color: 'var(--fg)', marginBottom: 6 }}>
                {primaryIntent && (
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', opacity: 0.8 }}>
                    Season One · {primaryIntent}
                  </div>
                )}
                <div className="serif" style={{ fontSize: 22, marginTop: 2 }}>{product.title}</div>
              </div>
            </div>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="abs mono" style={{ top: 22, right: 22, color: 'var(--fg)', fontSize: 10, letterSpacing: '0.18em', opacity: 0.85 }}>
                ⤢ {mainImg + 1}/{images.length}
              </div>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="pdp__info">

          {/* Kicker */}
          <div className="mono up" style={{ fontSize: 11, opacity: 0.55, letterSpacing: '0.14em', marginBottom: 8 }}>
            Season One · S1 Capsule
          </div>

          {/* Title */}
          <h1 className="display" style={{ fontSize: 'clamp(40px,5.5vw,72px)', lineHeight: 0.95, marginBottom: 10 }}>
            {product.title}
          </h1>

          {/* Intent card */}
          {primaryIntent && (
            <div style={{
              border: '1px solid var(--line)', background: 'var(--bg-2)',
              padding: '18px 20px', marginBottom: 24,
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'center',
            }}>
              <div style={{
                width: 72, height: 72,
                background: 'var(--cinnabar)', color: 'var(--fg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Noto Serif SC, serif', fontWeight: 700, fontSize: 42, lineHeight: 1,
              }}>
                {intentZh}
              </div>
              <div>
                <div className="mono up" style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.16em' }}>
                  Wish · 心愿 · {primaryIntent}
                </div>
                <div className="serif" style={{ fontSize: 20, lineHeight: 1.2, margin: '4px 0 8px' }}>
                  Carry this for <em style={{ color: 'var(--cinnabar)' }}>{primaryIntent}</em>.
                </div>
                {product.description && (
                  <div className="serif" style={{ fontSize: 14, fontStyle: 'italic', lineHeight: 1.35, opacity: 0.8 }}>
                    "{product.description.slice(0, 110)}{product.description.length > 110 ? '…' : ''}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brush divider */}
          <div className="brush" style={{ width: 120, marginBottom: 24 }} />

          {/* Story */}
          {product.description && (
            <p className="serif" style={{ fontSize: 19, lineHeight: 1.45, marginBottom: 24, maxWidth: '40ch' }}>
              <em>{product.description}</em>
            </p>
          )}

          {/* Materials hint */}
          {materials.length > 0 && (
            <div
              className="label-box"
              style={{ marginBottom: 32, background: 'transparent', borderStyle: 'dashed' }}
            >
              <span className="mono up" style={{ fontSize: 10, color: 'var(--cinnabar)', letterSpacing: '0.16em' }}>
                Stones ·
              </span>{' '}
              <span className="serif" style={{ fontSize: 15, fontStyle: 'italic' }}>
                {materials.join(' · ')}
              </span>
            </div>
          )}

          {/* Price */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            paddingBottom: 24, borderBottom: '1px solid var(--line)', marginBottom: 28,
          }}>
            <div>
              <div className="mono up" style={{ fontSize: 10, opacity: 0.5, marginBottom: 4 }}>Price · 定价</div>
              <div className="display" style={{ fontSize: 'clamp(36px,4.5vw,56px)', lineHeight: 1 }}>
                {fmt(price.amount, price.currencyCode)}{' '}
                <span className="serif-sc" style={{ fontSize: 20, color: 'var(--cinnabar)' }}>{price.currencyCode}</span>
              </div>
            </div>
            <div className="mono" style={{ fontSize: 11, textAlign: 'right', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Ships in 3–5 days<br />From Brooklyn, NY
            </div>
          </div>

          {/* Variant swatches */}
          <VariantSwatches options={product.options} variants={product.variants} />

          {/* Qty */}
          <div style={{ marginBottom: 28, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div>
              <div className="mono up" style={{ fontSize: 10, opacity: 0.6, marginBottom: 10 }}>Qty</div>
              <div className="qty">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>
            <div style={{ flex: 1, fontSize: 12, opacity: 0.7, padding: '0 8px', lineHeight: 1.4 }}>
              <em className="serif" style={{ fontSize: 14 }}>ONE OF ONE</em> — only this piece exists.<br />
              No restock on this exact configuration.
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
            <PdpAddToCart product={product} qty={qty} />
            <button className="btn btn--ghost btn--block">♡ Save to wishlist</button>
          </div>

          {/* Certificate */}
          <div
            className="label-box"
            style={{ marginBottom: 28, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center' }}
          >
            <div style={{
              width: 48, height: 48,
              background: 'var(--cinnabar)', color: 'var(--fg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Noto Serif SC', fontSize: 20, fontWeight: 700,
            }}>
              证
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.5 }}>
              <strong>CERTIFICATE OF NATURAL ORIGIN</strong><br />
              Each piece ships with a handwritten letter naming the specific stone, workshop, and maker.
            </div>
          </div>

          {/* KV specs */}
          <div>
            <div className="mono up" style={{ fontSize: 10, opacity: 0.6, marginBottom: 8 }}>Specifications · 规格</div>
            <dl>
              {intents.length > 0 && (
                <div className="kv">
                  <dt>Intent</dt>
                  <dd>{intents.map((v) => `${INTENT_ZH[v.toLowerCase()] ?? ''} · ${v}`).join(', ')}</dd>
                </div>
              )}
              {materials.length > 0 && (
                <div className="kv">
                  <dt>Materials</dt>
                  <dd>{materials.join(' · ')}</dd>
                </div>
              )}
              {product.options.filter((o) => o.values.length > 1).map((o) => (
                <div key={o.id} className="kv">
                  <dt>{o.name}</dt>
                  <dd>{o.values.join(', ')}</dd>
                </div>
              ))}
              <div className="kv"><dt>Origin</dt><dd>Stones sourced Xinjiang · Yunnan · Sichuan</dd></div>
              <div className="kv"><dt>Artisan</dt><dd>Ken S. · Suzhou workshop</dd></div>
              <div className="kv"><dt>Edition</dt><dd>1 of 1 · S1 capsule</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Care section ── */}
      <section style={{ background: 'var(--bg-3)', padding: '80px 0', borderTop: '1px solid var(--line)' }}>
        <div className="kpcty-container pdp-care">
          <div className="vert-zh serif-sc pdp-care__zh" style={{ fontSize: 64, color: 'var(--cinnabar)', fontWeight: 600, lineHeight: 1 }}>
            养打串
          </div>
          <div>
            <div className="mono up" style={{ fontSize: 11, opacity: 0.5, color: 'var(--cinnabar)', marginBottom: 10 }}>
              Care · yǎng — to raise / nurture
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(36px,5vw,68px)', lineHeight: 1, marginBottom: 24 }}>
              Beads get <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>better</em> the longer you wear them.
            </h2>
            <div className="pdp-care-tips">
              {[
                { n: '01', t: 'Oil your own beads', d: "Skin oil — yours, not anyone else's — is the only polish agarwood needs." },
                { n: '02', t: 'Rest them Sunday',   d: 'Lay flat on a paper napkin overnight, out of direct sun. Do not wash.' },
                { n: '03', t: 'Re-knot annually',   d: 'Silk stretches with a year of wear. We re-cord free, forever.' },
              ].map((c) => (
                <div key={c.n}>
                  <div className="mono" style={{ fontSize: 10, opacity: 0.4, letterSpacing: '0.2em' }}>{c.n}</div>
                  <div className="serif" style={{ fontSize: 22, margin: '6px 0' }}>{c.t}</div>
                  <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recommendations ── */}
      {recommendations.length > 0 && (
        <section className="kpcty-container" style={{ padding: '60px 0 100px' }}>
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <div className="sec-head__num">§ / ALSO</div>
            <h2 className="display sec-head__title">
              Other pieces — <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>款</em>
            </h2>
            <div className="sec-head__meta">FROM THE SAME HANDS</div>
          </div>
          <div className="pdp-reco-grid">
            {recommendations.slice(0, 4).map((r) => (
              <RecoCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Variant swatch selector (ports VariantSelector with .swatch CSS)
   ═══════════════════════════════════════════ */
function VariantSwatches({ options, variants }: { options: ProductOption[]; variants: ProductVariant[] }) {
  const router     = useRouter();
  const searchParams = useSearchParams();

  const trivial = !options.length || (options.length === 1 && options[0]?.values.length === 1);
  if (trivial) return null;

  const combinations: Combination[] = variants.map((v) => ({
    id: v.id,
    availableForSale: v.availableForSale,
    ...v.selectedOptions.reduce<Record<string, string>>(
      (acc, o) => ({ ...acc, [o.name.toLowerCase()]: o.value }),
      {},
    ),
  }));

  return (
    <>
      {options.map((option) => {
        const nameLower = option.name.toLowerCase();
        return (
          <div key={option.id} style={{ marginBottom: 24 }}>
            <div className="mono up" style={{ fontSize: 10, opacity: 0.6, marginBottom: 10 }}>
              {option.name}
            </div>
            <div className="swatch-row">
              {option.values.map((value) => {
                const params: Record<string, string> = {};
                searchParams.forEach((v, k) => { params[k] = v; });
                params[nameLower] = value;

                const filtered = Object.entries(params).filter(([key, val]) =>
                  options.find((o) => o.name.toLowerCase() === key && o.values.includes(val)),
                );
                const available = combinations.some((c) =>
                  filtered.every(([key, val]) => c[key] === val && c.availableForSale),
                );
                const isActive = searchParams.get(nameLower) === value;

                return (
                  <button
                    key={value}
                    className={`swatch${isActive ? ' selected' : ''}`}
                    onClick={() => {
                      const p = new URLSearchParams(searchParams.toString());
                      p.set(nameLower, value);
                      router.replace(`?${p.toString()}`, { scroll: false });
                    }}
                    disabled={!available}
                    style={!available ? { opacity: 0.3, cursor: 'not-allowed', textDecoration: 'line-through' } : undefined}
                    title={`${option.name} ${value}${!available ? ' (Out of Stock)' : ''}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

/* ═══════════════════════════════════════════
   Add-to-cart button (PDP-styled)
   ═══════════════════════════════════════════ */
function PdpAddToCart({ product, qty }: { product: Product; qty: number }) {
  const { variants, availableForSale, priceRange } = product;
  const { addCartItem } = useCart();
  const searchParams    = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((v) =>
    v.selectedOptions.every((o) => o.value === searchParams.get(o.name.toLowerCase())),
  );
  const defaultVariantId  = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant      = variants.find((v) => v.id === selectedVariantId);

  const linePrice = finalVariant?.price ?? priceRange.minVariantPrice;
  const total     = (parseFloat(linePrice.amount) * qty).toFixed(0);
  const currency  = linePrice.currencyCode === 'USD' ? '$' : `${linePrice.currencyCode} `;
  const addItemAction = formAction.bind(null, selectedVariantId);

  if (!availableForSale) {
    return (
      <button className="btn btn--ghost btn--block" disabled style={{ padding: 20, opacity: 0.5, cursor: 'not-allowed' }}>
        SOLD OUT · 售罄
      </button>
    );
  }

  return (
    <form action={async () => {
      if (!finalVariant) return;
      addCartItem(finalVariant, product);
      addItemAction();
    }}>
      <button
        type="submit"
        className="btn btn--red btn--block"
        style={{ padding: 20, opacity: selectedVariantId ? 1 : 0.55 }}
        disabled={!selectedVariantId}
      >
        Add to cart · {currency}{total}
      </button>
      <p aria-live="polite" className="sr-only" role="status">{message}</p>
    </form>
  );
}

/* ═══════════════════════════════════════════
   Recommendation product card
   ═══════════════════════════════════════════ */
function RecoCard({ product: p }: { product: Product }) {
  const intents  = parseList(p.intents?.value);
  const intentZh = INTENT_ZH[intents[0]?.toLowerCase() ?? ''] ?? '';
  const price    = fmt(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode);

  return (
    <Link href={`/product/${p.handle}`} className="pcard lift">
      <div className="pcard__media">
        {p.featuredImage?.url && (
          <Image
            src={p.featuredImage.url}
            alt={p.featuredImage.altText || p.title}
            width={400}
            height={400}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        {!p.availableForSale && <span className="pcard__tag">SOLD</span>}
        {intentZh && <div className="pcard__seal">{intentZh}</div>}
      </div>
      <div className="pcard__meta">
        <div className="pcard__name">{p.title}</div>
        <div className="pcard__price">{price}</div>
      </div>
    </Link>
  );
}
