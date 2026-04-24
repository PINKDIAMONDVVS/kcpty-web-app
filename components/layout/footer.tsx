import Link from "next/link";

const SHOP_LINKS = [
  { label: "All Pieces", href: "/search" },
  { label: "Luck · 福", href: "/search?intention=luck" },
  { label: "Calm · 静", href: "/search?intention=calm" },
  { label: "Courage · 勇", href: "/search?intention=courage" },
  { label: "Wealth · 财", href: "/search?intention=wealth" },
];

const INFO_LINKS = [
  { label: "About the Studio", href: "/about" },
  { label: "Stone Sourcing", href: "/about#sourcing" },
  { label: "Care Guide", href: "/about#care" },
  { label: "Sizing", href: "/about#sizing" },
  { label: "Shipping & Returns", href: "/about#shipping" },
];

const FOLLOW_LINKS = [
  { label: "Instagram", href: "https://instagram.com/kpcty" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Wholesale", href: "mailto:wholesale@kpcty.com" },
  { label: "Contact", href: "mailto:hello@kpcty.com" },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="kpcty-container foot__inner">
        <div className="foot__row">
          {/* Brand col */}
          <div className="foot__col">
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="10" fill="var(--cinnabar)" />
                  <circle
                    cx="11"
                    cy="11"
                    r="10"
                    fill="none"
                    stroke="var(--fg)"
                    strokeOpacity=".12"
                  />
                </svg>
                <span
                  className="mono"
                  style={{ fontSize: 13, letterSpacing: "-0.01em" }}
                >
                  KPCTY
                </span>
                <span
                  style={{
                    fontFamily: "Noto Serif SC, serif",
                    fontSize: 12,
                    color: "var(--cinnabar)",
                    letterSpacing: "0.2em",
                  }}
                >
                  刻瓷
                </span>
              </div>
              <p
                className="serif"
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--fg-2)",
                  maxWidth: "34ch",
                }}
              >
                Twenty-nine one-of-one bracelets, cut from eight named
                mountains. Each is a small wish you can wear on your wrist.
              </p>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--fg-3)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.8,
              }}
            >
              Studio / Bushwick · Brooklyn
              <br />
              lat 40.69° · lon -73.93°
              <br />
              hello@kpcty.com
            </div>
          </div>

          {/* Shop col */}
          <div className="foot__col">
            <h4>Shop</h4>
            {SHOP_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Info col */}
          <div className="foot__col">
            <h4>Information</h4>
            {INFO_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Follow col */}
          <div className="foot__col">
            <h4>Follow</h4>
            {FOLLOW_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mega wordmark */}
        <div className="foot__mega">
          KPCTY<span className="foot__zh">刻瓷</span>
        </div>

        {/* Bottom bar */}
        <div className="foot__bot">
          <span>
            © {new Date().getFullYear()} KPCTY · 刻瓷 · All rights reserved.
          </span>
          <span style={{ display: "flex", gap: 24 }}>
            <span>SIG. 0x9F·KPC·S1</span>
            <span>Season One · 29 / 29</span>
          </span>
          <span style={{ color: "var(--fg-4)" }}>ONE-OF-ONE · BROOKLYN</span>
        </div>
      </div>
    </footer>
  );
}
