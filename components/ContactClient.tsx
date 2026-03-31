'use client';

import { useState, useRef } from 'react';

/* ─── Design tokens ──────────────────────────────────────── */
const T = {
  black:    '#0A0A0A',
  charcoal: '#141414',
  orange:   '#E8621A',
  orangeDk: '#C4501A',
  orangeLt: '#FF7A35',
  white:    '#F5F2ED',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  errorRed: '#E24B4A',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* ─── FAQ data ───────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Most orders ship within 2–3 business days. Standard shipping typically takes 5–7 business days after that. You\'ll receive a tracking number once your order ships.',
  },
  {
    q: 'Do you offer free shipping?',
    a: 'Yes. Free shipping on all orders over $75. Orders under $75 have a flat rate shipping fee calculated at checkout.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of purchase for unworn, unwashed items in original condition. Email us at john@sworninusa.com to start a return.',
  },
  {
    q: 'How do I know what size to order?',
    a: 'Our clothing fits true to size. If you are between sizes we recommend sizing up, especially for hoodies. Still unsure? Email us and we will help you figure it out.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Contact us as soon as possible at john@sworninusa.com or (408) 314-1411. We will do our best to accommodate changes before the order ships.',
  },
  {
    q: 'Do you offer wholesale or bulk orders?',
    a: 'Yes. Reach out to john@sworninusa.com with your inquiry and we will get back to you with pricing and minimums.',
  },
] as const;

/* ─── Contact info blocks ────────────────────────────────── */
const CONTACT_BLOCKS = [
  {
    label: 'Phone',
    value: '(408) 314-1411',
    sub:   'Available Mon–Fri, 9am–5pm PT',
    href:  'tel:+14083141411',
  },
  {
    label: 'Email',
    value: 'john@sworninusa.com',
    sub:   'We typically respond within 24 hours',
    href:  'mailto:john@sworninusa.com',
  },
  {
    label: 'Orders & Shipping',
    value: 'john@sworninusa.com',
    sub:   'For order status, tracking, and shipping questions',
    href:  'mailto:john@sworninusa.com',
  },
  {
    label: 'Returns & Exchanges',
    value: 'john@sworninusa.com',
    sub:   'Easy returns within 30 days of purchase',
    href:  'mailto:john@sworninusa.com',
  },
] as const;

const POLICY_ITEMS = [
  'Free shipping on orders over $75',
  'Ships within 2–3 business days',
  'Returns accepted within 30 days',
  'Questions about sizing? We can help',
];

/* ─── Form state type ────────────────────────────────────── */
interface FormData {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  subject:   string;
  message:   string;
}

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName:  '',
  email:     '',
  phone:     '',
  subject:   '',
  message:   '',
};

/* ─── Shared label ───────────────────────────────────────── */
function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontFamily:    T.barlow,
        fontSize:      '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         T.grayLt,
        display:       'block',
        marginBottom:  '0.4rem',
      }}
    >
      {children}
    </label>
  );
}

/* ─── Shared input style builder ────────────────────────── */
function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width:        '100%',
    background:   T.black,
    border:       `1px solid ${hasError ? T.errorRed : T.grayDark}`,
    color:        T.white,
    fontFamily:   T.barlow,
    fontSize:     '0.9rem',
    padding:      '0.75rem 1rem',
    borderRadius: 2,
    outline:      'none',
    transition:   'border-color 0.2s',
    boxSizing:    'border-box',
  };
}

