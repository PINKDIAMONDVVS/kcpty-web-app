# KPCTY · 刻瓷

Storefront for KPCTY — one-of-one spiritual gemstone bracelets, hand-knotted in Philadelphia.

A premium Shopify-backed storefront built on the Next.js App Router. Forked from the [Vercel Next.js Commerce](https://github.com/vercel/commerce) template and rebuilt around the KPCTY brand: bilingual typography, time-bucketed featured-piece rotation, and a custom design system in plain CSS + Tailwind v4.

## Stack

- **Next.js 15** (App Router, RSC, Server Actions, PPR, `useCache`, inlineCss)
- **React 19** + **TypeScript 5.8**
- **Shopify Storefront API** (GraphQL) — products, collections, cart, pages
- **Tailwind v4** + custom CSS in `app/globals.css`
- **Resend** — `/contact` form delivery
- **Sentry** — server + edge + browser error tracking (no-ops without DSN)
- **Vercel Analytics + Speed Insights** — page views, Web Vitals
- **`@headlessui/react`** — cart drawer, mobile menu (with custom a11y wiring)
- Hosting: **Vercel** (PPR + ISR)

## Quick start

```bash
pnpm install
cp .env.example .env   # then fill in your secrets
pnpm dev
```

Dev server runs on [localhost:3000](http://localhost:3000) via Turbopack.

## Environment

All secrets live in `.env` (gitignored). See [`.env.example`](.env.example) for the full template.

| Variable | Required | Purpose |
| --- | :---: | --- |
| `SHOPIFY_STORE_DOMAIN` | ✓ | `<shop>.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | ✓ | Storefront API token |
| `SHOPIFY_REVALIDATION_SECRET` | ✓ | Verifies Shopify webhook revalidation calls |
| `SITE_NAME` | ✓ | Used for `<title>`, OG, JSON-LD brand |
| `COMPANY_NAME` |   | Footer copyright |
| `RESEND_API_KEY` |   | Enables `/contact` form delivery |
| `CONTACT_FROM_EMAIL` |   | Sender shown on contact emails (e.g. `KPCTY <contact@kpcty.com>`) |
| `CONTACT_TO_EMAIL` |   | Inbox the contact form delivers to |
| `NEXT_PUBLIC_SENTRY_DSN` |   | Enables Sentry — leave empty to disable |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` |   | Source-map upload during `next build` on CI |

Anything left blank degrades gracefully: missing Sentry DSN → no-op init, missing Resend key → contact form returns a friendly error.

## Project structure

```
app/
  layout.tsx              Root metadata, Org + WebSite JSON-LD, Analytics, Speed Insights
  page.tsx                Home — hero rotates per-minute via ISR + time-bucket
  loading.tsx             Top-level branded skeleton
  not-found.tsx           Branded 404
  global-error.tsx        Sentry-captured root error boundary
  sitemap.ts              Dynamic sitemap (products + collections + pages, revalidate 1h)
  robots.ts               Robots policy + sitemap pointer
  opengraph-image.tsx     Default OG image (auto-wired site-wide)
  favicon.ico             Auto-wired favicon
  search/                 /search + /search/[collection] with intent/material/sort filters
  product/[handle]/       PDP — Product + BreadcrumbList JSON-LD, per-product OG image
  contact/                /contact — Resend-backed form + FAQPage JSON-LD
  about/  policies/  lookbook/  [page]/    Static + Shopify-backed pages
  api/contact/            POST handler that calls Resend
components/
  cart/                   Cart drawer (Headless UI Dialog) + server actions
  product/                PDP client + variant selector
  layout/navbar/          Navbar, mobile menu (Portal-rendered drawer)
  opengraph-image.tsx     Shared OG renderer used by app/opengraph-image.tsx
lib/
  shopify/                Storefront API client, queries, fragments, types
  constants.ts            Cache tags, hidden-product tag
  utils.ts                baseUrl, helpers
sentry.server.config.ts
sentry.edge.config.ts
instrumentation.ts        register() + onRequestError
instrumentation-client.ts onRouterTransitionStart
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next dev server (Turbopack) |
| `pnpm build` | Production build (Sentry source-map upload if `SENTRY_*` set) |
| `pnpm start` | Production server |
| `pnpm prettier` | Format the repo |
| `pnpm test` | Prettier check (run in CI) |

## SEO

- Per-route `metadata` with `description` + `alternates.canonical`
- Default `openGraph` (site-wide) + per-product OG images
- Twitter `summary_large_image` card
- Dynamic `sitemap.xml` (products, collections, pages) revalidated hourly
- JSON-LD: `Organization` + `WebSite` (with `SearchAction`) on every page; `Product` + `BreadcrumbList` on PDPs; `FAQPage` on `/contact`
- Each page renders exactly one `<h1>`, all images carry meaningful `alt` text, LCP images use `priority`
- Hidden Shopify products (tagged with `HIDDEN_PRODUCT_TAG`) emit `noindex,nofollow`

## Observability

- Sentry initialized for **server**, **edge**, and **browser** runtimes via the standard Next.js instrumentation files. All three guard on `NEXT_PUBLIC_SENTRY_DSN` and no-op when unset, so the build runs cleanly without credentials.
- Cart server actions (`addItem`, `removeItem`, `updateItemQuantity`) call `Sentry.captureException(e)` on failure rather than swallowing errors.
- Vercel Analytics + Speed Insights mounted in the root layout — auto-enabled on Vercel deployments, no-op locally.

## Accessibility notes

- Cart drawer: `aria-label` on trigger reflects item count, `Dialog.Title` ID linked via `aria-labelledby`.
- Mobile menu: hamburger uses `aria-haspopup="dialog"` / `aria-expanded` / `aria-controls`; drawer is `role="dialog"` + `aria-modal`.
- Filter dropdowns on `/search`: trigger is `aria-haspopup="listbox"`, panel is `role="listbox"`, options are `role="option"` with `aria-selected`.

## Deploying

The app is built for Vercel. Push to your linked git remote and Vercel will:

1. Read `next.config.ts` (wrapped with `withSentryConfig`)
2. Upload source maps if `SENTRY_AUTH_TOKEN` + `SENTRY_ORG` + `SENTRY_PROJECT` are set
3. Set `VERCEL_PROJECT_PRODUCTION_URL` automatically — `lib/utils.ts` derives `baseUrl` from it for `metadataBase`, sitemap, and JSON-LD `@id` URLs

For Shopify webhook-driven revalidation, point Shopify's product/collection/page webhooks at `/api/revalidate?secret=$SHOPIFY_REVALIDATION_SECRET`.

## License

See [`license.md`](license.md).
