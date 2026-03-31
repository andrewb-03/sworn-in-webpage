'use client';

import Link from 'next/link';

const T = {
  black:  '#0A0A0A',
  orange: '#E8621A',
  white:  '#F5F2ED',
  grayMid:'rgba(255,255,255,0.40)',
  grayLt: 'rgba(255,255,255,0.65)',
  bebas:  'var(--font-bebas), sans-serif',
  barlow: 'var(--font-barlow), sans-serif',
} as const;

export default function OrderConfirmationClient() {
  return (
    <>
      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .confirm-circle {
          animation: popIn 0.4s ease-out forwards;
        }
        @media (max-width: 640px) {
          .confirm-actions { flex-direction: column !important; align-items: center !important; }
          .confirm-actions a { width: 100% !important; max-width: 280px; }
        }
      `}</style>

      <div style={{
        background:     T.black,
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '120px 2rem 4rem',
        position:       'relative',
        overflow:       'hidden',
      }}>

        {/* Ghost background text */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    T.bebas,
          fontSize:      'clamp(4rem, 12vw, 10rem)',
          letterSpacing: '0.05em',
          color:         'rgba(232,98,26,0.04)',
          pointerEvents: 'none',
          whiteSpace:    'nowrap',
          userSelect:    'none',
        }}>
          CONFIRMED
        </div>

        {/* Success circle */}
        <div
          className="confirm-circle"
          style={{
            width:          96,
            height:         96,
            borderRadius:   '50%',
            border:         `2px solid ${T.orange}`,
            background:     'rgba(232,98,26,0.08)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            margin:         '0 auto 2rem',
            fontSize:       '2.5rem',
            color:          T.orange,
          }}
          aria-hidden="true"
        >
          ✓
        </div>

        {/* Eyebrow */}
        <p style={{
          fontFamily:    T.barlow,
          fontSize:      '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color:         T.orange,
          marginBottom:  '0.75rem',
        }}>
          Order Placed
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily:   T.bebas,
          fontSize:     'clamp(2.5rem, 5vw, 4rem)',
          color:        T.white,
          lineHeight:   0.95,
          marginBottom: '1.25rem',
          letterSpacing:'0.04em',
        }}>
          You&apos;re All<br />Set.
        </h1>

        {/* Body */}
        <p style={{
          fontFamily:   T.barlow,
          fontSize:     '1rem',
          fontWeight:   300,
          color:        T.grayLt,
          lineHeight:   1.8,
          maxWidth:     480,
          margin:       '0 auto 1rem',
        }}>
          Thanks for your order. We&apos;ve sent a confirmation to your email
          and we&apos;ll get it shipped out within 2–3 business days.
        </p>

        {/* Contact note */}
        <p style={{ fontFamily: T.barlow, fontSize: '0.85rem', color: T.grayMid, marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Questions? Email us at{' '}
          <a href="mailto:john@sworninusa.com" style={{ color: T.orange, textDecoration: 'none' }}>
            john@sworninusa.com
          </a>
          {' '}or call (408) 314-1411
        </p>

        {/* CTA buttons */}
        <div className="confirm-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/shop"
            style={{
              display:        'inline-block',
              padding:        '0.875rem 2rem',
              background:     T.orange,
              color:          T.black,
              fontFamily:     T.barlow,
              fontSize:       '0.9rem',
              fontWeight:     700,
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              borderRadius:   2,
            }}
          >
            Shop More
          </Link>
          <Link
            href="/"
            style={{
              display:        'inline-block',
              padding:        '0.875rem 2rem',
              background:     'transparent',
              color:          T.white,
              fontFamily:     T.barlow,
              fontSize:       '0.9rem',
              fontWeight:     700,
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              borderRadius:   2,
              border:         `1px solid rgba(255,255,255,0.2)`,
            }}
          >
            Go Home
          </Link>
        </div>

        {/* Bottom brand stamp */}
        <p style={{
          position:      'absolute',
          bottom:        '2rem',
          left:          '50%',
          transform:     'translateX(-50%)',
          fontFamily:    T.bebas,
          fontSize:      '0.85rem',
          letterSpacing: '0.3em',
          color:         'rgba(255,255,255,0.06)',
          whiteSpace:    'nowrap',
          userSelect:    'none',
        }}>
          SWORN IN USA
        </p>
      </div>
    </>
  );
}
