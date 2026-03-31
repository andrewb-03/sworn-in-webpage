import Link from "next/link";

export default function FeaturedLookbook() {
  return (
    <section
      className="lb-root"
      style={{
        position:      "relative",
        width:         "100%",
        height:        "60vh",
        minHeight:     480,
        maxHeight:     700,
        overflow:      "hidden",
        display:       "flex",
        flexDirection: "row",
      }}
    >
      {/* ── Scoped responsive styles ───────────── */}
      <style>{`
        @media (max-width: 768px) {
          .lb-root        { height: auto !important; flex-direction: column !important; }
          .lb-img-left,
          .lb-img-right   { width: 100% !important; height: 45vw !important; min-height: 240px !important; }
          .lb-bottom-text { padding: 2rem 1.5rem 1.5rem !important;
                            flex-direction: column !important;
                            align-items: flex-start !important;
                            gap: 1rem !important; }
          .lb-headline    { font-size: 1.8rem !important; max-width: 100% !important; }
          .lb-subtext-block { text-align: left !important; }
          .lb-divider     { display: none !important; }
        }
      `}</style>

      {/* ── Left image — Guy ──────────────────── */}
      <div
        className="lb-img-left"
        style={{ position: "relative", width: "50%", height: "100%", overflow: "hidden", background: "#0A0A0A" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/guy-min.png"
          alt="Men's collection"
          style={{
            objectFit:      "contain",
            objectPosition: "center bottom",
            width:          "100%",
            height:         "100%",
            display:        "block",
          }}
        />
        {/* Left-edge fade */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to right, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.0) 50%)",
            zIndex:     2,
          }}
        />
      </div>

      {/* ── Right image — Girl ────────────────── */}
      <div
        className="lb-img-right"
        style={{ position: "relative", width: "50%", height: "100%", overflow: "hidden", background: "#0A0A0A" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/girl-min.png"
          alt="Women's collection"
          style={{
            objectFit:      "contain",
            objectPosition: "center bottom",
            width:          "100%",
            height:         "100%",
            display:        "block",
          }}
        />
        {/* Right-edge fade */}
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to left, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.0) 50%)",
            zIndex:     2,
          }}
        />
      </div>

      {/* ── Center vertical divider ───────────── */}
      <div
        className="lb-divider"
        aria-hidden="true"
        style={{
          position:  "absolute",
          left:      "50%",
          top:       "5%",
          height:    "70%",
          width:     1,
          transform: "translateX(-50%)",
          background:"var(--orange, #E8621A)",
          boxShadow: "0 0 12px rgba(232, 98, 26, 0.5)",
          zIndex:    3,
        }}
      />

      {/* ── Bottom text overlay (full width) ─── */}
      <div
        className="lb-bottom-text"
        style={{
          position:       "absolute",
          bottom:         0,
          left:           0,
          right:          0,
          zIndex:         5,
          background:     "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.7) 40%, transparent 100%)",
          padding:        "4rem 3rem 2.5rem",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-end",
        }}
      >
        {/* Left: eyebrow + headline */}
        <div>
          <p style={{
            fontFamily:    "var(--font-barlow), sans-serif",
            fontSize:      "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:         "var(--orange, #E8621A)",
            margin:        "0 0 0.6rem",
          }}>
            The Collection
          </p>
          <h2
            className="lb-headline"
            style={{
              fontFamily:    "var(--font-bebas), sans-serif",
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              color:         "#F5F2ED",
              lineHeight:    0.95,
              letterSpacing: "0.03em",
              margin:        0,
              maxWidth:      400,
            }}
          >
            For the Ones<br />
            Who Keep It Real.
          </h2>
        </div>

        {/* Right: CTA */}
        <div className="lb-subtext-block" style={{ textAlign: "right" }}>
          <Link href="/shop" className="btn-primary font-barlow">
            Shop the Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
