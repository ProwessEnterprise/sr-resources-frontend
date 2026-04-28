"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import FaxIcon from "@mui/icons-material/Fax";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import { getMediaPage } from "@/services/PageService";
import { getNewsList } from "@/services/NewsService";
import { MediaPage, News } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CTASection from "@/components/CTASection/CTASection";
import { colors, fontFamily } from "@/theme/theme";
import RichText from "@/components/RichText/RichText";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

function extractText(desc: any): string {
  if (typeof desc === "string") return desc;
  if (!Array.isArray(desc)) return "";
  return desc
    .map((block: any) =>
      block?.children?.map((c: any) => c?.text || "").join("") || ""
    )
    .join(" ");
}


export default function MediaPressContent() {
  const router = useRouter();
  const [page, setPage] = useState<MediaPage | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    getMediaPage().then((res) => setPage(res?.data));
    getNewsList().then((res) => setNewsList(res?.data || []));
  }, []);

  useEffect(() => {
    if (page && window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [page]);

  if (!page) return null;

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

      {/* News & Press Releases */}
      <Box
        id="news-press"
        sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}
      >
        <SectionHeader title={page.news?.title} description={page.news?.description} />
        <Grid container spacing="1.5rem">
          {newsList.slice(0, 3).map((news) => (
            <Grid key={news.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  border: `0.0625rem solid ${colors.frame}`,
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: colors.white,
                }}
              >
                <Box sx={{ height: "12.5rem", backgroundColor: colors.frame, overflow: "hidden" }}>
                  {news.image && (
                    <Box
                      component="img"
                      src={`${API_URL}${news.image.url}`}
                      alt={news.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}
                </Box>
                <Box sx={{ p: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography
                    sx={{ fontFamily: fontFamily.body, fontSize: "0.75rem", color: colors.grey, mb: "0.375rem" }}
                  >
                    {new Date(news.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.125rem", color: colors.black, mb: "0.375rem" }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey,
                      mb: "1rem", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}
                  >
                    {extractText(news.description)}
                  </Typography>
                  <Link href={`/news/${news.slug}`} style={{ textDecoration: "none" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                      <Typography
                        sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "0.875rem", color: colors.primary }}
                      >
                        {news.button_text || "Read More"}
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: "1rem", color: colors.primary }} />
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Media Contacts */}
      <Box
        id="media-contact"
        sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}
      >
        <Grid container spacing={{ xs: "2rem", md: "3rem" }} sx={{ alignItems: "flex-start" }}>
          {/* Profile Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            {page.profile_image && (
              <Box
                component="img"
                src={`${API_URL}${page.profile_image.url}`}
                alt={page.person_name}
                sx={{
                  width: "100%",
                  height: { xs: "20rem", md: "26rem" },
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
            )}
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontFamily: fontFamily.heading,
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: colors.black,
                textTransform: "uppercase",
                mb: "0.5rem",
              }}
            >
              {page.media?.title}
            </Typography>
            <Typography
              sx={{
                fontFamily: fontFamily.body,
                fontSize: "0.875rem",
                color: colors.grey,
                mb: "1.5rem",
              }}
            >
              {page.media?.description}
            </Typography>

            {/* Contact Card */}
            <Box
              sx={{
                border: `0.0625rem solid ${colors.primary}`,
                borderRadius: "0.75rem",
                p: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.125rem",
                backgroundColor: colors.background,
              }}
            >
              {/* Person Name */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <PersonOutlineIcon sx={{ fontSize: "1.5rem", color: colors.primary }} />
                <Typography
                  sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.black }}
                >
                  {page.person_name}
                </Typography>
              </Box>

              {/* Address */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <BusinessIcon sx={{ fontSize: "1.5rem", color: colors.primary, mt: "0.125rem" }} />
                <Typography
                  sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey }}
                >
                  {page.company_address}
                </Typography>
              </Box>

              {/* Phone 1 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <PhoneIcon sx={{ fontSize: "1.5rem", color: colors.primary }} />
                <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey }}>
                  {page.phone_number_one}
                </Typography>
              </Box>

              {/* Phone 2 / Fax */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FaxIcon sx={{ fontSize: "1.5rem", color: colors.primary }} />
                <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey }}>
                  {page.phone_number_two}
                </Typography>
              </Box>

              {/* Email */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <MailOutlineIcon sx={{ fontSize: "1.5rem", color: colors.primary }} />
                <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey }}>
                  {page.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Executive Leadership */}
      <Box
        id="executive-biography"
        sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}
      >
        <SectionHeader title={page.executive?.title} description={page.executive?.description} />
        <Grid container spacing="2rem">
          {/* Chairman */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Image with overlay */}
            <Box
              sx={{
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                height: { xs: "22rem", md: "28rem" },
                mb: "1.5rem",
              }}
            >
              {page.chairman_image && (
                <Box
                  component="img"
                  src={`${API_URL}${page.chairman_image.url}`}
                  alt={page.chairman_name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: "1.5rem",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: colors.white,
                    textTransform: "uppercase",
                  }}
                >
                  {page.chairman_name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.125rem",
                    textTransform: "uppercase",
                  }}
                >
                  {page.chairman_role}
                </Typography>
              </Box>
            </Box>

            {/* Bio with blue left border */}
            <Box
              sx={{
                borderLeft: `0.1875rem solid ${colors.primary}`,
                pl: "1.25rem",
                "& p": {
                  fontFamily: fontFamily.body,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: colors.grey,
                  lineHeight: 1.8,
                },
                "& a": { color: colors.primary },
              }}
            >
              <RichText content={page.chairman_profile} />
            </Box>
          </Grid>

          {/* CEO */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Image with overlay */}
            <Box
              sx={{
                position: "relative",
                borderRadius: "0.5rem",
                overflow: "hidden",
                height: { xs: "22rem", md: "28rem" },
                mb: "1.5rem",
              }}
            >
              {page.ceo_image && (
                <Box
                  component="img"
                  src={`${API_URL}${page.ceo_image.url}`}
                  alt={page.ceo_name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: "1.5rem",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: colors.white,
                    textTransform: "uppercase",
                  }}
                >
                  {page.ceo_name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.125rem",
                    textTransform: "uppercase",
                  }}
                >
                  {page.ceo_role}
                </Typography>
              </Box>
            </Box>

            {/* Bio with blue left border */}
            <Box
              sx={{
                borderLeft: `0.1875rem solid ${colors.primary}`,
                pl: "1.25rem",
                "& p": {
                  fontFamily: fontFamily.body,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  color: colors.grey,
                  lineHeight: 1.8,
                },
                "& a": { color: colors.primary },
              }}
            >
              <RichText content={page.ceo_profile} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ */}
      <FAQSection title={page.quesAns?.title} description={page.quesAns?.description} />

      {/* CTA Section */}
      <CTASection
        title={page.cta_section?.title}
        secondaryButtonText={page.cta_section?.secondary_button_text}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
