"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

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
            ⦿ Something cracked
          </p>
          <h1 style={{ fontSize: "1.4rem", margin: "0.75rem 0 1rem" }}>
            An unexpected error occurred.
          </h1>
          <p style={{ opacity: 0.7, maxWidth: "32ch" }}>
            We've been notified. Please refresh, or return to the studio.
          </p>
          <a
            href="/"
            style={{
              marginTop: "1.5rem",
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
      </body>
    </html>
  );
}
