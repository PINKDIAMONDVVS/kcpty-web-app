/* Edge-runtime Sentry init (middleware, edge routes).
 * No-ops if NEXT_PUBLIC_SENTRY_DSN is not set. */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    sendDefaultPii: false,
    debug: false,
  });
}
