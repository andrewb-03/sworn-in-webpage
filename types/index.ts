/**
 * Sworn In USA — Type barrel
 * Re-exports all current product types from the product module.
 *
 * Import pattern:
 *   import type { Product, ProductVariant } from "@/types";
 */

export type { Product, ProductVariant } from "@/types/product";

// ── Navigation ────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href:  string;
}

// ── Component shared props ───────────────────────────────────────────────────
export interface BaseComponentProps {
  className?: string;
  children?:  React.ReactNode;
}
