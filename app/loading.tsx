/* Top-level loading skeleton.
 * Renders briefly while a server-rendered route is fetching its data
 * (Shopify GraphQL on home / shop / PDP). Matches the dark editorial
 * aesthetic so it doesn't flash a white default. */

export default function Loading() {
  return (
    <div className="page-wrap loading-shell" aria-busy="true" aria-live="polite">
      <div className="kpcty-container loading-shell__inner">
        <div className="mono up loading-shell__kicker">
          ⦿ Loading · 加载中
        </div>
        <div className="serif-sc loading-shell__seal" aria-hidden>
          刻
        </div>
        <div className="loading-shell__pulse" aria-hidden />
        <span className="sr-only">Page is loading…</span>
      </div>
    </div>
  );
}
