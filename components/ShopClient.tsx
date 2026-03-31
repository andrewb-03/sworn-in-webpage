'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

/* ─── Types ──────────────────────────────────────────────── */
type Category = 'all' | 'hoodies' | 'long-sleeves' | 'tshirts' | 'headwear';
type PriceKey = 'all' | 'under25' | 'under35' | 'under50' | 'above50';
type SortKey  = 'featured' | 'price-asc' | 'price-desc' | 'name-az';

const VALID_CATEGORIES: Category[] = ['all', 'hoodies', 'long-sleeves', 'tshirts', 'headwear'];

/* ─── Filter config ──────────────────────────────────────── */
const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'All',          value: 'all'          },
  { label: 'Hoodies',      value: 'hoodies'      },
  { label: 'Long Sleeves', value: 'long-sleeves' },
  { label: 'T-Shirts',     value: 'tshirts'      },
  { label: 'Headwear',     value: 'headwear'     },
];

const PRICE_RANGES: { label: string; value: PriceKey }[] = [
  { label: 'All Prices',  value: 'all'     },
  { label: 'Under $25',   value: 'under25' },
  { label: 'Under $35',   value: 'under35' },
  { label: 'Under $50',   value: 'under50' },
  { label: '$50 & Above', value: 'above50' },
];

const SIZES = ['S', 'M', 'L', 'XL', '2XL', 'One Size'];

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Featured',           value: 'featured'  },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc'},
  { label: 'Name: A to Z',       value: 'name-az'   },
];

/* ─── Style tokens ───────────────────────────────────────── */
const S = {
  orange:   'var(--orange,   #E8621A)',
  white:    'var(--white,    #F5F2ED)',
  black:    'var(--black,    #0A0A0A)',
  charcoal: 'var(--charcoal, #141414)',
  grayDark: 'rgba(255,255,255,0.08)',
  grayMid:  'rgba(255,255,255,0.40)',
  grayLt:   'rgba(255,255,255,0.65)',
  bebas:    'var(--font-bebas), sans-serif',
  barlow:   'var(--font-barlow), sans-serif',
} as const;

/* ─── Sub-components ─────────────────────────────────────── */
function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily:    S.barlow,
      fontSize:      '0.7rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color:         S.orange,
      marginBottom:  '1rem',
      paddingBottom: '0.5rem',
      borderBottom:  `1px solid ${S.grayDark}`,
    }}>
      {children}
    </p>
  );
}

function TextFilterBtn({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:       'block',
        width:         '100%',
        textAlign:     'left',
        padding:       active ? '0.5rem 0 0.5rem 8px' : '0.5rem 0',
        borderLeft:    active ? `2px solid ${S.orange}` : '2px solid transparent',
        color:         active ? S.orange : S.grayMid,
        fontFamily:    S.barlow,
        fontSize:      '0.9rem',
        letterSpacing: '0.05em',
        cursor:        'pointer',
        background:    'transparent',
        border:        'none',
        transition:    'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = S.white;
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = S.grayMid;
      }}
    >
      {children}
    </button>
  );
}

function SizeToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  const wide = label === 'One Size';
  return (
    <button
      onClick={onClick}
      style={{
        width:         wide ? 'auto' : 44,
        minWidth:      wide ? 72 : 44,
        height:        44,
        padding:       wide ? '0 10px' : 0,
        border:        `1px solid ${active ? S.orange : S.grayDark}`,
        background:    active ? 'rgba(232,98,26,0.08)' : 'transparent',
        color:         active ? S.orange : S.grayMid,
        fontFamily:    S.barlow,
        fontSize:      '0.75rem',
        letterSpacing: '0.05em',
        cursor:        'pointer',
        borderRadius:  2,
        transition:    'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.borderColor = S.grayLt;
          b.style.color       = S.white;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.borderColor = S.grayDark;
          b.style.color       = S.grayMid;
        }
      }}
    >
      {label}
    </button>
  );
}

