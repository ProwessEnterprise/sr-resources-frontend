"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";

import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { getBusinessPage } from "@/services/PageService";
import { BusinessPage, PerformanceMetrics, BusinessLabel } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import BrandSection from "@/components/BrandSection/BrandSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CTASection from "@/components/CTASection/CTASection";
import { colors, fontFamily } from "@/theme/theme";
import PageLoader from "@/components/PageLoader/PageLoader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface DivisionSectionProps {
  id: string;
  data: PerformanceMetrics;
  keypoints: string;
  reverse?: boolean;
}

function DivisionSection({ id, data, keypoints, reverse }: DivisionSectionProps) {
  const points = keypoints?.split("\n").filter(Boolean) || [];
  return (
    <Box
      id={id}
      sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}
    >
      <Grid
        container
        spacing={{ xs: "2rem", md: "4rem" }}
        sx={{ alignItems: "center", flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" } }}
      >
        {/* Text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading, fontWeight: 900,
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.black,
              textTransform: "uppercase", mb: "0.75rem",
            }}
          >
            {data.title}
          </Typography>
          <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.7, mb: "1.5rem" }}>
            {data.description}
          </Typography>
          {points.map((point, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "1rem", mb: "0.75rem" }}>
              <Box sx={{ width: "2.5rem", height: "0.1875rem", backgroundColor: colors.primary, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "0.75rem",
                  color: colors.primary, textTransform: "uppercase", letterSpacing: "0.1rem",
                }}
              >
                {point}
              </Typography>
            </Box>
          ))}
        </Grid>
        {/* Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          {data.image && (
            <Box
              component="img"
              src={`${API_URL}${data.image.url}`}
              alt={data.title}
              sx={{
                width: "100%", height: { xs: "15rem", md: "22rem" },
                borderRadius: "0.5rem", objectFit: "cover",
                backgroundColor: colors.frame,
                boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

const infraIcons = [TableRowsOutlinedIcon, VerifiedOutlinedIcon, LanguageOutlinedIcon];

function InfrastructureSection({ data, keypoints }: { data: PerformanceMetrics; keypoints: string }) {
  const points = keypoints?.split("\n").filter(Boolean) || [];
  return (
    <Box
      id="infrastructure"
      sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}
    >
      <Grid container spacing={{ xs: "2rem", md: "4rem" }} sx={{ alignItems: "center" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading, fontWeight: 900,
              fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.black,
              textTransform: "uppercase", mb: "0.75rem",
            }}
          >
            {data.title}
          </Typography>
          <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.7, mb: "1.5rem" }}>
            {data.description}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {points.map((point, i) => {
              const Icon = infraIcons[i % infraIcons.length];
              return (
                <Chip
                  key={i}
                  icon={<Box component="span" sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "2rem", height: "2rem", borderRadius: "0.5rem", backgroundColor: colors.primary }}><Icon sx={{ fontSize: "1.1rem", color: "#fff !important" }} /></Box>}
                  label={point}
                  variant="outlined"
                  sx={{
                    fontFamily: fontFamily.heading, fontSize: "0.875rem", fontWeight: 700,
                    backgroundColor: colors.background, borderColor: colors.border,
                    color: colors.black, borderRadius: "0.5rem", px: "0.75rem", py: "1.5rem",
                  }}
                />
              );
            })}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {data.image && (
            <Box
              component="img"
              src={`${API_URL}${data.image.url}`}
              alt={data.title}
              sx={{
                width: "100%", height: { xs: "15rem", md: "22rem" },
                borderRadius: "0.5rem", objectFit: "cover",
                backgroundColor: colors.frame,
                boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function LabelChips({ labels }: { labels: BusinessLabel[] }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {labels.map((l) => (
        <Chip
          key={l.id}
          label={l.label}
          variant="outlined"
          sx={{
            fontFamily: fontFamily.body, fontSize: "0.8rem", fontWeight: 600,
            backgroundColor: colors.background, borderColor: colors.border,
            color: colors.black, borderRadius: "0.25rem", px: "0.5rem",
          }}
        />
      ))}
    </Box>
  );
}

export default function BusinessContent() {
  const router = useRouter();
  const [page, setPage] = useState<BusinessPage | null>(null);

  useEffect(() => {
    getBusinessPage().then((res) => setPage(res?.data));
  }, []);

  useEffect(() => {
    if (page && window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  if (!page) return <PageLoader />;

  const hero = page.hero_section;

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

      {/* Bulk Liquid Storage */}
      <DivisionSection id="bulk-storage" data={page.bulkliquid_storage} keypoints={page.bulkliquid_storage_keypoints} />

      {/* Manufacturing & Blending */}
      <DivisionSection id="manufacturing" data={page.manufacturing_blending} keypoints={page.manufacturing_blending_keypoints} reverse />

      {/* Logistics & Transportation */}
      <DivisionSection id="logistics" data={page.logistics_transportation} keypoints={page.logistics_transportation_keypoints} />

      {/* International Trading */}
      <DivisionSection id="trading" data={page.international_trading} keypoints={page.international_trading_keypoints} reverse />

      {/* Infrastructure & Scale */}
      <InfrastructureSection data={page.infrastructure_scale} keypoints={page.infrastructure_scale_keypoints} />

      {/* Products Stored */}
      <Box sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: fontFamily.heading, fontWeight: 900,
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.black,
            textTransform: "uppercase", mb: "0.75rem",
          }}
        >
          {page.products_stored?.title}
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.7, mb: "1.5rem" }}>
          {page.products_stored?.description}
        </Typography>
        <LabelChips labels={page.products_stored_labels || []} />
      </Box>

      {/* Facilities */}
      <Box sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: fontFamily.heading, fontWeight: 900,
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.black,
            textTransform: "uppercase", mb: "0.75rem",
          }}
        >
          {page.facilities?.title}
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.7, mb: "1.5rem" }}>
          {page.facilities?.description}
        </Typography>
        <LabelChips labels={page.facilities_labels || []} />
      </Box>

      {/* Our Brands */}
      <BrandSection title={page.brand?.title} description={page.brand?.description} />

      {/* FAQ */}
      <FAQSection title={page.quesAns?.title} description={page.quesAns?.description} />

      {/* Gradient CTA */}
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
