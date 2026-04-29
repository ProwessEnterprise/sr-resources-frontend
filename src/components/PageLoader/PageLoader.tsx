"use client";

import { Box, Skeleton } from "@mui/material";

export default function PageLoader() {
  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)" }}>
      <Skeleton variant="rectangular" width="100%" height="calc(100vh - 72px)" animation="wave" />
    </Box>
  );
}
