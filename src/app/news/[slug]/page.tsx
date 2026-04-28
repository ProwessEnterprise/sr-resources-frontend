import { articleJsonLd } from "@/lib/jsonld";
import { sanitizeSlug } from "@/lib/sanitize";
import NewsDetailContent from "./NewsDetailContent";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337/api";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API}/newses?fields[0]=slug&pagination[pageSize]=200`);
    const json = await res.json();
    return (json?.data || []).map((n: { slug: string }) => ({ slug: n.slug }));
  } catch {
    return [];
  }
}

async function getNews(slug: string) {
  try {
    const safe = sanitizeSlug(slug);
    const res = await fetch(`${API}/newses?filters[slug][$eq]=${safe}&populate=image`, { next: { revalidate: 60 } });
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function NewsDetail(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const news = await getNews(slug);

  return (
    <>
      {news && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(news, "news")) }}
        />
      )}
      <NewsDetailContent params={props.params} />
    </>
  );
}
