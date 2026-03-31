import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sworn In USA. Real people, real answers. Reach out anytime.",
  alternates: {
    canonical: "https://www.sworninusa.com/contact",
  },
  openGraph: {
    title:       "Contact | Sworn In USA",
    description: "Real people, real answers. Reach out anytime.",
    url:         "https://www.sworninusa.com/contact",
    images:      ["/images/og-image.jpg"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
