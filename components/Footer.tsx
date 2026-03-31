import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={className}
      style={{ background: "#141414", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <style>{`
        .footer-email-link { color: rgba(245,242,237,0.45); text-decoration: none; }
        .footer-email-link:hover { color: #E8621A; }
        .footer-tm-link { color: rgba(245,242,237,0.25); text-decoration: none; }
        .footer-tm-link:hover { color: #E8621A; }
        .footer-credit-link { color: #E8621A; text-decoration: none; }
        .footer-credit-link:hover { color: #FF7A35; }

        @media (max-width: 768px) {
          .footer-top     { flex-direction: column !important; gap: 2rem !important; }
          .footer-contact { text-align: left !important; }
          .footer-bottom  { flex-direction: column !important; gap: 0.75rem !important; }
          .footer-credit  { text-align: left !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3rem 2rem" }}>

        {/* ── Top section ───────────────────────── */}
        <div
          className="footer-top"
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-start",
            paddingBottom:  "2.5rem",
            borderBottom:   "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily:     "var(--font-bebas), sans-serif",
              fontSize:       "1.5rem",
              letterSpacing:  "0.1em",
              color:          "#E8621A",
              textDecoration: "none",
            }}
            aria-label="Sworn In USA — home"
          >
            {BRAND_NAME}
          </Link>

          {/* Contact block */}
          <div className="footer-contact" style={{ textAlign: "right" }}>
            <p style={{
              fontFamily:    "var(--font-barlow), sans-serif",
              fontSize:      "0.75rem",
              fontWeight:    600,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color:         "#E8621A",
              marginBottom:  "0.75rem",
            }}>
              Contact
            </p>
            <p style={{
              fontFamily:   "var(--font-barlow), sans-serif",
              fontSize:     "0.85rem",
              color:        "rgba(245,242,237,0.45)",
              marginBottom: "0.35rem",
            }}>
              Phone: (408) 314-1411
            </p>
            <p style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "0.85rem", color: "rgba(245,242,237,0.45)" }}>
              Email:{" "}
              <a href="mailto:john@sworninusa.com" className="footer-email-link">
                john@sworninusa.com
              </a>
            </p>
          </div>
        </div>

        {/* ── Bottom section ────────────────────── */}
        <div
          className="footer-bottom"
          style={{
            marginTop:      "1.5rem",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-start",
            flexWrap:       "wrap",
            gap:            "1rem",
          }}
        >
          {/* Left: copyright + trademark */}
          <div>
            <p style={{
              fontFamily: "var(--font-barlow), sans-serif",
              fontSize:   "0.78rem",
              color:      "rgba(245,242,237,0.3)",
              margin:     0,
            }}>
              &copy; 2026 Sworn In USA. All Rights Reserved.
            </p>
            <p style={{
              fontFamily: "var(--font-barlow), sans-serif",
              fontSize:   "0.72rem",
              color:      "rgba(245,242,237,0.25)",
              maxWidth:   "480px",
              lineHeight: 1.6,
              marginTop:  "0.5rem",
            }}>
              &ldquo;SWORN IN&rdquo; is a registered trademark. For inquiries regarding
              use of the mark or to request a license agreement, please contact{" "}
              <a href="mailto:john@sworninusa.com" className="footer-tm-link">
                john@sworninusa.com
              </a>
              .
            </p>
          </div>

          {/* Right: credit */}
          <p
            className="footer-credit"
            style={{
              fontFamily: "var(--font-barlow), sans-serif",
              fontSize:   "0.78rem",
              color:      "rgba(245,242,237,0.3)",
              textAlign:  "right",
              margin:     0,
            }}
          >
            Engineered by{" "}
            <a
              href="https://abrockenborough.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              abrockenborough.dev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
