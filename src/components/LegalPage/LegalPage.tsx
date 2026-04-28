"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getFooter } from "@/services/PageService";
import { Footer } from "@/interfaces/Strapi";
import RichText from "@/components/RichText/RichText";

interface LegalPageProps {
  field: "terms_of_use" | "trademark" | "privacy_statement";
}

export default function LegalPage({ field }: LegalPageProps) {
  const [footer, setFooter] = useState<Footer | null>(null);

  useEffect(() => {
    getFooter().then((res) => setFooter(res?.data));
  }, []);

  if (!footer) return null;

  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", py: { xs: 3, md: 6 }, px: { xs: "1.5rem", sm: "3rem", md: "4.5rem" } }}>
      <RichText content={footer[field]} />
    </Box>
  );
}