/* ─── Main client component ──────────────────────────────── */
export default function ShopClient() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeSize,     setActiveSize]      = useState<string>('all');
  const [activePrice,    setActivePrice]     = useState<PriceKey>('all');
  const [sortBy,         setSortBy]          = useState<SortKey>('featured');
  const [drawerOpen,     setDrawerOpen]      = useState(false);

  /* Sync category from URL search param */
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && VALID_CATEGORIES.includes(cat as Category)) {
      setActiveCategory(cat as Category);
    }
  }, [searchParams]);

  const clearFilters = useCallback(() => {
    setActiveCategory('all');
    setActiveSize('all');
    setActivePrice('all');
    setSortBy('featured');
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    if (activeSize !== 'all')     result = result.filter((p) => p.sizes.includes(activeSize));
    if (activePrice === 'under25') result = result.filter((p) => p.price < 25);
    if (activePrice === 'under35') result = result.filter((p) => p.price < 35);
    if (activePrice === 'under50') result = result.filter((p) => p.price < 50);
    if (activePrice === 'above50') result = result.filter((p) => p.price >= 50);
    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name-az')    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [activeCategory, activeSize, activePrice, sortBy]);

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <SidebarHeading>Category</SidebarHeading>
        {CATEGORIES.map((c) => (
          <TextFilterBtn
            key={c.value}
            active={activeCategory === c.value}
            onClick={() => { setActiveCategory(c.value); setDrawerOpen(false); }}
          >
            {c.label}
          </TextFilterBtn>
        ))}
      </div>

      <div>
        <SidebarHeading>Size</SidebarHeading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SIZES.map((sz) => (
            <SizeToggle
              key={sz}
              label={sz}
              active={activeSize === sz}
              onClick={() => setActiveSize(activeSize === sz ? 'all' : sz)}
            />
          ))}
        </div>
      </div>

      <div>
        <SidebarHeading>Price</SidebarHeading>
        {PRICE_RANGES.map((pr) => (
          <TextFilterBtn
            key={pr.value}
            active={activePrice === pr.value}
            onClick={() => { setActivePrice(pr.value); setDrawerOpen(false); }}
          >
            {pr.label}
          </TextFilterBtn>
        ))}
      </div>

      {(activeCategory !== 'all' || activeSize !== 'all' || activePrice !== 'all') && (
        <button
          onClick={() => { clearFilters(); setDrawerOpen(false); }}
          style={{
            fontFamily:    S.barlow,
            fontSize:      '0.78rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         S.grayMid,
            background:    'transparent',
            border:        `1px solid ${S.grayDark}`,
            padding:       '0.6rem 1rem',
            cursor:        'pointer',
            transition:    'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.color = S.orange; b.style.borderColor = S.orange;
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.color = S.grayMid; b.style.borderColor = S.grayDark;
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        .shop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .shop-sidebar-desktop { display: block; }
        .shop-filters-btn     { display: none;  }
        .shop-drawer-backdrop { display: none;  }
        @media (max-width: 1024px) { .shop-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .shop-page-header   { padding: 6rem 1rem 1.5rem !important; }
          .shop-content-wrap  { padding: 0 1rem 4rem !important; }
          .shop-grid          { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .shop-sidebar-desktop { display: none !important; }
          .shop-filters-btn   { display: block !important; width: 100%; margin-bottom: 1.25rem; }
          .shop-drawer-backdrop { display: flex !important; }
        }
        @media (max-width: 480px) { .shop-grid { grid-template-columns: repeat(1, 1fr); } }
      `}</style>

      <div style={{ background: S.black, minHeight: '100vh', paddingTop: 120 }}>
        {/* Page header */}
        <div className="shop-page-header" style={{ padding: '4rem 3rem 2rem' }}>
          <p style={{ fontFamily: S.barlow, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: S.orange, marginBottom: '0.75rem' }}>
            The Collection
          </p>
          <h1 style={{ fontFamily: S.bebas, fontSize: 'clamp(3rem, 6vw, 5rem)', color: S.white, lineHeight: 0.95, margin: 0 }}>
            Shop the<br />Drop.
          </h1>
          <div style={{ width: 60, height: 2, background: S.orange, marginTop: '1rem', marginBottom: '1rem' }} />
          <p style={{ fontFamily: S.barlow, fontSize: '0.85rem', color: S.grayMid }}>
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Main content */}
        <div className="shop-content-wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 3rem 6rem' }}>
          {/* Mobile filters button */}
          <button
            className="shop-filters-btn btn-ghost font-barlow"
            onClick={() => setDrawerOpen(true)}
            style={{ fontFamily: S.barlow, fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Filters {(activeCategory !== 'all' || activeSize !== 'all' || activePrice !== 'all')
              ? `(${[activeCategory !== 'all', activeSize !== 'all', activePrice !== 'all'].filter(Boolean).length})`
              : ''}
          </button>

          <div style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
            {/* Desktop sidebar */}
            <aside
              className="shop-sidebar-desktop"
              style={{ width: 260, flexShrink: 0, paddingRight: '3rem', position: 'sticky', top: 120, alignSelf: 'flex-start', borderRight: `1px solid ${S.grayDark}` }}
            >
              {sidebarContent}
            </aside>

            {/* Product area */}
            <div style={{ flex: 1, paddingLeft: '3rem' }}>
              {/* Sort bar */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <label htmlFor="shop-sort" style={{ fontFamily: S.barlow, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.grayMid }}>
                  Sort by
                </label>
                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  style={{ background: S.charcoal, border: `1px solid ${S.grayDark}`, color: S.white, fontFamily: S.barlow, fontSize: '0.85rem', padding: '0.5rem 1rem', borderRadius: 2, cursor: 'pointer', outline: 'none' }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="shop-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      category={product.category}
                      badge={product.badge ?? undefined}
                      imageSrc={product.imageSrc}
                      slug={product.slug}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem', gap: '1rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: S.bebas, fontSize: '2rem', color: S.grayMid, margin: 0 }}>No Products Found</p>
                  <p style={{ fontFamily: S.barlow, fontSize: '0.9rem', color: S.grayMid, margin: 0 }}>Try adjusting your filters</p>
                  <button onClick={clearFilters} className="btn-ghost font-barlow" style={{ marginTop: '0.5rem' }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="shop-drawer-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div onClick={() => setDrawerOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 201, background: '#141414', width: 300, maxWidth: '85vw', height: '100%', overflowY: 'auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <p style={{ fontFamily: S.bebas, fontSize: '1.25rem', color: S.white, margin: 0, letterSpacing: '0.05em' }}>Filters</p>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: S.grayMid, fontSize: '1.5rem', lineHeight: 1, padding: '0.25rem' }}>×</button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
