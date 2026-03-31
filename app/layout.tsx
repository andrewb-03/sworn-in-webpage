import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Barlow } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar     from "@/components/Navbar";
import Footer     from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────── */
const bebasNeue = Bebas_Neue({
  weight:   "400",
  subsets:  ["latin"],
  variable: "--font-bebas",
  display:  "swap",
});

const barlow = Barlow({
  weight:   ["300", "400", "500", "600", "700"],
  subsets:  ["latin"],
  variable: "--font-barlow",
  display:  "swap",
});

/* ─── Viewport (separate from metadata in Next 14) ──────── */
export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor:   "#E8621A",
};

/* ─── Root metadata ──────────────────────────────────────── */
// TODO: Replace og-image.jpg with a proper 1200×630px Open Graph image before going live
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sworninusa.com"),
  title: {
    default:  "Sworn In USA | Bold American Clothing",
    template: "%s | Sworn In USA",
  },
  description:
    "Bold American clothing for people who know exactly who they are. Shop tees, hoodies, hats and more. Put your money where your pride is.",
  keywords: [
    "Sworn In USA",
    "American clothing",
    "patriotic apparel",
    "American made clothing",
    "hoodies",
    "graphic tees",
    "American pride clothing",
    "bold American brand",
    "sworn in klothing",
    "patriot clothing brand",
  ],
  authors:   [{ name: "Sworn In USA" }],
  creator:   "Sworn In USA",
  publisher: "Sworn In USA",
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://www.sworninusa.com",
    siteName:    "Sworn In USA",
    title:       "Sworn In USA | Bold American Clothing",
    description: "Bold American clothing for people who know exactly who they are. Put your money where your pride is.",
    images: [
      {
        url:    "/images/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "Sworn In USA - Bold American Clothing",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Sworn In USA | Bold American Clothing",
    description: "Bold American clothing for people who know exactly who they are.",
    images:      ["/images/og-image.jpg"],
  },
  icons: {
    icon:    "/images/logos/sworn-in-icon.png",
    shortcut:"/images/logos/sworn-in-icon.png",
    apple:   "/images/logos/sworn-in-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "",
  },
  alternates: {
    canonical: "https://www.sworninusa.com",
  },
};

/* ─── Layout ─────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body className="antialiased bg-brand-black text-brand-white font-barlow">
        <CartProvider>
          <PageLoader />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
