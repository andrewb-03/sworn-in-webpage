'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/lib/utils';

/* ─── Design tokens (inline) ─────────────────────────────── */
const T = {
  black:    '#0A0A0A',
  charcoal: '#141414',
  orange:   '#E8621A',
  orangeLt: '#FF7A35',
  white:    '#F5F2ED',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
  navy:     '#1A2035',
} as const;

/* ─── Color swatch map ────────────────────────────────────── */
const COLOR_HEX: Record<string, string> = {
  Black:        '#0A0A0A',
  Grey:         '#808080',
  Navy:         '#1A2035',
  Blue:         '#1A3A6B',
  Red:          '#8B1A1A',
  'Light Grey': '#C0C0C0',
  'Dark Grey':  '#404040',
  'Royal Blue': '#1A3A9F',
};

/* ─── Label heading ──────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily:    T.barlow,
      fontSize:      '0.75rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color:         T.grayLt,
      marginBottom:  '0.75rem',
    }}>
      {children}
    </p>
  );
}

/* ─── Thin divider ───────────────────────────────────────── */
function Divider({ my = '1.5rem' }: { my?: string }) {
  return (
    <div style={{
      width:        '100%',
      height:       1,
      background:   T.grayDark,
      margin:       `${my} 0`,
    }} />
  );
}

