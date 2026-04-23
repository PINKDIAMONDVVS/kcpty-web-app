import { getProducts } from 'lib/shopify';
import { ShopClient } from './shop-client';

export const metadata = {
  title: 'Shop · 店',
  description: 'Season One — 29 one-of-one bracelets, cut from eight named mountains.',
};

export default async function ShopPage() {
  const products = await getProducts({});
  return <ShopClient products={products} />;
}
