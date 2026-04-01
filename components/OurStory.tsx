import Link from "next/link";
import { cn } from "@/lib/utils";

const BRAND_VALUES = [
  { label: "Comfortable. Expressive. Yours.", description: "We make klothing people actually want to wear. Comfortable fit, quality fabric, and designs that say something." },
  { label: "No Filter. No Apologies.",        description: "We don't overthink it. If it feels right and looks good, we make it. Simple as that." },
  { label: "Built to Last",                   description: "Premium materials, real construction. Klothing that holds up wash after wash, wear after wear." },
  { label: "Say What You Mean.",              description: "Your klothes say something. Make sure it's saying the right thing." },
];

interface OurStoryProps {
  className?: string;
}

export default function OurStory({ className }: OurStoryProps) {
  return (
    <section
      className={cn("bg-brand-black py-24 px-6 lg:px-8 border-t border-white/[0.04]", className)}
    >
      <div className="max-w-3xl mx-auto">

        {/* ── Story text ─────────────────────────── */}
        <div>
          <p className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-orange mb-4">
            The Brand
          </p>

          <h2 className="font-bebas text-[clamp(2.8rem,6vw,4.5rem)] leading-none tracking-display text-brand-white mb-6">
            Wear What
            <br />
            <span className="text-orange-gradient">You Feel.</span>
          </h2>

          <div className="w-12 h-px bg-brand-orange mb-8" />

          <div className="mb-10">
            <p className="font-barlow text-sm md:text-[0.9375rem] font-light text-brand-white/60 leading-relaxed">
              Sworn In USA started with one idea — that what you wear says something
              about who you are and how you feel. Whether you&apos;re repping the brand
              or telling the world you&apos;re stressed the f out, we make klothing for
              people who keep it real. No filter. No apologies. Just good klothes that
              mean something.
            </p>
          </div>

          {/* Values list */}
          <div className="space-y-5 mb-10">
            {BRAND_VALUES.map((value) => (
              <div key={value.label} className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 border border-brand-orange/40 flex items-center justify-center group-hover:border-brand-orange transition-colors duration-300">
                    <span className="text-brand-orange text-[10px]">✦</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bebas text-xl tracking-display text-brand-white leading-none mb-1">
                    {value.label}
                  </h4>
                  <p className="font-barlow text-sm text-brand-white/45 leading-snug">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-block font-barlow text-[11px] font-semibold uppercase tracking-widest px-6 py-2.5 border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-black transition-colors duration-200"
          >
            Our Story
          </Link>

        </div>
      </div>
    </section>
  );
}
