import { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.sworninusa.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             baseUrl,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             `${baseUrl}/shop`,
      lastModified:    new Date(),
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${baseUrl}/about`,
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        0.6,
    },
    {
      url:             `${baseUrl}/contact`,
      lastModified:    new Date(),
      changeFrequency: "yearly",
      priority:        0.5,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url:             `${baseUrl}/shop/${product.slug}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
