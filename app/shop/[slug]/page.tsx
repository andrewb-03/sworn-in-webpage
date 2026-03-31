import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

/* ─── Static params ──────────────────────────────────────── */
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* ─── Dynamic metadata ───────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title:       "Product Not Found",
      description: "This product could not be found.",
    };
  }

  return {
    title:       product.name,
    description: `${product.description} Shop the ${product.name} from Sworn In USA. $${product.price}.00`,
    alternates: {
      canonical: `https://www.sworninusa.com/shop/${product.slug}`,
    },
    openGraph: {
      title:       `${product.name} | Sworn In USA`,
      description: product.description,
      url:         `https://www.sworninusa.com/shop/${product.slug}`,
      type:        "website",
      images: [
        {
          url:    product.imageSrc,
          width:  600,
          height: 600,
          alt:    product.name,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${product.name} | Sworn In USA`,
      description: product.description,
      images:      [product.imageSrc],
    },
  };
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
