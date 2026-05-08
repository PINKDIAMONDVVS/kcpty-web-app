"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/* Route-level error boundary. Catches anything that throws inside a
 * page (or its server-fetched data) and renders an on-brand fallback
 * with a Try Again that calls Next's reset() handler. For the fully
 * crashed-layout case, see app/global-error.tsx. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
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
          ⦿ Something cracked
        </div>

        <h1 className="display not-found__title">
          A small{" "}
          <em style={{ color: "var(--cinnabar)", fontStyle: "italic" }}>
            knot
          </em>
          <br />
          came loose.
        </h1>

        <span
          className="brush"
          aria-hidden
          style={{ display: "inline-block", width: 160, marginTop: 24 }}
        />

        <p className="serif not-found__lead">
          Something on this page didn't load the way it should have. We've
          been notified — please try again, or head back to the studio.
        </p>

        <div className="not-found__cta">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn--red"
          >
            Try again →
          </button>
          <a href="/" className="btn btn--ghost">
            ← Return home
          </a>
        </div>

        <div
          className="serif-sc not-found__zh"
          aria-hidden
          style={{
            color: "var(--cinnabar)",
            opacity: 0.18,
          }}
        >
          损
        </div>
      </section>
    </main>
  );
}
