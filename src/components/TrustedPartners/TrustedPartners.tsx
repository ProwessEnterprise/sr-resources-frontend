"use client";

import { Box, Typography, Grid, Divider } from "@mui/material";
import { PerformanceMetrics, StrapiImage } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface TrustedPartnersProps {
  title?: string;
  description?: string;
  image?: StrapiImage | null;
  stats?: { value: string; label: string }[];
}

export default function TrustedPartners({ title, description, image, stats = [] }: TrustedPartnersProps) {
  if (!title) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
      <Grid container spacing={6} sx={{ alignItems: "center" }}>
        {/* Left: title + description + stats */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: colors.black,
              textTransform: "uppercase",
              mb: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontFamily: fontFamily.body,
              fontSize: { xs: "0.875rem", md: "1rem" },
              color: colors.grey,
              lineHeight: 1.7,
              mb: "2rem",
            }}
          >
            {description}
          </Typography>

          <Divider sx={{ borderColor: colors.frame, mb: "2rem" }} />

          {/* Stats row */}
          <Box sx={{ display: "flex", gap: { xs: "2rem", md: "3rem" } }}>
            {stats.map((stat, i) => (
              <Box key={i}>
                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "2.25rem" },
                    color: colors.primary,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontWeight: 600,
                    fontSize: { xs: "0.625rem", md: "0.75rem" },
                    color: colors.grey,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mt: "0.25rem",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right: image */}
        <Grid size={{ xs: 12, md: 6 }}>
          {image && (
            <Box
              component="img"
              src={`${API_URL}${image.url}`}
              alt={title}
              sx={{
                width: "100%",
                height: { xs: "18.75rem", md: "28rem" },
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
