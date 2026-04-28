import { Box, Typography } from "@mui/material";
import { colors, fontFamily } from "@/theme/theme";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeader({ title, description, align = "left", light = false }: SectionHeaderProps) {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: fontFamily.heading,
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 3vw, 3rem)",
          color: light ? colors.white : colors.black,
          textTransform: "uppercase",
          mb: description ? 2 : 0,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontFamily: fontFamily.body,
            fontSize: { xs: "0.875rem", md: "1.125rem" },
            color: light ? "rgba(255,255,255,0.7)" : colors.grey,
            lineHeight: 1.7,
            maxWidth: align === "center" ? 800 : "100%",
            mx: align === "center" ? "auto" : 0,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
