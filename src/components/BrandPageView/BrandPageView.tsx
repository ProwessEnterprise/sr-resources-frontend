"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { BrandPageData, Product } from "@/interfaces/Strapi";
import { getFeaturedProducts } from "@/services/ProductService";
import HeroSection from "@/components/HeroSection/HeroSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CustomerSection from "@/components/CustomerSection/CustomerSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CustomButton from "@/components/CustomButton/CustomButton";
import CTASection from "@/components/CTASection/CTASection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface BrandPageViewProps {
  page: BrandPageData;
}

export default function BrandPageView({ page }: BrandPageViewProps) {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then((res) => setFeaturedProducts(res?.data || []));
  }, []);

  const hero = page.hero_section;
  const metrics = page.performance_matrics?.stats || [];

  return (
    <>
      {/* Hero */}
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

      {/* Built for Modern Engines */}
      <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontFamily: fontFamily.heading, fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: colors.black, textTransform: "uppercase", mb: 2,
              }}
            >
              {page.performance?.title}
            </Typography>
            <Typography
              sx={{ fontFamily: fontFamily.body, fontSize: { xs: "0.875rem", md: "1rem" }, color: colors.grey, lineHeight: 1.8, mb: 4 }}
            >
              {page.performance?.description}
            </Typography>
            {/* Metrics */}
            <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {metrics.map((m: any, i: number) => (
                <Box key={i}>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "2rem", color: colors.primary }}>
                    {m.value}
                  </Typography>
                  <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.75rem", color: colors.grey, letterSpacing: 1, textTransform: "uppercase" }}>
                    {m.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {page.performance?.image && (
              <Box
                component="img"
                src={`${API_URL}${page.performance.image.url}`}
                alt={page.performance.title}
                sx={{ width: "100%", height: { xs: 280, md: 400 }, objectFit: "cover", borderRadius: "12px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Product Categories */}
      {page.product_category?.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: colors.white }}>
          <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
            <Typography
              sx={{
                fontFamily: fontFamily.heading, fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: colors.black, textTransform: "uppercase", mb: 6,
              }}
            >
              {page.product_category_title}
            </Typography>
            <Grid container spacing={2}>
              {page.product_category.map((cat) => (
                <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: { xs: 300, md: 380 },
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundImage: cat.image ? `url(${API_URL}${cat.image.url})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: fontFamily.heading, fontWeight: 900, fontSize: "1.1rem",
                          color: colors.white, textTransform: "uppercase", mb: 1.5,
                        }}
                      >
                        {cat.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: fontFamily.body, fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.8)", lineHeight: 1.6, mb: 2,
                        }}
                      >
                        {cat.description}
                      </Typography>
                      <Link href="/products" style={{ textDecoration: "none" }}>
                        <CustomButton sx={{ fontSize: "0.8rem", py: 1, px: 2.5 }}>
                          {page.product_category_button || "View Products"}
                        </CustomButton>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <Box sx={{ backgroundColor: colors.black, py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 } }}>
          <Box sx={{ maxWidth: 1280, mx: "auto" }}>
            <SectionHeader title={page.featured_product_title || "Featured Products"} light />
            <Grid container spacing="1.5rem">
              {featuredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ProductCard
                    product={product}
                    onDownloadReport={(p) => {
                      if (p.report?.url) window.open(`${API_URL}${p.report.url}`, "_blank");
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Customer Says */}
      <CustomerSection title={page.customer?.title} description={page.customer?.description} />

      {/* FAQ */}
      <FAQSection title={page.quesAns?.title} description={page.quesAns?.description} />

      {/* CTA */}
      <CTASection
        title={page.cta_section?.title}
        primaryButtonText={page.cta_section?.primary_button_text}
        secondaryButtonText={page.cta_section?.secondary_button_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
