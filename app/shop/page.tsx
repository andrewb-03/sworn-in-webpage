import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

/* ─── Page metadata ──────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Shop | The Collection",
  description:
    "Browse the full Sworn In USA collection. Hoodies, tees, long sleeves, hats and beanies. Bold American klothing built to last.",
  alternates: {
    canonical: "https://www.sworninusa.com/shop",
  },
  openGraph: {
    title:       "Shop The Collection | Sworn In USA",
    description: "Browse the full Sworn In USA collection. Built to last.",
    url:         "https://www.sworninusa.com/shop",
    images:      ["/images/og-image.jpg"],
  },
};

/* ─── Loading fallback ───────────────────────────────────── */
function ShopLoading() {
  return (
    <div style={{
      background:     "var(--black, #0A0A0A)",
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
    }}>
      <p style={{
        fontFamily:    "var(--font-bebas), sans-serif",
        fontSize:      "2rem",
        color:         "var(--orange, #E8621A)",
        letterSpacing: "0.1em",
      }}>
        Loading...
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopClient />
    </Suspense>
  );
}
