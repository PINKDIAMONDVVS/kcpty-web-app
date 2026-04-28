import Footer from "components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Policies · 规则",
  description:
    "Shipping, returns, care, privacy, and terms for KPCTY orders. Free shipping over $49, returns within 14 days.",
};

const TOC = [
  { id: "shipping", num: "01", label: "Shipping",            zh: "运" },
  { id: "returns",  num: "02", label: "Returns",             zh: "返" },
  { id: "warranty", num: "03", label: "Warranty",            zh: "保" },
  { id: "care",     num: "04", label: "Care",                zh: "养" },
  { id: "sizing",   num: "05", label: "Sizing",              zh: "尺" },
  { id: "privacy",  num: "06", label: "Privacy",             zh: "私" },
  { id: "terms",    num: "07", label: "Terms",               zh: "约" },
] as const;

const UPDATED = "2026-04-27";

export default function PoliciesPage() {
  return (
    <>
      <div className="page-wrap">

        {/* ── Header ── */}
        <section className="kpcty-container pol-head">
          <div>
            <div className="mono up pol-kicker">§ Policies · 规则</div>
            <h1 className="display pol-title">
              The fine{" "}
              <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
                print.
              </em>
            </h1>
            <div className="brush" style={{ width: 180, marginTop: 24 }} />
          </div>
          <div className="pol-head__meta">
            <p className="serif pol-head__intro">
              Plain language, no buried clauses. If anything below is unclear,
              write us at{" "}
              <Link href="/contact" style={{ color: "var(--cinnabar)" }}>
                contact@kpcty.com
              </Link>
              .
            </p>
            <div className="mono up pol-head__updated">
              ⦿ Updated · {UPDATED}
            </div>
          </div>
        </section>

        {/* ── Body: TOC + sections ── */}
        <section className="kpcty-container pol-body ">

          {/* TOC */}
          <aside className="pol-toc">
            <div className="mono up pol-toc__title">⦿ Index · 目录</div>
            <nav className="pol-toc__nav ">
              {TOC.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="pol-toc__link">
                  <span className="pol-toc__num">{s.num}</span>
                  <span className="pol-toc__label">{s.label}</span>
                  <span className="pol-toc__zh">{s.zh}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="pol-content">

            <Section id="shipping" num="01" label="Shipping" zh="运"
              lead="Free over $49 — ships from our Philadelphia studio."
            >
              <Facts rows={[
                ["Domestic",      "Free over $49 · $7 flat under"],
                ["Processing",    "1–2 business days from order"],
                ["Standard",      "3–5 business days · USPS Ground Advantage"],
                ["International", "Calculated at checkout · 7–14 days"],
                ["Tracking",      "Emailed when the label prints"],
              ]} />
              <Prose>
                Every piece ships in a hand-tied pouch and a kraft mailer. We
                don't double-box, gift-wrap, or ship on holidays — your stones
                travel light.
              </Prose>
              <Prose>
                International orders: customs duties and import taxes are the
                buyer's responsibility. If you refuse a shipment due to duties,
                we refund the order minus shipping costs once the parcel
                returns to us.
              </Prose>
            </Section>

            <Section id="returns" num="02" label="Returns &amp; Exchanges" zh="返"
              lead="14 days from delivery. Unworn, in original packaging."
            >
              <Facts rows={[
                ["Window",      "14 days from delivery"],
                ["Condition",   "Unworn · original pouch and certificate"],
                ["Return ship", "Buyer-paid · we recommend tracked mail"],
                ["Refund",      "Original payment · 5–7 business days"],
                ["Exchanges",   "Treated as a return + a new order"],
              ]} />
              <Prose>
                Each KPCTY piece is{" "}
                <em style={{ color: "var(--cinnabar)" }}>one-of-one</em>, so
                exchanges depend on what's still in stock. Email{" "}
                <a href="mailto:contact@kpcty.com">contact@kpcty.com</a> with
                your order number to start a return — we'll send the address
                and a checklist.
              </Prose>
              <Callout
                kicker="Final sale"
                text="Custom commissions, items marked “final,” and pieces showing wear cannot be returned."
              />
            </Section>

            <Section id="warranty" num="03" label="Warranty" zh="保"
              lead="No formal warranty. Honest materials, honestly worn."
            >
              <Prose>
                <strong>KPCTY does not offer a formal warranty.</strong> Each
                piece is hand-strung from natural materials, and natural
                materials acquire patina, weight, and history with wear. That's
                a feature, not a defect.
              </Prose>
              <Prose>
                If a piece arrives damaged in transit, contact us within{" "}
                <em style={{ color: "var(--cinnabar)" }}>7 days of delivery</em>{" "}
                with photos and your order number — we'll review case-by-case
                and make it right where we can.
              </Prose>
              <Prose>
                Outside the 7-day window, repairs and re-stringing are offered
                as a paid service. Email us with your order number for a quote.
              </Prose>
            </Section>

            <Section id="care" num="04" label="Care" zh="养"
              lead="Stones get better the longer you wear them. A few rules."
            >
              <List items={[
                ["Take it off",  "before showers, pools, hot tubs, saunas, and dishwashing."],
                ["Avoid",        "lotions, perfumes, sunscreens, and gym chalk — these dull stones and degrade silk cord."],
                ["Store flat",   "in the pouch we sent, away from direct sunlight."],
                ["Re-string",    "every 12–18 months for daily wearers — silk stretches."],
                ["Don't pull",   "on the knot. If a bead loosens, set the piece down and email us."],
              ]} />
            </Section>

            <Section id="sizing" num="05" label="Sizing" zh="尺"
              lead="Wrap, mark, measure — add 1–2 cm for comfort."
            >
              <Prose>
                Wrap a soft string around your wrist where you want the
                bracelet to sit, mark where it overlaps, then measure flat
                against a ruler in centimetres. Add 1–2 cm for a comfortable
                fit, more if you want it loose enough to slide.
              </Prose>
              <Facts rows={[
                ["XS", "14 – 15 cm wrist"],
                ["S",  "15 – 16 cm wrist"],
                ["M",  "16 – 17 cm wrist · default"],
                ["L",  "17 – 18 cm wrist"],
                ["XL", "18 – 19 cm wrist · custom"],
              ]} />
              <Prose>
                Custom sizes outside this range are available — note your wrist
                measurement at checkout, or email{" "}
                <a href="mailto:contact@kpcty.com">contact@kpcty.com</a> before
                ordering.
              </Prose>
            </Section>

            <Section id="privacy" num="06" label="Privacy" zh="私"
              lead="What we collect, what we don't, what's yours."
            >
              <List items={[
                ["Order data",   "name, shipping address, email, phone (optional), order history. Stored by Shopify."],
                ["Payment data", "handled by Shopify Payments / Stripe. We never see or store full card numbers."],
                ["Newsletter",   "only if you opt in. One-click unsubscribe in every email."],
                ["Cookies",      "used for cart persistence and basic analytics. No third-party ad cookies."],
              ]} />
              <Prose>
                We do not sell, rent, or trade your data. To request a copy of
                what we hold or to delete your records, email{" "}
                <a href="mailto:contact@kpcty.com">contact@kpcty.com</a> — we
                respond within 30 days.
              </Prose>
            </Section>

            <Section id="terms" num="07" label="Terms" zh="约"
              lead="Plain rules of engagement."
            >
              <List items={[
                ["Currency",             "All prices are in US Dollars and exclude applicable taxes and duties."],
                ["Availability",         "Listings are subject to availability. We may refuse, correct pricing, or cancel any order, with a full refund where charged."],
                ["Intellectual property","All product photography, copy, illustrations, and the KPCTY / 刻瓷 marks belong to KPCTY Studio. Don't reproduce without written permission."],
                ["Governing law",        "Disputes are governed by the laws of Pennsylvania, USA, without regard to conflict-of-law provisions."],
                ["Updates",              "We may update these policies at any time. The updated date at the top reflects the most recent revision."],
              ]} />
            </Section>

            {/* Closing */}
            <div className="pol-closing">
              <div className="serif-sc pol-closing__zh">谢</div>
              <p className="serif pol-closing__line">
                Thanks for reading. The fine print is short on purpose — we'd
                rather spend the time at the worktable.
              </p>
              <Link href="/contact" className="btn btn--ghost">
                Questions? Write to us →
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

/* ── Section shell ── */
function Section({
  id,
  num,
  label,
  zh,
  lead,
  children,
}: {
  id:       string;
  num:      string;
  label:    string;
  zh:       string;
  lead?:    string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="pol-section">
      <header className="pol-section__head">
        <div className="mono up pol-section__num">§ {num}</div>
        <div className="pol-section__title-row">
          <h2 className="display pol-section__title">{label}</h2>
          <span className="pol-section__zh">{zh}</span>
        </div>
        {lead && <p className="serif pol-section__lead">{lead}</p>}
      </header>
      <div className="pol-section__body">{children}</div>
    </section>
  );
}

/* ── Key/value facts grid ── */
function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="pol-facts">
      {rows.map(([k, v]) => (
        <div key={k} className="pol-fact">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Bullet list with strong leading word ── */
function List({ items }: { items: [string, string][] }) {
  return (
    <ul className="pol-list">
      {items.map(([lead, rest]) => (
        <li key={lead}>
          <strong>{lead}</strong> {rest}
        </li>
      ))}
    </ul>
  );
}

/* ── Body paragraph ── */
function Prose({ children }: { children: ReactNode }) {
  return <p className="pol-prose">{children}</p>;
}

/* ── Boxed callout / final-sale style note ── */
function Callout({ kicker, text }: { kicker: string; text: string }) {
  return (
    <div className="pol-callout">
      <span className="mono up pol-callout__kicker">{kicker} ·</span>{" "}
      <span className="serif pol-callout__text">{text}</span>
    </div>
  );
}
