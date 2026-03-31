"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const navItemVariants = { rest: {}, hover: {} };

const underlineVariants = {
  rest:  { scaleX: 0, transition: { duration: 0.2, ease: "easeIn"            as const } },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Promo bar ─────────────────────────────── */}
      <div className="bg-brand-orange">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-brand-black py-2 font-barlow">
          Free U.S. shipping on orders $75+&nbsp;&nbsp;·&nbsp;&nbsp;Use code{" "}
          <strong>SWORN25</strong> for 10% off your first order
        </p>
      </div>

      {/* ── Main nav ──────────────────────────────── */}
      <nav
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-brand-black/95 backdrop-blur-md border-b border-white/[0.06] shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-bebas text-[1.65rem] tracking-display leading-none text-brand-white hover:text-brand-orange transition-colors duration-200"
            aria-label="Sworn In USA — home"
          >
            {BRAND_NAME}
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                className="relative"
                variants={navItemVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Link
                  href={link.href}
                  className="relative font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-white/75 hover:text-brand-orange transition-colors duration-200 pb-0.5 inline-block"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 w-full h-px bg-brand-orange origin-left"
                    variants={underlineVariants}
                    aria-hidden="true"
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Cart */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart icon */}
            <button
              onClick={openCart}
              aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} item${totalItems > 1 ? 's' : ''}` : ''}`}
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            >
              {/* Bag SVG */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--brand-white, #F5F2ED)" }}
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              {/* Badge */}
              {totalItems > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position:       "absolute",
                    top:            -6,
                    right:          -6,
                    width:          18,
                    height:         18,
                    borderRadius:   "50%",
                    background:     "var(--orange, #E8621A)",
                    color:          "#000",
                    fontSize:       "0.65rem",
                    fontWeight:     700,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    lineHeight:     1,
                  }}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={cn("block w-6 h-[1.5px] bg-brand-white transition-all duration-300 origin-center", menuOpen && "rotate-45 translate-y-[6.5px]")} />
            <span className={cn("block w-6 h-[1.5px] bg-brand-white transition-all duration-300",               menuOpen && "opacity-0 scale-x-0")} />
            <span className={cn("block w-6 h-[1.5px] bg-brand-white transition-all duration-300 origin-center", menuOpen && "-rotate-45 -translate-y-[6.5px]")} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────── */}
      <div
        className={cn(
          "md:hidden bg-brand-charcoal/98 backdrop-blur-md border-b border-white/[0.06] overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col px-6 pt-4 pb-6 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block font-barlow text-sm font-medium uppercase tracking-widest text-brand-white/80 hover:text-brand-orange transition-colors py-3 border-b border-white/[0.05]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </header>
  );
}
