"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import Link from "next/link";
import { getFooter } from "@/services/PageService";
import { Footer as FooterType } from "@/interfaces/Strapi";
import { colors, fontSize } from "@/theme/theme";

interface FooterLink { label: string; link: string }
interface FooterConnect { address: string; email: string; phones: string[] }

const businessLinkMap: Record<string, string> = {
  "/bulk-storage": "/business#bulk-storage",
  "/logistics": "/business#logistics",
  "/manufacturing": "/business#manufacturing",
  "/trading": "/business#trading",
};

const mediaPressLinkMap: Record<string, string> = {
  "/news-press-release": "/media-press#news-press",
  "/media-contact": "/media-press#media-contact",
  "/executive-biography": "/media-press#executive-biography",
};

const mediaPressLabelMap: Record<string, string> = {
  "news & press release": "/media-press#news-press",
  "news & press releases": "/media-press#news-press",
  "media contact": "/media-press#media-contact",
  "media contacts": "/media-press#media-contact",
  "executive biography": "/media-press#executive-biography",
  "executive leadership": "/media-press#executive-biography",
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterType | null>(null);

  useEffect(() => {
    getFooter().then((res) => setFooter(res?.data));
  }, []);

  if (!footer) return null;

  const fl = footer.footerLinks || {};
  const quickLinks = (fl.quickLinks || []) as FooterLink[];
  const business = (fl.business || []) as FooterLink[];
  const mediaPress = (fl.mediaPress || []) as FooterLink[];
  const connect = fl.connect as FooterConnect | undefined;
  const legalLinks: FooterLink[] = [
    { label: "Terms of Use", link: "/legal/terms-of-use" },
    { label: "Trademarks", link: "/legal/trademarks" },
    { label: "Privacy Statement", link: "/legal/privacy-statement" },
  ];

  const linkColumn = (title: string, links: FooterLink[]) => (
    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: fontSize.base, lineHeight: "24px", letterSpacing: "-0.4px", color: colors.white, mb: 2, textTransform: "uppercase" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {links.map((item, i) => (
          <Link key={i} href={businessLinkMap[item.link] || mediaPressLinkMap[item.link] || mediaPressLabelMap[item.label.toLowerCase()] || item.link} style={{ textDecoration: "none" }}>
            <Typography sx={{ fontSize: fontSize.sm, color: colors.frame }}>
              {item.label}
            </Typography>
          </Link>
        ))}
      </Box>
    </Grid>
  );

  return (
    <Box component="footer" sx={{ backgroundColor: colors.black, pt: 8, pb: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 12, md: 3 }}>
            <Typography sx={{ fontWeight: 900, fontSize: fontSize.xl, lineHeight: "32px", letterSpacing: "-1.2px", textTransform: "uppercase", color: colors.primary, mb: 2 }}>
              {footer.title}
            </Typography>
            {footer.description && (
              <Typography sx={{ fontSize: fontSize.sm, color: colors.frame, lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {footer.description}
              </Typography>
            )}
          </Grid>

          {linkColumn("Quick Links", quickLinks)}
          {linkColumn("Business", business)}
          {linkColumn("Media & Press", mediaPress)}

          {connect && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: fontSize.base, lineHeight: "24px", letterSpacing: "-0.4px", color: colors.white, mb: 2, textTransform: "uppercase" }}>
                Connect
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography sx={{ fontSize: fontSize.sm, color: colors.frame }}>{connect.address}</Typography>
                <Typography sx={{ fontSize: fontSize.sm, color: colors.frame }}>Email: {connect.email}</Typography>
                {connect.phones?.map((phone, i) => (
                  <Typography key={i} sx={{ fontSize: fontSize.sm, color: colors.frame }}>Contact: {phone}</Typography>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 4, borderColor: colors.grey }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography sx={{ fontSize: fontSize.sm, color: colors.frame }}>
            © {new Date().getFullYear()} {footer.copyright}
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            {legalLinks.map((item, i) => (
              <Link key={i} href={item.link} style={{ textDecoration: "none" }}>
                <Typography sx={{ fontSize: fontSize.sm, color: colors.frame }}>
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
