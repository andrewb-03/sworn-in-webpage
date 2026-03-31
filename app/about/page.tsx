import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Put your money where your pride is. Learn about Sworn In USA — bold American clothing for people with conviction.",
  alternates: {
    canonical: "https://www.sworninusa.com/about",
  },
  openGraph: {
    title:       "Our Story | Sworn In USA",
    description: "Put your money where your pride is.",
    url:         "https://www.sworninusa.com/about",
    images:      ["/images/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
