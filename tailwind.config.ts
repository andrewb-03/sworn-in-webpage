import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Brand colors ───────────────────────── */
      colors: {
        brand: {
          black:           "#0A0A0A",
          charcoal:        "#141414",
          orange:          "#E8621A",
          "orange-light":  "#FF7A35",
          "orange-dark":   "#C4501A",
          silver:          "#D0CFCF",
          navy:            "#1A2035",
          white:           "#F5F2ED",
          red:             "#8B1A1A",
        },
      },

      /* ── Typography ─────────────────────────── */
      fontFamily: {
        bebas:   ["var(--font-bebas)", "Impact", "sans-serif"],
        barlow:  ["var(--font-barlow)", "Helvetica Neue", "sans-serif"],
        display: ["var(--font-bebas)", "Impact", "sans-serif"],
        body:    ["var(--font-barlow)", "Helvetica Neue", "sans-serif"],
      },

      /* ── Letter spacing ─────────────────────── */
      letterSpacing: {
        display: "0.15em",
        wide:    "0.08em",
        widest:  "0.25em",
      },

      /* ── Background gradients ───────────────── */
      backgroundImage: {
        "orange-gradient":
          "linear-gradient(135deg, #E8621A 0%, #FF7A35 50%, #E8621A 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #141414 0%, #0A0A0A 100%)",
        "hero-gradient":
          "linear-gradient(to bottom, transparent 60%, #0A0A0A 100%)",
      },

      /* ── Animation ──────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-ltr": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-rtl": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up":     "fade-up 0.6s ease forwards",
        "fade-in":     "fade-in 0.4s ease forwards",
        shimmer:       "shimmer 2.5s linear infinite",
        marquee:       "marquee 30s linear infinite",
        "marquee-ltr": "marquee-ltr 38s linear infinite",
        "marquee-rtl": "marquee-rtl 44s linear infinite",
      },

      /* ── Spacing additions ──────────────────── */
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "128": "32rem",
        "144": "36rem",
      },

      /* ── Screen additions ───────────────────── */
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