/* ─── Main component ─────────────────────────────────────── */
export default function ContactClient() {
  const [formData,     setFormData]     = useState<FormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [errors,       setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});
  const [openFaq,      setOpenFaq]      = useState<number | null>(null);
  const firstErrorRef = useRef<HTMLDivElement | null>(null);

  /* ── Helpers ────────────────────────────────────── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = T.orangeDk;
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, hasError: boolean) => {
    e.currentTarget.style.borderColor = hasError ? T.errorRed : T.grayDark;
  };

  /* ── Validation ─────────────────────────────────── */
  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) next.firstName = 'First name is required';
    if (!formData.lastName.trim())  next.lastName  = 'Last name is required';
    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Please enter a valid email';
    }
    if (!formData.subject || formData.subject === '') next.subject = 'Please select a subject';
    if (!formData.message.trim()) next.message = 'Message is required';

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setTimeout(() => firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return false;
    }
    return true;
  };

  /* ── Submit ─────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  /* ── Error ref assignment ───────────────────────── */
  const firstErrField = (Object.keys(errors) as (keyof FormData)[]).find((k) => errors[k]);

  return (
    <>
      {/* ── Scoped styles ───────────────────────────── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0A0A0A;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          flex-shrink: 0;
        }

        .contact-submit-btn {
          width: 100%; height: 52px;
          background: ${T.orange}; color: ${T.black};
          font-family: ${T.barlow}; font-size: 0.95rem;
          font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none; border-radius: 2px;
          cursor: pointer; transition: background 0.2s;
          display: flex; align-items: center;
          justify-content: center; gap: 0;
        }
        .contact-submit-btn:hover:not(:disabled) { background: ${T.orangeLt}; }
        .contact-submit-btn:disabled { opacity: 0.8; cursor: not-allowed; }

        .contact-ghost-btn {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          border: 1px solid ${T.orange};
          color: ${T.orange};
          background: transparent;
          font-family: ${T.barlow};
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          border-radius: 2px; cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .contact-ghost-btn:hover { background: ${T.orange}; color: ${T.black}; }

        .contact-val-link { color: ${T.white}; text-decoration: none; transition: color 0.2s; }
        .contact-val-link:hover { color: ${T.orange}; }

        .faq-answer-wrap {
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 6rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-header  { padding: 3rem 1.5rem 0 !important; }
          .contact-main    { padding: 3rem 1.5rem 5rem !important; }
          .contact-faq     { padding: 0 1.5rem 5rem !important; }
          .contact-main-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .contact-blocks  { gap: 1.5rem !important; }
        }
      `}</style>

      <div style={{ background: T.black, minHeight: '100vh', paddingTop: 120 }}>

        {/* ════════════════════════════════════════════
            PAGE HEADER
        ════════════════════════════════════════════ */}
        <div
          className="contact-header"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 3rem 0' }}
        >
          <p style={{
            fontFamily:    T.barlow,
            fontSize:      '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         T.orange,
            margin:        '0 0 0.5rem',
          }}>
            Hit Us Up
          </p>
          <h1 style={{
            fontFamily: T.bebas,
            fontSize:   'clamp(3.5rem, 7vw, 6rem)',
            color:      T.white,
            lineHeight: 0.92,
            margin:     0,
          }}>
            Let&apos;s{' '}
            <span style={{ color: T.orange }}>Talk.</span>
          </h1>
          <div style={{ width: 60, height: 2, background: T.orange, marginTop: '1rem' }} />
        </div>

        {/* ════════════════════════════════════════════
            MAIN CONTENT
        ════════════════════════════════════════════ */}
        <div
          className="contact-main"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 3rem 8rem' }}
        >
          <div className="contact-main-grid">

            {/* ── LEFT: Contact info ──────────────── */}
            <div>
              <h2 style={{
                fontFamily:    T.bebas,
                fontSize:      '1.8rem',
                color:         T.white,
                letterSpacing: '0.05em',
                margin:        '0 0 2rem',
              }}>
                Reach Out.
              </h2>

              {/* Contact blocks */}
              <div
                className="contact-blocks"
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {CONTACT_BLOCKS.map((block) => (
                  <div
                    key={block.label}
                    style={{
                      borderLeft:  `2px solid ${T.orange}`,
                      paddingLeft: '1.25rem',
                    }}
                  >
                    <p style={{
                      fontFamily:    T.barlow,
                      fontSize:      '0.7rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color:         T.orange,
                      margin:        '0 0 0.4rem',
                    }}>
                      {block.label}
                    </p>
                    <a
                      href={block.href}
                      className="contact-val-link"
                      style={{
                        fontFamily:    T.barlow,
                        fontSize:      '1.1rem',
                        fontWeight:    600,
                        letterSpacing: '0.03em',
                        display:       'block',
                      }}
                    >
                      {block.value}
                    </a>
                    <p style={{
                      fontFamily: T.barlow,
                      fontSize:   '0.82rem',
                      fontWeight: 300,
                      color:      T.grayMid,
                      margin:     '0.25rem 0 0',
                    }}>
                      {block.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Policies note */}
              <div style={{
                marginTop:   '3rem',
                padding:     '1.5rem',
                background:  T.charcoal,
                border:      `1px solid ${T.grayDark}`,
                borderLeft:  `3px solid ${T.orange}`,
                borderRadius: 2,
              }}>
                <p style={{
                  fontFamily:    T.barlow,
                  fontSize:      '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         T.orange,
                  margin:        '0 0 0.75rem',
                }}>
                  Good to Know
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {POLICY_ITEMS.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: T.barlow,
                        fontSize:   '0.85rem',
                        fontWeight: 300,
                        color:      T.grayLt,
                        lineHeight: 2,
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── RIGHT: Contact form ─────────────── */}
            <div style={{
              background:   T.charcoal,
              border:       `1px solid ${T.grayDark}`,
              padding:      '2.5rem',
              borderRadius: 2,
              position:     'relative',
              overflow:     'hidden',
            }}>
              {/* Top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position:   'absolute',
                  top:        0,
                  left:       0,
                  right:      0,
                  height:     2,
                  background: `linear-gradient(to right, ${T.orange}, transparent)`,
                }}
              />

              {isSubmitted ? (
                /* ── Success state ──────────────── */
                <div style={{
                  textAlign: 'center',
                  padding:   '3rem 2rem',
                }}>
                  <div style={{
                    width:          72,
                    height:         72,
                    borderRadius:   '50%',
                    background:     'rgba(232,98,26,0.12)',
                    border:         `2px solid ${T.orange}`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    margin:         '0 auto 1.5rem',
                  }}>
                    <span style={{ fontSize: '2rem', color: T.orange, lineHeight: 1 }}>✓</span>
                  </div>
                  <h3 style={{
                    fontFamily:    T.bebas,
                    fontSize:      '2rem',
                    color:         T.white,
                    letterSpacing: '0.06em',
                    margin:        '0 0 1rem',
                  }}>
                    Got It.
                  </h3>
                  <p style={{
                    fontFamily:  T.barlow,
                    fontSize:    '0.9rem',
                    fontWeight:  300,
                    color:       T.grayMid,
                    lineHeight:  1.7,
                    maxWidth:    320,
                    margin:      '0 auto 2rem',
                  }}>
                    We&apos;ll get back to you within 24 hours. Talk soon.
                  </p>
                  <button onClick={resetForm} className="contact-ghost-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* ── Form ─────────────────────────── */
                <>
                  <h2 style={{
                    fontFamily:    T.bebas,
                    fontSize:      '1.8rem',
                    color:         T.white,
                    letterSpacing: '0.05em',
                    margin:        '0 0 0.5rem',
                  }}>
                    Drop Us a Line.
                  </h2>
                  <p style={{
                    fontFamily:   T.barlow,
                    fontSize:     '0.85rem',
                    fontWeight:   300,
                    color:        T.grayMid,
                    margin:       '0 0 2rem',
                  }}>
                    Fill it out and we&apos;ll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>

                    {/* Row 1: First + Last name */}
                    <div
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}
                      ref={firstErrField === 'firstName' || firstErrField === 'lastName' ? firstErrorRef : null}
                    >
                      <div>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={focusBorder}
                          onBlur={(e) => blurBorder(e, !!errors.firstName)}
                          placeholder="John"
                          autoComplete="given-name"
                          style={inputStyle(!!errors.firstName)}
                        />
                        {errors.firstName && (
                          <span style={{ fontSize: '0.75rem', color: T.errorRed, marginTop: '0.3rem', display: 'block' }}>
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      <div>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          onFocus={focusBorder}
                          onBlur={(e) => blurBorder(e, !!errors.lastName)}
                          placeholder="Smith"
                          autoComplete="family-name"
                          style={inputStyle(!!errors.lastName)}
                        />
                        {errors.lastName && (
                          <span style={{ fontSize: '0.75rem', color: T.errorRed, marginTop: '0.3rem', display: 'block' }}>
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div
                      style={{ marginBottom: '1.25rem' }}
                      ref={firstErrField === 'email' ? firstErrorRef : null}
                    >
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={focusBorder}
                        onBlur={(e) => blurBorder(e, !!errors.email)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        style={inputStyle(!!errors.email)}
                      />
                      {errors.email && (
                        <span style={{ fontSize: '0.75rem', color: T.errorRed, marginTop: '0.3rem', display: 'block' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Row 3: Phone (optional) */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <FieldLabel htmlFor="phone">
                        Phone{' '}
                        <span style={{ color: T.grayMid, fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>
                          (optional)
                        </span>
                      </FieldLabel>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={focusBorder}
                        onBlur={(e) => blurBorder(e, false)}
                        placeholder="(555) 000-0000"
                        autoComplete="tel"
                        style={inputStyle(false)}
                      />
                    </div>

                    {/* Row 4: Subject */}
                    <div
                      style={{ marginBottom: '1.25rem' }}
                      ref={firstErrField === 'subject' ? firstErrorRef : null}
                    >
                      <FieldLabel htmlFor="subject">Subject</FieldLabel>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={focusBorder}
                        onBlur={(e) => blurBorder(e, !!errors.subject)}
                        style={{
                          ...inputStyle(!!errors.subject),
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23${T.grayMid.replace('#','').replace('rgba(255,255,255,0.40)', 'aaa')}' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="" disabled>Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Question">Order Question</option>
                        <option value="Shipping & Tracking">Shipping &amp; Tracking</option>
                        <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                        <option value="Size Help">Size Help</option>
                        <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <span style={{ fontSize: '0.75rem', color: T.errorRed, marginTop: '0.3rem', display: 'block' }}>
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Row 5: Message */}
                    <div
                      style={{ marginBottom: '1.25rem' }}
                      ref={firstErrField === 'message' ? firstErrorRef : null}
                    >
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={focusBorder}
                        onBlur={(e) => blurBorder(e, !!errors.message)}
                        placeholder="Write your message here..."
                        maxLength={1000}
                        rows={6}
                        style={{
                          ...inputStyle(!!errors.message),
                          minHeight:  140,
                          resize:     'vertical',
                          lineHeight: 1.7,
                        }}
                      />
                      <div style={{
                        display:        'flex',
                        justifyContent: 'space-between',
                        alignItems:     'center',
                        marginTop:      '0.3rem',
                      }}>
                        {errors.message ? (
                          <span style={{ fontSize: '0.75rem', color: T.errorRed }}>
                            {errors.message}
                          </span>
                        ) : <span />}
                        <span style={{ fontFamily: T.barlow, fontSize: '0.75rem', color: T.grayMid }}>
                          {formData.message.length} / 1000
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                  </form>
                </>
              )}
            </div>

          </div>
        </div>

        {/* ════════════════════════════════════════════
            FAQ SECTION
        ════════════════════════════════════════════ */}
        <div
          className="contact-faq"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem 8rem' }}
        >
          <p style={{
            fontFamily:    T.barlow,
            fontSize:      '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         T.orange,
            margin:        '0 0 0.75rem',
          }}>
            Quick Answers.
          </p>
          <h2 style={{
            fontFamily:   T.bebas,
            fontSize:     'clamp(2rem, 4vw, 3rem)',
            color:        T.white,
            margin:       '0 0 2.5rem',
            lineHeight:   0.95,
          }}>
            Quick Answers.
          </h2>

          <div style={{ borderTop: `1px solid ${T.grayDark}` }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} style={{ borderBottom: `1px solid ${T.grayDark}` }}>

                  {/* Question row */}
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    style={{
                      width:          '100%',
                      display:        'flex',
                      justifyContent: 'space-between',
                      alignItems:     'center',
                      padding:        '1.25rem 0',
                      background:     'transparent',
                      border:         'none',
                      cursor:         'pointer',
                      textAlign:      'left',
                      gap:            '1rem',
                    }}
                  >
                    <span style={{
                      fontFamily:    T.barlow,
                      fontSize:      '1rem',
                      fontWeight:    600,
                      color:         T.white,
                      letterSpacing: '0.03em',
                      lineHeight:    1.4,
                    }}>
                      {faq.q}
                    </span>
                    <span style={{
                      color:      T.orange,
                      fontSize:   '1.2rem',
                      lineHeight: 1,
                      flexShrink: 0,
                      transform:  isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      userSelect: 'none',
                    }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className="faq-answer-wrap"
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      opacity:   isOpen ? 1 : 0,
                    }}
                  >
                    <p style={{
                      fontFamily: T.barlow,
                      fontSize:   '0.9rem',
                      fontWeight: 300,
                      color:      T.grayLt,
                      lineHeight: 1.8,
                      padding:    '0 0 1.25rem',
                      maxWidth:   720,
                      margin:     0,
                    }}>
                      {faq.a}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
