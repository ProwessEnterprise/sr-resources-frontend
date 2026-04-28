"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { getBlogs } from "@/services/BlogService";
import { Blog } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

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

interface BlogSectionProps {
  title: string;
  description?: string;
}

export default function BlogSection({ title, description }: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    getBlogs().then((res) => setBlogs(res?.data || []));
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  if (!blogs.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
      <SectionHeader title={title} description={description} />

      {/* Cards row */}
      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "1rem",
          backgroundColor: colors.white,
          borderRadius: "0.75rem",
          p: "1rem",
          overflowX: { xs: "hidden", md: blogs.length > 3 ? "auto" : "hidden" },
          scrollSnapType: { md: "x mandatory" },
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {blogs.map((blog) => (
          <Box
            key={blog.id}
            sx={{
              minWidth: { xs: "auto", md: "22.333rem" },
              flex: { xs: "none", md: "0 0 22.333rem" },
              width: { xs: "100%", md: "auto" },
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              backgroundColor: colors.white,
              border: "0.0625rem solid rgba(0,0,0,0.08)",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              p: "0.625rem",
              pb: "1.5rem",
            }}
          >
            {/* Image inside card */}
            <Box
              sx={{
                height: "12.5rem",
                borderRadius: "0.5rem",
                overflow: "hidden",
                backgroundColor: colors.background,
                mb: "0.625rem",
              }}
            >
              {blog.image && (
                <Box
                  component="img"
                  src={`${API_URL}${blog.image.url}`}
                  alt={blog.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Box>

            {/* Content */}
            <Box sx={{ px: "0.375rem", display: "flex", flexDirection: "column", flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: fontFamily.heading,
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  color: colors.black,
                  mb: "0.5rem",
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
                  mb: "1rem",
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {extractText(blog.description)}
              </Typography>

              <Link href={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Typography
                    sx={{
                      fontFamily: fontFamily.heading,
                      fontWeight: 600,
                      fontSize: "1.125rem",
                      lineHeight: "100%",
                      letterSpacing: "0.02em",
                      color: colors.primary,
                    }}
                  >
                    Read Full Blog
                  </Typography>
                  <ArrowForwardIcon sx={{ fontSize: "1.25rem", color: colors.primary }} />
                </Box>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Custom scrollbar — only when more than 3 blogs */}
      {blogs.length > 3 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem", mt: "1.5rem" }}>
          <IconButton onClick={() => scroll("left")} sx={{ p: 0, color: colors.grey }}>
            <ArrowBackIosNewIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
          <Box sx={{ flex: 1, height: "0.375rem", backgroundColor: colors.frame, borderRadius: "0.1875rem", overflow: "hidden" }}>
            <Box
              sx={{
                width: "70%",
                height: "100%",
                backgroundColor: colors.grey,
                borderRadius: "0.1875rem",
                transform: `translateX(${scrollProgress * 43}%)`,
                transition: "transform 0.2s",
              }}
            />
          </Box>
          <IconButton onClick={() => scroll("right")} sx={{ p: 0, color: colors.grey }}>
            <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
