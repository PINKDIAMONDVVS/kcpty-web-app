import Footer from "components/layout/footer";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About · 关于",
  description:
    "KPCTY is a jewelry studio that restrings the oldest material culture in the Chinese world for a generation that never knew it was missing them.",
};

const TIMELINE = [
  {
    y: "618",
    t: "Tang Dynasty",
    d: "Imperial scholars start stringing agarwood prayer beads as an alternative to heavier amber malas.",
  },
  {
    y: "1368",
    t: "Ming",
    d: "Beads move from temples to desks — worn by poets, merchants, and officials during long meetings.",
  },
  {
    y: "1949–",
    t: "Out of fashion",
    d: "Considered old-fashioned. Grandmothers quietly keep wearing them anyway.",
  },
  {
    y: "2022",
    t: "Our founder",
    d: "Ken (施豪居) inherits a strand from his grandfather, wears it on a Philadelphia subway, and gets 14 DMs that week.",
  },
  {
    y: "2026",
    t: "Season One",
    d: "Spiritual gemstone bracelets, cut in Suzhou, knotted in Philadelphia. Which is where you came in.",
  },
];

const PRINCIPLES = [
  {
    n: "一",
    p: "YĪ · ONE",
    t: "Every stone is named.",
    d: 'We can tell you which village in Xinjiang the jade came from, which forest grew the agarwood, and who strung it. No "responsibly sourced" fog language. Names or nothing.',
  },
  {
    n: "二",
    p: "ÈR · TWO",
    t: "No drop is restocked.",
    d: "Once S1-14 is gone, she is gone. We'd rather sell out than repeat ourselves. Beads are material; people are unique; new drops deserve new material.",
  },
  {
    n: "三",
    p: "SĀN · THREE",
    t: "Built to be re-strung.",
    d: "Silk stretches with wear — that's the material being honest. Bring your KPCTY back any season and we'll re-cord it as a paid service. A cheap thread would be the whole brand's problem.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-wrap">
        {/* ── Intro ── */}
        <section style={{ borderBottom: "1px solid var(--line)" }}>
          <div className="kpcty-container about-intro">
            <div>
              <div className="mono up" style={{ fontSize: 11, opacity: 0.55 }}>
                § About · 关于
              </div>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(72px,10vw,180px)",
                  lineHeight: 0.88,
                  marginTop: 16,
                }}
              >
                Not a<br />
                brand, a<br />
                <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                  method.
                </em>
              </h1>
              <div className="brush" style={{ width: 180, marginTop: 26 }} />
            </div>
            <div style={{ alignSelf: "end" }}>
              <p
                className="serif"
                style={{ fontSize: 24, lineHeight: 1.35, marginBottom: 24 }}
              >
                KPCTY (刻瓷 · kè xiàn · "carved line") is a jewelry studio that
                restrings the oldest material culture in the Chinese world —{" "}
                <em style={{ color: "var(--cinnabar)" }}>beads for thinking</em>{" "}
                — for a generation that never knew it was missing them.
              </p>
              <p
                className="serif"
                style={{ fontSize: 18, lineHeight: 1.5, opacity: 0.8 }}
              >
                We aren't trying to be an Asian version of anything. We aren't
                trying to go viral. We're trying to make pieces that your
                friends ask about and your grandmother nods at.
              </p>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section style={{ background: "var(--bg)", padding: "100px 0" }}>
          <div className="kpcty-container">
            <div
              className="mono up"
              style={{
                fontSize: 11,
                opacity: 0.5,
                color: "var(--cinnabar)",
                marginBottom: 14,
              }}
            >
              § How we got here
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px,7vw,120px)",
                marginBottom: 60,
                lineHeight: 0.95,
              }}
            >
              A{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                slow
              </em>{" "}
              timeline.
            </h2>
            <div className="about-timeline">
              {TIMELINE.map((e, i) => (
                <div
                  key={i}
                  style={{
                    padding: "32px 20px",
                    borderRight: i < 4 ? "1px solid var(--line)" : "none",
                    borderTop: "1px solid var(--line)",
                    borderBottom: "1px solid var(--line)",
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--cinnabar)",
                    }}
                  >
                    YEAR · {e.y}
                  </div>
                  <div>
                    <div
                      className="serif"
                      style={{ fontSize: 28, marginBottom: 10 }}
                    >
                      {e.t}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.8 }}>
                      {e.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="kpcty-container" style={{ padding: "100px 0" }}>
          <div className="sec-head" style={{ paddingTop: 0 }}>
            <div className="sec-head__num">§ Principles · 三则</div>
            <h2 className="display sec-head__title">
              Three{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                rules
              </em>
              .
            </h2>
            <div className="sec-head__meta">NON-NEGOTIABLE</div>
          </div>
          <div className="about-values">
            {PRINCIPLES.map((v, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 2 ? "1px solid var(--line)" : "none",
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ghost numeral */}
                <div
                  className="serif-sc"
                  style={{
                    fontSize: 120,
                    lineHeight: 1,
                    color: "var(--bg-3)",
                    position: "absolute",
                    top: 10,
                    right: 20,
                    fontWeight: 600,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {v.n}
                </div>
                <div
                  className="mono up"
                  style={{
                    fontSize: 11,
                    color: "var(--cinnabar)",
                    letterSpacing: "0.18em",
                    marginBottom: 12,
                    position: "relative",
                  }}
                >
                  {v.p}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 32,
                    lineHeight: 1.1,
                    marginBottom: 18,
                    position: "relative",
                  }}
                >
                  {v.t}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    position: "relative",
                    color: "var(--fg-2)",
                  }}
                >
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Founder letter ── */}
        <section
          style={{
            background: "var(--bg-2)",
            padding: "100px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="kpcty-container about-founder">
            {/* Left: portrait + label */}
            <div>
              <div
                style={{
                  aspectRatio: "3/4",
                  background: "var(--bg-3)",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                <Image
                  src="/products_tall/p12.jpg"
                  alt="Ken Shi, founder"
                  width={480}
                  height={640}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div className="label-box">
                <strong>KEN SHI (施豪居)</strong>
                <br />
                Founder · Strung, and writes the letters
                <br />
                Philadelphia, PA × Suzhou, CN
              </div>
            </div>

            {/* Right: letter */}
            <div>
              <div
                className="mono up"
                style={{ fontSize: 11, opacity: 0.55, marginBottom: 14 }}
              >
                § Letter from the founder
              </div>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(36px,4.5vw,80px)",
                  lineHeight: 1,
                  marginBottom: 32,
                }}
              >
                "Everyone in my family had beads on their wrist. I thought it
                was{" "}
                <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                  corny
                </em>
                . Until I didn't."
              </h2>
              <div
                className="about-letter-body"
                style={{
                  columns: 2,
                  columnGap: 40,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--fg-2)",
                }}
              >
                <p style={{ marginBottom: 14 }}>
                  I was 11 when my grandfather gave me a strand of sandalwood
                  beads. I wore it once, for a picture, and left it in a drawer
                  until 2022, when he passed.
                </p>
                <p style={{ marginBottom: 14 }}>
                  Cleaning out his desk I found his — smooth as a plum pit, dark
                  as pine-tar. He had rubbed fourteen years of worry into them.
                  I put his on my left wrist and mine on my right, and they
                  didn't match, and that felt right.
                </p>
                <p style={{ marginBottom: 14 }}>
                  KPCTY started with one question: why did I have to be 31
                  before anyone my age wore this? The stones are good. The
                  stories are great. The only thing wrong was the{" "}
                  <em>packaging</em>.
                </p>
                <p>So we redid the packaging. We left the stones alone.</p>
              </div>
              <div
                className="serif"
                style={{
                  fontSize: 40,
                  marginTop: 40,
                  color: "var(--cinnabar)",
                }}
              >
                — Ken
              </div>
            </div>
          </div>
        </section>

        {/* ── Press ── */}
        <section
          className="kpcty-container"
          style={{ padding: "60px 0", textAlign: "center" }}
        >
          <div
            className="mono up"
            style={{
              fontSize: 11,
              opacity: 0.5,
              letterSpacing: "0.18em",
              marginBottom: 24,
            }}
          >
            As featured in · 媒体
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: 0.6,
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {[
              "NEW YORK TIMES",
              "VOGUE CHINA",
              "SSENSE",
              "HYPEBEAST",
              "THE CUT",
              "AIR MAIL",
            ].map((p) => (
              <div
                key={p}
                className="serif"
                style={{ fontSize: 24, letterSpacing: "0.05em" }}
              >
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: "var(--bg)",
            padding: "80px 0",
            textAlign: "center",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div className="kpcty-container">
            <div
              className="serif-sc"
              style={{
                fontSize: 22,
                color: "var(--cinnabar)",
                letterSpacing: "0.3em",
                marginBottom: 12,
              }}
            >
              请·进来
            </div>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px,8vw,140px)",
                lineHeight: 0.9,
                marginBottom: 28,
              }}
            >
              Help yourself,{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                friend.
              </em>
            </h2>
            <Link
              href="/search"
              className="btn btn--red"
              style={{ padding: "22px 44px" }}
            >
              Enter the shop →
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
