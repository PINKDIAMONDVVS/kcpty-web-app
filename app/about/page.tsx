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
    d: "Spiritual gemstone bracelets, cut in Shanghai, knotted in Philadelphia. Which is where you came in.",
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
              <h1 className="display about-intro__title">
                Not a<br />
                brand, a<br />
                <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                  method.
                </em>
              </h1>
              <div className="brush about-intro__brush" />
            </div>
            <div className="about-intro__body">
              <p className="serif about-intro__lead">
                KPCTY (刻瓷 · kè ci · "carved porcelain") is a jewelry studio
                that restrings the oldest material culture in the Asian world —{" "}
                <em style={{ color: "var(--cinnabar)" }}>beads for thinking</em>{" "}
                — for a generation that never knew it was missing them.
              </p>
              {/* <p className="serif about-intro__sub">
                We aren't trying to be an Asian version of anything. We aren't
                trying to go viral. We're trying to make pieces that your
                friends ask about and your grandmother nods at.
              </p> */}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="about-section about-section--dark">
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
            <h2 className="display about-section__title">
              A{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                slow
              </em>{" "}
              timeline.
            </h2>
            <div className="about-timeline">
              {TIMELINE.map((e) => (
                <div key={e.y} className="about-timeline__cell">
                  <div className="mono about-timeline__year">YEAR · {e.y}</div>
                  <div>
                    <div className="serif about-timeline__title">{e.t}</div>
                    <p className="about-timeline__body">{e.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        {/* <section className="kpcty-container about-section">
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
            {PRINCIPLES.map((v) => (
              <div key={v.n} className="about-values__cell">
                <div className="serif-sc about-values__ghost">{v.n}</div>
                <div className="mono up about-values__pinyin">{v.p}</div>
                <div className="serif about-values__title">{v.t}</div>
                <p className="about-values__body">{v.d}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── Founder letter ── */}
        <section className="about-section about-section--card">
          <div className="kpcty-container about-founder">
            {/* Left: portrait + label */}
            <div>
              <div className="about-founder__portrait">
                <Image
                  src="/products_tall/p12.jpg"
                  alt="Ken Shi, founder"
                  width={480}
                  height={640}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="label-box">
                <strong>KEN SHI (施豪居)</strong>
                <br />
                Founder · Strung, and writes the letters
                <br />
                Philadelphia, PA × Shanghai, CN
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
              <h2 className="display about-founder__pull">
                "Everyone in my family had beads on their wrist. I thought it
                was{" "}
                <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                  corny
                </em>
                . Until I didn't."
              </h2>
              <div className="about-letter-body">
                <p>
                  I was 11 when my grandfather gave me a strand of sandalwood
                  beads. I wore it once, for a picture, and left it in a drawer
                  until 2022, when he passed.
                </p>
                <p>
                  Cleaning out his desk I found his — smooth as a plum pit, dark
                  as pine-tar. He had rubbed fourteen years of worry into them.
                  I put his on my left wrist and mine on my right, and they
                  didn't match, and that felt right.
                </p>
                <p>
                  KPCTY started with one question: why did I have to be 31
                  before anyone my age wore this? The stones are good. The
                  stories are great. The only thing wrong was the{" "}
                  <em>packaging</em>.
                </p>
                <p>So we redid the packaging. We left the stones alone.</p>
              </div>
              <div className="serif about-founder__sig">— Ken</div>
            </div>
          </div>
        </section>

        {/* ── Press ── */}
        {/* <section className="kpcty-container about-press">
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
          <div className="about-press__row">
            {[
              "NEW YORK TIMES",
              "VOGUE CHINA",
              "SSENSE",
              "HYPEBEAST",
              "THE CUT",
              "AIR MAIL",
            ].map((p) => (
              <div key={p} className="serif about-press__name">
                {p}
              </div>
            ))}
          </div>
        </section> */}

        {/* ── CTA ── */}
        <section className="about-cta">
          <div className="kpcty-container">
            <div className="serif-sc about-cta__zh">欢迎光临</div>
            <h2 className="display about-cta__title">
              Help yourself,{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                friend.
              </em>
            </h2>
            <Link href="/search" className="btn btn--red about-cta__btn">
              Enter the shop →
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
