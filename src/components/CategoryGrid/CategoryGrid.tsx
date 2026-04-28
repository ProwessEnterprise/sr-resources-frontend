"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getCategories } from "@/services/CategoryService";
import { Category } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CustomButton from "@/components/CustomButton/CustomButton";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface CategoryGridProps {
  title: string;
}

export default function CategoryGrid({ title }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then((res) => setCategories(res?.data || []));
  }, []);

  if (!categories.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: 1280, mx: "auto" }}>
      <SectionHeader title={title} />
      <Grid container spacing={2}>
        {categories.map((cat, i) => {
          const rowIndex = Math.floor(i / 3);
          const posInRow = i % 3;
          const isEvenRow = rowIndex % 2 === 0;
          const isLarge = isEvenRow ? posInRow === 0 : posInRow === 2;
          return (
          <Grid key={cat.id} size={{ xs: 12, sm: 6, md: isLarge ? 6 : 3 }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 280, md: 340 },
                borderRadius: "4px",
                overflow: "hidden",
                backgroundImage: cat.image ? `url(${API_URL}${cat.image.url})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: { xs: 2, md: 3 },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 900,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    color: colors.white,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  {cat.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontSize: { xs: "0.8rem", md: "0.9rem" },
                    color: "rgba(255,255,255,0.8)",
                    mb: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {cat.description}
                </Typography>
                <CustomButton
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: "14px !important" }} />}
                  onClick={() => router.push("/products")}
                >
                  View Products
                </CustomButton>
              </Box>
            </Box>
          </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
