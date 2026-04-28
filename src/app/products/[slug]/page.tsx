import { productJsonLd } from "@/lib/jsonld";
import { sanitizeSlug } from "@/lib/sanitize";
import ProductDetailContent from "./ProductDetailContent";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/products?fields[0]=slug&pagination[pageSize]=200`);
    const json = await res.json();
    return (json?.data || []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

async function getProduct(slug: string) {
  try {
    const safe = sanitizeSlug(slug);
    const res = await fetch(`${API}/products?filters[slug][$eq]=${safe}&populate[0]=image&populate[1]=category`, { next: { revalidate: 60 } });
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
        />
      )}
      <ProductDetailContent />
    </>
  );
}
