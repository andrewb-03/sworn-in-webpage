'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* ─── Values data ────────────────────────────────────────── */
const VALUES = [
  {
    num:   '01',
    title: 'Comfortable. Expressive. Yours.',
    body:  "We make klothing people actually want to wear. Comfortable fit, quality fabric, and designs that say something.",
  },
  {
    num:   '02',
    title: 'No Filter. No Apologies.',
    body:  "We don't overthink it. If it feels right and looks good, we make it. Simple as that.",
  },
  {
    num:   '03',
    title: 'Built to Last.',
    body:  'Cheap klothing is a waste of money. We build pieces that hold up wash after wash, wear after wear.',
  },
  {
    num:   '04',
    title: 'Say What You Mean.',
    body:  "Your klothing talks before you do. Make sure it's saying the right thing.",
  },
] as const;

/* ─── Shared eyebrow label ───────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily:    T.barlow,
      fontSize:      '0.75rem',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color:         T.orange,
      marginBottom:  '0.75rem',
      margin:        '0 0 0.75rem',
    }}>
      {children}
    </p>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function AboutClient() {
  return (
    <>
      {/* ── Scoped styles ───────────────────────────── */}
      <style>{`
        /* ── Panel hover links ── */
        .about-panel-link {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.6rem 1.5rem;
          border: 1px solid ${T.orange};
          color: ${T.orange};
          font-family: ${T.barlow};
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s;
        }
        .about-panel-link:hover {
          background: ${T.orange};
          color: ${T.black};
        }

        /* ── Value cards ── */
        .about-val-card {
          background: ${T.charcoal};
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .about-val-card:hover { background: ${T.charcoal2}; }

        /* ── CTA button ── */
        .about-cta-btn {
          display: inline-block;
          padding: 1.25rem 3.5rem;
          background: ${T.orange};
          color: ${T.black};
          font-family: ${T.barlow};
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, transform 0.15s;
        }
        .about-cta-btn:hover {
          background: ${T.orangeLt};
          transform: translateY(-1px);
        }

        /* ── Email link ── */
        .about-email-link { color: ${T.orange}; text-decoration: none; transition: color 0.2s; }
        .about-email-link:hover { color: ${T.orangeLt}; }

        /* ── Layout helpers ── */
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: ${T.grayDark};
          border: 1px solid ${T.grayDark};
        }
        .about-split {
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
          height: 100vh;
          min-height: 700px;
          max-height: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          position: relative;
        }
        .about-split-panel {
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
        }
        .about-contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .about-contact-right {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-hero    { height: 60vh !important; }
          .about-icon    { width: 160px !important; }
          .about-s2      { padding: 5rem 1.5rem !important; }
          .about-quote   { font-size: 7rem !important; top: 2rem !important; }
          .about-values-section { padding: 0 1.5rem 5rem !important; }
          .about-values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-val-card { padding: 2rem 1.5rem !important; }
          .about-split { grid-template-columns: 1fr !important; height: auto !important; }
          .about-split-panel { height: 60vw !important; min-height: 320px !important; background-position: center top !important; }
          .about-panel-right-label {
            left: 2.5rem !important;
            right: auto !important;
            text-align: left !important;
          }
          .about-contact-strip { padding: 3rem 1.5rem !important; }
          .about-contact-inner { flex-direction: column !important; align-items: flex-start !important; }
          .about-contact-right { flex-direction: column !important; align-items: flex-start !important; gap: 1.25rem !important; }
          .about-s6 { padding: 5rem 1.5rem !important; }
          .about-s6-ghost { font-size: 6rem !important; }
        }

        @media (max-width: 480px) {
          .about-values-grid { grid-template-columns: repeat(1, 1fr) !important; }
          .about-split-panel { height: 60vw !important; min-height: 260px !important; }
        }
      `}</style>

      <div style={{ background: T.black, minHeight: '100vh', paddingTop: 120 }}>

        {/* ════════════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════════════ */}
        <div
          className="about-hero"
          style={{
            width:        '100%',
            height:       '80vh',
            minHeight:    560,
            position:     'relative',
            overflow:     'hidden',
            background:   T.charcoal,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(232, 98, 26, 0.025) 8px,
              rgba(232, 98, 26, 0.025) 9px
            )`,
          }}
        >
          {/* Ghost background text */}
          <p
            aria-hidden="true"
            style={{
              position:      'absolute',
              bottom:        '-2rem',
              left:          '50%',
              transform:     'translateX(-50%)',
              fontFamily:    T.bebas,
              fontSize:      'clamp(10rem, 25vw, 22rem)',
              color:         'rgba(232, 98, 26, 0.05)',
              whiteSpace:    'nowrap',
              pointerEvents: 'none',
              letterSpacing: '0.05em',
              lineHeight:    1,
              margin:        0,
              userSelect:    'none',
            }}
          >
            SWORN IN
          </p>

          {/* Brand icon */}
          <div
            className="about-icon"
            style={{
              position:  'absolute',
              top:       '50%',
              left:      '50%',
              transform: 'translate(-50%, -50%)',
              width:     220,
            }}
          >
            <Image
              src="/images/logos/sworn-in-icon.png"
              alt="Sworn In USA"
              width={220}
              height={220}
              style={{
                width:  '100%',
                height: 'auto',
                filter: 'drop-shadow(0 8px 40px rgba(232,98,26,0.3)) drop-shadow(0 2px 8px rgba(0,0,0,0.9))',
              }}
              priority
            />
          </div>

          {/* Bottom gradient fade */}
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     200,
              background: `linear-gradient(to top, ${T.black} 0%, transparent 100%)`,
            }}
          />

          {/* Bottom center text */}
          <div style={{
            position:  'absolute',
            bottom:    '3rem',
            left:      '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex:    2,
            whiteSpace:'nowrap',
          }}>
            <Eyebrow>Est. 2024</Eyebrow>
            <p style={{
              fontFamily:    T.bebas,
              fontSize:      'clamp(2rem, 4vw, 3rem)',
              color:         T.white,
              letterSpacing: '0.08em',
              margin:        0,
              lineHeight:    1.1,
            }}>
              Say What You Mean. Wear What You Feel.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 2 — BRAND STATEMENT
        ════════════════════════════════════════════ */}
        <div
          className="about-s2"
          style={{
            maxWidth:  900,
            margin:    '0 auto',
            padding:   '8rem 3rem',
            textAlign: 'center',
            position:  'relative',
          }}
        >
          {/* Large opening quote */}
          <span
            className="about-quote"
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           '4rem',
              left:          '3rem',
              fontFamily:    T.bebas,
              fontSize:      '12rem',
              lineHeight:    1,
              color:         'rgba(232, 98, 26, 0.08)',
              pointerEvents: 'none',
              userSelect:    'none',
            }}
          >
            &ldquo;
          </span>

          <h2 style={{
            fontFamily:    T.bebas,
            fontSize:      'clamp(2.2rem, 4vw, 3.5rem)',
            color:         T.white,
            lineHeight:    1.05,
            letterSpacing: '0.03em',
            marginBottom:  '3rem',
            position:      'relative',
            zIndex:        1,
          }}>
            Wear What<br />You Mean.
          </h2>

          <p style={{
            fontFamily:  T.barlow,
            fontSize:    '1.05rem',
            fontWeight:  300,
            color:       'rgba(245,242,237,0.65)',
            lineHeight:  1.9,
            maxWidth:    640,
            margin:      '0 auto',
            position:    'relative',
            zIndex:      1,
          }}>
            Sworn In USA started with a simple idea — that what you put on your back
            says something about who you are. We make two kinds of klothing: the kind
            that shows the world what you stand for, and the kind that shows the world
            exactly how you feel. Either way, we keep it real. No filter. No apologies.
            Just klothing that means something.
          </p>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 3 — VALUES GRID
        ════════════════════════════════════════════ */}
        <div
          className="about-values-section"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 3rem 8rem' }}
        >
          <Eyebrow>What We&apos;re About</Eyebrow>
          <h2 style={{
            fontFamily:   T.bebas,
            fontSize:     'clamp(2.5rem, 5vw, 4rem)',
            color:        T.white,
            margin:       '0 0 3rem',
            lineHeight:   0.95,
          }}>
            Keeping It Real.
          </h2>

          <div className="about-values-grid">
            {VALUES.map((v) => (
              <div key={v.num} className="about-val-card">
                {/* Ghost number */}
                <span aria-hidden="true" style={{
                  position:      'absolute',
                  top:           '1rem',
                  right:         '1.5rem',
                  fontFamily:    T.bebas,
                  fontSize:      '4rem',
                  lineHeight:    1,
                  color:         'rgba(232,98,26,0.08)',
                  letterSpacing: '0.05em',
                  userSelect:    'none',
                }}>
                  {v.num}
                </span>

                {/* Orange icon line */}
                <div style={{ width: 32, height: 2, background: T.orange, marginBottom: '1.5rem' }} />

                <h3 style={{
                  fontFamily:    T.bebas,
                  fontSize:      '1.6rem',
                  color:         T.white,
                  letterSpacing: '0.05em',
                  margin:        '0 0 0.75rem',
                  lineHeight:    1,
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontFamily: T.barlow,
                  fontSize:   '0.88rem',
                  fontWeight: 300,
                  color:      T.grayLt,
                  lineHeight: 1.7,
                  margin:     0,
                }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 4 — SPLIT IMAGERY
        ════════════════════════════════════════════ */}
        <div className="about-split">

          {/* Left panel */}
          <div
            className="about-split-panel"
            style={{
              position:        'relative',
              backgroundImage: "url('/images/guy-min.png')",
              overflow:        'hidden',
            }}
          >
            {/* Side fade — darkens toward the center seam */}
            <div
              aria-hidden="true"
              style={{
                position:  'absolute',
                inset:     0,
                background:'linear-gradient(to right, rgba(10,10,10,0.0) 50%, rgba(10,10,10,0.85) 100%)',
                zIndex:    1,
              }}
            />
            <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 3 }}>
              <p style={{
                fontFamily:    T.barlow,
                fontSize:      '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         T.orange,
                margin:        '0 0 0.4rem',
              }}>
                The Look
              </p>
              <p style={{
                fontFamily: T.bebas,
                fontSize:   '2.5rem',
                color:      T.white,
                lineHeight: 0.95,
                margin:     0,
              }}>
                Sworn In<br />Hoodie
              </p>
              <Link href="/shop/sworn-in-hoodie" className="about-panel-link">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right panel */}
          <div
            className="about-split-panel"
            style={{
              position:        'relative',
              backgroundImage: "url('/images/girl-min.png')",
              overflow:        'hidden',
            }}
          >
            {/* Side fade — darkens toward the center seam */}
            <div
              aria-hidden="true"
              style={{
                position:  'absolute',
                inset:     0,
                background:'linear-gradient(to left, rgba(10,10,10,0.0) 50%, rgba(10,10,10,0.85) 100%)',
                zIndex:    1,
              }}
            />
            <div
              className="about-panel-right-label"
              style={{
                position:  'absolute',
                bottom:    '2.5rem',
                right:     '2.5rem',
                zIndex:    3,
                textAlign: 'right',
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
                The Look
              </p>
              <p style={{
                fontFamily: T.bebas,
                fontSize:   '2.5rem',
                color:      T.white,
                lineHeight: 0.95,
                margin:     0,
              }}>
                Sworn In<br />Tee
              </p>
              <Link href="/shop/sworn-in-short-sleeve" className="about-panel-link">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Bottom gradient — spans full width across both panels */}
          <div
            aria-hidden="true"
            style={{
              position:   'absolute',
              bottom:     0,
              left:       0,
              right:      0,
              height:     280,
              background: 'linear-gradient(to top, rgba(10,10,10,1.0) 0%, rgba(10,10,10,0.6) 50%, transparent 100%)',
              zIndex:     2,
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ════════════════════════════════════════════
            SECTION 5 — CONTACT STRIP
        ════════════════════════════════════════════ */}
        <div
          className="about-contact-strip"
          style={{
            background:  T.charcoal,
            borderTop:   `1px solid ${T.grayDark}`,
            padding:     '4rem 3rem',
          }}
        >
          <div className="about-contact-inner">
            {/* Left */}
            <div>
              <h2 style={{
                fontFamily:    T.bebas,
                fontSize:      '2rem',
                color:         T.white,
                letterSpacing: '0.06em',
                margin:        '0 0 0.5rem',
              }}>
                Got a Question?
              </h2>
              <p style={{
                fontFamily: T.barlow,
                fontSize:   '0.9rem',
                fontWeight: 300,
                color:      T.grayMid,
                margin:     0,
              }}>
                We&apos;re real people. Reach out anytime.
              </p>
            </div>

            {/* Right */}
            <div className="about-contact-right">

              {/* Phone */}
              <div>
                <p style={{
                  fontFamily:    T.barlow,
                  fontSize:      '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         T.orange,
                  margin:        '0 0 0.35rem',
                }}>
                  Phone
                </p>
                <p style={{
                  fontFamily:    T.barlow,
                  fontSize:      '1rem',
                  letterSpacing: '0.05em',
                  color:         T.white,
                  margin:        0,
                }}>
                  (408) 314-1411
                </p>
              </div>

              {/* Email */}
              <div>
                <p style={{
                  fontFamily:    T.barlow,
                  fontSize:      '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         T.orange,
                  margin:        '0 0 0.35rem',
                }}>
                  Email
                </p>
                <a
                  href="mailto:john@sworninusa.com"
                  className="about-email-link"
                  style={{ fontFamily: T.barlow, fontSize: '1rem', letterSpacing: '0.05em' }}
                >
                  john@sworninusa.com
                </a>
              </div>

              {/* Contact link */}
              <Link href="/contact" className="about-panel-link" style={{ marginTop: 0 }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 6 — BOTTOM CTA
        ════════════════════════════════════════════ */}
        <div
          className="about-s6"
          style={{
            textAlign: 'center',
            padding:   '8rem 3rem',
            position:  'relative',
            overflow:  'hidden',
          }}
        >
          {/* Ghost text */}
          <p
            className="about-s6-ghost"
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              fontFamily:    T.bebas,
              fontSize:      'clamp(8rem, 20vw, 18rem)',
              color:         'rgba(232,98,26,0.04)',
              whiteSpace:    'nowrap',
              pointerEvents: 'none',
              margin:        0,
              lineHeight:    1,
              userSelect:    'none',
            }}
          >
            USA
          </p>

          <div style={{ position: 'relative', zIndex: 1 }}>
          <Eyebrow>Let&apos;s Go.</Eyebrow>
          <h2 style={{
            fontFamily:   T.bebas,
            fontSize:     'clamp(3rem, 6vw, 5.5rem)',
            color:        T.white,
            lineHeight:   0.95,
            marginBottom: '2rem',
          }}>
            Wear What<br />You Mean.
          </h2>
          <Link href="/shop" className="about-cta-btn">
            Shop Now
          </Link>
          </div>
        </div>

      </div>
    </>
  );
}
