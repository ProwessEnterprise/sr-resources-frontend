import { Box, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomButton from "@/components/CustomButton/CustomButton";
import { colors, fontFamily } from "@/theme/theme";

interface CTASectionProps {
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function CTASection({
  title,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: CTASectionProps) {
  return (
    <Box
      component="section"
      aria-label="Call to action"
      sx={{
        background: `radial-gradient(36.87% 119.19% at 50% 49.98%, ${colors.primary} 0%, ${colors.black} 100%)`,
        py: { xs: "3rem", md: "8rem" },
        px: { xs: "1.5rem", md: "2rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {title && (
        <Typography
          sx={{
            fontFamily: fontFamily.heading,
            fontWeight: 500,
            fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
            color: colors.white,
            textTransform: "uppercase",
            mb: "2.5rem",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
      )}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: "center" }}
      >
        {primaryButtonText && (
          <CustomButton
            variant="outlined"
            colorScheme="white"
            onClick={onPrimaryClick}
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem" },
              px: { xs: "2rem", md: "2.5rem" },
              py: "1.125rem",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {primaryButtonText}
          </CustomButton>
        )}
        {secondaryButtonText && (
          <CustomButton
            colorScheme="white"
            onClick={onSecondaryClick}
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem" },
              px: { xs: "2rem", md: "2.5rem" },
              py: "1.125rem",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {secondaryButtonText}
          </CustomButton>
        )}
      </Stack>
    </Box>
  );
}
