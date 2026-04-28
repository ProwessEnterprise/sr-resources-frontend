"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { colors, fontFamily } from "@/theme/theme";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 2 }}>
      <Typography sx={{ fontFamily: fontFamily.hero, fontWeight: 700, fontSize: "clamp(4rem, 10vw, 8rem)", color: colors.primary, lineHeight: 1 }}>404</Typography>
      <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "clamp(1.25rem, 3vw, 2rem)", color: colors.black, textTransform: "uppercase", mb: 2 }}>Page Not Found</Typography>
      <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, mb: 4, maxWidth: 480 }}>The page you are looking for might have been removed or is temporarily unavailable.</Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ backgroundColor: colors.primary, fontFamily: fontFamily.body, fontWeight: 600, textTransform: "none", borderRadius: "2px", px: 4, py: 1.5 }}>Back to Home</Button>
      </Link>
    </Box>
  );
}
