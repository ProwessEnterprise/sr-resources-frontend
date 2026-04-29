"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { getBlogPage } from "@/services/PageService";
import { getBlogs } from "@/services/BlogService";
import { BlogPage, Blog } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";
import { colors, fontFamily } from "@/theme/theme";
import PageLoader from "@/components/PageLoader/PageLoader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

function extractText(desc: any): string {
  if (typeof desc === "string") return desc;
  if (!Array.isArray(desc)) return "";
  return desc.map((block: any) => block?.children?.map((c: any) => c?.text || "").join("") || "").join(" ");
}

export default function BlogsContent() {
  const router = useRouter();
  const [page, setPage] = useState<BlogPage | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogPage().then((res) => setPage(res?.data));
    getBlogs().then((res) => setBlogs(res?.data || []));
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
        onPrimaryClick={() => (router.push("/products"))}
      />

      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: fontFamily.heading,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3rem" },
            color: colors.black,
            mb: 1,
            textAlign: "left",
          }}
        >
          {page.blogs?.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: fontFamily.body,
            fontSize: { xs: "1rem", md: "1.125rem" },
            color: colors.grey,
            mb: 6,
            textAlign: "left",
          }}
        >
          {page.blogs?.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {blogs.map((blog) => (
            <Box key={blog.id} sx={{ width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" } }}>
              <Box
                sx={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.frame}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                <Box sx={{ p: 2, pb: 0 }}>
                  <Box sx={{ height: "200px", backgroundColor: colors.background, borderRadius: "8px", overflow: "hidden" }}>
                    {blog.image && (
                      <Box
                        component="img"
                        src={`${API_URL}${blog.image.url}`}
                        alt={blog.title}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: fontFamily.heading,
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: colors.black,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: fontFamily.body,
                      fontSize: "0.875rem",
                      color: colors.grey,
                      lineHeight: 1.6,
                      mb: 3,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {extractText(blog.description)}
                  </Typography>

                  <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: fontFamily.heading,
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: colors.primary,
                        }}
                      >
                        Read More
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: "1.25rem", color: colors.primary }} />
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

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
