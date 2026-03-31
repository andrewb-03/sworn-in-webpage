import Link from "next/link";
import ProductCard, { type ProductCardProps } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  eyebrow?:     string;
  title?:       string;
  subtitle?:    string;
  products?:    ProductCardProps[];
  viewAllHref?: string;
  viewAllLabel?: string;
  showViewAll?: boolean;
  columns?:     3 | 4 | 5;
  className?:   string;
}

export default function ProductGrid({
  eyebrow,
  title       = "New Arrivals",
  subtitle,
  products    = getFeaturedProducts() as ProductCardProps[],
  viewAllHref = "/collection",
  viewAllLabel = "View All",
  showViewAll = true,
  columns     = 4,
  className,
}: ProductGridProps) {
  const is5Col  = columns === 5;
  const compact = is5Col;

  return (
    <section className={cn("bg-brand-black py-20 px-6 lg:px-8", className)}>
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ───────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            {eyebrow && (
              <p className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-orange mb-2">
                {eyebrow}
              </p>
            )}
            <h2 className="font-bebas text-5xl md:text-6xl tracking-display text-brand-white leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="font-barlow text-sm text-brand-white/50 mt-2 max-w-md leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-white/50 hover:text-brand-orange transition-colors duration-200 whitespace-nowrap"
            >
              {viewAllLabel} →
            </Link>
          )}
        </div>

        {/* ── Grid ─────────────────────────────────── */}
        <div
          className={cn(
            "grid gap-4",
            is5Col
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              : cn(
                  "grid-cols-1 sm:grid-cols-2",
                  columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                )
          )}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.slug ?? i}
              {...product}
              compact={compact}
            />
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────── */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link href={viewAllHref} className="btn-outline font-barlow">
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
