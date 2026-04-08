'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ─── Design tokens ──────────────────────────────────────── */
const T = {
  black:    '#0A0A0A',
  charcoal: '#141414',
  charcoal2:'#1c1c1c',
  orange:   '#E8621A',
  orangeLt: '#FF7A35',
  orangeDk: '#C4501A',
  white:    '#F5F2ED',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  red:      '#E24B4A',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* Don't show pop-up on these paths */
const EXCLUDED = ['/checkout', '/order-confirmation'];
const STORAGE_KEY = 'sworn-in-popup-dismissed';
const DELAY_MS    = 5000; // 5 seconds after page load

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [visible,    setVisible]    = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [email,      setEmail]      = useState('');
  const [phone,      setPhone]      = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [status,     setStatus]     = useState<Status>('idle');
  const [errorMsg,   setErrorMsg]   = useState('');

  useEffect(() => {
    setMounted(true);

    /* Don't show on excluded pages */
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return;

    /* Don't show if already dismissed */
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch { /* ignore */ }

    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/klaviyo', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          email,
          phone:      phone || undefined,
          smsConsent: smsConsent && !!phone,
        }),
      });

      if (res.ok) {
        setStatus('success');
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  /* Don't render anything server-side or before mount */
  if (!mounted) return null;
  if (!visible)  return null;

  return (
    <>
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .popup-backdrop {
          animation: popupFadeIn 0.35s ease forwards;
        }
        .popup-card {
          animation: popupSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .popup-close:hover {
          border-color: ${T.white} !important;
          color: ${T.white} !important;
        }
        .popup-submit:hover:not(:disabled) {
          background: ${T.orangeLt} !important;
        }
        .popup-input:focus {
          border-color: ${T.orangeDk} !important;
          outline: none;
        }
        @media (max-width: 520px) {
          .popup-card {
            width: calc(100vw - 2rem) !important;
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>

      {/* ── Backdrop ──────────────────────────────── */}
      <div
        className="popup-backdrop"
        onClick={dismiss}
        aria-hidden="true"
        style={{
          position:   'fixed',
          inset:      0,
          zIndex:     2000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* ── Modal card ────────────────────────────── */}
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-label="Join the Sworn In USA crew"
        style={{
          position:   'fixed',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%, -50%)',
          zIndex:     2001,
          width:      480,
          maxWidth:   'calc(100vw - 2rem)',
          background: T.charcoal,
          border:     `1px solid ${T.grayDark}`,
          borderRadius: 4,
          overflow:   'hidden',
        }}
      >
        {/* Orange top accent bar */}
        <div style={{ height: 3, background: `linear-gradient(to right, ${T.orange}, ${T.orangeLt})` }} />

        {/* Ghost background text */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    T.bebas,
          fontSize:      '7rem',
          letterSpacing: '0.05em',
          color:         'rgba(232,98,26,0.04)',
          pointerEvents: 'none',
          whiteSpace:    'nowrap',
          userSelect:    'none',
          lineHeight:    1,
        }}>
          SWORN IN
        </div>

        <div style={{ position: 'relative', padding: '2.5rem 2.5rem 2rem' }}>

          {/* Close button */}
          <button
            onClick={dismiss}
            className="popup-close"
            aria-label="Close"
            style={{
              position:   'absolute',
              top:        '1.25rem',
              right:      '1.25rem',
              width:      32,
              height:     32,
              background: 'transparent',
              border:     `1px solid ${T.grayDark}`,
              color:      T.grayMid,
              borderRadius: 2,
              cursor:     'pointer',
              fontSize:   '1rem',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            ×
          </button>

          {status === 'success' ? (
            /* ── Success state ────────────────────── */
            <div style={{ textAlign: 'center', padding: '1rem 0 0.5rem' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: `2px solid ${T.orange}`,
                background: 'rgba(232,98,26,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.75rem', color: T.orange,
              }}>
                ✓
              </div>
              <h2 style={{ fontFamily: T.bebas, fontSize: '2.5rem', color: T.white, letterSpacing: '0.06em', margin: '0 0 0.75rem', lineHeight: 0.95 }}>
                You&apos;re In.
              </h2>
              <p style={{ fontFamily: T.barlow, fontSize: '0.9rem', fontWeight: 300, color: T.grayLt, lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                Watch your inbox for new drops and exclusive offers from Sworn In USA.
              </p>
              <button
                onClick={dismiss}
                style={{
                  background: T.orange, color: T.black, border: 'none',
                  fontFamily: T.barlow, fontSize: '0.85rem', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '0.75rem 2rem', borderRadius: 2, cursor: 'pointer',
                }}
              >
                Let&apos;s Go
              </button>
            </div>
          ) : (
            /* ── Form state ───────────────────────── */
            <>
              {/* Eyebrow */}
              <p style={{ fontFamily: T.barlow, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: T.orange, marginBottom: '0.75rem' }}>
                Stay in the Loop
              </p>

              {/* Headline */}
              <h2 style={{ fontFamily: T.bebas, fontSize: 'clamp(2rem, 5vw, 2.75rem)', color: T.white, letterSpacing: '0.05em', margin: '0 0 0.5rem', lineHeight: 0.95 }}>
                Join the Crew.
              </h2>

              {/* Subtext */}
              <p style={{ fontFamily: T.barlow, fontSize: '0.85rem', fontWeight: 300, color: T.grayMid, lineHeight: 1.7, margin: '0 0 1.75rem' }}>
                New drops, exclusive offers, and updates — straight to your inbox (and phone if you want).
              </p>

              <form onSubmit={handleSubmit} noValidate>

                {/* Email */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <input
                    className="popup-input"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setErrorMsg(''); } }}
                    placeholder="Your email address *"
                    autoComplete="email"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: T.black, border: `1px solid ${status === 'error' && !phone ? T.red : T.grayDark}`,
                      color: T.white, fontFamily: T.barlow, fontSize: '0.9rem',
                      padding: '0.75rem 1rem', borderRadius: 2,
                      transition: 'border-color 0.2s',
                    }}
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <input
                    className="popup-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (optional — for SMS)"
                    autoComplete="tel"
                    disabled={status === 'loading'}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: T.black, border: `1px solid ${T.grayDark}`,
                      color: T.white, fontFamily: T.barlow, fontSize: '0.9rem',
                      padding: '0.75rem 1rem', borderRadius: 2,
                      transition: 'border-color 0.2s',
                    }}
                  />
                </div>

                {/* SMS consent — only when phone entered */}
                {phone.trim().length > 0 && (
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      style={{ marginTop: 3, width: 14, height: 14, accentColor: T.orange, flexShrink: 0, cursor: 'pointer' }}
                    />
                    <span style={{ fontFamily: T.barlow, fontSize: '0.72rem', color: T.grayMid, lineHeight: 1.6 }}>
                      Yes, text me new drops and offers from Sworn In USA. Msg &amp; data rates may apply. Reply STOP to opt out.
                    </span>
                  </label>
                )}

                {/* Error */}
                {errorMsg && (
                  <p style={{ fontFamily: T.barlow, fontSize: '0.75rem', color: T.red, margin: '0 0 0.75rem', lineHeight: 1.4 }}>
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="popup-submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', height: 50,
                    background: T.orange, color: T.black,
                    fontFamily: T.barlow, fontSize: '0.9rem', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    border: 'none', borderRadius: 2,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    transition: 'background 0.2s, opacity 0.2s',
                    marginBottom: '1rem',
                  }}
                >
                  {status === 'loading' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.25)', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                      Joining…
                    </span>
                  ) : "I'm In"}
                </button>

                {/* Legal + dismiss */}
                <p style={{ fontFamily: T.barlow, fontSize: '0.68rem', color: 'rgba(255,255,255,0.22)', lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
                  By signing up you agree to receive marketing emails from Sworn In USA. Unsubscribe any time.{' '}
                  <button
                    type="button"
                    onClick={dismiss}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontFamily: T.barlow, fontSize: '0.68rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                  >
                    No thanks
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
