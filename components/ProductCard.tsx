"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

export interface ProductCardProps {
  name:       string;
  /** Price in dollars (e.g. 49.99 → "$49.99") */
  price:      number;
  category:   string;
  badge?:     string;
  imageSrc?:  string;
  slug?:      string;
  /** When true, uses fixed heights (220px mobile → 200px desktop) instead of aspect-square */
  compact?:   boolean;
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  new:        "bg-brand-orange text-brand-black",
  bestseller: "bg-brand-white text-brand-black",
  limited:    "bg-brand-red text-brand-white",
  "sold out": "bg-brand-charcoal text-brand-white/60 border border-white/10",
};

function getBadgeStyle(badge: string): string {
  return (
    BADGE_STYLES[badge.toLowerCase()] ??
    "bg-brand-charcoal text-brand-orange border border-brand-orange/30"
  );
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function ProductCard({
  name,
  price,
  category,
  badge,
  imageSrc,
  slug,
  compact,
  className,
}: ProductCardProps) {
  const href = slug ? `/shop/${slug}` : "/shop";

  return (
    <motion.div
      className={cn(
        "border border-transparent hover:border-brand-orange-dark/30 transition-colors duration-300",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      <Link
        href={href}
        className="group block bg-brand-charcoal overflow-hidden"
        aria-label={`${name} — ${formatPrice(price)}`}
      >
        {/* ── Image area ──────────────────────────── */}
        <div className={cn(
          "relative overflow-hidden bg-brand-black",
          compact ? "h-[220px] lg:h-[200px]" : "aspect-square"
        )}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-brand-black flex items-center justify-center">
              <span
                className="font-bebas select-none"
                style={{
                  fontSize: "clamp(48px, 10vw, 96px)",
                  WebkitTextStroke: "1px rgba(232, 98, 26, 0.12)",
                  color: "transparent",
                  letterSpacing: "0.1em",
                }}
                aria-hidden="true"
              >
                SI
              </span>
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #E8621A 0, #E8621A 1px, transparent 0, transparent 50%)",
                  backgroundSize: "10px 10px",
                }}
              />
            </div>
          )}

          {/* Quick-shop overlay */}
          <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-brand-black/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <span className="font-barlow text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
              Quick Shop
            </span>
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-3 left-3 font-barlow text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1",
                getBadgeStyle(badge)
              )}
            >
              {badge}
            </span>
          )}
        </div>

        {/* ── Info ────────────────────────────────── */}
        <div className="p-4 border-t border-white/[0.05]">
          <p className="font-barlow text-[10px] font-semibold uppercase tracking-widest text-brand-orange/70 mb-1">
            {category}
          </p>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-barlow text-sm font-semibold text-brand-white group-hover:text-brand-orange transition-colors duration-200 leading-snug">
              {name}
            </h3>
            <span className="font-barlow text-sm font-semibold text-brand-orange whitespace-nowrap shrink-0">
              {formatPrice(price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
