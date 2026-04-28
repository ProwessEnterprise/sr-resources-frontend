"use client";

import { Box, Typography, Button } from "@mui/material";
import { colors, fontFamily } from "@/theme/theme";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 2 }}>
      <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "clamp(1.25rem, 3vw, 2rem)", color: colors.black, textTransform: "uppercase", mb: 2 }}>Something went wrong</Typography>
      <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, mb: 4, maxWidth: 480 }}>We encountered an unexpected error. Please try again.</Typography>
      <Button variant="contained" onClick={reset} sx={{ backgroundColor: colors.primary, fontFamily: fontFamily.body, fontWeight: 600, textTransform: "none", borderRadius: "2px", px: 4, py: 1.5 }}>Try Again</Button>
    </Box>
  );
}
