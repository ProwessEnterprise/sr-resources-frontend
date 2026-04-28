"use client";

import { Box, Typography, Grid, Divider } from "@mui/material";
import { OfficeLocation } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import RequestQuoteForm from "@/components/RequestQuoteForm/RequestQuoteForm";

interface StrategicSectionProps {
  title: string;
  description: string;
  keypoints: string;
  officeLocations: OfficeLocation[];
  requestQuoteTitle?: string;
  requestQuoteDescription?: string;
}

export default function StrategicSection({ title, description, keypoints, officeLocations, requestQuoteTitle, requestQuoteDescription }: StrategicSectionProps) {
  const points = keypoints?.split("\n").filter(Boolean) || [];

  return (
    <Box id="request-quote" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
      <Grid container spacing={6}>
        {/* Left: Strategic info + offices */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: colors.black,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.95rem", color: colors.grey, lineHeight: 1.7, mb: 4 }}>
            {description}
          </Typography>

          {/* Keypoints */}
          {points.map((point, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "16px", height: 20, mb: 1.5 }}>
              <Box sx={{ width: 40, height: 3, backgroundColor: colors.primary, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontFamily: fontFamily.heading,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                {point}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 4, borderColor: colors.frame }} />

          {/* Office locations */}
          {officeLocations?.map((office) => (
            <Box
              key={office.id}
              sx={{
                backgroundColor: colors.black,
                borderRadius: "4px",
                p: "24px",
                mb: 2,
                maxWidth: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: fontFamily.heading,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: colors.primary,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  mb: 0.5,
                }}
              >
                {office.office_name}
              </Typography>
              <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.9rem", color: colors.white, lineHeight: 1.6 }}>
                {office.office_address}
              </Typography>
            </Box>
          ))}
        </Grid>

        {/* Right: Request Quote Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <RequestQuoteForm title={requestQuoteTitle} description={requestQuoteDescription} />
        </Grid>
      </Grid>
    </Box>
  );
}
