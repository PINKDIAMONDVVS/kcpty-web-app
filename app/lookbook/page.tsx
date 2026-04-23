import Footer from 'components/layout/footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lookbook · 图册',
  description: 'Issue One — A visual index of Season One on hands, wrists, books and windowsills.',
};

/* ── Editorial grid cell ── */
function LookCell({
  children,
  span = 1,
  row  = 1,
  bg,
  color,
}: {
  children: ReactNode;
  span?:    number;
  row?:     number;
  bg?:      string;
  color?:   string;
}) {
  return (
    <div style={{
      gridColumn:  `span ${span}`,
      gridRow:     `span ${row}`,
      borderRight: '1px solid var(--line)',
      borderBottom:'1px solid var(--line)',
      position:    'relative',
      background:  bg    ?? 'var(--bg-2)',
      color:       color ?? 'var(--fg)',
      overflow:    'hidden',
      minHeight:   240,
    }}>
      {children}
    </div>
  );
}

/* ── Absolute label badge ── */
function Badge({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="abs mono"
      style={{
        background: 'var(--fg)', color: 'var(--bg)',
        padding: '6px 10px', fontSize: 10,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Lookbook image ── */
function LookImg({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ objectFit: 'cover' }}
    />
  );
}

/* ════════════════════════════════════════
   Lookbook page
   ════════════════════════════════════════ */
export default function LookbookPage() {
  return (
    <>
      <div className="page-wrap">

        {/* ── Magazine cover ── */}
        <section style={{ borderBottom: '1px solid var(--line)', padding: '40px 0', background: 'var(--bg-1)' }}>
          <div
            className="kpcty-container look-cover"
            style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 40, alignItems: 'center' }}
          >
            {/* Vertical issue label */}
            <div
              className="mono up look-cover-side"
              style={{ fontSize: 11, opacity: 0.6, writingMode: 'vertical-rl', letterSpacing: '0.2em' }}
            >
              ISSUE ONE · 04·2026
            </div>

            {/* Centre title */}
            <div style={{ textAlign: 'center' }}>
              <div className="serif-sc" style={{ fontSize: 18, color: 'var(--cinnabar)', letterSpacing: '0.4em' }}>
                刻线图册
              </div>
              <h1 className="display" style={{ fontSize: 'clamp(80px,13vw,220px)', lineHeight: 0.85, margin: '6px 0' }}>
                Lookbook<span style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>.</span>
              </h1>
              <div className="mono up" style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.28em' }}>
                ART DIR. K. SHI · PHOTO. 刻线 WORKSHOP · PRINTED ON RICE PAPER
              </div>
            </div>

            {/* Right caption */}
            <div className="serif look-cover-side" style={{ fontSize: 18, textAlign: 'right', maxWidth: 220, lineHeight: 1.3 }}>
              <em>A visual index</em> of S1 on hands, wrists, books and windowsills.
            </div>
          </div>
        </section>

        {/* ── Editorial grid ── */}
        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <div
            className="look-editorial"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridAutoRows: 'minmax(200px, auto)',
            }}
          >
            {/* ROW A ──────────────────────────── */}
            <LookCell span={3} row={2}>
              <LookImg src="/products_tall/p10.jpg" alt="Season One plate 01" />
              <Badge style={{ top: 16, left: 16 }}>PLATE 01 · S1–10</Badge>
            </LookCell>

            <LookCell span={3} row={1} bg="var(--bg)" color="var(--fg)">
              <div style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="mono up" style={{ fontSize: 10, opacity: 0.55, color: 'var(--cinnabar)' }}>§ COVER STORY</div>
                <h2 className="display" style={{ fontSize: 'clamp(36px,4vw,56px)', lineHeight: 0.95 }}>
                  Old gods,<br /><em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>new group chats.</em>
                </h2>
              </div>
            </LookCell>

            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p5.jpg" alt="Season One piece 05" />
            </LookCell>

            <LookCell span={1} row={1} bg="var(--cinnabar)" color="var(--fg)">
              <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div className="serif-sc" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1 }}>春</div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', marginTop: 10, opacity: 0.9 }}>SPRING · 春</div>
              </div>
            </LookCell>

            {/* ROW B ──────────────────────────── */}
            <LookCell span={2} row={2}>
              <LookImg src="/products_sq/p20.jpg" alt="Season One plate 02 — Tianhe stone" />
              <Badge style={{ bottom: 16, left: 16 }}>PLATE 02 · TIANHE STONE</Badge>
            </LookCell>

            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p15.jpg" alt="Season One piece 15" />
            </LookCell>

            <LookCell span={2} row={1} bg="var(--bg-2)">
              <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div
                  className="vert-zh serif-sc"
                  style={{ fontSize: 22, color: 'var(--cinnabar)', alignSelf: 'flex-start', marginBottom: 12 }}
                >
                  随笔 · 一
                </div>
                <p className="serif" style={{ fontSize: 19, lineHeight: 1.35 }}>
                  A friend once said: "If I can't remember what I was worrying about, it means I've been{' '}
                  <em style={{ color: 'var(--cinnabar)' }}>working the beads</em> right."
                </p>
              </div>
            </LookCell>

            {/* ROW C ──────────────────────────── */}
            <LookCell span={1} row={1}>
              <LookImg src="/products_sq/p12.jpg" alt="Season One piece 12" />
            </LookCell>

            <LookCell span={2} row={2}>
              <LookImg src="/products_tall/p25.jpg" alt="Season One piece 25" />
            </LookCell>

            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p6.jpg" alt="Season One piece 06" />
            </LookCell>

            <LookCell span={1} row={1} bg="var(--bg)" color="var(--fg)">
              <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', opacity: 0.6 }}>P. 008</div>
                <div className="display" style={{ fontSize: 40, lineHeight: 0.9 }}>
                  养木<br /><em style={{ color: 'var(--cinnabar)', fontStyle: 'italic', fontSize: 20 }}>seasoning</em>
                </div>
              </div>
            </LookCell>

            {/* ROW D ──────────────────────────── */}
            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p2.jpg" alt="Season One piece 02" />
            </LookCell>

            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p8.jpg" alt="Season One piece 08" />
            </LookCell>

            <LookCell span={2} row={1} bg="var(--bg-3)">
              <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="mono up" style={{ fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 10 }}>Footnote</div>
                <p className="serif" style={{ fontSize: 18, lineHeight: 1.35 }}>
                  The <em style={{ color: 'var(--cinnabar)' }}>knot</em> is a technique, not an accident. Every end is
                  finished with a double Chinese button knot (纽棒结) — the same knot scholars used to secure seal cases.
                </p>
              </div>
            </LookCell>

            {/* ROW E ──────────────────────────── */}
            <LookCell span={3} row={2}>
              <LookImg src="/products_tall/p28.jpg" alt="Season One plate 03 — Honey amber" />
              <Badge style={{ top: 16, right: 16 }}>PLATE 03 · HONEY AMBER</Badge>
            </LookCell>

            <LookCell span={3} row={1}>
              <LookImg src="/products_sq/p18.jpg" alt="Season One piece 18" />
            </LookCell>

            <LookCell span={1} row={1} bg="var(--cinnabar)" color="var(--fg)">
              <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div className="serif-sc" style={{ fontSize: 48, fontWeight: 700, lineHeight: 1 }}>夏</div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', marginTop: 10, opacity: 0.9 }}>SUMMER · 夏</div>
              </div>
            </LookCell>

            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p22.jpg" alt="Season One piece 22" />
            </LookCell>

            {/* ROW F ──────────────────────────── */}
            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p3.jpg" alt="Season One piece 03" />
            </LookCell>

            <LookCell span={2} row={2}>
              <LookImg src="/products_tall/p5.jpg" alt="Season One piece 05 tall" />
            </LookCell>

            <LookCell span={2} row={1} bg="var(--bg-2)">
              <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p className="serif" style={{ fontSize: 18, lineHeight: 1.4, marginBottom: 14 }}>
                  <em>"I thought beads were for retired aunties. Now my retired aunties are jealous of mine."</em>
                </p>
                <div className="mono up" style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.14em' }}>— R. CHEN, Brooklyn</div>
              </div>
            </LookCell>

            {/* ROW G ──────────────────────────── */}
            <LookCell span={2} row={1}>
              <LookImg src="/products_sq/p29.jpg" alt="Season One piece 29" />
            </LookCell>

            <LookCell span={1} row={1} bg="var(--bg)" color="var(--fg)">
              <div style={{ padding: 16, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                <div className="mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.16em', textTransform: 'uppercase', lineHeight: 1.5 }}>
                  End<br />of<br />look<br />book.
                </div>
              </div>
            </LookCell>

            <LookCell span={3} row={1} bg="var(--bg-2)">
              <div style={{ padding: 40, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div className="mono up" style={{ fontSize: 10, opacity: 0.55, letterSpacing: '0.16em' }}>Credits</div>
                <div className="display" style={{ fontSize: 44, lineHeight: 0.95 }}>
                  See the <em style={{ color: 'var(--cinnabar)', fontStyle: 'italic' }}>full drop →</em>
                </div>
                <Link href="/search" className="btn btn--red" style={{ alignSelf: 'flex-start' }}>
                  Go to shop
                </Link>
              </div>
            </LookCell>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
