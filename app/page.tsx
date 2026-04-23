import { HudClock } from 'components/home/hud-clock';
import { MarqueeBar } from 'components/home/marquee-bar';
import { NewsletterForm } from 'components/home/newsletter-form';
import { ProductCard } from 'components/home/product-card';
import Footer from 'components/layout/footer';
import { KPCTY_COLLECTIONS, KPCTY_INTENTIONS, KPCTY_PRODUCTS } from 'lib/data/kpcty-data';
import Link from 'next/link';

export const metadata = {
  title: 'KPCTY — Wishes, Cut in Stone',
  description: 'Twenty-nine one-of-one bracelets, cut from eight named mountains and rung with meaning.',
  openGraph: { type: 'website' },
};

const hero     = KPCTY_PRODUCTS[9]!;
const featured = [
  KPCTY_PRODUCTS[0]!,
  KPCTY_PRODUCTS[4]!,
  KPCTY_PRODUCTS[9]!,
  KPCTY_PRODUCTS[14]!,
  KPCTY_PRODUCTS[19]!,
];

export default function HomePage() {
  return (
    <div className="page-wrap">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__stage">

          {/* Left — typography */}
          <div className="hero__type">
            <div className="hero__kicker">
              <span className="tag"><span className="dot" style={{ marginRight: 6 }} />S1 / 2026 · LIVE</span>
              <span className="bar" />
              <HudClock />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="mono up" style={{ fontSize: 10.5, color: 'var(--cinnabar)', letterSpacing: '0.26em' }}>刻</span>
                <span className="mono up" style={{ fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.26em' }}>KÀ · TO CARVE A WISH INTO STONE</span>
              </div>
              <h1 className="hero__headline">
                wishes,<br /><em>cut</em> in<br />stone<span className="zh">。</span>
              </h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'end', maxWidth: 620 }}>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.7 }}>
                  § A bead<br />as object,<br />as oath
                </div>
                <p className="serif" style={{ fontSize: 18, lineHeight: 1.45, color: 'var(--fg-2)', fontWeight: 300, letterSpacing: '-0.01em', maxWidth: 520 }}>
                  Twenty-nine one-of-one bracelets, cut from eight named mountains and rung with meaning.
                  Each is a small wish you can wear on your wrist — the way your 奶奶 might have wanted.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/search" className="btn btn--red">Enter the archive →</Link>
              <Link href="/about" className="btn btn--ghost">Read the manifesto</Link>
              <span className="mono" style={{ marginLeft: 8, fontSize: 10.5, color: 'var(--fg-4)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                29 objects · 8 wishes · 1-of-1
              </span>
            </div>
          </div>

          {/* Right — product stage */}
          <div className="hero__stage-img">
            <img src="/products_sq/p10_hero.png" alt="S1·10 Shuǐ · agarwood + jade" />
            <div className="caption-zh">水</div>

            <svg className="crop-mark" style={{ top: 18, left: 18 }} viewBox="0 0 18 18">
              <path d="M0 6 L0 0 L6 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="crop-mark" style={{ top: 18, right: 18 }} viewBox="0 0 18 18">
              <path d="M12 0 L18 0 L18 6" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="crop-mark" style={{ bottom: 18, left: 18 }} viewBox="0 0 18 18">
              <path d="M0 12 L0 18 L6 18" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>

            <div className="spec-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>
                <span className="mono up" style={{ fontSize: 10.5, color: 'var(--cinnabar)', letterSpacing: '0.22em' }}>FEATURED OBJECT</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--fg-3)', letterSpacing: '0.18em' }}>{hero.series}</span>
              </div>
              <dl style={{ margin: 0 }}>
                <div className="row"><dt>Name</dt><dd>{hero.name} · {hero.zh}</dd></div>
                <div className="row"><dt>Wish</dt><dd>{hero.wish}</dd></div>
                <div className="row"><dt>Stone</dt><dd>{hero.stones.join(' + ')}</dd></div>
                <div className="row"><dt>Ø</dt><dd>{hero.diameter} · {hero.beads} beads</dd></div>
                <div className="row"><dt>Lot</dt><dd>{hero.lot}</dd></div>
              </dl>
            </div>
          </div>
        </div>

        {/* Quote rail */}
        <div className="hero__featured-rail">
          <div className="label">… 奶奶's maxim</div>
          <div className="quote">"A small stone on the wrist keeps a large wish in the heart."</div>
          <div className="meta">Season One · 29 / 29</div>
        </div>

        {/* Ticker */}
        <div className="hero__ticker-bar">
          <div className="hero__readout">
            <span><strong>刻线</strong> · KPCTY</span>
            <span><strong>韩巷</strong> · BROOKLYN</span>
            <span><strong>SIG.</strong> 0x9F·KPC·S1</span>
          </div>
          <div style={{ textAlign: 'center' }}>ONE-OF-ONE · CERTIFIED · ETHICALLY SOURCED · CORD-STRUNG BY HAND</div>
          <div style={{ textAlign: 'right' }}>↓ SCROLL TO INDEX</div>
        </div>
      </section>

      <MarqueeBar />

      {/* ── MANIFESTO § 01 ───────────────────────────────────────────── */}
      <section className="kpcty-container" style={{ padding: '80px 0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
          <div>
            <div className="mono up" style={{ fontSize: 11, color: 'var(--fg-3)' }}>§ 01 · Premise</div>
            <div className="brush" style={{ marginTop: 14 }} />
          </div>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(48px,6vw,92px)', marginBottom: 24, color: 'var(--fg)' }}>
              Every piece is a{' '}
              <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>small wish</em>
              <br />strung onto your wrist.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 36 }}>
              <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, color: 'var(--fg-2)' }}>
                In Chinese tradition, every stone carries a{' '}
                <em style={{ color: 'var(--fg)' }}>寄托 (jìtuō)</em> — a specific hope you place in it.
                Luck, love, calm, courage, the rent on time. Nothing vague. Nothing cute.
              </p>
              <p className="serif" style={{ fontSize: 20, lineHeight: 1.4, color: 'var(--fg-2)' }}>
                Our 29 pieces are sorted by intention, not trend. Pick one for the mood you&apos;re in,
                the friend you want to be, or the season of your life. Wear it like a reminder note
                you don&apos;t have to read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTENTIONS INDEX § 02 ────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--line)', marginTop: 72 }}>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 02 / INTENTIONS</div>
            <h2 className="sec-head__title">
              Pick a <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>hope</em> to carry.
            </h2>
            <div className="sec-head__meta">8 INTENTIONS<br />ONE PER WRIST</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {KPCTY_INTENTIONS.map((intn, i) => {
            const sample = KPCTY_PRODUCTS.find((p) => intn.ids.includes(p.id));
            return (
              <Link
                key={intn.key}
                href={sample ? `/product/${sample.handle}` : '/search'}
                className="lift"
                style={{
                  padding: '28px 24px',
                  borderRight:  i % 4 !== 3 ? '1px solid var(--line)' : 'none',
                  borderBottom: i < 4        ? '1px solid var(--line)' : 'none',
                  borderTop: '1px solid var(--line)',
                  minHeight: 360,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  textDecoration: 'none', color: 'inherit',
                  background: 'var(--bg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--cinnabar)' }}>
                      § {String(i + 1).padStart(2, '0')} · {intn.key}
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', letterSpacing: '0.1em', marginTop: 3 }}>
                      {intn.ids.length} PIECES · {intn.pinyin.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'Noto Serif SC, serif', fontSize: 72, fontWeight: 700, lineHeight: 0.9, color: 'var(--cinnabar)', opacity: 0.7 }}>
                    {intn.zh}
                  </div>
                </div>
                {sample && (
                  <div style={{ aspectRatio: '16/9', background: 'var(--bg-2)', overflow: 'hidden', margin: '14px 0' }}>
                    <img
                      src={`/products_sq/${sample.img}.png`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.9) contrast(1.08)' }}
                      alt={intn.key}
                    />
                  </div>
                )}
                <p className="serif" style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--fg-2)' }}>{intn.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── SEASON DROP GRID § 03 ────────────────────────────────────── */}
      <section>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 03 / SEASON ONE</div>
            <h2 className="sec-head__title">
              The Drop — <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>一新</em>
            </h2>
            <div className="sec-head__meta">29 PIECES<br />LAST UPDATED 04·21·26</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderTop: '1px solid var(--line)' }}>
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div className="kpcty-container" style={{ padding: '28px 0 80px', textAlign: 'center' }}>
          <Link href="/search" className="btn btn--ghost">Browse all 29 pieces →</Link>
        </div>
      </section>

      {/* ── RITUAL § 04 ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '120px 0' }}>
        <div className="kpcty-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="mono up" style={{ fontSize: 11, color: 'var(--cinnabar)', opacity: 0.8 }}>§ 04 · Ritual</div>
            <h2 className="display" style={{ fontSize: 'clamp(56px,8vw,140px)', marginTop: 20, marginBottom: 28, color: 'var(--fg)' }}>
              A bead is a<br />
              <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>small place</em>
              <br />to put<br />a thought.
            </h2>
            <p className="serif" style={{ fontSize: 22, lineHeight: 1.4, maxWidth: '42ch', color: 'var(--fg-2)' }}>
              Before prayer counters and before worry stones, there were mala strings —
              108 repetitions, one per bead. We kept that rhythm and lost the seriousness.
            </p>
            <div style={{ display: 'flex', gap: 20, marginTop: 40 }}>
              <div className="label-box">
                METHOD 01<br />Run three beads through your fingers before you open Instagram.
              </div>
              <div className="label-box">
                METHOD 02<br />Set down every bracelet at night. Pick up a different one Monday.
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4' }}>
            <img
              src="/products_tall/p15.png"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.85) contrast(1.1)' }}
              alt="ritual"
            />
            <div
              style={{
                position: 'absolute', top: -20, right: -20,
                background: 'var(--cinnabar)',
                padding: '20px 24px',
                fontFamily: 'Noto Serif SC, serif',
                fontSize: 28, fontWeight: 600,
                color: 'var(--fg)',
                transform: 'rotate(3deg)',
              }}
            >
              一石一愿
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS STRIP § 05 ───────────────────────────────────── */}
      <section>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 05 / COLLECTIONS</div>
            <h2 className="sec-head__title">
              By material — <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>材质</em>
            </h2>
            <div className="sec-head__meta">5 FAMILIES</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          {KPCTY_COLLECTIONS.map((c, i) => {
            const sample = KPCTY_PRODUCTS.find((p) => p.collection === c.id);
            return (
              <Link
                key={c.id}
                href="/search"
                className="lift"
                style={{
                  padding: '28px 24px',
                  borderRight: i < 4 ? '1px solid var(--line)' : 'none',
                  display: 'flex', flexDirection: 'column', gap: 20,
                  minHeight: 360, justifyContent: 'space-between',
                  textDecoration: 'none', color: 'inherit',
                }}
              >
                <div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.12em' }}>
                    0{i + 1} · {c.count} PIECES
                  </div>
                  <div className="serif" style={{ fontSize: 36, marginTop: 8, color: 'var(--fg)' }}>{c.name}</div>
                  <div className="serif-sc" style={{ fontSize: 14, color: 'var(--cinnabar)', letterSpacing: '0.1em', marginTop: 2 }}>{c.zh}</div>
                </div>
                <div style={{ aspectRatio: '1', background: 'var(--bg-2)', overflow: 'hidden' }}>
                  {sample && (
                    <img
                      src={`/products_sq/${sample.img}.png`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.9) contrast(1.05)' }}
                      alt={c.name}
                    />
                  )}
                </div>
                <p className="serif" style={{ fontSize: 15, lineHeight: 1.45, color: 'var(--fg-2)' }}>{c.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── PRESS QUOTE ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-1)', padding: '80px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="kpcty-container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 60, alignItems: 'center' }}>
          <div className="serif" style={{ fontSize: 160, lineHeight: 0.8, color: 'var(--cinnabar)', opacity: 0.6 }}>"</div>
          <div>
            <p className="serif" style={{ fontSize: 'clamp(28px,3.5vw,48px)', lineHeight: 1.25, color: 'var(--fg)' }}>
              It's the first jewelry brand that makes my mom text me{' '}
              <em style={{ color: 'var(--cinnabar)' }}>first</em>.
            </p>
            <div className="mono up" style={{ fontSize: 11, marginTop: 22, color: 'var(--fg-3)' }}>
              — J. LIN · AUDIENCE OF ONE NEWSLETTER
            </div>
          </div>
          <div className="vert-zh serif-sc" style={{ fontSize: 26, color: 'var(--cinnabar)', opacity: 0.5 }}>语语</div>
        </div>
      </section>

      {/* ── NEWSLETTER § 06 ──────────────────────────────────────────── */}
      <section className="kpcty-container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="mono up" style={{ fontSize: 11, color: 'var(--fg-3)' }}>§ 06 · Subscribe</div>
        <h2 className="display" style={{ fontSize: 'clamp(56px,8vw,140px)', marginTop: 12, marginBottom: 20, color: 'var(--fg)' }}>
          Letters from the{' '}
          <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>workshop.</em>
        </h2>
        <p className="serif" style={{ fontSize: 22, maxWidth: '54ch', margin: '0 auto 40px', lineHeight: 1.4, color: 'var(--fg-2)' }}>
          One stone, one story, once a month. No promo spam.
        </p>
        <NewsletterForm />
      </section>

      <Footer />
    </div>
  );
}
