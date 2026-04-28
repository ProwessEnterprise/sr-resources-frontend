"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getFAQs } from "@/services/FAQService";
import { FAQ } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";

interface FAQSectionProps {
  title: string;
  description?: string;
}

export default function FAQSection({ title, description }: FAQSectionProps) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expanded, setExpanded] = useState<number | false>(0);

  useEffect(() => {
    getFAQs().then((res) => setFaqs(res?.data || []));
  }, []);

  if (!faqs.length) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
      <Grid container spacing={6}>
        {/* Left: title + description */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: colors.black,
              textTransform: "uppercase",
              mb: 3,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              sx={{
                fontFamily: fontFamily.body,
                fontSize: { xs: "0.875rem", md: "1rem" },
                color: colors.grey,
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          )}
        </Grid>

        {/* Right: accordions */}
        <Grid size={{ xs: 12, md: 7 }}>
          {faqs.map((faq, i) => (
            <Accordion
              key={faq.id}
              expanded={expanded === i}
              onChange={(_, isExpanded) => setExpanded(isExpanded ? i : false)}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: colors.background,
                border: `0.0625rem solid ${colors.frame}`,
                borderRadius: "0.5rem !important",
                mb: "0.5rem",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: colors.primary }} />}
                sx={{ px: "1.5rem", py: "0.5rem" }}
              >
                <Typography
                  sx={{
                    fontFamily: fontFamily.heading,
                    fontWeight: 700,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: colors.black,
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              {expanded === i && (
                <Divider sx={{ mx: "1.5rem", borderColor: colors.frame }} />
              )}
              <AccordionDetails sx={{ px: "1.5rem", pb: "1.5rem", pt: "0.5rem" }}>
                <Typography
                  sx={{
                    fontFamily: fontFamily.body,
                    fontSize: "0.9rem",
                    color: colors.grey,
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
