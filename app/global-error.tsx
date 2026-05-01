"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/* Heuristic for "Shopify is unreachable" vs an in-app code crash.
 * We catch a few common failure modes — the underlying fetch error
 * mentions the storefront host, the literal word "shopify", or one of
 * the network primitives we'd see when the API is down. */
function looksLikeShopifyOutage(error: Error & { digest?: string }) {
  const haystack = `${error.name} ${error.message} ${error.stack ?? ""}`.toLowerCase();
  if (haystack.includes("shopify")) return true;
  if (haystack.includes("myshopify.com")) return true;
  if (haystack.includes("storefront")) return true;
  if (haystack.includes("fetch failed") && haystack.includes("graphql")) return true;
  return false;
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const isOutage = looksLikeShopifyOutage(error);
  const kicker = isOutage ? "⦿ Studio offline" : "⦿ Something cracked";
  const headline = isOutage
    ? "We can't reach our store right now."
    : "An unexpected error occurred.";
  const body = isOutage
    ? "Our catalogue lives on Shopify, and it's not responding for the moment. Please try again in a few minutes."
    : "We've been notified. Please refresh, or return to the studio.";

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1.5rem",
            textAlign: "center",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            {kicker}
          </p>
          <h1 style={{ fontSize: "1.4rem", margin: "0.75rem 0 1rem" }}>
            {headline}
          </h1>
          <p style={{ opacity: 0.7, maxWidth: "36ch" }}>{body}</p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: "0.65rem 1.4rem",
                border: "1px solid currentColor",
                background: "transparent",
                color: "inherit",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "0.65rem 1.4rem",
                border: "1px solid currentColor",
                textDecoration: "none",
                color: "inherit",
                fontSize: "0.75rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Return home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
