'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { sendOrderEmail } from '@/lib/sendOrderEmail';

/* ─── Design tokens ──────────────────────────────────────── */
const T = {
  black:    '#0A0A0A',
  charcoal: '#141414',
  charcoal2:'#1c1c1c',
  orange:   '#E8621A',
  orangeDk: '#C4501A',
  white:    '#F5F2ED',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  green:    '#4CAF50',
  red:      '#E24B4A',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

interface FormData {
  firstName:  string;
  lastName:   string;
  email:      string;
  phone:      string;
  address:    string;
  apartment:  string;
  city:       string;
  state:      string;
  zipCode:    string;
  country:    string;
}

const INITIAL_FORM: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', apartment: '', city: '', state: '',
  zipCode: '', country: 'United States',
};

/* ─── Field component ────────────────────────────────────── */
function Field({
  label, name, value, onChange, error, type = 'text',
  placeholder, required, half,
}: {
  label:        string;
  name:         keyof FormData;
  value:        string;
  onChange:     (name: keyof FormData, val: string) => void;
  error?:       string;
  type?:        string;
  placeholder?: string;
  required?:    boolean;
  half?:        boolean;
}) {
  return (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2', marginBottom: 0 }}>
      <label style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.grayLt, display: 'block', marginBottom: '0.4rem' }}>
        {label}{required && <span style={{ color: T.orange }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        style={{
          width: '100%', background: T.black, border: `1px solid ${error ? T.red : T.grayDark}`,
          color: T.white, fontFamily: T.barlow, fontSize: '0.9rem',
          padding: '0.75rem 1rem', borderRadius: 2, outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e)  => { if (!error) e.currentTarget.style.borderColor = T.orangeDk; }}
        onBlur={(e)   => { if (!error) e.currentTarget.style.borderColor = T.grayDark; }}
      />
      {error && (
        <p style={{ fontFamily: T.barlow, fontSize: '0.72rem', color: T.red, margin: '0.25rem 0 0', lineHeight: 1.4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Select component ───────────────────────────────────── */
function SelectField({
  label, name, value, onChange, options,
}: {
  label:   string;
  name:    keyof FormData;
  value:   string;
  onChange:(name: keyof FormData, val: string) => void;
  options: string[];
}) {
  return (
    <div style={{ gridColumn: 'span 1' }}>
      <label style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: T.grayLt, display: 'block', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        style={{
          width: '100%', background: T.black, border: `1px solid ${T.grayDark}`,
          color: T.white, fontFamily: T.barlow, fontSize: '0.9rem',
          padding: '0.75rem 1rem', borderRadius: 2, outline: 'none', boxSizing: 'border-box',
          appearance: 'none', cursor: 'pointer',
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ─── Checkout Client ────────────────────────────────────── */
export default function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, discount, promoCode, clearCart } = useCart();

  const [formData,     setFormData]     = useState<FormData>(INITIAL_FORM);
  const [errors,       setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [smsConsent,   setSmsConsent]   = useState(false);

  /* Derived totals (mirrors drawer logic) */
  const afterDiscount = totalPrice - discount;
  const shipping      = afterDiscount >= 75 ? 0 : 8.99;
  const orderTotal    = afterDiscount + shipping;

  const handleChange = (name: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim())  errs.lastName  = 'Last name is required.';
    if (!formData.email.trim())     errs.email     = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.address.trim())   errs.address   = 'Street address is required.';
    if (!formData.city.trim())      errs.city      = 'City is required.';
    if (!formData.state.trim())     errs.state     = 'State is required.';
    if (!formData.zipCode.trim())   errs.zipCode   = 'Zip code is required.';
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) errs.zipCode = 'Enter a valid 5-digit zip code.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) { setSubmitError('Your cart is empty.'); return; }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await sendOrderEmail({
        formData,
        items,
        subtotal: totalPrice,
        discount,
        shipping,
        total:     orderTotal,
        promoCode: promoCode ?? '',
      });

      /* Subscribe to Klaviyo list (email always; SMS if consent given + phone provided) */
      await fetch('/api/klaviyo', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          email:      formData.email,
          phone:      formData.phone || undefined,
          smsConsent: smsConsent && !!formData.phone,
        }),
      }).catch(() => { /* non-fatal — don't block order confirmation */ });

      clearCart();
      router.push('/order-confirmation');
    } catch {
      setSubmitError('Something went wrong placing your order. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .checkout-field:focus { border-color: ${T.orangeDk} !important; }
        .checkout-submit:hover:not(:disabled) { opacity: 0.88; }
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-summary { position: static !important; }
        }
        @media (max-width: 640px) {
          .checkout-header { padding: 2rem 1.5rem 0 !important; }
          .checkout-main   { padding: 2rem 1.5rem 4rem !important; }
          .form-row-2      { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: T.black, minHeight: '100vh', paddingTop: 100 }}>

        {/* ── Page header ─────────────────────────────── */}
        <div className="checkout-header" style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 3rem 0' }}>
          <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: T.orange, marginBottom: '0.5rem' }}>
            Almost There
          </p>
          <h1 style={{ fontFamily: T.bebas, fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: T.white, letterSpacing: '0.05em', margin: 0, lineHeight: 0.95 }}>
            Checkout.
          </h1>
        </div>

        {/* ── Main grid ───────────────────────────────── */}
        <div
          className="checkout-grid checkout-main"
          style={{
            maxWidth: 1200, margin: '0 auto',
            padding: '3rem 3rem 6rem',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >

          {/* ── LEFT: form ─────────────────────────────── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Contact section */}
            <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.orange, marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${T.grayDark}` }}>
              Contact Information
            </p>
            <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} type="email" required />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Phone" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Optional" />
              </div>
            </div>

            {/* Shipping section */}
            <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.orange, marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${T.grayDark}` }}>
              Shipping Address
            </p>
            <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <Field label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} required half />
              <Field label="Last Name"  name="lastName"  value={formData.lastName}  onChange={handleChange} error={errors.lastName}  required half />
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} placeholder="Street address" required />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Apartment / Suite" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" />
              </div>
              <Field label="City"  name="city"  value={formData.city}  onChange={handleChange} error={errors.city}  required half />
              <Field label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} required half />
              <Field label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} error={errors.zipCode} required half />
              <SelectField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                options={['United States', 'Canada', 'United Kingdom', 'Australia', 'Other']}
              />
            </div>

            {/* SMS opt-in */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', margin: '1.25rem 0', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: T.orange, flexShrink: 0, cursor: 'pointer' }}
              />
              <span style={{ fontFamily: T.barlow, fontSize: '0.78rem', color: T.grayMid, lineHeight: 1.6 }}>
                Text me new drops, exclusive offers, and order updates from Sworn In USA.
                Message &amp; data rates may apply. Reply STOP to unsubscribe.
                {!formData.phone && (
                  <span style={{ color: 'rgba(255,255,255,0.25)', display: 'block', marginTop: '0.2rem', fontSize: '0.72rem' }}>
                    (Add a phone number above to enable SMS)
                  </span>
                )}
              </span>
            </label>

            {submitError && (
              <p style={{ fontFamily: T.barlow, fontSize: '0.85rem', color: T.red, marginBottom: '1rem', lineHeight: 1.5 }}>
                {submitError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="checkout-submit"
              disabled={isSubmitting}
              style={{
                width: '100%', height: 56, background: T.orange,
                color: T.black, fontFamily: T.barlow, fontSize: '1rem',
                fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                border: 'none', borderRadius: 2, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginTop: '1.5rem', opacity: isSubmitting ? 0.7 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>

            <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', color: T.grayMid, textAlign: 'center', marginTop: '0.75rem' }}>
              🔒 Your information is secure and encrypted
            </p>
          </form>

          {/* ── RIGHT: order summary ───────────────────── */}
          <div
            className="checkout-summary"
            style={{
              position:   'sticky',
              top:        140,
              background: T.charcoal,
              border:     `1px solid ${T.grayDark}`,
              padding:    '1.5rem',
              borderRadius: 2,
            }}
          >
            {/* Top accent line */}
            <div style={{ height: 2, background: `linear-gradient(to right, ${T.orange}, transparent)`, margin: '-1.5rem -1.5rem 1.5rem' }} />

            <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: T.orange, marginBottom: '1.25rem' }}>
              Order Summary
            </p>

            {/* Items */}
            <div style={{ marginBottom: '1rem' }}>
              {items.map((item) => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                  <div style={{ width: 56, height: 56, flexShrink: 0, background: T.charcoal2, border: `1px solid ${T.grayDark}`, borderRadius: 2, overflow: 'hidden', position: 'relative', padding: 4 }}>
                    <Image
                      src={(item.color && item.product.colorImages?.[item.color]) || item.product.imageSrc}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: T.barlow, fontSize: '0.9rem', fontWeight: 600, color: T.white, margin: 0, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', color: T.grayMid, margin: '0.2rem 0 0', lineHeight: 1.5 }}>
                      Size: {item.size} · Qty: {item.quantity}
                      {item.color  && ` · Color: ${item.color}`}
                      {item.gender && ` · Fit: ${item.gender}`}
                    </p>
                  </div>
                  <span style={{ fontFamily: T.bebas, fontSize: '1rem', color: T.orange, flexShrink: 0 }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: `1px solid ${T.grayDark}`, paddingTop: '1rem' }}>
              {[
                { label: 'Subtotal', value: `$${totalPrice.toFixed(2)}`, color: T.white },
                ...(discount > 0 ? [{ label: 'Discount', value: `-$${discount.toFixed(2)}`, color: T.green }] : []),
                { label: 'Shipping', value: afterDiscount >= 75 ? 'FREE' : '$8.99', color: afterDiscount >= 75 ? T.green : T.white },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: T.grayLt }}>{label}</span>
                  <span style={{ fontFamily: T.barlow, fontSize: '0.9rem', color }}>{value}</span>
                </div>
              ))}

              <div style={{ height: 1, background: T.grayDark, margin: '0.75rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: T.barlow, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.white }}>Total</span>
                <span style={{ fontFamily: T.bebas, fontSize: '1.5rem', color: T.orange, lineHeight: 1 }}>
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
