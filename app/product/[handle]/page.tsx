import Footer from 'components/layout/footer';
import { PdpClient } from 'components/product/pdp-client';
import { PdpSkeleton } from 'components/skeletons/pdp-skeleton';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params  = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
  const canonicalPath = `/product/${product.handle}`;

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    alternates: { canonical: canonicalPath },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params  = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const recommendations = await getProductRecommendations(product.id);

  const productUrl = `${baseUrl}/product/${product.handle}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    sku: product.handle,
    brand: {
      '@type': 'Brand',
      name: process.env.SITE_NAME ?? 'KPCTY',
    },
    offers: {
      '@type': 'AggregateOffer',
      url: productUrl,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
      seller: {
        '@type': 'Organization',
        name: process.env.SITE_NAME ?? 'KPCTY',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${baseUrl}/search` },
      { '@type': 'ListItem', position: 3, name: product.title, item: productUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<PdpSkeleton />}>
        <PdpClient product={product} recommendations={recommendations} />
      </Suspense>
      <Footer />
    </>
  );
}
