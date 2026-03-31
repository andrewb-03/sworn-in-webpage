'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* ─── Product grid data ──────────────────────────────────── */
const GRID_ITEMS = [
  {
    slug:     'sworn-in-hoodie',
    name:     'Sworn In Hoodie',
    category: 'Hoodies',
    price:    '$50',
    image:    '/images/Sworn-In-Hoodie-black.jpg',
    col:      '1 / 8',
    row:      '1',
    height:   500,
  },
  {
    slug:     'stressed-the-f-out-hoodie',
    name:     'Stressed the F Out Hoodie',
    category: 'Hoodies',
    price:    '$50',
    image:    '/images/Stressed-the-F-Out-Hoodie-black.jpg',
    col:      '8 / 13',
    row:      '1',
    height:   500,
  },
  {
    slug:     'sworn-in-long-sleeve',
    name:     'Sworn In Long Sleeve',
    category: 'Long Sleeves',
    price:    '$30',
    image:    '/images/Sworn-In-Long-Sleeve-T-Shirt-black.jpg',
    col:      '1 / 6',
    row:      '2',
    height:   420,
  },
  {
    slug:     'stressed-the-f-out-long-sleeve',
    name:     'Stressed the F Out Long Sleeve',
    category: 'Long Sleeves',
    price:    '$30',
    image:    '/images/Stressed-the-F-Out-Long-Sleeve-T-Shirt-light-grey.jpg',
    col:      '6 / 13',
    row:      '2',
    height:   420,
  },
  {
    slug:     'sworn-in-short-sleeve',
    name:     'Sworn In Short Sleeve Tee',
    category: 'T-Shirts',
    price:    '$25',
    image:    '/images/Sworn-In-Short-Sleeve-T-Shirt-black.jpg',
    col:      '1 / 5',
    row:      '3',
    height:   380,
  },
  {
    slug:     'stressed-the-f-out-short-sleeve',
    name:     'Stressed Short Sleeve Tee',
    category: 'T-Shirts',
    price:    '$25',
    image:    '/images/Stressed-the-F-Out-Short-Sleeve-T-Shirt-black.jpg',
    col:      '5 / 9',
    row:      '3',
    height:   380,
  },
  {
    slug:     'sworn-in-hat',
    name:     'Sworn In Hat',
    category: 'Headwear',
    price:    '$30',
    image:    '/images/Sworn-In-Hat-black.jpg',
    col:      '9 / 13',
    row:      '3',
    height:   380,
  },
] as const;

