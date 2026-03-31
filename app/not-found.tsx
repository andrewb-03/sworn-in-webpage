import Link from 'next/link';

export const metadata = {
  title: '404 | Sworn In USA',
  description: 'Page not found.',
};

export default function NotFound() {
  return (
    <>
      <style>{`
        /* ── Corner brackets ── */
        .nf-bracket {
          position: fixed;
          width: 24px;
          height: 24px;
          border-color: rgba(232,98,26,0.2);
          border-style: solid;
          pointer-events: none;
          z-index: 10;
        }
        .nf-bracket-tl { top: 24px; left: 24px; border-width: 1px 0 0 1px; }
        .nf-bracket-tr { top: 24px; right: 24px; border-width: 1px 1px 0 0; }
        .nf-bracket-bl { bottom: 24px; left: 24px; border-width: 0 0 1px 1px; }
        .nf-bracket-br { bottom: 24px; right: 24px; border-width: 0 1px 1px 0; }

        /* ── Buttons ── */
        .nf-btn-primary {
          display: inline-block;
          padding: 0.85rem 2rem;
          background: #E8621A;
          color: #0A0A0A;
          font-family: var(--font-barlow), sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, transform 0.15s;
        }
        .nf-btn-primary:hover {
          background: #FF7A35;
          transform: translateY(-1px);
        }

        .nf-btn-ghost {
          display: inline-block;
          padding: 0.85rem 2rem;
          background: transparent;
          color: #E8621A;
          border: 1px solid #E8621A;
          font-family: var(--font-barlow), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .nf-btn-ghost:hover {
          background: #E8621A;
          color: #0A0A0A;
          transform: translateY(-1px);
        }

        /* ── Action row ── */
        .nf-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .nf-bracket { width: 16px; height: 16px; }
          .nf-bracket-tl { top: 16px; left: 16px; }
          .nf-bracket-tr { top: 16px; right: 16px; }
          .nf-bracket-bl { bottom: 16px; left: 16px; }
          .nf-bracket-br { bottom: 16px; right: 16px; }
          .nf-actions { flex-direction: column; align-items: center; }
          .nf-actions a { width: 100%; max-width: 280px; text-align: center; }
        }
      `}</style>

      {/* ── Corner bracket accents ─────────────────── */}
      <div className="nf-bracket nf-bracket-tl" aria-hidden="true" />
      <div className="nf-bracket nf-bracket-tr" aria-hidden="true" />
      <div className="nf-bracket nf-bracket-bl" aria-hidden="true" />
      <div className="nf-bracket nf-bracket-br" aria-hidden="true" />

      <div
        style={{
          background:     '#0A0A0A',
          minHeight:      '100vh',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          textAlign:      'center',
          padding:        '2rem',
          paddingTop:     120,
          position:       'relative',
          overflow:       'hidden',
        }}
      >
        {/* ── Diagonal texture ──────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(232, 98, 26, 0.015) 8px,
              rgba(232, 98, 26, 0.015) 9px
            )`,
            pointerEvents: 'none',
            zIndex:        0,
          }}
        />

        {/* ── Ghost 404 ─────────────────────────────── */}
        <p
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '50%',
            left:          '50%',
            transform:     'translate(-50%, -50%)',
            fontFamily:    'var(--font-bebas), sans-serif',
            fontSize:      'clamp(16rem, 40vw, 36rem)',
            color:         'rgba(232, 98, 26, 0.04)',
            whiteSpace:    'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.05em',
            lineHeight:    1,
            margin:        0,
            userSelect:    'none',
            zIndex:        0,
          }}
        >
          404
        </p>

        {/* ── Foreground content ────────────────────── */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Eyebrow with side lines */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '1rem',
            marginBottom:   '1.5rem',
          }}>
            <div style={{ width: 40, height: 1, background: '#E8621A' }} aria-hidden="true" />
            <p style={{
              fontFamily:    'var(--font-barlow), sans-serif',
              fontSize:      '0.75rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color:         '#E8621A',
              margin:        0,
            }}>
              Page Not Found
            </p>
            <div style={{ width: 40, height: 1, background: '#E8621A' }} aria-hidden="true" />
          </div>

          {/* Main 404 */}
          <h1 style={{
            fontFamily:    'var(--font-bebas), sans-serif',
            fontSize:      'clamp(6rem, 15vw, 12rem)',
            color:         '#F5F2ED',
            lineHeight:    0.9,
            letterSpacing: '0.05em',
            marginBottom:  '0.5rem',
            margin:        '0 0 0.5rem',
          }}>
            404
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily:    'var(--font-bebas), sans-serif',
            fontSize:      'clamp(1.5rem, 3vw, 2.5rem)',
            color:         'rgba(255,255,255,0.40)',
            letterSpacing: '0.08em',
            margin:        '0 0 2rem',
          }}>
            Wrong Turn.
          </p>

          {/* Orange divider */}
          <div style={{
            width:        60,
            height:       2,
            background:   '#E8621A',
            margin:       '0 auto 2rem',
          }} />

          {/* Body text */}
          <p style={{
            fontFamily:  'var(--font-barlow), sans-serif',
            fontSize:    '0.95rem',
            fontWeight:  300,
            color:       'rgba(255,255,255,0.40)',
            lineHeight:  1.7,
            maxWidth:    380,
            margin:      '0 auto 3rem',
          }}>
            This page doesn&apos;t exist.{' '}
            Head back and find what you&apos;re looking for.
          </p>

          {/* Action buttons */}
          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary">
              Take Me Home
            </Link>
            <Link href="/shop" className="nf-btn-ghost">
              Shop the Drop
            </Link>
          </div>

        </div>

        {/* ── Bottom brand stamp ────────────────────── */}
        <div style={{
          position:       'absolute',
          bottom:         '2.5rem',
          left:           '50%',
          transform:      'translateX(-50%)',
          zIndex:         1,
          display:        'flex',
          alignItems:     'center',
          gap:            '1rem',
          whiteSpace:     'nowrap',
        }}>
          <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />
          <span style={{
            fontFamily:    'var(--font-bebas), sans-serif',
            fontSize:      '1rem',
            letterSpacing: '0.2em',
            color:         'rgba(245,242,237,0.15)',
          }}>
            SWORN IN USA
          </span>
          <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />
        </div>

      </div>
    </>
  );
}
