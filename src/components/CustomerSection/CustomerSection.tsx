"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getCustomers } from "@/services/CustomerService";
import { Customer } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface CustomerSectionProps {
  title: string;
  description?: string;
}

export default function CustomerSection({ title, description }: CustomerSectionProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCustomers().then((res) => setCustomers(res?.data || []));
  }, []);

  if (!customers.length) return null;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: 1280, mx: "auto" }}>
      <SectionHeader title={title} description={description} />

      {/* Navigation Arrows */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 3 }}>
        <IconButton
          onClick={() => scroll("left")}
          sx={{ bgcolor: colors.black, color: colors.white, "&:hover": { bgcolor: colors.black }, width: 48, height: 48 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={() => scroll("right")}
          sx={{ bgcolor: colors.black, color: colors.white, "&:hover": { bgcolor: colors.black }, width: 48, height: 48 }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {customers.map((c) => (
          <Box
            key={c.id}
            sx={{
              minWidth: { xs: 300, md: 404 },
              maxWidth: 404,
              height: 445,
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              backgroundColor: colors.background,
              borderRadius: "8px",
              border: `0.5px solid ${colors.primary}`,
              p: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Top: profile + logo */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {c.profile_image && (
                <Box
                  component="img"
                  src={`${API_URL}${c.profile_image.url}`}
                  alt={c.name}
                  sx={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }}
                />
              )}
              {c.logo_image && (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: `1px solid ${colors.primary}`,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={`${API_URL}${c.logo_image.url}`}
                    alt="Logo"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>

            {/* Quote + Description */}
            <Box>
              <Box component="svg" width="36" height="28" viewBox="0 0 36 28" sx={{ mb: 1 }}>
                <path d="M0 28V17.5C0 12.3 0.9 8.2 2.7 5.2C4.5 2.2 7.5 0.3 11.7 0L12.6 4.2C10.4 4.7 8.7 5.8 7.5 7.5C6.3 9.2 5.7 11.2 5.7 13.5H10.5V28H0ZM19.5 28V17.5C19.5 12.3 20.4 8.2 22.2 5.2C24 2.2 27 0.3 31.2 0L32.1 4.2C29.9 4.7 28.2 5.8 27 7.5C25.8 9.2 25.2 11.2 25.2 13.5H30V28H19.5Z" fill={colors.primary} />
              </Box>
              <Typography
                sx={{
                  fontFamily: fontFamily.heading,
                  fontWeight: 700,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: colors.black,
                  lineHeight: 1.5,
                }}
              >
                {c.description}
              </Typography>
            </Box>

            {/* Name, role, address */}
            <Box>
              <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.black }}>
                {c.name}
              </Typography>
              <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey }}>
                {c.role}
              </Typography>
              <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey }}>
                {c.address}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
