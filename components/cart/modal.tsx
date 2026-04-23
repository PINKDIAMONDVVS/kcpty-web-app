"use client";

import { Dialog, Transition } from "@headlessui/react";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = { [key: string]: string };

const FREE_SHIPPING_THRESHOLD = 300;

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart  = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) createCartAndSetCookie();
  }, [cart]);

  useEffect(() => {
    if (cart?.totalQuantity && cart.totalQuantity !== quantityRef.current && cart.totalQuantity > 0) {
      if (!isOpen) setIsOpen(true);
      quantityRef.current = cart.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity]);

  const subtotal = parseFloat(cart?.cost?.totalAmount?.amount ?? "0");
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const toFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              aria-hidden="true"
            />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 420, maxWidth: '100vw',
                background: 'rgba(7,7,10,0.88)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid var(--line-2)',
                display: 'flex', flexDirection: 'column',
                color: 'var(--fg)',
              }}
            >
              {/* Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="mono up" style={{ fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.22em' }}>Carrying · 随身</div>
                  <div className="serif" style={{ fontSize: 28, marginTop: 4, fontWeight: 300, letterSpacing: '-0.02em' }}>Your stones</div>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  style={{ background: 'transparent', border: '1px solid var(--line-2)', color: 'var(--fg)', width: 32, height: 32, cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  ×
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                  <div style={{ fontFamily: 'Noto Serif SC, serif', fontSize: 64, color: 'var(--cinnabar)', opacity: 0.3, lineHeight: 1 }}>空</div>
                  <div className="mono up" style={{ marginTop: 20, fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.2em' }}>Your cart is empty.</div>
                  <Link href="/search" onClick={closeCart} className="btn btn--ghost" style={{ marginTop: 28 }}>
                    Browse the archive →
                  </Link>
                </div>
              ) : (
                <>
                  {/* Shipping progress */}
                  <div style={{ padding: '12px 24px 0', borderBottom: '1px solid var(--line)' }}>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--cinnabar)', textTransform: 'uppercase', marginBottom: 8 }}>
                      {toFreeShipping > 0
                        ? `⊕ Free shipping — $${toFreeShipping.toFixed(0)} to go`
                        : '⊕ Free shipping unlocked'}
                    </div>
                    <div style={{ height: 2, background: 'var(--bg-2)', marginBottom: 12 }}>
                      <div style={{ width: `${shippingProgress}%`, height: '100%', background: 'var(--cinnabar)', transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Items */}
                  <ul style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
                    {cart.lines
                      .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
                      .map((item, i) => {
                        const params = {} as MerchandiseSearchParams;
                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                          if (value !== DEFAULT_OPTION) params[name.toLowerCase()] = value;
                        });
                        const productUrl = createUrl(`/product/${item.merchandise.product.handle}`, new URLSearchParams(params));

                        return (
                          <li key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--line)', alignItems: 'start' }}>
                            {/* Image */}
                            <div style={{ aspectRatio: '1', background: 'var(--bg-2)', overflow: 'hidden', position: 'relative' }}>
                              <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                              <Image
                                width={72} height={72}
                                src={item.merchandise.product.featuredImage.url}
                                alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>

                            {/* Info */}
                            <Link href={productUrl} onClick={closeCart} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <div className="serif" style={{ fontSize: 18, fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                                {item.merchandise.product.title}
                              </div>
                              {item.merchandise.title !== DEFAULT_OPTION && (
                                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--fg-3)', marginTop: 4, textTransform: 'uppercase' }}>
                                  {item.merchandise.title}
                                </div>
                              )}
                              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line-2)', marginTop: 10, width: 'fit-content' }}>
                                <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                                <span className="mono" style={{ width: 32, textAlign: 'center', fontSize: 12 }}>{item.quantity}</span>
                                <EditItemQuantityButton item={item} type="plus"  optimisticUpdate={updateCartItem} />
                              </div>
                            </Link>

                            {/* Price */}
                            <Price
                              className="mono"
                              amount={item.cost.totalAmount.amount}
                              currencyCode={item.cost.totalAmount.currencyCode}
                            />
                          </li>
                        );
                      })}
                  </ul>

                  {/* Certificate note */}
                  <div style={{ padding: '16px 24px 0', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                    Every piece ships with a handwritten{' '}
                    <span style={{ color: 'var(--cinnabar)' }}>Certificate of Origin</span>{' '}
                    — specific stone, specific workshop.
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', background: 'var(--bg-1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--fg-3)' }}>Taxes</span>
                      <Price className="mono" style={{ fontSize: 12 }} amount={cart.cost.totalTaxAmount.amount} currencyCode={cart.cost.totalTaxAmount.currencyCode} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--fg-3)' }}>Shipping</span>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--fg-2)' }}>Calculated at checkout</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 10, borderTop: '1px solid var(--line)' }}>
                      <span className="mono up" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--fg-3)' }}>Total</span>
                      <Price className="mono" style={{ fontSize: 14, color: 'var(--fg)' }} amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
                    </div>
                    <form action={redirectToCheckout}>
                      <CheckoutButton />
                    </form>
                    <div className="mono up" style={{ fontSize: 9.5, letterSpacing: '0.2em', textAlign: 'center', marginTop: 10, color: 'var(--fg-3)' }}>
                      Shipping · Tax calculated next
                    </div>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn--red btn--block" style={{ width: '100%', padding: '16px' }}>
      {pending ? <LoadingDots className="bg-white" /> : 'Checkout →'}
    </button>
  );
}
