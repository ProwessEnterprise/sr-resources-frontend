"use client";

import { createTheme } from "@mui/material/styles";

// ============ Custom Colors ============
export const colors = {
  primary: "#2463EB",
  black: "#020713",
  grey: "#4A5565",
  background: "#ECF2FD",
  disabled: "#9E9E9E",
  frame: "#D9D9D9",
  white: "#FAFCFF",
  success: "#2E7D32",
  error: "#D32F2F",
  warning: "#ED6C02",
  info: "#0288D1",
  text: {
    primary: "#020713",
    secondary: "#4A5565",
    disabled: "#9E9E9E",
    light: "#FAFCFF",
  },
  border: "#2463EB",
};

// ============ Font Sizes ============
export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  md: "1.125rem",
  lg: "1.25rem",
  xl: "1.5rem",
  "2xl": "1.875rem",
  "3xl": "2.25rem",
  "4xl": "3rem",
  "5xl": "3.75rem",
};

// ============ Font Families ============
export const fontFamily = {
  heading: "var(--font-inter), 'Inter', sans-serif",
  body: "var(--font-manrope), 'Manrope', sans-serif",
  hero: "var(--font-orbitron), 'Orbitron', sans-serif",
};

// ============ MUI Theme ============
const theme = createTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.grey },
    success: { main: colors.success },
    error: { main: colors.error },
    warning: { main: colors.warning },
    info: { main: colors.info },
    text: { primary: colors.text.primary, secondary: colors.text.secondary, disabled: colors.text.disabled },
    background: { default: colors.white, paper: colors.background },
  },
  typography: {
    fontFamily: fontFamily.body,
    h1: { fontFamily: fontFamily.hero, fontSize: fontSize["5xl"], fontWeight: 700, lineHeight: 1.2 },
    h2: { fontFamily: fontFamily.heading, fontSize: fontSize["4xl"], fontWeight: 700, lineHeight: 1.25 },
    h3: { fontFamily: fontFamily.heading, fontSize: fontSize["3xl"], fontWeight: 600, lineHeight: 1.3 },
    h4: { fontFamily: fontFamily.heading, fontSize: fontSize["2xl"], fontWeight: 600, lineHeight: 1.35 },
    h5: { fontFamily: fontFamily.heading, fontSize: fontSize.xl, fontWeight: 500, lineHeight: 1.4 },
    h6: { fontFamily: fontFamily.heading, fontSize: fontSize.lg, fontWeight: 500, lineHeight: 1.4 },
    subtitle1: { fontFamily: fontFamily.body, fontSize: fontSize.md, fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontFamily: fontFamily.body, fontSize: fontSize.base, fontWeight: 500, lineHeight: 1.5 },
    body1: { fontFamily: fontFamily.body, fontSize: fontSize.base, fontWeight: 400, lineHeight: 1.6 },
    body2: { fontFamily: fontFamily.body, fontSize: fontSize.sm, fontWeight: 400, lineHeight: 1.6 },
    caption: { fontFamily: fontFamily.body, fontSize: fontSize.xs, fontWeight: 400, lineHeight: 1.5 },
    button: { fontFamily: fontFamily.body, fontSize: fontSize.base, fontWeight: 600, textTransform: "none" as const },
  },
  shape: { borderRadius: 61 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 61, padding: "10px 24px" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { borderRadius: 0 },
      },
    },
  },
});

export default theme;
