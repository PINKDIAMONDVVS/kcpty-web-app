/* Server-side Sentry init (Node runtime).
 * No-ops if NEXT_PUBLIC_SENTRY_DSN is not set, so the app still
 * builds and runs without Sentry credentials configured. */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    /* Capture 10% of transactions in prod, 100% in dev. Adjust as
     * traffic grows. */
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    /* Send PII (request IPs, user details) — turn off if you'd rather not. */
    sendDefaultPii: false,
    /* Hide breadcrumbs that include large response bodies. */
    debug: false,
  });
}
