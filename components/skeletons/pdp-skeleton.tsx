/* Skeleton stand-in for the product detail page (matches the
 * two-column .pdp layout). Renders while getProduct() resolves. */

export function PdpSkeleton() {
  return (
    <div className="page-wrap" aria-busy="true" aria-live="polite">
      <div
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-1)",
        }}
      >
        <div
          className="kpcty-container"
          style={{ padding: "10px 0" }}
        >
          <div className="skeleton skeleton--text" style={{ width: 220 }} />
        </div>
      </div>

      <section className="pdp">
        <div className="pdp__media">
          <div className="pdp__thumbs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pdp__thumb">
                <div className="skeleton skeleton--block" style={{ width: "100%", height: "100%" }} />
              </div>
            ))}
          </div>
          <div className="pdp__main">
            <div
              className="skeleton skeleton--block"
              style={{ width: "100%", aspectRatio: "4 / 5" }}
            />
          </div>
        </div>

        <div className="pdp__info">
          <div className="skeleton skeleton--text" style={{ width: 140 }} />
          <div
            className="skeleton skeleton--block"
            style={{ width: "min(80%, 480px)", height: 64, margin: "16px 0 24px" }}
          />
          <div className="skeleton skeleton--block" style={{ height: 96, marginBottom: 24 }} />
          <div className="skeleton skeleton--text" style={{ width: "90%" }} />
          <div className="skeleton skeleton--text" style={{ width: "82%", marginTop: 6 }} />
          <div className="skeleton skeleton--text" style={{ width: "70%", marginTop: 6, marginBottom: 28 }} />
          <div
            className="skeleton skeleton--block"
            style={{ width: 220, height: 56, marginBottom: 28 }}
          />
          <div className="skeleton skeleton--block" style={{ height: 56, marginBottom: 24 }} />
          <div className="skeleton skeleton--block" style={{ height: 80 }} />
        </div>
      </section>

      <span className="sr-only">Loading the piece…</span>
    </div>
  );
}
