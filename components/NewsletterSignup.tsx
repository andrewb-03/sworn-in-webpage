"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email,      setEmail]      = useState("");
  const [phone,      setPhone]      = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status,     setStatus]     = useState<Status>("idle");
  const [errorMsg,   setErrorMsg]   = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/klaviyo", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, phone: phone || undefined, smsConsent }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setPhone("");
        setSmsConsent(false);
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-charcoal border-t border-white/[0.06] py-24 px-6 lg:px-8",
        className
      )}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(ellipse 80% 50% at 50% 50%, #E8621A, transparent)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="font-barlow text-[11px] font-semibold uppercase tracking-widest text-brand-orange mb-4">
          Stay in the Loop
        </p>

        {/* Headline */}
        <h2 className="font-bebas text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-display text-brand-white mb-4">
          {status === "success" ? "You're In." : "Join the Crew"}
        </h2>

        <div className="w-12 h-px bg-brand-orange mx-auto mb-6" />

        {status === "success" ? (
          <div className="animate-fade-up">
            <p className="font-barlow text-sm md:text-base font-light text-brand-white/60 mb-2 leading-relaxed">
              You&apos;re in. Watch your inbox for new drops, exclusive offers, and what&apos;s next from Sworn In USA.
            </p>
            <p className="font-barlow text-xs text-brand-orange/60 tracking-wide mt-4">
              ✦ &nbsp;You&apos;ll hear from us soon.
            </p>
          </div>
        ) : (
          <>
            <p className="font-barlow text-sm md:text-base font-light text-brand-white/55 max-w-md mx-auto mb-10 leading-relaxed">
              Be the first to know about new drops, exclusive offers, and whatever comes next from Sworn In USA.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>

              {/* Email row */}
              <div className="flex flex-col sm:flex-row gap-0 mb-3">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                    placeholder="Your email address"
                    autoComplete="email"
                    disabled={status === "loading"}
                    className={cn(
                      "w-full bg-brand-black border px-5 py-3.5 font-barlow text-sm text-brand-white placeholder:text-brand-white/25 outline-none transition-colors duration-200",
                      "focus:border-brand-orange-dark",
                      status === "error" ? "border-brand-red" : "border-white/10",
                      status === "loading" && "opacity-60 cursor-not-allowed"
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "font-barlow text-[11px] font-semibold uppercase tracking-widest px-8 py-3.5 transition-all duration-200 whitespace-nowrap",
                    "bg-brand-orange text-brand-black hover:bg-brand-orange-light",
                    status === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin" aria-hidden="true" />
                      Joining…
                    </span>
                  ) : "I'm In"}
                </button>
              </div>

              {/* Phone row */}
              <div className="mb-4">
                <label htmlFor="newsletter-phone" className="sr-only">Phone number (optional)</label>
                <input
                  id="newsletter-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number (optional — for SMS updates)"
                  autoComplete="tel"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full bg-brand-black border border-white/10 px-5 py-3.5 font-barlow text-sm text-brand-white placeholder:text-brand-white/25 outline-none transition-colors duration-200",
                    "focus:border-brand-orange-dark",
                    status === "loading" && "opacity-60 cursor-not-allowed"
                  )}
                />
              </div>

              {/* SMS consent checkbox — only shown when phone is entered */}
              {phone.trim().length > 0 && (
                <label className="flex items-start gap-3 mb-4 cursor-pointer text-left">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-brand-orange flex-shrink-0 cursor-pointer"
                  />
                  <span className="font-barlow text-[11px] text-brand-white/40 leading-relaxed">
                    Yes, text me new drops, exclusive offers, and order updates from Sworn In USA.
                    Message & data rates may apply. Reply STOP to unsubscribe at any time.
                  </span>
                </label>
              )}

              {status === "error" && (
                <p className="font-barlow text-xs text-brand-red mt-1 mb-3 tracking-wide animate-fade-in">
                  {errorMsg}
                </p>
              )}

              <p className="font-barlow text-[10px] text-brand-white/25 tracking-wide leading-relaxed">
                By signing up you agree to receive marketing emails from Sworn In USA.
                {phone.trim() && smsConsent && " You also consent to receive SMS marketing messages. "}
                {" "}Unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
