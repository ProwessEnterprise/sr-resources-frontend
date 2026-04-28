const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const API_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace("/api", "");

export function organizationJsonLd(header?: { title?: string; logo_image?: { url: string } | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: header?.title || "SR Resources",
    url: SITE_URL,
    ...(header?.logo_image && { logo: `${API_URL}${header.logo_image.url}` }),
  };
}

export function productJsonLd(product: { title: string; slug: string; productOverview?: string; image?: { url: string } | null; category?: { name: string } | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.productOverview || "",
    url: `${SITE_URL}/products/${product.slug}`,
    ...(product.image && { image: `${API_URL}${product.image.url}` }),
    ...(product.category && { category: product.category.name }),
  };
}

export function articleJsonLd(article: { title: string; slug: string; image?: { url: string } | null; publishedAt: string }, type: "blog" | "news") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    url: `${SITE_URL}/${type === "blog" ? "blogs" : "news"}/${article.slug}`,
    datePublished: article.publishedAt,
    ...(article.image && { image: `${API_URL}${article.image.url}` }),
    publisher: { "@type": "Organization", name: "SR Resources" },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
