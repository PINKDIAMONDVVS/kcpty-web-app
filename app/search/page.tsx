import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';
import { ShopClient } from './shop-client';

export const metadata = {
  title: 'Shop · 店',
  description: 'Season One — 29 one-of-one bracelets, cut from eight named mountains.',
};

export default async function ShopPage() {
  const products = await getProducts({});
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
      <ShopClient products={products} />
    </Suspense>
  );
}
