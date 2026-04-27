import { HudClock } from "components/home/hud-clock";
import { MarqueeBar } from "components/home/marquee-bar";
import { NewsletterForm } from "components/home/newsletter-form";
import { ProductCard } from "components/home/product-card";
import Footer from "components/layout/footer";
import { KPCTY_PRODUCTS } from "lib/data/kpcty-data";
import { parseList, resolveIntent } from "lib/intents";
import { resolveMaterial } from "lib/materials";
import { getProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";

type FacetCard = {
  key: string; // lowercase canonical key for URL
  label: string; // display label (preserves original Shopify casing)
  zh: string;
  pinyin: string;
  desc: string;
  count: number;
  sample: Product | null;
};

/* Aggregate a list-type product metafield into facet cards:
 * - groups products by normalized value
 * - assigns unique sample images greedily (rarest facets pick first)
 * - resolves zh/pinyin/desc through the given resolver
 * Shared by both Intents (§02) and Materials (§05). */
function aggregateFacet(
  products: Product[],
  pickValues: (p: Product) => string[],
  resolve: (raw: string) => { zh: string; pinyin: string; desc: string },
): FacetCard[] {
  const byKey = new Map<string, Product[]>();
  const originalCase = new Map<string, string>();

  for (const p of products) {
    for (const v of pickValues(p)) {
      const key = v.trim().toLowerCase();
      if (!key) continue;
      if (!byKey.has(key)) {
        byKey.set(key, []);
        originalCase.set(key, v.trim());
      }
      byKey.get(key)!.push(p);
    }
  }

  const sortedKeys = Array.from(byKey.keys()).sort(
    (a, b) => byKey.get(a)!.length - byKey.get(b)!.length,
  );

  const used = new Set<string>();
  const samples = new Map<string, Product | null>();

  for (const key of sortedKeys) {
    const candidates = byKey.get(key)!;
    const unique = candidates.find((p) => !used.has(p.id));
    const chosen = unique ?? candidates[0] ?? null;
    samples.set(key, chosen);
    if (chosen) used.add(chosen.id);
  }

  return Array.from(byKey.entries())
    .map(([key, ps]) => {
      const { zh, pinyin, desc } = resolve(key);
      return {
        key,
        label: originalCase.get(key) ?? key,
        zh,
        pinyin,
        desc,
        count: ps.length,
        sample: samples.get(key) ?? null,
      };
    })
    .sort((a, b) => b.count - a.count);
}

const aggregateIntents = (products: Product[]) =>
  aggregateFacet(products, (p) => parseList(p.intents?.value), resolveIntent);
const aggregateMaterials = (products: Product[]) =>
  aggregateFacet(
    products,
    (p) => parseList(p.materials?.value),
    resolveMaterial,
  );

export const metadata = {
  title: "KPCTY — Wishes, Cut in Stone",
  description:
    "Spiritual gemstone bracelets, cut from eight named mountains and rung with meaning.",
  openGraph: { type: "website" },
};

const hero = KPCTY_PRODUCTS[9]!;

export default async function HomePage() {
  const shopifyProducts = await getProducts({});
  const intents = aggregateIntents(shopifyProducts);
  const materials = aggregateMaterials(shopifyProducts);

  /* Newest 5 products — sorted by updatedAt descending. */
  const newest = [...shopifyProducts]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  const latestUpdate = newest[0]?.updatedAt
    ? new Date(newest[0].updatedAt)
    : null;
  const latestUpdateLabel = latestUpdate
    ? `${String(latestUpdate.getMonth() + 1).padStart(2, "0")}·${String(latestUpdate.getDate()).padStart(2, "0")}·${String(latestUpdate.getFullYear()).slice(-2)}`
    : "";

  return (
    <div className="page-wrap">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__stage">
          {/* Left — typography */}
          <div className="hero__type">
            <div className="hero__kicker">
              <span className="tag">
                <span className="dot" style={{ marginRight: 6 }} />
                S1 / 2026 · LIVE
              </span>
              <span className="bar" />
              <HudClock />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span
                  className="mono up"
                  style={{
                    fontSize: 10.5,
                    color: "var(--cinnabar)",
                    letterSpacing: "0.26em",
                  }}
                >
                  刻
                </span>
                <span
                  className="mono up"
                  style={{
                    fontSize: 10.5,
                    color: "var(--fg-3)",
                    letterSpacing: "0.26em",
                  }}
                >
                  KÀ · TO CARVE A WISH INTO STONE
                </span>
              </div>
              <h1 className="hero__headline">
                wishes,
                <br />
                <em>cut</em> in
                <br />
                stone<span className="zh">。</span>
              </h1>
              <div className="hero__sub">
                <div
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    color: "var(--fg-3)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    lineHeight: 1.7,
                  }}
                >
                  § A bead
                  <br />
                  as object,
                  <br />
                  as oath
                </div>
                <p
                  className="serif"
                  style={{
                    fontSize: 18,
                    lineHeight: 1.45,
                    color: "var(--fg-2)",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                    maxWidth: 520,
                  }}
                >
                  Spiritual gemstone bracelets, cut from eight named mountains
                  and rung with meaning. Each is a small wish you can wear on
                  your wrist.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/search" className="btn btn--red">
                Enter the archive →
              </Link>
              <Link href="/about" className="btn btn--ghost">
                Read the manifesto
              </Link>
              {/* <span
                className="mono"
                style={{
                  marginLeft: 8,
                  fontSize: 10.5,
                  color: "var(--fg-4)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                29 objects · 8 wishes · 1-of-1
              </span> */}
            </div>
          </div>

          {/* Right — product stage */}
          <div className="hero__stage-img">
            <img
              src="/products_sq/p10_hero.jpg"
              alt="S1·10 Shuǐ · agarwood + jade"
            />
            <div className="caption-zh">水</div>

            <svg
              className="crop-mark"
              style={{ top: 18, left: 18 }}
              viewBox="0 0 18 18"
            >
              <path
                d="M0 6 L0 0 L6 0"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <svg
              className="crop-mark"
              style={{ top: 18, right: 18 }}
              viewBox="0 0 18 18"
            >
              <path
                d="M12 0 L18 0 L18 6"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <svg
              className="crop-mark"
              style={{ bottom: 18, left: 18 }}
              viewBox="0 0 18 18"
            >
              <path
                d="M0 12 L0 18 L6 18"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            <div className="spec-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span
                  className="mono up"
                  style={{
                    fontSize: 10.5,
                    color: "var(--cinnabar)",
                    letterSpacing: "0.22em",
                  }}
                >
                  FEATURED OBJECT
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    color: "var(--fg-3)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {hero.series}
                </span>
              </div>
              <dl style={{ margin: 0 }}>
                <div className="row">
                  <dt>Name</dt>
                  <dd>
                    {hero.name} · {hero.zh}
                  </dd>
                </div>
                <div className="row">
                  <dt>Wish</dt>
                  <dd>{hero.wish}</dd>
                </div>
                <div className="row">
                  <dt>Stone</dt>
                  <dd>{hero.stones.join(" + ")}</dd>
                </div>
                <div className="row">
                  <dt>Ø</dt>
                  <dd>
                    {hero.diameter} · {hero.beads} beads
                  </dd>
                </div>
                <div className="row">
                  <dt>Lot</dt>
                  <dd>{hero.lot}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Quote rail */}
        <div className="hero__featured-rail">
          <div className="label">… Grandma's maxim</div>
          <div className="quote">
            "A small stone on the wrist keeps a large wish in the heart."
          </div>
          <div className="meta">Season One · Summer 2026</div>
        </div>

        {/* Ticker */}
        <div className="hero__ticker-bar">
          <div className="hero__readout">
            <span>
              <strong></strong> · KPCTY
            </span>
            <span>
              <strong>韩巷</strong> · Philadelphia
            </span>
            <span>
              <strong>SIG.</strong> 0x9F·KPC·S1
            </span>
          </div>
          <div style={{ textAlign: "center" }}>
            CERTIFIED · ETHICALLY SOURCED · HAND-MADE
          </div>
          <div style={{ textAlign: "right" }}>↓ SCROLL TO INDEX</div>
        </div>
      </section>

      <MarqueeBar />

      {/* ── MANIFESTO § 01 ───────────────────────────────────────────── */}
      <section className="kpcty-container section-pad-lg">
        <div className="premise-grid">
          <div>
            <div
              className="mono up"
              style={{ fontSize: 11, color: "var(--fg-3)" }}
            >
              § 01 · Premise
            </div>
            <div className="brush" style={{ marginTop: 14 }} />
          </div>
          <div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(36px,6vw,92px)",
                marginBottom: 24,
                color: "var(--fg)",
                lineHeight: 0.98,
              }}
            >
              Every piece is a{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                small wish
              </em>
              <br />
              strung onto your wrist.
            </h2>
            <div className="premise-prose">
              <p
                className="serif"
                style={{ fontSize: 18, lineHeight: 1.4, color: "var(--fg-2)" }}
              >
                In Chinese tradition, every stone carries a{" "}
                <em style={{ color: "var(--fg)" }}>寄托 (jìtuō)</em> — a
                specific hope you place in it. Luck, love, calm, courage, the
                rent on time. Nothing vague. Nothing cute.
              </p>
              <p
                className="serif"
                style={{ fontSize: 18, lineHeight: 1.4, color: "var(--fg-2)" }}
              >
                Our bracelets are sorted by intention. Pick one for the mood
                you&apos;re in, the friend you want to be, or the season of your
                life. Wear it like a reminder note you don&apos;t have to read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTENTIONS INDEX § 02 ────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--line)", marginTop: 72 }}>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 02 / INTENTIONS</div>
            <h2 className="sec-head__title">
              Pick a{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                hope
              </em>{" "}
              to carry.
            </h2>
            <div className="sec-head__meta">
              {intents.length} INTENTION{intents.length === 1 ? "" : "S"}
              <br />
              ONE PER WRIST
            </div>
          </div>
        </div>
        <div className="intent-grid">
          {intents.map((intn, i) => (
            <Link
              key={intn.key}
              href={`/search?intent=${encodeURIComponent(intn.key)}`}
              className="lift"
              style={{
                padding: "28px 24px",
                borderRight: i % 4 !== 3 ? "1px solid var(--line)" : "none",
                borderBottom: "1px solid var(--line)",
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "inherit",
                background: "var(--bg)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: "var(--cinnabar)",
                    }}
                  >
                    § {String(i + 1).padStart(2, "0")} · {intn.label}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--fg-4)",
                      letterSpacing: "0.1em",
                      marginTop: 3,
                    }}
                  >
                    {intn.count} PIECE{intn.count === 1 ? "" : "S"}
                    {intn.pinyin ? ` · ${intn.pinyin.toUpperCase()}` : ""}
                  </div>
                </div>
                {intn.zh && (
                  <div
                    style={{
                      fontFamily: "Noto Serif SC, serif",
                      fontSize: 72,
                      fontWeight: 700,
                      lineHeight: 0.9,
                      color: "var(--cinnabar)",
                      opacity: 0.7,
                    }}
                  >
                    {intn.zh}
                  </div>
                )}
              </div>
              {intn.sample?.featuredImage?.url && (
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    background: "var(--bg-2)",
                    overflow: "hidden",
                    margin: "14px 0",
                  }}
                >
                  <Image
                    src={intn.sample.featuredImage.url}
                    alt={intn.sample.featuredImage.altText || intn.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{
                      objectFit: "cover",
                      filter: "brightness(.9) contrast(1.08)",
                    }}
                  />
                </div>
              )}
              <p
                className="serif"
                style={{ fontSize: 15, lineHeight: 1.5, color: "var(--fg-2)" }}
              >
                {intn.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SEASON DROP GRID § 03 ────────────────────────────────────── */}
      <section>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 03 / SEASON ONE</div>
            <h2 className="sec-head__title">
              New Arrivals —{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                新品
              </em>
            </h2>
            {/* <div className="sec-head__meta">
              {shopifyProducts.length} PIECE
              {shopifyProducts.length === 1 ? "" : "S"}
              {latestUpdateLabel && (
                <>
                  <br />
                  LAST UPDATED {latestUpdateLabel}
                </>
              )}
            </div> */}
          </div>
        </div>
        <div className="season-grid">
          {newest.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <div
          className="kpcty-container"
          style={{ padding: "28px 0 80px", textAlign: "center" }}
        >
          <Link href="/search" className="btn btn--ghost">
            Browse all {shopifyProducts.length} piece
            {shopifyProducts.length === 1 ? "" : "s"} →
          </Link>
        </div>
      </section>

      {/* ── RITUAL § 04 ──────────────────────────────────────────────── */}
      <section
        className="section-pad-xl"
        style={{
          background: "var(--bg-1)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="kpcty-container ritual-grid">
          <div>
            <div
              className="mono up"
              style={{ fontSize: 11, color: "var(--cinnabar)", opacity: 0.8 }}
            >
              § 04 · Ritual
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(44px,8vw,140px)",
                marginTop: 20,
                marginBottom: 28,
                color: "var(--fg)",
                lineHeight: 0.95,
              }}
            >
              A bead is a<br />
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                small place
              </em>
              <br />
              to put
              <br />a thought.
            </h2>
            <p
              className="serif"
              style={{
                fontSize: 20,
                lineHeight: 1.4,
                maxWidth: "42ch",
                color: "var(--fg-2)",
              }}
            >
              Before prayer counters and before worry stones, there were mala
              strings — 108 repetitions, one per bead. We kept that rhythm and
              lost the seriousness.
            </p>
            <div className="ritual-methods">
              <div className="label-box">
                METHOD 01
                <br />
                Run three beads through your fingers before you open Instagram.
              </div>
              <div className="label-box">
                METHOD 02
                <br />
                Set down every bracelet at night. Pick up a different one
                Monday.
              </div>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "3/4" }}>
            <img
              src="/products_tall/p15.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(.85) contrast(1.1)",
              }}
              alt="ritual"
            />
            <div className="ritual-stamp">一石一愿</div>
          </div>
        </div>
      </section>

      {/* ── MATERIALS § 05 ──────────────────────────────────────────── */}
      <section>
        <div className="kpcty-container">
          <div className="sec-head">
            <div className="sec-head__num">§ 05 / COLLECTIONS</div>
            <h2 className="sec-head__title">
              By material —{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                材质
              </em>
            </h2>
            <div className="sec-head__meta">
              {materials.length}{" "}
              {materials.length === 1 ? "FAMILY" : "FAMILIES"}
            </div>
          </div>
        </div>
        <div className="material-grid">
          {materials.map((m) => (
            <Link
              key={m.key}
              href={`/search?material=${encodeURIComponent(m.key)}`}
              className="material-chip"
            >
              <div className="material-chip__img">
                {m.sample?.featuredImage?.url ? (
                  <Image
                    src={m.sample.featuredImage.url}
                    alt={m.sample.featuredImage.altText || m.label}
                    fill
                    sizes="72px"
                    style={{
                      objectFit: "cover",
                      filter: "brightness(.9) contrast(1.05)",
                    }}
                  />
                ) : (
                  m.zh && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Noto Serif SC, serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "var(--cinnabar)",
                      }}
                    >
                      {m.zh}
                    </span>
                  )
                )}
              </div>
              <div className="material-chip__body">
                <div className="material-chip__label">{m.label}</div>
                <div className="material-chip__meta">
                  {m.count} {m.count === 1 ? "piece" : "pieces"}
                  {m.pinyin ? ` · ${m.pinyin}` : ""}
                </div>
              </div>
              {m.zh && <div className="material-chip__seal">{m.zh}</div>}
            </Link>
          ))}
        </div>
      </section>

      {/* ── PRESS QUOTE ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--bg-1)",
          padding: "80px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="kpcty-container press-quote">
          <div
            className="press-quote__mark serif"
            style={{
              lineHeight: 0.8,
              color: "var(--cinnabar)",
              opacity: 0.6,
            }}
          >
            "
          </div>
          <div>
            <p
              className="serif"
              style={{
                fontSize: "clamp(22px,3.5vw,48px)",
                lineHeight: 1.25,
                color: "var(--fg)",
              }}
            >
              Quiet, beautiful, and weightier than it looks — 
              <em style={{ color: "var(--cinnabar)" }}> in every sense</em>.
            </p>
            <div
              className="mono up"
              style={{ fontSize: 11, marginTop: 22, color: "var(--fg-3)" }}
            >
              — J. LIN · AUDIENCE OF ONE NEWSLETTER
            </div>
          </div>
          <div
            className="vert-zh serif-sc press-quote__side"
            style={{ fontSize: 26, color: "var(--cinnabar)", opacity: 0.5 }}
          >
            评语
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER § 06 ──────────────────────────────────────────── */}
      <section
        className="kpcty-container section-pad-xl"
        style={{ textAlign: "center" }}
      >
        <div className="mono up" style={{ fontSize: 11, color: "var(--fg-3)" }}>
          § 06 · Subscribe
        </div>
        <h2
          className="display"
          style={{
            fontSize: "clamp(40px,8vw,140px)",
            marginTop: 12,
            marginBottom: 20,
            color: "var(--fg)",
            lineHeight: 0.95,
          }}
        >
          Letters from the{" "}
          <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
            workshop.
          </em>
        </h2>
        <p
          className="serif"
          style={{
            fontSize: 19,
            maxWidth: "54ch",
            margin: "0 auto 40px",
            lineHeight: 1.4,
            color: "var(--fg-2)",
          }}
        >
          One stone, one story, once a month. No promo spam.
        </p>
        <NewsletterForm />
      </section>

      <Footer />
    </div>
  );
}