/* ─── Main component ─────────────────────────────────────── */
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();

  const isOneSize = product.sizes.length === 1 && product.sizes[0] === 'One Size';

  const [selectedColor,  setSelectedColor]  = useState<string>(product.colors[0] ?? '');
  const [selectedSize,   setSelectedSize]   = useState<string>(isOneSize ? 'One Size' : '');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [quantity,       setQuantity]       = useState(1);
  const [sizeError,      setSizeError]      = useState('');
  const [colorError,     setColorError]     = useState('');
  const [btnState,       setBtnState]       = useState<'idle' | 'added'>('idle');
  const [imgVisible,     setImgVisible]     = useState(true);

  /* Resolve current image */
  const currentImage =
    (selectedColor && product.colorImages?.[selectedColor]) ||
    product.imageSrc;

  /* When color changes, fade out → swap → fade in */
  const handleColorChange = useCallback((color: string) => {
    setImgVisible(false);
    setTimeout(() => {
      setSelectedColor(color);
      setImgVisible(true);
    }, 200);
    setColorError('');
  }, []);

  /* Add to cart with validation */
  const handleAddToCart = useCallback(() => {
    let valid = true;

    if (product.colors.length > 0 && !selectedColor) {
      setColorError('Please select a color');
      valid = false;
    } else {
      setColorError('');
    }

    if (!isOneSize && !selectedSize) {
      setSizeError('Please select a size');
      valid = false;
    } else {
      setSizeError('');
    }

    if (!valid) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor, selectedGender || undefined);
    }

    setBtnState('added');
    setTimeout(() => setBtnState('idle'), 1500);
  }, [product, selectedColor, selectedSize, selectedGender, quantity, isOneSize, addItem]);

  /* "You might also like" — same category, excl. current, padded with others */
  const relatedProducts = (() => {
    const same  = products.filter((p) => p.category === product.category && p.id !== product.id);
    const other = products.filter((p) => p.category !== product.category);
    return [...same, ...other].slice(0, 3);
  })();

  return (
    <>
      {/* ── Scoped styles ───────────────────────────── */}
      <style>{`
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .pd-img-col { position: sticky; top: 120px; }
        .pd-breadcrumb { padding: 1.5rem 3rem; }
        .pd-main { padding: 2rem 3rem 6rem; }
        .pd-related-inner { padding: 4rem 3rem; }
        .pd-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .pd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .pd-img-col { position: static; }
          .pd-breadcrumb { padding: 1rem 1.5rem; }
          .pd-main { padding: 1rem 1.5rem 4rem; }
          .pd-related-inner { padding: 2.5rem 1.5rem; }
          .pd-related-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .pd-related-grid { grid-template-columns: repeat(1, 1fr); }
        }

        .pd-size-btn {
          min-width: 56px;
          height: 44px;
          border: 1px solid ${T.grayDark};
          background: transparent;
          color: ${T.grayMid};
          font-family: ${T.barlow};
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
          padding: 0 1rem;
        }
        .pd-size-btn:hover {
          border-color: ${T.grayLt};
          color: ${T.white};
        }
        .pd-size-btn.active {
          border-color: ${T.orange};
          color: ${T.orange};
          background: rgba(232,98,26,0.08);
        }

        .pd-qty-btn {
          width: 44px;
          height: 44px;
          background: ${T.charcoal};
          border: none;
          color: ${T.white};
          font-size: 1.2rem;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-qty-btn:hover { background: rgba(255,255,255,0.1); }

        .pd-add-btn {
          width: 100%;
          height: 56px;
          background: ${T.orange};
          color: ${T.black};
          font-family: ${T.barlow};
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 1.5rem;
        }
        .pd-add-btn:hover { background: ${T.orangeLt}; transform: translateY(-1px); }
        .pd-add-btn.added { background: #2A5C2A; }

        .pd-swatch {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }
        .pd-swatch.active {
          box-shadow: 0 0 0 2px ${T.black}, 0 0 0 4px ${T.orange};
        }
      `}</style>

      {/* Product structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type':    'Product',
            name:       product.name,
            description: product.description,
            image:      `https://www.sworninusa.com${product.imageSrc}`,
            brand: {
              '@type': 'Brand',
              name:    'Sworn In USA',
            },
            offers: {
              '@type':        'Offer',
              price:          product.price,
              priceCurrency:  'USD',
              availability:   'https://schema.org/InStock',
              url:            `https://www.sworninusa.com/shop/${product.slug}`,
              seller: {
                '@type': 'Organization',
                name:    'Sworn In USA',
              },
            },
          }),
        }}
      />

      <div style={{ background: T.black, minHeight: '100vh', paddingTop: 120 }}>

        {/* ── Breadcrumb ──────────────────────────── */}
        <nav
          className="pd-breadcrumb"
          aria-label="Breadcrumb"
          style={{ fontFamily: T.barlow, fontSize: '0.8rem', letterSpacing: '0.1em' }}
        >
          <Link href="/" style={{ color: T.grayMid, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.white; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.grayMid; }}
          >
            Home
          </Link>
          <span style={{ color: T.grayMid, margin: '0 0.5rem' }}>/</span>
          <Link href="/shop" style={{ color: T.grayMid, textDecoration: 'none', textTransform: 'uppercase' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.white; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.grayMid; }}
          >
            Shop
          </Link>
          <span style={{ color: T.grayMid, margin: '0 0.5rem' }}>/</span>
          <span style={{ color: T.white, textTransform: 'uppercase' }}>{product.name}</span>
        </nav>

        {/* ── Main grid ───────────────────────────── */}
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="pd-main">
            <div className="pd-grid">

              {/* ── LEFT: Image ───────────────────── */}
              <div className="pd-img-col">
                <div style={{
                  width:          '100%',
                  aspectRatio:    '1 / 1',
                  background:     T.charcoal,
                  border:         `1px solid ${T.grayDark}`,
                  borderRadius:   2,
                  overflow:       'hidden',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width:      '85%',
                    height:     '85%',
                    position:   'relative',
                    opacity:    imgVisible ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                  }}>
                    <Image
                      src={currentImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Info ───────────────────── */}
              <div>

                {/* Category + Name + Price */}
                <p style={{
                  fontFamily:    T.barlow,
                  fontSize:      '0.75rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color:         T.orange,
                  marginBottom:  '0.5rem',
                }}>
                  {product.category.replace('-', ' ')}
                </p>

                <h1 style={{
                  fontFamily:   T.bebas,
                  fontSize:     'clamp(2.5rem, 4vw, 3.5rem)',
                  color:        T.white,
                  lineHeight:   0.95,
                  marginBottom: '1rem',
                  margin:       '0 0 1rem',
                }}>
                  {product.name}
                </h1>

                <p style={{
                  fontFamily:    T.bebas,
                  fontSize:      '2.5rem',
                  color:         T.orange,
                  letterSpacing: '0.05em',
                  margin:        0,
                }}>
                  {formatPrice(product.price)}
                </p>

                <Divider />

                {/* ── Color selector ──────────────── */}
                {product.colors.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <FieldLabel>
                      Color:{' '}
                      <span style={{ color: T.white }}>{selectedColor}</span>
                    </FieldLabel>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {product.colors.map((color) => {
                        const hex     = COLOR_HEX[color] ?? '#888888';
                        const isBlack = color === 'Black';
                        const isActive = selectedColor === color;
                        return (
                          <button
                            key={color}
                            title={color}
                            aria-label={`Select color: ${color}`}
                            onClick={() => handleColorChange(color)}
                            className={`pd-swatch${isActive ? ' active' : ''}`}
                            style={{
                              background:  hex,
                              borderColor: isActive
                                ? 'transparent'
                                : isBlack
                                  ? T.grayDark
                                  : 'transparent',
                            }}
                          />
                        );
                      })}
                    </div>

                    {colorError && (
                      <p style={{ color: '#E24B4A', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        {colorError}
                      </p>
                    )}
                  </div>
                )}

                {/* ── Gender / Fit selector ───────── */}
                {product.category !== 'headwear' && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <FieldLabel>
                      Fit:{' '}
                      <span style={{ color: T.white }}>
                        {selectedGender || ''}
                      </span>
                    </FieldLabel>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['Men', 'Women'].map((g) => {
                        const isActive = selectedGender === g;
                        return (
                          <button
                            key={g}
                            onClick={() => setSelectedGender(isActive ? '' : g)}
                            style={{
                              minWidth:      80,
                              height:        44,
                              padding:       '0 1.25rem',
                              border:        `1px solid ${isActive ? T.orange : T.grayDark}`,
                              background:    isActive ? 'rgba(232,98,26,0.08)' : 'transparent',
                              color:         isActive ? T.orange : T.grayMid,
                              fontFamily:    T.barlow,
                              fontSize:      '0.85rem',
                              letterSpacing: '0.05em',
                              cursor:        'pointer',
                              borderRadius:  2,
                              transition:    'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                const b = e.currentTarget as HTMLButtonElement;
                                b.style.borderColor = T.grayLt;
                                b.style.color       = T.white;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                const b = e.currentTarget as HTMLButtonElement;
                                b.style.borderColor = T.grayDark;
                                b.style.color       = T.grayMid;
                              }
                            }}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>

                    <p style={{
                      fontFamily:  T.barlow,
                      fontSize:    '0.75rem',
                      color:       T.grayMid,
                      marginTop:   '0.5rem',
                      fontStyle:   'italic',
                    }}>
                      All styles fit true to size across all fits.
                    </p>
                  </div>
                )}

                {/* ── Size selector ───────────────── */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <FieldLabel>
                    Size:{' '}
                    <span style={{ color: T.white }}>{selectedSize}</span>
                  </FieldLabel>

                  {isOneSize ? (
                    <div style={{ display: 'flex' }}>
                      <span style={{
                        display:       'inline-flex',
                        alignItems:    'center',
                        justifyContent:'center',
                        padding:       '0 1.5rem',
                        height:        44,
                        border:        `1px solid ${T.orange}`,
                        color:         T.orange,
                        fontFamily:    T.barlow,
                        fontSize:      '0.85rem',
                        letterSpacing: '0.05em',
                        borderRadius:  2,
                        background:    'rgba(232,98,26,0.08)',
                      }}>
                        One Size
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => { setSelectedSize(size); setSizeError(''); }}
                          className={`pd-size-btn${selectedSize === size ? ' active' : ''}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}

                  {sizeError && (
                    <p style={{ color: '#E24B4A', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      {sizeError}
                    </p>
                  )}

                  {/* Size guide */}
                  {!isOneSize && (
                    <button
                      style={{
                        marginTop:      '0.75rem',
                        background:     'transparent',
                        border:         'none',
                        fontFamily:     T.barlow,
                        fontSize:       '0.8rem',
                        color:          T.grayMid,
                        textDecoration: 'underline',
                        cursor:         'pointer',
                        padding:        0,
                      }}
                      onClick={() => {/* size guide modal — coming soon */}}
                    >
                      Size Guide
                    </button>
                  )}
                </div>

                {/* ── Quantity ────────────────────── */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <FieldLabel>Quantity</FieldLabel>
                  <div style={{
                    display:      'inline-flex',
                    alignItems:   'center',
                    border:       `1px solid ${T.grayDark}`,
                    borderRadius: 2,
                    overflow:     'hidden',
                  }}>
                    <button
                      className="pd-qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <div style={{
                      width:          56,
                      height:         44,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontFamily:     T.barlow,
                      fontSize:       '1rem',
                      color:          T.white,
                      borderLeft:     `1px solid ${T.grayDark}`,
                      borderRight:    `1px solid ${T.grayDark}`,
                      background:     'transparent',
                      userSelect:     'none',
                    }}>
                      {quantity}
                    </div>
                    <button
                      className="pd-qty-btn"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ── Add to cart ─────────────────── */}
                <button
                  onClick={handleAddToCart}
                  className={`pd-add-btn${btnState === 'added' ? ' added' : ''}`}
                >
                  {btnState === 'added' ? 'ADDED TO CART ✓' : 'ADD TO CART'}
                </button>

                <Divider my="2rem" />

                {/* ── Description ─────────────────── */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    fontFamily:    T.barlow,
                    fontSize:      '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         T.orange,
                    marginBottom:  '0.75rem',
                  }}>
                    Description
                  </p>
                  <p style={{
                    fontFamily:  T.barlow,
                    fontSize:    '0.95rem',
                    fontWeight:  300,
                    color:       T.grayLt,
                    lineHeight:  1.8,
                    margin:      0,
                  }}>
                    {product.description}
                  </p>
                </div>

                <Divider />

                {/* ── Details ─────────────────────── */}
                <div>
                  <p style={{
                    fontFamily:    T.barlow,
                    fontSize:      '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         T.orange,
                    marginBottom:  '0.75rem',
                  }}>
                    Details
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    margin:    0,
                    padding:   0,
                    display:   'flex',
                    flexDirection: 'column',
                    gap:       '0.5rem',
                  }}>
                    {[
                      'Free shipping on orders over $75',
                      'Ships within 2–3 business days',
                      'Easy returns within 30 days',
                      'Questions? Call (408) 314-1411',
                    ].map((item) => (
                      <li
                        key={item}
                        style={{
                          fontFamily: T.barlow,
                          fontSize:   '0.95rem',
                          fontWeight: 300,
                          color:      T.grayLt,
                          lineHeight: 1.8,
                          display:    'flex',
                          gap:        '0.5rem',
                        }}
                      >
                        <span style={{ color: T.orange, flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
              {/* end right col */}
            </div>
          </div>
        </div>

        {/* ── You Might Also Like ─────────────────── */}
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="pd-related-inner">
            <p style={{
              fontFamily:    T.barlow,
              fontSize:      '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         T.orange,
              marginBottom:  '0.5rem',
            }}>
              You Might Also Like
            </p>
            <div className="pd-related-grid">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  price={p.price}
                  category={p.category}
                  badge={p.badge ?? undefined}
                  imageSrc={p.imageSrc}
                  slug={p.slug}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
