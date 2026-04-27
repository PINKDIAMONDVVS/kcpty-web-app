import { parseList, resolveIntent } from "lib/intents";
import { resolveMaterial } from "lib/materials";
import { getProducts } from "lib/shopify";
import Link from "next/link";

/* Pull the top-N materials + intents from the live catalogue so the
 * footer shortcuts actually point at real filter states. */
async function getFooterFacets() {
  try {
    const products = await getProducts({});

    const bump = (
      map: Map<string, { count: number; original: string }>,
      raw: string,
    ) => {
      const key = raw.trim().toLowerCase();
      if (!key) return;
      const entry = map.get(key) ?? { count: 0, original: raw.trim() };
      entry.count += 1;
      map.set(key, entry);
    };

    const mats = new Map<string, { count: number; original: string }>();
    const ints = new Map<string, { count: number; original: string }>();
    for (const p of products) {
      for (const v of parseList(p.materials?.value)) bump(mats, v);
      for (const v of parseList(p.intents?.value)) bump(ints, v);
    }

    const sortByCount = <T extends { count: number }>(m: Map<string, T>) =>
      Array.from(m.entries()).sort((a, b) => b[1].count - a[1].count);

    const materials = sortByCount(mats)
      .slice(0, 5)
      .map(([key, { original }]) => ({
        key,
        label: original,
        zh: resolveMaterial(key).zh,
      }));

    const intents = sortByCount(ints)
      .slice(0, 4)
      .map(([key, { original }]) => ({
        key,
        label: original,
        zh: resolveIntent(key).zh,
      }));

    return { materials, intents, total: products.length };
  } catch {
    return { materials: [], intents: [], total: 0 };
  }
}

const STUDIO_LINKS = [
  { label: "Shop", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Contact", href: "/contact" },
];

const POLICY_LINKS = [
  { label: "Shipping", href: "/about#shipping" },
  { label: "Returns", href: "/about#returns" },
  { label: "Warranty (forever)", href: "/about#warranty" },
  { label: "Care · 养", href: "/about#care" },
  { label: "FAQ", href: "/about#faq" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/kpcty" },
  { label: "TikTok", href: "https://tiktok.com/@kpcty" },
  { label: "Xiaohongshu", href: "https://xiaohongshu.com/" },
  { label: "Substack", href: "#newsletter" },
];

export default async function Footer() {
  const { materials } = await getFooterFacets();

  return (
    <footer className="foot">
      <div className="kpcty-container">
        <div className="foot__inner">
          <div className="foot__row">
            {/* ── Brand col ── */}
            <div className="foot__col">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "var(--cinnabar)",
                    color: "var(--fg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Noto Serif SC, serif",
                    fontWeight: 700,
                    fontSize: 22,
                  }}
                >
                  刻
                </div>
                <div
                  className="serif"
                  style={{ fontSize: 30, letterSpacing: "0.04em" }}
                >
                  KPCTY
                </div>
              </div>
              <p
                className="serif"
                style={{
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--fg-2)",
                  maxWidth: "38ch",
                }}
              >
                Spiritual ancient-stone jewelry, re-strung in Philadelphia.
              </p>
              <div className="foot__socials" style={{ marginTop: 22 }}>
                {SOCIALS.map((s, i) => (
                  <span
                    key={s.label}
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {s.label}
                    </a>
                    {i < SOCIALS.length - 1 && (
                      <span style={{ opacity: 0.3, margin: "0 10px" }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Shop col ── */}
            <div className="foot__col">
              <h4>Shop · 店</h4>
              <Link href="/search">All pieces</Link>
              {materials.map((m) => (
                <Link
                  key={m.key}
                  href={`/search?material=${encodeURIComponent(m.key)}`}
                >
                  {m.label}
                  {m.zh ? (
                    <span style={{ color: "var(--fg-3)", marginLeft: 6 }}>
                      {" "}
                      · {m.zh}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* ── Studio col ── */}
            <div className="foot__col">
              <h4>Studio · 说</h4>
              {STUDIO_LINKS.map((l) =>
                l.href.startsWith("mailto") ? (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ),
              )}
            </div>

            {/* ── Policies col ── */}
            <div className="foot__col">
              <h4>Policies · 规</h4>
              {POLICY_LINKS.map((l) =>
                l.href.startsWith("mailto") ? (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href}>
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Mega wordmark */}
          <div className="foot__mega">
            KPCTY<span className="foot__zh">刻瓷</span>
          </div>

          {/* Bottom bar */}
          <div className="foot__bot">
            <span>
              © {new Date().getFullYear()} KPCTY STUDIO · ALL RIGHTS RESERVED
            </span>
            <span>CUT IN SUZHOU · STRUNG IN Philadelphia</span>
            <span style={{ color: "var(--fg-4)" }}>SITE V0.1 · SEASON ONE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
