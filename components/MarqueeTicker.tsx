import { cn } from "@/lib/utils";

const TICKER_ITEMS = [
  "SAY WHAT YOU MEAN. WEAR WHAT YOU FEEL.",
  "FREE U.S. SHIPPING ON ORDERS $75+",
  "NO FILTER. NO APOLOGIES.",
  "NEW DROPS — SHOP NOW",
  "COMFORTABLE. EXPRESSIVE. YOURS.",
  "SWORN IN USA",
];

interface MarqueeTickerProps {
  /** "orange" uses brand-orange bg with black text; "dark" flips it */
  variant?: "orange" | "dark";
  className?: string;
}

function TickerItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-5 mx-5">
      <span className="font-bebas text-lg lg:text-xl tracking-widest">{label}</span>
      <span className="text-brand-orange text-[8px]">✦</span>
    </span>
  );
}

export default function MarqueeTicker({
  variant = "orange",
  className,
}: MarqueeTickerProps) {
  const isOrange = variant === "orange";

  return (
    <div
      className={cn(
        "overflow-hidden py-3 border-y",
        isOrange
          ? "bg-brand-orange border-brand-orange-light text-brand-black"
          : "bg-brand-charcoal border-white/[0.06] text-brand-orange",
        className
      )}
      aria-label="Brand messaging ticker"
    >
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <TickerItem key={i} label={item} />
        ))}
      </div>
    </div>
  );
}
