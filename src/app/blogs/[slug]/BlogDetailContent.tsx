"use client";
import { useRouter } from "next/navigation";

import { use, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { getBlogBySlug, getBlogs } from "@/services/BlogService";
import { getBlogPage } from "@/services/PageService";
import { Blog } from "@/interfaces/Strapi";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";
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

export default function BlogDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    getBlogPage().then((res) => setPage(res?.data));

    getBlogBySlug(slug).then((res) => {
      const blogData = res?.data?.[0];
      setBlog(blogData);

      if (blogData?.category?.documentId) {
        getBlogs().then((allRes) => {
          const related = allRes?.data?.filter((b) => b.category?.documentId === blogData.category?.documentId && b.id !== blogData.id).slice(0, 3) || [];
          setRelatedBlogs(related);
        });
      }
    });
  }, [slug]);

  if (!blog) return null;

  return (
    <>
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Link href="/blogs" style={{ textDecoration: "underline", color: colors.black, fontFamily: fontFamily.body, fontWeight: 600, fontSize: "1rem" }}>
            Blogs
          </Link>
          <Typography sx={{ fontFamily: fontFamily.body, color: colors.black, fontSize: "1rem" }}>/</Typography>
          <Typography sx={{ fontFamily: fontFamily.body, color: colors.grey, fontSize: "1rem" }}>
            {blog.title}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: fontFamily.heading,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3.5rem" },
            color: colors.black,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          {blog.title.toUpperCase()}
        </Typography>

        <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, mb: 4 }}>
          {blog.read_time} • Updated {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: undefined }).replace(/\s\d+/, "")} {new Date(blog.publishedAt).getFullYear()}
        </Typography>

        {blog.image && (
          <Box
            sx={{
              width: "100%",
              height: { xs: "250px", md: "500px" },
              borderRadius: "12px",
              overflow: "hidden",
              mb: 6,
              backgroundColor: colors.background,
            }}
          >
            <Box component="img" src={`${API_URL}${blog.image.url}`} alt={blog.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        )}

        <Box sx={{ maxWidth: "50rem", mx: "auto" }}>{renderRichText(blog.description)}</Box>
      </Box>

      {relatedBlogs.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto", backgroundColor: colors.background }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: colors.black,
              mb: 6,
              textAlign: "center",
            }}
          >
            Related Blogs
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {relatedBlogs.map((relBlog) => (
              <Box key={relBlog.id} sx={{ width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" } }}>
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
                  <Box sx={{ height: "200px", backgroundColor: colors.background, overflow: "hidden" }}>
                    {relBlog.image && (
                      <Box component="img" src={`${API_URL}${relBlog.image.url}`} alt={relBlog.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
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
                      {relBlog.title}
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
                      {extractText(relBlog.description)}
                    </Typography>

                    <Link href={`/blogs/${relBlog.slug}`} style={{ textDecoration: "none" }}>
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
      )}

      <CTAMapSection
        title={page?.map?.title}
        primaryButtonText={page?.map?.primary_button_text}
        secondaryButtonText={page?.map?.secondary_button_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
