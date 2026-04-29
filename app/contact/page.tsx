import Footer from "components/layout/footer";
import type { Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact · 联系",
  description:
    "Talk to KPCTY studio. Custom strings, repairs, wholesale, press — or just hello. Philadelphia studio, by appointment.",
  alternates: { canonical: "/contact" },
};

const KV_ROWS: [string, string][] = [
  ["Studio", "456 N 5th St · Philadelphia · PA 19123"],
  ["Sourcing", "上海 · Shanghai workshop"],
  ["Hours", "Mon – Fri · 9:30am – 5:00pm"],
  ["Email", "contact@kpcty.com"],
  ["IG", "@kpcty"],
  ["Tiktok", "@kpcty"],
];

const FAQ = [
  {
    q: "Can I commission a custom piece?",
    a: "Yes — share the wish, your wrist size, and any stones you love. Lead time is 2–3 weeks.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet — we currently ship within the US only. International is coming soon.",
  },
  {
    q: "How do I size a bracelet?",
    a: "Wrap a soft string around your wrist where you want it to sit, then measure it flat against a ruler in centimeters. Add 1–2cm for comfort.",
  },
  {
    q: "Are the stones real?",
    a: "Every stone is natural and certified at the source. Each piece ships with a hand-signed Certificate of Origin.",
  },
  {
    q: "How do I care for and repair my bracelet?",
    a: "Avoid lotion, hot tubs, and gym chalk. If the cord frays, get in touch — we offer paid re-stringing. See our care guide for the full details.",
  },
  {
    q: "What's your return policy?",
    a: "We offer free returns within 14 days of delivery, on unworn pieces in their original packaging.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="page-wrap">
        {/* ── Page header ── */}
        <section className="kpcty-container contact-head">
          <div className="contact-head__row">
            <div className="mono up contact-head__num">§ 06 · Contact</div>
            <div className="contact-head__title-wrap">
              <h1 className="serif contact-head__title">
                say{" "}
                <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                  hello
                </em>
                <span className="serif-sc contact-head__zh">说</span>
              </h1>
              <span className="brush contact-head__brush" aria-hidden />
            </div>
            <div className="mono up contact-head__meta">
              Quick Reply
              <br />
              {/* <span style={{ color: "var(--cinnabar)" }}>·</span> Mon – Fri */}
            </div>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="kpcty-container contact-grid">
          {/* LEFT — studio info */}
          <div className="contact-grid__left">
            <div
              className="mono up"
              style={{
                fontSize: 14,
                letterSpacing: "0.22em",
                color: "var(--cinnabar)",
                marginBottom: 18,
              }}
            >
              ⦿ The studio · 工坊
            </div>
            {/* <p
              className="serif"
              style={{
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                color: "var(--fg)",
                maxWidth: "40ch",
                marginBottom: 32,
              }}
            >
              We knot every piece by hand in a one-room studio in Philadelphia
              — usually with a pot of{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                longjing
              </em>{" "}
              on, sometimes with the cat on the worktable.
            </p> */}

            <dl style={{ margin: 0 }}>
              {KV_ROWS.map(([k, v]) => (
                <div key={k} className="kv">
                  <dt>{k}</dt>
                  <dd
                    style={{
                      color: "var(--fg)",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 14,
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Visit call-out */}
            {/* <div
              style={{
                marginTop: 36,
                padding: 20,
                border: "1px solid var(--line-2)",
                background: "var(--bg-1)",
              }}
            >
              <div
                className="mono up"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--cinnabar)",
                  marginBottom: 10,
                }}
              >
                ⊕ Visit · 来访
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--fg-2)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                The studio runs by appointment only — small space, big mess.
                Book a 30-minute visit to try every piece, get sized, or
                commission something from scratch.
              </p>
              <Link
                href="mailto:contact@kpcty.com?subject=Studio%20visit%20request"
                className="btn-pill"
                style={{
                  marginTop: 14,
                  color: "var(--fg)",
                  borderColor: "var(--fg)",
                  display: "inline-flex",
                }}
              >
                Book a visit ▶
              </Link>
            </div> */}

            {/* Press */}
            {/* <div style={{ marginTop: 36 }}>
              <div
                className="mono up"
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  color: "var(--fg-3)",
                  marginBottom: 14,
                }}
              >
                ⦿ Press · 媒体
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {PRESS.map((p) => (
                  <span key={p} className="chip">
                    {p}
                  </span>
                ))}
              </div>
            </div> */}
          </div>

          {/* RIGHT — terminal-style form */}
          <div className="contact-grid__right">
            <ContactForm />
          </div>
        </section>

        {/* ── FAQ strip ── */}
        <section
          className="kpcty-container"
          style={{ paddingTop: 24, paddingBottom: 60 }}
        >
          <div className="sec-head">
            <div className="sec-head__num">§ 07 — FAQ · 问答</div>
            <h2 className="sec-head__title">Before you write</h2>
            <div className="sec-head__meta">{FAQ.length} questions · 五问</div>
          </div>
          <div className="contact-faq">
            {FAQ.map((f, i) => (
              <div key={i} className="contact-faq__item">
                <div
                  className="mono up"
                  style={{
                    fontSize: 9.5,
                    color: "var(--cinnabar)",
                    letterSpacing: "0.22em",
                    marginBottom: 8,
                  }}
                >
                  Q · 0{i + 1}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 22,
                    fontWeight: 300,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                    color: "var(--fg)",
                    marginBottom: 10,
                  }}
                >
                  {f.q}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--fg-2)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
