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
