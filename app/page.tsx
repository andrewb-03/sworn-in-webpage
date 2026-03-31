import type { Metadata } from "next";
import Hero             from "@/components/Hero";
import MarqueeTicker    from "@/components/MarqueeTicker";
import FeaturedLookbook from "@/components/FeaturedLookbook";
import OurStory         from "@/components/OurStory";
import NewsletterSignup from "@/components/NewsletterSignup";
import ProductCard, { type ProductCardProps } from "@/components/ProductCard";

/* ─── Page metadata ──────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Sworn In USA | Bold American Clothing",
  description:
    "Bold American clothing for people who know exactly who they are. Shop tees, hoodies, hats and more. Put your money where your pride is.",
  alternates: {
    canonical: "https://www.sworninusa.com",
  },
  openGraph: {
    title:       "Sworn In USA | Bold American Clothing",
    description: "Bold American clothing for people who know exactly who they are.",
    url:         "https://www.sworninusa.com",
    images:      ["/images/og-image.jpg"],
  },
};

/* ─── JSON-LD structured data ────────────────────────────── */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  name:       "Sworn In USA",
  url:        "https://www.sworninusa.com",
  logo:       "https://www.sworninusa.com/images/logos/sworn-in-icon.png",
  contactPoint: {
    "@type":           "ContactPoint",
    telephone:         "+1-408-314-1411",
    contactType:       "customer service",
    email:             "john@sworninusa.com",
    availableLanguage: "English",
  },
  sameAs: [],
};

/* ─── Featured products ──────────────────────────────────── */
const FEATURED_PRODUCTS: ProductCardProps[] = [
  { name: "Sworn In Hat",                  price: 30, category: "Hats",     imageSrc: "/images/Sworn-In-Hat-black.jpg",                  slug: "sworn-in-hat"         },
  { name: "Sworn In Beanie",               price: 20, category: "Headwear", imageSrc: "/images/Sworn-In-Beanie-navy.jpg",                slug: "sworn-in-beanie"      },
  { name: "Sworn In Hoodie",               price: 50, category: "Tops",     imageSrc: "/images/Sworn-In-Hoodie-black.jpg",               slug: "sworn-in-hoodie"      },
  { name: "Sworn In Long Sleeve T-Shirt",  price: 30, category: "Tops",     imageSrc: "/images/Sworn-In-Long-Sleeve-T-Shirt-black.jpg",  slug: "sworn-in-long-sleeve" },
  { name: "Sworn In Short Sleeve T-Shirt", price: 25, category: "Tops",     imageSrc: "/images/Sworn-In-Short-Sleeve-T-Shirt-black.jpg", slug: "sworn-in-short-sleeve"},
];

/* ─── Page ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <main>
        <Hero />
        <MarqueeTicker variant="orange" />
        <FeaturedLookbook />
        <MarqueeTicker variant="dark" />

        {/* ── Featured section ──────────────────────── */}
        <section className="bg-brand-black py-20 px-6 lg:px-8">
          <style>{`
            .home-feat-grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 1rem;
            }
            @media (max-width: 1024px) {
              .home-feat-grid { grid-template-columns: repeat(3, 1fr); }
            }
            @media (max-width: 768px) {
              .home-feat-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `}</style>

          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="font-bebas text-5xl md:text-6xl tracking-display text-brand-white leading-none">
                Featured
              </h2>
            </div>

            <div className="home-feat-grid">
              {FEATURED_PRODUCTS.map((product, i) => (
                <ProductCard key={product.slug ?? i} {...product} compact />
              ))}
            </div>
          </div>
        </section>

        <OurStory />
        <NewsletterSignup />
      </main>
    </>
  );
}
