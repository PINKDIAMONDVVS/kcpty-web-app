import { ShopGridSkeleton } from 'components/skeletons/shop-grid-skeleton';
import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';
import { ShopClient } from './shop-client';

export const metadata = {
  title: 'Shop · 店',
  description: 'Season One — Spiritual gemstone bracelets, cut from eight named mountains.',
};

export default async function ShopPage() {
  const products = await getProducts({});
  return (
    <Suspense fallback={<ShopGridSkeleton />}>
      <ShopClient products={products} />
    </Suspense>
  );
}
