import { articleJsonLd } from "@/lib/jsonld";
import { sanitizeSlug } from "@/lib/sanitize";
import BlogDetailContent from "./BlogDetailContent";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/blogs?fields[0]=slug&pagination[pageSize]=200`);
    const json = await res.json();
    return (json?.data || []).map((b: { slug: string }) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

async function getBlog(slug: string) {
  try {
    const safe = sanitizeSlug(slug);
    const res = await fetch(`${API}/blogs?filters[slug][$eq]=${safe}&populate[0]=image&populate[1]=category`, { next: { revalidate: 60 } });
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function BlogDetail(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const blog = await getBlog(slug);

  return (
    <>
      {blog && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(blog, "blog")) }}
        />
      )}
      <BlogDetailContent params={props.params} />
    </>
  );
}
