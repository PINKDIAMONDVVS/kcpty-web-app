/* Skeleton stand-in for the shop grid (matches .shop-grid layout +
 * .pcard card shape). Pure server component — no JS sent to the
 * client. Renders 8 placeholder cards while data resolves. */

export function ShopGridSkeleton() {
  return (
    <div className="page-wrap" aria-busy="true" aria-live="polite">
      <div className="kpcty-container">
        <div className="shop-header">
          <div>
            <div className="skeleton skeleton--text" style={{ width: 80 }} />
            <div
              className="skeleton skeleton--block"
              style={{ width: "min(60vw, 540px)", height: 96, marginTop: 12 }}
            />
          </div>
          <div className="skeleton skeleton--text shop-header__meta" style={{ width: 180 }} />
        </div>
      </div>
      <div className="kpcty-container shop-search-row">
        <div className="skeleton skeleton--block" style={{ height: 44 }} />
      </div>
      <div className="kpcty-container shop-filter-bar" style={{ position: "static" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="skeleton skeleton--block" style={{ width: 120, height: 36 }} />
          <div className="skeleton skeleton--block" style={{ width: 140, height: 36 }} />
        </div>
        <div className="skeleton skeleton--block" style={{ width: 110, height: 36 }} />
      </div>
      <div className="shop-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="pcard">
            <div className="pcard__media">
              <div className="skeleton skeleton--block" style={{ aspectRatio: 1, width: "100%" }} />
            </div>
            <div className="pcard__meta">
              <div>
                <div className="skeleton skeleton--text" style={{ width: "70%" }} />
                <div className="skeleton skeleton--text" style={{ width: "50%", marginTop: 8 }} />
              </div>
              <div className="skeleton skeleton--text" style={{ width: 48 }} />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading the archive…</span>
    </div>
  );
}
