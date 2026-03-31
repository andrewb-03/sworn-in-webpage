'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

/* ─── Design tokens ──────────────────────────────────────── */
const T = {
  black:    '#0A0A0A',
  charcoal: '#141414',
  charcoal2:'#1c1c1c',
  orange:   '#E8621A',
  orangeLt: '#FF7A35',
  white:    '#F5F2ED',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  green:    '#4CAF50',
  red:      '#E24B4A',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* ─── Valid promo codes ───────────────────────────────────── */
const VALID_CODES: Record<string, number> = {
  SWORN25:   0.10,
  OCTOBER30: 0.30,
  SAVE10:    0.10,
  WELCOME15: 0.15,
};

/* ─── Cart Drawer ────────────────────────────────────────── */
export default function CartDrawer() {
  const router = useRouter();
  const {
    items, isOpen, closeCart,
    removeItem, updateQuantity, addItem,
    totalItems, totalPrice,
    setDiscount, setPromoCode: setContextPromoCode,
  } = useCart();

  /* Promo state — local to drawer, synced to context on apply */
  const [promoInput,    setPromoInput]    = useState('');
  const [promoApplied,  setPromoApplied]  = useState(false);
  const [appliedCode,   setAppliedCode]   = useState('');
  const [promoError,    setPromoError]    = useState('');
  const [discountAmt,   setDiscountAmt]   = useState(0);

  /* Suggested products */
  const inCartIds    = new Set(items.map((i) => i.product.id));
  const lastCategory = items.at(-1)?.product.category;
  const suggestions  = [
    ...products.filter((p) => !inCartIds.has(p.id) && p.category === lastCategory),
    ...products.filter((p) => !inCartIds.has(p.id) && p.category !== lastCategory),
  ].slice(0, 2);

  /* Derived totals */
  const afterDiscount = totalPrice - discountAmt;
  const shipping      = afterDiscount >= 75 ? 0 : 8.99;
  const orderTotal    = afterDiscount + shipping;

  /* Promo logic */
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (promoApplied) { setPromoError('A promo code is already applied.'); return; }
    if (VALID_CODES[code]) {
      const amt = totalPrice * VALID_CODES[code];
      setDiscountAmt(amt);
      setAppliedCode(code);
      setPromoApplied(true);
      setPromoError('');
      setDiscount(amt);
      setContextPromoCode(code);
    } else {
      setPromoError('Invalid promo code. Try again.');
    }
  };

  const removePromo = () => {
    setPromoInput('');
    setAppliedCode('');
    setPromoApplied(false);
    setPromoError('');
    setDiscountAmt(0);
    setDiscount(0);
    setContextPromoCode('');
  };

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────── */}
      <style>{`
        .cart-drawer-scrollarea::-webkit-scrollbar       { width: 4px; }
        .cart-drawer-scrollarea::-webkit-scrollbar-track { background: ${T.charcoal}; }
        .cart-drawer-scrollarea::-webkit-scrollbar-thumb { background: ${T.grayDark}; border-radius: 2px; }

        .cart-close-btn:hover    { border-color: ${T.white} !important; color: ${T.white} !important; }
        .cart-remove-btn:hover   { color: ${T.orange} !important; }
        .cart-qty-btn:hover      { background: rgba(255,255,255,0.1) !important; }
        .cart-apply-btn:hover    { color: ${T.white} !important; }
        .cart-checkout-btn:hover { background: ${T.orangeLt} !important; }
        .cart-suggest-add:hover  { border-color: ${T.orange} !important; color: ${T.orange} !important; }
        .cart-remove-promo:hover { color: ${T.white} !important; }

        @media (max-width: 480px) {
          .cart-drawer-panel { width: 100vw !important; }
        }
      `}</style>

      {/* ── Backdrop ──────────────────────────────────── */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        999,
          background:    'rgba(0,0,0,0.7)',
          opacity:       isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:    'opacity 0.35s ease',
        }}
      />

      {/* ── Drawer panel ──────────────────────────────── */}
      <div
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position:      'fixed',
          top:           0,
          right:         0,
          height:        '100%',
          width:         420,
          zIndex:        1000,
          background:    T.charcoal,
          borderLeft:    `1px solid ${T.grayDark}`,
          display:       'flex',
          flexDirection: 'column',
          transform:     isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition:    'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >

        {/* ── Header ──────────────────────────────────── */}
        <div style={{
          height:         64,
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          padding:        '0 1.5rem',
          borderBottom:   `1px solid ${T.grayDark}`,
          background:     T.charcoal,
          position:       'sticky',
          top:            0,
          zIndex:         2,
          flexShrink:     0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: T.bebas, fontSize: '1.4rem', letterSpacing: '0.1em', color: T.white }}>
              Your Cart
            </span>
            {totalItems > 0 && (
              <span style={{
                background: T.orange, color: T.black, fontFamily: T.barlow,
                fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20,
              }}>
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={closeCart}
            className="cart-close-btn"
            aria-label="Close cart"
            style={{
              width: 36, height: 36, background: 'transparent',
              border: `1px solid ${T.grayDark}`, color: T.grayLt,
              borderRadius: 2, cursor: 'pointer', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
            }}
          >
            ×
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────── */}
        <div className="cart-drawer-scrollarea" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Empty state */}
          {items.length === 0 ? (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '3rem 1.5rem', gap: '1rem', textAlign: 'center',
            }}>
              <span style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.08)', lineHeight: 1 }}>🛍</span>
              <p style={{ fontFamily: T.bebas, fontSize: '1.5rem', color: T.grayMid, margin: 0 }}>
                Your Cart Is Empty
              </p>
              <p style={{ fontFamily: T.barlow, fontSize: '0.85rem', color: T.grayMid, margin: 0 }}>
                Add something worth wearing.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                style={{
                  display: 'block', width: '100%', marginTop: '0.5rem',
                  padding: '0.85rem 1rem', background: T.orange, color: T.black,
                  fontFamily: T.barlow, fontSize: '0.85rem', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none', textAlign: 'center', borderRadius: 2,
                }}
              >
                Shop the Collection
              </Link>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div style={{ padding: '0.5rem 1.5rem' }}>
                {items.map((item, idx) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display:      'flex',
                      gap:          '1rem',
                      padding:      '1rem 0',
                      borderBottom: idx < items.length - 1
                        ? `1px solid rgba(255,255,255,0.06)`
                        : 'none',
                    }}
                  >
                    {/* Image */}
                    <div style={{
                      width: 80, height: 80, flexShrink: 0,
                      background: T.charcoal2, border: `1px solid ${T.grayDark}`,
                      borderRadius: 2, overflow: 'hidden', position: 'relative', padding: 4,
                    }}>
                      <Image
                        src={(item.color && item.product.colorImages?.[item.color]) || item.product.imageSrc}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          style={{
                            fontFamily: T.barlow, fontSize: '0.95rem', fontWeight: 600,
                            color: T.white, letterSpacing: '0.03em', margin: 0,
                            lineHeight: 1.3, textDecoration: 'none', display: 'block',
                          }}
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="cart-remove-btn"
                          aria-label={`Remove ${item.product.name}`}
                          style={{
                            background: 'transparent', border: 'none', color: T.grayMid,
                            cursor: 'pointer', fontSize: '0.85rem', padding: '0 0 0 4px',
                            flexShrink: 0, transition: 'color 0.2s',
                          }}
                        >
                          ×
                        </button>
                      </div>

                      <p style={{ fontFamily: T.barlow, fontSize: '0.78rem', color: T.grayMid, margin: '0.3rem 0 0' }}>
                        Size: {item.size}
                        {item.color  && ` · Color: ${item.color}`}
                        {item.gender && ` · Fit: ${item.gender}`}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem' }}>
                        {/* Quantity stepper */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: `1px solid ${T.grayDark}`, borderRadius: 2, overflow: 'hidden' }}>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{ width: 28, height: 28, background: T.charcoal2, border: 'none', color: T.white, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                          >−</button>
                          <div style={{ width: 32, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.barlow, fontSize: '0.85rem', color: T.white, borderLeft: `1px solid ${T.grayDark}`, borderRight: `1px solid ${T.grayDark}`, userSelect: 'none' }}>
                            {item.quantity}
                          </div>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{ width: 28, height: 28, background: T.charcoal2, border: 'none', color: T.white, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                          >+</button>
                        </div>

                        <span style={{ fontFamily: T.bebas, fontSize: '1.1rem', color: T.orange }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div style={{ borderTop: `1px solid ${T.grayDark}`, padding: '1rem 1.5rem' }}>
                  <p style={{ fontFamily: T.barlow, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: T.orange, marginBottom: '1rem' }}>
                    Add to Your Order
                  </p>
                  {suggestions.map((p) => (
                    <div key={p.id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                      <div style={{ width: 56, height: 56, flexShrink: 0, background: T.charcoal2, border: `1px solid ${T.grayDark}`, borderRadius: 2, overflow: 'hidden', position: 'relative', padding: 4 }}>
                        <Image src={p.imageSrc} alt={p.name} fill sizes="56px" style={{ objectFit: 'contain', objectPosition: 'center' }} />
                      </div>
                      <Link href={`/shop/${p.slug}`} onClick={closeCart} style={{ flex: 1, minWidth: 0, textDecoration: 'none' }}>
                        <p style={{ fontFamily: T.barlow, fontSize: '0.85rem', fontWeight: 600, color: T.white, margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.name}
                        </p>
                        <p style={{ fontFamily: T.barlow, fontSize: '0.8rem', color: T.orange, margin: '0.2rem 0 0' }}>
                          {formatPrice(p.price)}
                        </p>
                      </Link>
                      <button
                        className="cart-suggest-add"
                        onClick={() => addItem(p, p.sizes[0], p.colors[0] ?? '')}
                        style={{ background: 'transparent', border: `1px solid ${T.grayDark}`, color: T.grayLt, fontFamily: T.barlow, fontSize: '0.7rem', letterSpacing: '0.15em', padding: '0.35rem 0.75rem', cursor: 'pointer', borderRadius: 2, whiteSpace: 'nowrap', textTransform: 'uppercase', transition: 'all 0.2s', flexShrink: 0 }}
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Order summary footer ─────────────────────── */}
        {items.length > 0 && (
          <div style={{ borderTop: `1px solid ${T.grayDark}`, padding: '1.25rem 1.5rem', background: T.charcoal, flexShrink: 0 }}>

            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.grayLt }}>
                Subtotal
              </span>
              <span style={{ fontFamily: T.bebas, fontSize: '1.1rem', color: T.white }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Discount row */}
            {promoApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.green }}>
                    Discount ({appliedCode})
                  </span>
                  <button
                    className="cart-remove-promo"
                    onClick={removePromo}
                    style={{ background: 'transparent', border: 'none', color: T.grayMid, fontSize: '0.72rem', cursor: 'pointer', fontFamily: T.barlow, padding: 0, transition: 'color 0.2s' }}
                  >
                    remove
                  </button>
                </div>
                <span style={{ fontFamily: T.bebas, fontSize: '1.1rem', color: T.green }}>
                  -${discountAmt.toFixed(2)}
                </span>
              </div>
            )}

            {/* Shipping row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: T.grayLt }}>
                Shipping
              </span>
              <span style={{ fontFamily: T.bebas, fontSize: '1.1rem', color: afterDiscount >= 75 ? T.green : T.white }}>
                {afterDiscount >= 75 ? 'FREE' : '$8.99'}
              </span>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid ${T.grayDark}`, paddingTop: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.grayLt }}>
                Total
              </span>
              <span style={{ fontFamily: T.bebas, fontSize: '2rem', color: T.white, lineHeight: 1 }}>
                ${orderTotal.toFixed(2)}
              </span>
            </div>

            {/* Promo code — input or success bar */}
            {!promoApplied ? (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex' }}>
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    style={{
                      flex: 1, background: T.black, border: `1px solid ${T.grayDark}`,
                      borderRight: 'none', color: T.white, fontFamily: T.barlow,
                      fontSize: '0.85rem', padding: '0.65rem 1rem', outline: 'none',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#C4501A'; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = T.grayDark; }}
                  />
                  <button
                    className="cart-apply-btn"
                    onClick={applyPromo}
                    style={{
                      background: T.charcoal2, border: `1px solid ${T.grayDark}`,
                      color: T.grayLt, fontFamily: T.barlow, fontSize: '0.75rem',
                      letterSpacing: '0.15em', padding: '0 1rem', cursor: 'pointer',
                      textTransform: 'uppercase', transition: 'color 0.2s', whiteSpace: 'nowrap',
                    }}
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', color: T.red, margin: '0.35rem 0 0', lineHeight: 1.4 }}>
                    {promoError}
                  </p>
                )}
              </div>
            ) : (
              <div style={{
                background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.3)',
                color: T.green, padding: '0.5rem 1rem', borderRadius: 2,
                fontFamily: T.barlow, fontSize: '0.82rem', marginBottom: '1rem',
              }}>
                ✓ {appliedCode} applied — {Math.round((VALID_CODES[appliedCode] ?? 0) * 100)}% off
              </div>
            )}

            {/* Checkout button */}
            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
              style={{
                width: '100%', height: 52, background: T.orange, color: T.black,
                fontFamily: T.barlow, fontSize: '0.95rem', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              Proceed to Checkout
            </button>

            <p style={{ fontFamily: T.barlow, fontSize: '0.72rem', color: T.grayMid, textAlign: 'center', marginTop: '0.5rem', marginBottom: 0 }}>
              Secure checkout · Free returns
            </p>
          </div>
        )}
      </div>
    </>
  );
}