/* ─── Reusable hover card ────────────────────────────────── */
function GridCard({
  slug, name, category, price, image,
}: {
  slug: string; name: string; category: string;
  price: string; image: string;
}) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="lb-grid-card"
      style={{
        position:   'relative',
        overflow:   'hidden',
        background: T.charcoal,
        border:     `1px solid ${T.grayDark}`,
        display:    'block',
        textDecoration: 'none',
      }}
    >
      {/* Product image */}
      <div
        className="lb-card-img"
        style={{
          width:    '100%',
          height:   '100%',
          position: 'relative',
          background: T.charcoal2,
          padding:  '1rem',
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'contain', objectPosition: 'center', padding: '1rem' }}
        />
      </div>

      {/* Bottom info overlay */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        zIndex:     2,
        background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)',
        padding:    '2rem 1.25rem 1.25rem',
        display:    'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <div>
          <p style={{
            fontFamily:    T.barlow,
            fontSize:      '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         T.orange,
            marginBottom:  '0.25rem',
            margin:        '0 0 0.25rem',
          }}>
            {category}
          </p>
          <p style={{
            fontFamily: T.barlow,
            fontSize:   '1rem',
            fontWeight: 600,
            color:      T.white,
            margin:     0,
            lineHeight: 1.2,
          }}>
            {name}
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
          <p style={{ fontFamily: T.bebas, fontSize: '1.3rem', color: T.orange, margin: 0 }}>
            {price}
          </p>
          <p style={{
            fontFamily:    T.barlow,
            fontSize:      '0.7rem',
            letterSpacing: '0.15em',
            color:         T.grayLt,
            margin:        '0.15rem 0 0',
          }}>
            VIEW →
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function LookbookClient() {
  return (
    <>
      {/* ── Scoped styles ───────────────────────────── */}
      <style>{`
        /* Grid card hover */
        .lb-grid-card { transition: border-color 0.3s; }
        .lb-grid-card:hover { border-color: ${T.orangeDk} !important; }
        .lb-grid-card:hover .lb-card-img { transform: scale(1.03); }
        .lb-card-img { transition: transform 0.4s ease; }

        /* Hero panel hover labels */
        .lb-panel-link { transition: color 0.2s; }
        .lb-panel-link:hover { color: ${T.white} !important; }

        /* ── Layout ── */
        .lb-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 3rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .lb-hero-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 70vh;
          min-height: 500px;
          position: relative;
          overflow: hidden;
        }
        .lb-showcase {
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 3rem;
        }
        .lb-product-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
        }
        .lb-statement { padding: 5rem 3rem; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .lb-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding: 2rem 1.5rem 1.5rem;
          }
          .lb-header-right { text-align: left !important; }
          .lb-hero-split {
            grid-template-columns: 1fr;
            height: auto;
          }
          .lb-hero-panel { height: 50vh !important; }
          .lb-hero-divider { display: none !important; }
          .lb-hero-badge   { display: none !important; }
          .lb-panel-label-right {
            left: 2rem !important;
            right: auto !important;
            text-align: left !important;
          }
          .lb-product-grid { grid-template-columns: 1fr !important; gap: 1rem; }
          .lb-grid-item {
            grid-column: 1 / -1 !important;
            height: 280px !important;
          }
          .lb-showcase { padding: 3rem 1.5rem; }
          .lb-statement { padding: 3rem 1.5rem; }
          .lb-statement-ghost { font-size: 6rem !important; }
        }

        @media (max-width: 480px) {
          .lb-hero-panel { height: 40vh !important; }
          .lb-grid-item  { height: 240px !important; }
        }
      `}</style>

      <div style={{ background: T.black, minHeight: '100vh', paddingTop: 120 }}>

        {/* ═══════════════════════════════════════════
            PAGE HEADER
        ═══════════════════════════════════════════ */}
        <div className="lb-header">
          <div>
            <p style={{
              fontFamily:    T.barlow,
              fontSize:      '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         T.orange,
              marginBottom:  '0.5rem',
            }}>
              Sworn In USA
            </p>
            <h1 style={{
              fontFamily: T.bebas,
              fontSize:   'clamp(3.5rem, 7vw, 6rem)',
              color:      T.white,
              lineHeight: 0.92,
              margin:     0,
            }}>
              The<br />Lookbook
            </h1>
            <div style={{ width: 60, height: 2, background: T.orange, marginTop: '1rem' }} />
          </div>

          <div className="lb-header-right" style={{ textAlign: 'right' }}>
            <p style={{
              fontFamily:  T.barlow,
              fontSize:    '0.9rem',
              fontWeight:  300,
              color:       T.grayMid,
              maxWidth:    260,
              lineHeight:  1.7,
              margin:      0,
            }}>
              Real people. Real clothing.{' '}
              No studio lighting required.
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            HERO SPLIT
        ═══════════════════════════════════════════ */}
        <div className="lb-hero-split" style={{ marginTop: '3rem' }}>

          {/* Left panel — Mens */}
          <div
            className="lb-hero-panel"
            style={{
              position:           'relative',
              overflow:           'hidden',
              backgroundImage:    "url('/images/guy-min.png')",
              backgroundSize:     'cover',
              backgroundPosition: 'center bottom',
            }}
          >
            {/* Overlay */}
            <div style={{
              position:  'absolute',
              inset:     0,
              background:'linear-gradient(to right, rgba(10,10,10,0.0) 60%, rgba(10,10,10,0.8) 100%)',
              zIndex:    1,
            }} aria-hidden="true" />

            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom:   '2rem',
              left:     '2rem',
              zIndex:   2,
            }}>
              <p style={{
                fontFamily:    T.barlow,
                fontSize:      '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         T.orange,
                margin:        '0 0 0.25rem',
              }}>
                Mens
              </p>
              <p style={{
                fontFamily: T.bebas,
                fontSize:   '1.8rem',
                color:      T.white,
                lineHeight: 1,
                margin:     '0 0 0.15rem',
              }}>
                Sworn In Hoodie
              </p>
              <p style={{
                fontFamily: T.barlow,
                fontSize:   '0.9rem',
                color:      T.grayLt,
                margin:     '0 0 0.5rem',
              }}>
                $50.00
              </p>
              <Link
                href="/shop/sworn-in-hoodie"
                className="lb-panel-link"
                style={{
                  fontFamily:     T.barlow,
                  fontSize:       '0.75rem',
                  letterSpacing:  '0.15em',
                  textTransform:  'uppercase',
                  color:          T.orange,
                  textDecoration: 'none',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '0.5rem',
                }}
              >
                Shop Now →
              </Link>
            </div>
          </div>

          {/* Right panel — Womens */}
          <div
            className="lb-hero-panel"
            style={{
              position:           'relative',
              overflow:           'hidden',
              backgroundImage:    "url('/images/girl-min.png')",
              backgroundSize:     'cover',
              backgroundPosition: 'center bottom',
            }}
          >
            {/* Overlay */}
            <div style={{
              position:  'absolute',
              inset:     0,
              background:'linear-gradient(to left, rgba(10,10,10,0.0) 60%, rgba(10,10,10,0.8) 100%)',
              zIndex:    1,
            }} aria-hidden="true" />

            {/* Label */}
            <div
              className="lb-panel-label-right"
              style={{
                position:  'absolute',
                bottom:    '2rem',
                right:     '2rem',
                zIndex:    2,
                textAlign: 'right',
              }}
            >
              <p style={{
                fontFamily:    T.barlow,
                fontSize:      '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color:         T.orange,
                margin:        '0 0 0.25rem',
              }}>
                Womens
              </p>
              <p style={{
                fontFamily: T.bebas,
                fontSize:   '1.8rem',
                color:      T.white,
                lineHeight: 1,
                margin:     '0 0 0.15rem',
              }}>
                Sworn In Tee
              </p>
              <p style={{
                fontFamily: T.barlow,
                fontSize:   '0.9rem',
                color:      T.grayLt,
                margin:     '0 0 0.5rem',
              }}>
                $25.00
              </p>
              <Link
                href="/shop/sworn-in-short-sleeve"
                className="lb-panel-link"
                style={{
                  fontFamily:     T.barlow,
                  fontSize:       '0.75rem',
                  letterSpacing:  '0.15em',
                  textTransform:  'uppercase',
                  color:          T.orange,
                  textDecoration: 'none',
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '0.5rem',
                  justifyContent: 'flex-end',
                }}
              >
                Shop Now →
              </Link>
            </div>
          </div>

          {/* Center divider line */}
          <div
            className="lb-hero-divider"
            aria-hidden="true"
            style={{
              position:  'absolute',
              left:      '50%',
              top:       '10%',
              height:    '80%',
              width:     1,
              background:T.orange,
              boxShadow: '0 0 12px rgba(232,98,26,0.4)',
              zIndex:    3,
            }}
          />

          {/* Center USA badge */}
          <div
            className="lb-hero-badge"
            aria-hidden="true"
            style={{
              position:       'absolute',
              left:           '50%',
              top:            '50%',
              transform:      'translate(-50%, -50%) rotate(45deg)',
              zIndex:         4,
              width:          56,
              height:         56,
              background:     T.orange,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              display:       'block',
              transform:     'rotate(-45deg)',
              fontFamily:    T.bebas,
              fontSize:      '0.85rem',
              color:         '#fff',
              letterSpacing: '0.05em',
            }}>
              USA
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            PRODUCT SHOWCASE GRID
        ═══════════════════════════════════════════ */}
        <div className="lb-showcase">
          <p style={{
            fontFamily:    T.barlow,
            fontSize:      '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color:         T.orange,
            marginBottom:  '0.5rem',
          }}>
            The Collection
          </p>
          <h2 style={{
            fontFamily:   T.bebas,
            fontSize:     'clamp(2.5rem, 5vw, 4rem)',
            color:        T.white,
            margin:       '0 0 3rem',
            lineHeight:   0.95,
          }}>
            Every Piece.
          </h2>

          <div className="lb-product-grid">
            {GRID_ITEMS.map((item) => (
              <div
                key={item.slug}
                className="lb-grid-item"
                style={{
                  gridColumn: item.col,
                  gridRow:    item.row,
                  height:     item.height,
                }}
              >
                <GridCard
                  slug={item.slug}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BRAND STATEMENT
        ═══════════════════════════════════════════ */}
        <div
          className="lb-statement"
          style={{
            background:   T.charcoal,
            borderTop:    `1px solid ${T.grayDark}`,
            borderBottom: `1px solid ${T.grayDark}`,
            textAlign:    'center',
            position:     'relative',
            overflow:     'hidden',
          }}
        >
          {/* Ghost background text */}
          <p
            className="lb-statement-ghost"
            aria-hidden="true"
            style={{
              position:      'absolute',
              top:           '50%',
              left:          '50%',
              transform:     'translate(-50%, -50%)',
              fontFamily:    T.bebas,
              fontSize:      '15rem',
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

          {/* Foreground content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily:    T.barlow,
              fontSize:      '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         T.orange,
              marginBottom:  '1.5rem',
            }}>
              The Oath
            </p>
            <h2 style={{
              fontFamily:  T.bebas,
              fontSize:    'clamp(2.5rem, 5vw, 4.5rem)',
              color:       T.white,
              maxWidth:    800,
              margin:      '0 auto 1.5rem',
              lineHeight:  1.0,
            }}>
              Put Your Money<br />Where Your Pride Is.
            </h2>
            <Link
              href="/shop"
              style={{
                display:        'inline-block',
                padding:        '0.85rem 2.5rem',
                background:     T.orange,
                color:          T.black,
                fontFamily:     T.barlow,
                fontSize:       '0.85rem',
                fontWeight:     700,
                letterSpacing:  '0.2em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                borderRadius:   2,
                transition:     'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF7A35'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = T.orange; }}
            >
              Shop the Collection
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
