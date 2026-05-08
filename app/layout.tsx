import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import type { Viewport } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const { SITE_NAME } = process.env;

const SITE_DESCRIPTION =
  "KPCTY — one-of-one spiritual gemstone bracelets, cut from named mountains and rung with meaning. Hand-knotted in Philadelphia.";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    follow: true,
    index: true,
  },
};

/* Mobile-first viewport. interactiveWidget=resizes-content tells modern
 * browsers to reflow the page when the on-screen keyboard appears,
 * instead of letting the keyboard cover fixed-bottom inputs (notify
 * form, contact form, mobile sticky CTA). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: baseUrl,
  logo: `${baseUrl}/opengraph-image`,
  sameAs: [
    "https://instagram.com/kpcty",
    "https://tiktok.com/@kpcty",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@kpcty.com",
    contactType: "customer support",
    areaServed: "US",
    availableLanguage: ["English", "Chinese"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="selection:bg-purple-900 selection:text-white">
        {/* Resource hint for the Shopify CDN — every product image is
         * hosted there. React 19 hoists the <link> to <head>
         * automatically, so we get the perf benefit without
         * re-introducing the explicit <head> element that triggers
         * hydration mismatches with browser extensions. */}
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />
        {/* JSON-LD lives in <body> rather than <head> so browser extensions
         * that inject into <head> don't trigger React hydration mismatches.
         * Google's structured-data parser accepts either location. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Keyboard / screen-reader skip link. Stays off-screen until
         * focused via Tab, then jumps the user past the navbar to the
         * <main> region. Visible only on focus, so it doesn't intrude
         * on the editorial design for sighted mouse users. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main id="main">
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
        {/* Vercel Analytics — page views + Web Vitals.
         * Only auto-enables on Vercel deployments; no-op locally. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
