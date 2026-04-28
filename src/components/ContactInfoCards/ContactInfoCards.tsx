"use client";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { CardItem } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';

const iconMap: Record<number, React.ReactNode> = {
  0: <HubOutlinedIcon sx={{ fontSize: 40, color: colors.primary }} />,
  1: <CorporateFareOutlinedIcon sx={{ fontSize: 40, color: colors.primary }} />,
  2: <SupportAgentOutlinedIcon sx={{ fontSize: 40, color: colors.primary }} />,
  3: <AccessTimeOutlinedIcon sx={{ fontSize: 40, color: colors.primary }} />,
};

function getContactHref(contact: string): string | undefined {
  const trimmed = contact.trim();
  if (trimmed.includes("@")) return `mailto:${trimmed}`;
  if (/[\d+\-()\s]{7,}/.test(trimmed)) return `tel:${trimmed.replace(/\s+/g, "")}`;
  return undefined;
}

interface ContactInfoCardsProps {
  cards: CardItem[];
}

export default function ContactInfoCards({ cards }: ContactInfoCardsProps) {
  if (!cards?.length) return null;

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
      <Grid container spacing={3}>
        {cards.map((card, i) => {
          const isOfficeHours = card.title?.toLowerCase().includes("office hours");
          const href = card.contact ? getContactHref(card.contact) : undefined;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "12px",
                  border: `1px solid ${colors.primary}`,
                  backgroundColor: colors.background,
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {iconMap[i] || iconMap[0]}
                  <Typography
                    sx={{
                      fontFamily: fontFamily.heading,
                      fontWeight: 800,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      color: colors.black,
                      textTransform: "uppercase",
                      mt: 2,
                      mb: 1.5,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fontFamily.body,
                      fontSize: "0.875rem",
                      color: colors.grey,
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {card.description}
                  </Typography>
                  {card.contact && (
                    <Typography
                      component={href ? "a" : "span"}
                      {...(href ? { href } : {})}
                      sx={{
                        fontFamily: fontFamily.body,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        display: "inline-block",
                        pb: 0.3,
                        marginBottom:4,
                        textDecoration: "none",
                        ...(!isOfficeHours && { borderBottom: `2px solid ${colors.primary}` }),
                        ...(href && { cursor: "pointer", "&:hover": { opacity: 0.8 } }),
                      }}
                    >
                      {card.contact}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
