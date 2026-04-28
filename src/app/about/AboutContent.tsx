"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { getAboutPage } from "@/services/PageService";
import { AboutPage } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import BrandSection from "@/components/BrandSection/BrandSection";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { colors, fontFamily } from "@/theme/theme";

const visionIcons = [InsightsIcon, RocketLaunchIcon, PublicOutlinedIcon];

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

export default function AboutContent() {
  const router = useRouter();
  const [page, setPage] = useState<AboutPage | null>(null);

  useEffect(() => {
    getAboutPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return null;

  const hero = page.herosection;
  const stats: { value: string; label: string }[] = page.chairman_metrics?.stats || [];

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

      {/* Chairman + Intro */}
      <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                height: { xs: 400, md: 550 },
              }}
            >
              {page.chairman_image && (
                <Box
                  component="img"
                  src={`${API_URL}${page.chairman_image.url}`}
                  alt={page.chairman_title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                }}
              >
                <Typography
                  sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.5rem", color: colors.white }}
                >
                  {page.chairman_title}
                </Typography>
                <Typography
                  sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}
                >
                  {page.chairman_subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "0.75rem", color: colors.primary, letterSpacing: 3, textTransform: "uppercase", mb: 2 }}
            >
              {page.intro_label}
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontFamily: fontFamily.heading, fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.75rem)", color: colors.black, textTransform: "uppercase", mb: 3 }}
            >
              {page.intro_title}
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.body, fontSize: { xs: "0.9rem", md: "1.05rem" }, color: colors.grey, lineHeight: 1.8 }}>
              {page.intro_description}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Quote + Stats */}
      <Box sx={{ py: { xs: 6, md: 8 }, maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ borderLeft: `3px solid ${colors.primary}`, pl: 3 }}>
              <Typography
                sx={{ fontFamily: fontFamily.body, fontSize: { xs: "1rem", md: "1.25rem" }, color: colors.black, lineHeight: 1.8, fontStyle: "italic" }}
              >
                &ldquo;{page.chairman_quote}&rdquo;
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={3}>
              {stats.map((s) => (
                <Grid key={s.label} size={{ xs: 6 }}>
                  <Typography
                    sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: colors.primary }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.grey, letterSpacing: 2, textTransform: "uppercase" }}
                  >
                    {s.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Vision & Future Endeavours */}
      {page.vision_future_endeavours?.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
          <SectionHeader title={page.vision?.title} description={page.vision?.description} align="center" />
          <Grid container spacing={3}>
            {page.vision_future_endeavours.map((card, i) => (
              <Grid key={card.id} size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderRadius: "12px",
                    minHeight: { xs: 320, md: 380 },
                    height: "100%",
                    backgroundColor: i === 1 ? colors.primary : colors.background,
                    border: `1px solid ${i === 1 ? colors.primary : colors.primary}`,
                    color: i === 1 ? colors.white : colors.black,
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-6px)" },
                  }}
                >
                  {(() => {
                    const Icon = visionIcons[i] || visionIcons[0];
                    return <Icon sx={{ fontSize: 48, mb: 2, color: i === 1 ? colors.white : colors.primary }} />;
                  })()}
                  <Typography
                    sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.25rem", mb: 2 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fontFamily.body,
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: i === 1 ? "rgba(255,255,255,0.85)" : colors.grey,
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Core Businesses */}
      {page.core_businesses?.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
          <SectionHeader title={page.core_business?.title} description={page.core_business?.description} />
          <Grid container spacing={2}>
            {page.core_businesses.map((biz) => (
              <Grid key={biz.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    position: "relative",
                    height: { xs: 300, md: 380 },
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundImage: biz.image ? `url(${API_URL}${biz.image.url})` : "none",
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
                      sx={{ fontFamily: fontFamily.heading, fontWeight: 900, fontSize: "1.1rem", color: colors.white, textTransform: "uppercase", mb: 1.5 }}
                    >
                      {biz.title}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: fontFamily.body, fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}
                    >
                      {biz.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Our Brands */}
      <BrandSection title={page.brand?.title} description={page.brand?.description} />

      {/* CTA Map */}
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
