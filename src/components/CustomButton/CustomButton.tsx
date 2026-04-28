import { Button, ButtonProps } from "@mui/material";
import { colors, fontFamily } from "@/theme/theme";
import { ReactNode } from "react";

interface CustomButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "contained" | "outlined";
  colorScheme?: "primary" | "white" | "dark";
  children: ReactNode;
}

const colorSchemes = {
  primary: {
    contained: {
      backgroundColor: colors.primary,
      color: colors.white,
      "&:hover": { backgroundColor: colors.primary },
    },
    outlined: {
      borderColor: colors.primary,
      color: colors.primary,
      "&:hover": { borderColor: colors.primary, backgroundColor: "rgba(36,99,235,0.06)" },
    },
  },
  white: {
    contained: {
      backgroundColor: colors.white,
      color: colors.black,
      "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
    },
    outlined: {
      borderColor: colors.white,
      color: colors.white,
      "&:hover": { borderColor: colors.white, backgroundColor: "rgba(255,255,255,0.1)" },
    },
  },
  dark: {
    contained: {
      backgroundColor: colors.black,
      color: colors.white,
      "&:hover": { backgroundColor: colors.black },
    },
    outlined: {
      borderColor: colors.black,
      color: colors.black,
      "&:hover": { borderColor: colors.black, backgroundColor: "rgba(0,0,0,0.04)" },
    },
  },
};

export default function CustomButton({
  variant = "contained",
  colorScheme = "primary",
  children,
  sx,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      sx={{
        fontFamily: fontFamily.body,
        fontWeight: 600,
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        borderRadius: "2px",
        padding: { xs: "6px 14px", md: "8px 20px" },
        textTransform: "none",
        boxShadow: "none",
        whiteSpace: "nowrap",
        ...colorSchemes[colorScheme][variant],
        ...((sx as object) || {}),
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
