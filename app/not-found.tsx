import Footer from "components/layout/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lost · 失踪",
  description:
    "The page you're looking for has wandered off — maybe it's a stone we no longer string, or a path that never existed.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <main className="page-wrap not-found">
        <section className="kpcty-container not-found__inner">
          <div
            className="mono up"
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              color: "var(--cinnabar)",
            }}
          >
            § 404 · 失踪
          </div>

          <h1 className="display not-found__title">
            Lost in the
            <br />
            <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
              workshop.
            </em>
          </h1>

          <span
            className="brush"
            aria-hidden
            style={{ display: "inline-block", width: 160, marginTop: 24 }}
          />

          <p className="serif not-found__lead">
            The page you're looking for has wandered off — maybe it was a piece
            we strung once and let go, or a path that never existed. Either way,
            it isn't here.
          </p>

          <div className="not-found__cta">
            <Link href="/" className="btn btn--ghost">
              ← Back home
            </Link>
            <Link href="/search" className="btn btn--red">
              Browse the archive →
            </Link>
          </div>

          <div
            className="serif-sc not-found__zh"
            aria-hidden
            style={{
              color: "var(--cinnabar)",
              opacity: 0.18,
            }}
          >
            空
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
