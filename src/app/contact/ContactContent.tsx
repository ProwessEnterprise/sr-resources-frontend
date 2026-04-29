"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { getContactPage } from "@/services/PageService";
import { ContactPage } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import ContactInfoCards from "@/components/ContactInfoCards/ContactInfoCards";
import StrategicSection from "@/components/StrategicSection/StrategicSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";
import PageLoader from "@/components/PageLoader/PageLoader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

export default function ContactContent() {
  const router = useRouter();
  const [page, setPage] = useState<ContactPage | null>(null);

  useEffect(() => {
    getContactPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return <PageLoader />;

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
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
      <ContactInfoCards cards={page.help} />
      <StrategicSection
        title={page.our_strategic?.title}
        description={page.our_strategic?.description}
        keypoints={page.our_strategic_keypoints}
        officeLocations={page.office_locations}
        requestQuoteTitle={page.request_quote?.title}
        requestQuoteDescription={page.request_quote?.description}
      />
      <CTAMapSection
        title={page.map?.title}
        primaryButtonText={page.map?.primary_button_text}
        secondaryButtonText={page.map?.secondary_button_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
