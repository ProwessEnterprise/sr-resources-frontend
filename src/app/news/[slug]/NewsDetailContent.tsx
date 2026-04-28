"use client";

import { use, useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { getNewsBySlug, getNewsList } from "@/services/NewsService";
import { News } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

function extractText(desc: any): string {
  if (typeof desc === "string") return desc;
  if (!Array.isArray(desc)) return "";
  return desc.map((block: any) => block?.children?.map((c: any) => c?.text || "").join("") || "").join(" ");
}

function renderRichText(content: any) {
  if (typeof content === "string") return <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, lineHeight: 1.8, mb: 2 }}>{content}</Typography>;
  if (!Array.isArray(content)) return null;

  return content.map((block: any, idx: number) => {
    if (block.type === "paragraph") {
      return (
        <Typography key={idx} sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, lineHeight: 1.8, mb: 2 }}>
          {block.children?.map((child: any, i: number) => {
            if (child.bold) return <strong key={i}>{child.text}</strong>;
            if (child.italic) return <em key={i}>{child.text}</em>;
            return child.text;
          })}
        </Typography>
      );
    }
    if (block.type === "heading") {
      const level = block.level || 2;
      return (
        <Typography key={idx} variant={`h${level}` as any} sx={{ fontFamily: fontFamily.heading, fontWeight: 700, color: colors.black, mt: 4, mb: 2 }}>
          {block.children?.map((c: any) => c.text).join("")}
        </Typography>
      );
    }
    return null;
  });
}

export default function NewsDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  useEffect(() => {
    getNewsBySlug(slug).then((res) => {
      const newsData = res?.data?.[0];
      setNews(newsData);

      if (newsData) {
        getNewsList().then((allRes) => {
          const related = allRes?.data?.filter((n) => n.id !== newsData.id).slice(0, 3) || [];
          setRelatedNews(related);
        });
      }
    });
  }, [slug]);

  if (!news) return null;

  return (
    <>
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Link href="/media-press#news-press" style={{ textDecoration: "underline", color: colors.black, fontFamily: fontFamily.body, fontWeight: 600, fontSize: "1rem" }}>
            News
          </Link>
          <Typography sx={{ fontFamily: fontFamily.body, color: colors.black, fontSize: "1rem" }}>/</Typography>
          <Typography sx={{ fontFamily: fontFamily.body, color: colors.grey, fontSize: "1rem" }}>{news.title}</Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: fontFamily.heading, fontWeight: 700,
            fontSize: { xs: "2rem", md: "3.5rem" }, color: colors.black, mb: 2, lineHeight: 1.2,
          }}
        >
          {news.title.toUpperCase()}
        </Typography>

        <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, mb: 4 }}>
          {news.read_time && `${news.read_time} • `}Updated {new Date(news.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
        </Typography>

        {news.image && (
          <Box sx={{ width: "100%", height: { xs: "250px", md: "500px" }, borderRadius: "12px", overflow: "hidden", mb: 6, backgroundColor: colors.background }}>
            <Box component="img" src={`${API_URL}${news.image.url}`} alt={news.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        )}

        <Box sx={{ maxWidth: "50rem", mx: "auto" }}>{renderRichText(news.description)}</Box>
      </Box>

      {relatedNews.length > 0 && (
        <Box sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading, fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)", color: colors.black,
              textTransform: "uppercase", mb: { xs: 4, md: 6 },
            }}
          >
            Related News
          </Typography>

          <Grid container spacing="1.5rem">
            {relatedNews.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    {item.image && (
                      <Box component="img" src={`${API_URL}${item.image.url}`} alt={item.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </Box>
                  <Box sx={{ p: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
                    <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.75rem", color: colors.grey, mb: "0.375rem" }}>
                      {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </Typography>
                    <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.125rem", color: colors.black, mb: "0.375rem" }}>
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.6,
                        mb: "1rem", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}
                    >
                      {extractText(item.description)}
                    </Typography>
                    <Link href={`/news/${item.slug}`} style={{ textDecoration: "none" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                        <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "0.875rem", color: colors.primary }}>
                          {item.button_text || "Read More"}
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
      )}
    </>
  );
}
