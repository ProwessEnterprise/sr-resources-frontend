"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHomePage } from "@/services/PageService";
import { HomePage } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import CategoryGrid from "@/components/CategoryGrid/CategoryGrid";
import TrustedPartners from "@/components/TrustedPartners/TrustedPartners";
import BrandSection from "@/components/BrandSection/BrandSection";
import CustomerSection from "@/components/CustomerSection/CustomerSection";
import BlogSection from "@/components/BlogSection/BlogSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

export default function HomeContent() {
  const router = useRouter();
  const [page, setPage] = useState<HomePage | null>(null);

  useEffect(() => {
    getHomePage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return null;

  const hero = page.hero_section;

  return (
    <>
      <HeroSection
        bgImage={hero?.hero_image ? `${API_URL}${hero.hero_image.url}` : undefined}
        tagline={hero?.hero_tagline}
        title={hero?.hero_title}
        description={hero?.hero_description}
        primaryBtnText={hero?.hero_primarybutton_text}
        secondaryBtnText={hero?.hero_secondarybutton_text}
        onPrimaryClick={() => router.push("/products")}
        onSecondaryClick={() => router.push("/contact")}
      />
      <CategoryGrid title={page.product_title} />
      <TrustedPartners
        title={page.company_overview?.title}
        description={page.company_overview?.description}
        image={page.company_overview?.image}
        stats={page.company_metrics?.stats}
      />
      <BrandSection title={page.brands?.title} description={page.brands?.description} />
      <CustomerSection title={page.customer?.title} description={page.customer?.description} />
      <BlogSection title={page.blogs?.title} description={page.blogs?.description} />
      <FAQSection title={page.quesAns?.title} description={page.quesAns?.description} />
      <CTAMapSection
        title={page.map?.title}
        primaryButtonText={page.map?.primary_button_text}
        secondaryButtonText={page.map?.secondary_button_text}
        onPrimaryClick={() => router.push("/products")}
        onSecondaryClick={() => router.push("/contact")}
      />
    </>
  );
}
