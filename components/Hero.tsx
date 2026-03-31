"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.35, staggerChildren: 0.13 } },
};

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

const headlineVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

const ruleVariants = {
  hidden:  { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

const BG_PHRASE =
  "SWORN IN USA  ✦  SAY WHAT YOU MEAN  ✦  WEAR WHAT YOU FEEL  ✦  NO FILTER · NO APOLOGIES  ✦  ";

const BG_ROWS = [
  { speed: "38s", reverse: false, top: "8%"  },
  { speed: "52s", reverse: true,  top: "28%" },
  { speed: "44s", reverse: false, top: "50%" },
  { speed: "60s", reverse: true,  top: "70%" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">

      {/* ── Ghost background text ────────────────── */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        {BG_ROWS.map((row, i) => (
          <div
            key={i}
            className="absolute whitespace-nowrap font-bebas leading-none"
            style={{
              top:      row.top,
              fontSize: "clamp(72px, 13vw, 148px)",
              animation: `${row.reverse ? "marquee-rtl" : "marquee-ltr"} ${row.speed} linear infinite`,
              WebkitTextStroke: "1px rgba(232, 98, 26, 0.065)",
              color: "transparent",
            }}
          >
            {BG_PHRASE.repeat(5)}
          </div>
        ))}
      </div>

      {/* ── Gradients + vignettes ────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/85 via-brand-black/25 to-brand-black/90" />
      <div className="absolute inset-y-0 left-0  w-32 bg-gradient-to-r from-brand-black to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent" />

      {/* ── Staggered content ───────────────────── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-36 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1 — Eyebrow */}
        <motion.div className="inline-flex items-center gap-3 mb-8" variants={fadeUpVariants}>
          <span className="block w-8 h-px bg-brand-orange/70" />
          <p className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
            Say What You Mean. Wear What You Feel.
          </p>
          <span className="block w-8 h-px bg-brand-orange/70" />
        </motion.div>

        {/* 2 — Headline */}
        <motion.h1
          className="font-bebas leading-[0.88] tracking-display text-brand-white mb-6"
          style={{ fontSize: "clamp(3.8rem, 13.5vw, 10.5rem)" }}
          variants={headlineVariants}
        >
          WEAR WHAT
          <br />
          <span className="text-orange-gradient">YOU MEAN.</span>
        </motion.h1>

        {/* 3 — Rule */}
        <motion.div
          className="w-24 h-px bg-brand-orange mx-auto mb-8 origin-center"
          variants={ruleVariants}
        />

        {/* 4 — Subtext */}
        {/* 5 — CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeUpVariants}
        >
          <Link href="/shop" className="btn-primary font-barlow min-w-[200px]">
            Shop the Collection
          </Link>
          <Link href="/about" className="btn-outline font-barlow min-w-[200px]">
            Our Story
          </Link>
        </motion.div>

        {/* 6 — Trust badges */}
        <motion.div className="flex flex-wrap justify-center gap-6 mt-14" variants={fadeUpVariants}>
          {["Free U.S. Shipping $75+", "American Made", "Premium Quality"].map((badge) => (
            <span key={badge} className="font-barlow text-[10px] font-semibold uppercase tracking-widest text-brand-white/35">
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-barlow text-[9px] uppercase tracking-widest text-brand-white/25">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-orange/40 to-transparent animate-pulse" />
      </motion.div>

    </section>
  );
}
