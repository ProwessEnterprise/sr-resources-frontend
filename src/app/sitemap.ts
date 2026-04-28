import { MetadataRoute } from "next";
import { sanitizeSlug } from "@/lib/sanitize";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337/api";
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://srresources.com";

async function fetchSlugs(endpoint: string): Promise<{ slug: string; updatedAt: string }[]> {
  try {
    const safeEndpoint = endpoint.replace(/[^a-zA-Z0-9\-]/g, "");
    const res = await fetch(`${API}/${safeEndpoint}?fields[0]=slug&fields[1]=updatedAt&pagination[pageSize]=200`);
    const json = await res.json();
    return json?.data || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "", "/about", "/products", "/blogs", "/contact", "/business",
    "/careers", "/network", "/media-press", "/drivura", "/sunstar",
    "/legal/terms-of-use", "/legal/privacy-statement", "/legal/trademarks",
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [products, blogs, news] = await Promise.all([
    fetchSlugs("products"),
    fetchSlugs("blogs"),
    fetchSlugs("newses"),
  ]);

  for (const p of products) {
    entries.push({ url: `${SITE}/products/${sanitizeSlug(p.slug)}`, lastModified: new Date(p.updatedAt), changeFrequency: "weekly", priority: 0.8 });
  }
  for (const b of blogs) {
    entries.push({ url: `${SITE}/blogs/${sanitizeSlug(b.slug)}`, lastModified: new Date(b.updatedAt), changeFrequency: "weekly", priority: 0.7 });
  }
  for (const n of news) {
    entries.push({ url: `${SITE}/news/${sanitizeSlug(n.slug)}`, lastModified: new Date(n.updatedAt), changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
