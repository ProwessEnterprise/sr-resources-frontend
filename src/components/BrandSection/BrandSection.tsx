"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getBrands } from "@/services/BrandService";
import { Brand } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CustomButton from "@/components/CustomButton/CustomButton";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface BrandSectionProps {
  title: string;
  description?: string;
}

const brandColors = ["#1a1a1a", "#0d1b3e"];

export default function BrandSection({ title, description }: BrandSectionProps) {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    getBrands().then((res) => setBrands(res?.data || []));
  }, []);

  if (!brands.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: colors.black }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 } }}>
        <SectionHeader title={title} description={description} align="center" light />
        <Grid container spacing={0}>
          {brands.map((brand, i) => (
            <Grid key={brand.id} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: brandColors[i % brandColors.length],
                  p: { xs: 3, md: 5 },
                  minHeight: { xs: 300, md: 400 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Brand Label - bottom right corner */}
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    right: 10,
                    fontFamily: fontFamily.heading,
                    fontWeight: 900,
                    fontSize: { xs: "3rem", md: "5rem" },
                    color: "rgba(255,255,255,0.05)",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {brand.label}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    color: colors.primary,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  {brand.title}
                </Typography>
                {brand.image && (
                  <Box
                    component="img"
                    src={`${API_URL}${brand.image.url}`}
                    alt={brand.label}
                    sx={{ width: { xs: 180, md: 250 }, objectFit: "contain", mb: 2 }}
                  />
                )}
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7,
                    mb: 3,
                    maxWidth: 400,
                  }}
                >
                  {brand.description}
                </Typography>
                <Link
                  href={brand.link || `/${brand.label?.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ textDecoration: "none", alignSelf: "flex-start" }}
                >
                  <CustomButton sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                    {brand.buttonName}
                  </CustomButton>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
