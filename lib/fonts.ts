/**
 * Re-exports font CSS variable names for use outside of layout.tsx.
 * Import these constants anywhere you need to reference font variables
 * in inline styles or className logic.
 */
export const FONT_DISPLAY = "var(--font-bebas)";
export const FONT_BODY    = "var(--font-barlow)";

/** Tailwind class helpers */
export const fontClasses = {
  display: "font-bebas",
  body:    "font-barlow",
} as const;
