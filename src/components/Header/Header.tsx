"use client";

import { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, Container,
  IconButton, Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getHeader } from "@/services/PageService";
import { Header as HeaderType } from "@/interfaces/Strapi";
import { colors, fontSize, fontFamily } from "@/theme/theme";
import CustomButton from "@/components/CustomButton/CustomButton";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

export default function Header() {
  const router = useRouter();
  const [header, setHeader] = useState<HeaderType | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getHeader().then((res) => setHeader(res?.data));
  }, []);

  if (!header) return null;

  const menuItems = (header.menu_item?.menuItems as { label: string; link: string }[]) || [];

  const isActive = (link: string) => {
    return pathname === link;
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: colors.black,
        boxShadow: "none",
        borderBottom: `1px solid ${colors.black}`,
        zIndex: 1300,
      }}
    >
      <Container sx={{ maxWidth: "1280px !important", px: { xs: 2, md: 0 } }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: 0,
            minHeight: "72px !important",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            {header.logo_image ? (
              <Box
                component="img"
                src={`${API_URL}${header.logo_image.url}`}
                alt={header.title}
                sx={{ height: { xs: 36, md: 44 }, objectFit: "contain" }}
              />
            ) : (
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: fontSize.xl,
                  letterSpacing: "-0.075rem",
                  textTransform: "uppercase",
                  color: colors.primary,
                  fontFamily: fontFamily.heading,
                }}
              >
                {header.title}
              </Typography>
            )}
          </Link>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "2.5rem" }}>
            {menuItems.map((item, i) => (
              <Link key={i} href={item.link} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    letterSpacing: "-0.025rem",
                    fontFamily: fontFamily.body,
                    color: isActive(item.link) ? colors.white : colors.frame,
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>

          {header.buttonName && (
            <CustomButton
              sx={{ display: { xs: "none", md: "inline-flex" }, fontWeight: 700 }}
              onClick={() => (router.push("/contact"))}
            >
              {header.buttonName}
            </CustomButton>
          )}

          {/* Hamburger Icon - mobile only */}
          <IconButton
            onClick={() => setMenuOpen((prev) => !prev)}
            sx={{ display: { xs: "flex", md: "none" }, color: colors.white }}
          >
            {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Menu - collapses below header */}
      <Collapse in={menuOpen} sx={{ display: { md: "none" }, backgroundColor: colors.black }}>
        <Container sx={{ maxWidth: "1280px !important", px: { xs: 2 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 2 }}>
            {menuItems.map((item, i) => (
              <Link key={i} href={item.link} style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    fontFamily: fontFamily.body,
                    color: isActive(item.link) ? colors.white : colors.frame,
                    py: 1,
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
            {header.buttonName && (
              <CustomButton
                onClick={() => { setMenuOpen(false); router.push("/contact"); }}
                sx={{ mt: 1, fontWeight: 700, borderRadius: "4px", width: "fit-content", px: 4, py: 1.5, fontSize: "16px" }}
              >
                {header.buttonName}
              </CustomButton>
            )}
          </Box>
        </Container>
      </Collapse>
    </AppBar>
  );
}
