import { Box, Typography, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors, fontFamily } from "@/theme/theme";
import CustomButton from "@/components/CustomButton/CustomButton";

const HIGHLIGHT_WORDS = ["Petroleum", "Our Team", "Careers"];

function HighlightedTitle({ text }: { text: string }) {
  const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <Typography
      variant="h1"
      sx={{
        color: colors.white,
        mb: { xs: 1, md: 2 },
        fontFamily: fontFamily.hero,
        fontSize: "clamp(1.5rem, 5vw, 72px)",
        fontWeight: 700,
        lineHeight: 1.2,
      }}
    >
      {parts.map((part, i) =>
        HIGHLIGHT_WORDS.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
          <Box key={i} component="span" sx={{ color: colors.primary }}>
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </Typography>
  );
}



interface HeroSectionProps {
  bgImage?: string;
  tagline?: string;
  title?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSection({
  bgImage,
  tagline,
  title,
  description,
  primaryBtnText,
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  return (
    <Box
      component="section"
      aria-label={title || "Hero"}
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 72px)",
        overflow: "hidden",
      }}
    >
      {/* Background image - full visible, no cropping */}
      {bgImage && (
        <Box
          component="img"
          src={bgImage}
          alt={title || "SR Resources hero background"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(26,26,26,0.5) 50.05%, rgba(26,26,26,0) 100%)",
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {tagline && (
          <Box
            sx={{
              backgroundColor: colors.primary,
              display: "inline-block",
              alignSelf: "flex-start",
              px: { xs: 1.5, md: 2 },
              py: 0.5,
              mb: { xs: 1.5, md: 3 },
            }}
          >
            <Typography
              sx={{
                color: colors.white,
                fontFamily: fontFamily.heading,
                fontWeight: 600,
                letterSpacing: 3,
                fontSize: "12px",
                textTransform: "uppercase",
              }}
            >
              {tagline}
            </Typography>
          </Box>
        )}

        {title && <HighlightedTitle text={title} />}

        {description && (
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              mb: { xs: 2, md: 4 },
              maxWidth: { xs: "100%", md: 600 },
              fontFamily: fontFamily.body,
              fontSize: "clamp(0.875rem, 1.5vw, 20px)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}

        <Stack direction="row" spacing="8px" sx={{ flexWrap: "wrap", gap: 1 }}>
          {primaryBtnText && (
            <CustomButton variant="outlined" colorScheme="white" onClick={onPrimaryClick}>
              {primaryBtnText}
            </CustomButton>
          )}
          {secondaryBtnText && (
            <CustomButton onClick={onSecondaryClick} endIcon={<ArrowForwardIcon />}>
              {secondaryBtnText}
            </CustomButton>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
