import Link from "next/link";
import { cn } from "@/lib/utils";

interface MilitaryBannerProps {
  className?: string;
}

const BRANCHES = [
  "Army", "Navy", "Marine Corps", "Air Force",
  "Space Force", "Coast Guard", "First Responders",
];

export default function MilitaryBanner({ className }: MilitaryBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-charcoal border-y border-white/[0.06] py-20 px-6 lg:px-8",
        className
      )}
    >
      {/* ── Background dot pattern ────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #E8621A 1px, transparent 1px)",
          backgroundSize:  "32px 32px",
        }}
      />

      {/* ── Decorative background text ───────────── */}
      <p
        className="absolute inset-0 flex items-center justify-center font-bebas leading-none select-none pointer-events-none overflow-hidden whitespace-nowrap"
        aria-hidden="true"
        style={{
          fontSize: "clamp(100px, 22vw, 220px)",
          WebkitTextStroke: "1px rgba(232, 98, 26, 0.04)",
          color: "transparent",
        }}
      >
        HONOR SERVICE
      </p>

      {/* ── Content ───────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Emblem */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 border-2 border-brand-orange/40">
            <span
              className="font-bebas text-3xl text-brand-orange absolute"
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", lineHeight: 1 }}
              aria-hidden="true"
            >
              ★
            </span>
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r",
            ].map((pos) => (
              <span
                key={pos}
                className={cn("absolute w-2 h-2 border-brand-orange -translate-x-px -translate-y-px", pos)}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* Eyebrow — kept as brand red per spec */}
        <p className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-red mb-4">
          In Honor of Those Who Serve
        </p>

        {/* Headline */}
        <h2 className="font-bebas text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-display text-brand-white mb-4">
          Sworn In Salutes Our
          <br />
          <span className="text-orange-gradient">Veterans &amp; First Responders</span>
        </h2>

        {/* Rule */}
        <div className="w-16 h-px bg-brand-orange mx-auto my-6" />

        {/* Body */}
        <p className="font-barlow text-sm md:text-base font-light text-brand-white/55 max-w-2xl mx-auto mb-8 leading-relaxed">
          Sworn In USA was built to honor the culture of service, sacrifice, and
          integrity. We proudly support the military and first responder community
          — because some people just live by a higher standard.
        </p>

        {/* Branches */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {BRANCHES.map((branch) => (
            <span key={branch} className="font-barlow text-[10px] font-semibold uppercase tracking-widest text-brand-white/35">
              {branch}
            </span>
          ))}
        </div>

        {/* Discount CTA */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-black/60 border border-white/[0.08] px-8 py-5">
          <div className="text-center sm:text-left">
            <p className="font-barlow text-[10px] font-semibold uppercase tracking-widest text-brand-orange mb-0.5">
              Military &amp; First Responder Discount
            </p>
            <p className="font-bebas text-2xl tracking-display text-brand-white leading-none">
              15% Off — Always
            </p>
          </div>
          <Link
            href="/military-discount"
            className="font-barlow text-[11px] font-semibold uppercase tracking-widest px-6 py-2.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-black transition-colors duration-200 whitespace-nowrap"
          >
            Verify &amp; Save
          </Link>
        </div>
      </div>
    </section>
  );
}
