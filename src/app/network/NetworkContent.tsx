"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  Box, Typography, Grid, TextField, Button, Snackbar, Alert,
} from "@mui/material";

import { getNetworkPage } from "@/services/PageService";
import { NetworkPage } from "@/interfaces/Strapi";
import { submitPartnerInquiry } from "@/services/ContactInquiryService";
import HeroSection from "@/components/HeroSection/HeroSection";
import CustomerSection from "@/components/CustomerSection/CustomerSection";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import CTASection from "@/components/CTASection/CTASection";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem",
    fontFamily: fontFamily.body,
    backgroundColor: "transparent",
    "& fieldset": { borderColor: colors.frame },
    "&:hover fieldset": { borderColor: colors.frame },
    "&.Mui-focused fieldset": { borderColor: colors.primary },
  },
  "& .MuiInputLabel-root": { fontFamily: fontFamily.body, fontSize: "0.85rem" },
};

const errorFieldStyle = {
  ...fieldStyle,
  "& .MuiOutlinedInput-root": {
    ...fieldStyle["& .MuiOutlinedInput-root"],
    "& fieldset": { borderColor: colors.error },
    "&:hover fieldset": { borderColor: colors.error },
  },
};

const errorTextSx = { fontFamily: fontFamily.body, fontSize: "0.75rem", color: colors.error, mt: 0.5 };

interface PartnerForm {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  business_type: string;
  requirements: string;
}

const initialForm: PartnerForm = {
  full_name: "", company_name: "", email: "", phone: "",
  country: "", business_type: "", requirements: "",
};

export default function NetworkContent() {
  const router = useRouter();
  const [page, setPage] = useState<NetworkPage | null>(null);
  const [form, setForm] = useState<PartnerForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PartnerForm, string>>>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
    open: false, severity: "success", message: "",
  });

  useEffect(() => {
    getNetworkPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return null;

  const hero = page.hero_section;

  const handleChange = (field: keyof PartnerForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof PartnerForm, string>> = {};
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.company_name.trim()) newErrors.company_name = "Company name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.business_type.trim()) newErrors.business_type = "Business type is required";
    if (!form.requirements.trim()) newErrors.requirements = "Message is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const res = await submitPartnerInquiry(form);
      if (res.status !== "success") throw new Error("Failed");
      setSnackbar({ open: true, severity: "success", message: "Partnership request submitted!" });
      setForm(initialForm);
      setErrors({});
    } catch {
      setSnackbar({ open: true, severity: "error", message: "Failed to submit. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <HeroSection
        bgImage={hero?.hero_image ? `${API_URL}${hero.hero_image.url}` : undefined}
        tagline={hero?.hero_tagline}
        title={hero?.hero_title}
        description={hero?.hero_description}
        primaryBtnText={hero?.hero_primarybutton_text}
        secondaryBtnText={hero?.hero_secondarybutton_text}
        onPrimaryClick={() => router.push("/products")}
        onSecondaryClick={() => router.push("/contact")}
      />

      {/* Customer We Serve Logos — horizontal marquee */}
      {page.customer_we_serve?.length > 0 && (
        <Box sx={{ py: { xs: "2rem", md: "3rem" }, overflow: "hidden" }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading, fontWeight: 600, fontSize: "0.75rem",
              color: colors.grey, letterSpacing: "0.1875rem", textTransform: "uppercase",
              textAlign: "center", mb: "2rem",
            }}
          >
            {page.customer_weserve_label}
          </Typography>
          <Box
            sx={{
              display: "flex", alignItems: "center", gap: "4rem", width: "max-content",
              animation: "marquee 20s linear infinite",
              "@keyframes marquee": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {[...page.customer_we_serve, ...page.customer_we_serve].map((img, i) => (
              <Box
                key={`${img.id}-${i}`}
                component="img"
                src={`${API_URL}${img.url}`}
                alt={img.alternativeText || "partner"}
                sx={{ height: "3rem", objectFit: "contain", opacity: 0.7, flexShrink: 0 }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Business Partners */}
      <Box sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}>
        <SectionHeader title={page.business_partners?.title} description={page.business_partners?.description} />
        {page.business_partners_images?.length > 0 && (
          <Grid container spacing="0.75rem">
            {page.business_partners_images.map((img) => (
              <Grid key={img.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <Box
                  sx={{
                    borderRadius: "0.5rem", overflow: "hidden",
                    height: { xs: "10rem", md: "12rem" },
                  }}
                >
                  <Box
                    component="img"
                    src={`${API_URL}${img.url}`}
                    alt={img.alternativeText || "business partner"}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* What Our Customer Says */}
      <CustomerSection title={page.customer?.title} description={page.customer?.description} />

      {/* Become a Partner Form */}
      <Box sx={{ py: { xs: "3rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" }, maxWidth: "80rem", mx: "auto" }}>
        <Box
          sx={{
            backgroundColor: colors.background, borderRadius: "0.25rem",
            border: `0.0625rem solid ${colors.primary}`,
            pt: "3rem", pr: "3rem", pb: "4.5rem", pl: "3rem",
            position: "relative", overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontFamily: fontFamily.heading, fontWeight: 900,
              fontSize: { xs: "1.3rem", md: "1.8rem" }, color: colors.black, textTransform: "uppercase", mb: "0.25rem",
            }}
          >
            {page.become_partners?.title}
          </Typography>
          <Typography sx={{ width: "70%", fontFamily: fontFamily.body, fontSize: "1rem", lineHeight: "1.5rem", color: colors.grey, mb: "1.5rem" }}>
            {page.become_partners?.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Full Name *
              </Typography>
              <TextField fullWidth placeholder="John Doe" value={form.full_name} onChange={handleChange("full_name")} size="small" sx={errors.full_name ? errorFieldStyle : fieldStyle} />
              {errors.full_name && <Typography sx={errorTextSx}>{errors.full_name}</Typography>}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Company Name *
              </Typography>
              <TextField fullWidth placeholder="Industrial Corp" value={form.company_name} onChange={handleChange("company_name")} size="small" sx={errors.company_name ? errorFieldStyle : fieldStyle} />
              {errors.company_name && <Typography sx={errorTextSx}>{errors.company_name}</Typography>}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Email Address *
              </Typography>
              <TextField fullWidth placeholder="j.doe@company.com" type="email" value={form.email} onChange={handleChange("email")} size="small" sx={errors.email ? errorFieldStyle : fieldStyle} />
              {errors.email && <Typography sx={errorTextSx}>{errors.email}</Typography>}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Phone Number *
              </Typography>
              <TextField fullWidth placeholder="+00 000 000 0000" value={form.phone} onChange={handleChange("phone")} size="small" sx={errors.phone ? errorFieldStyle : fieldStyle} />
              {errors.phone && <Typography sx={errorTextSx}>{errors.phone}</Typography>}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Country *
              </Typography>
              <TextField fullWidth placeholder="India" value={form.country} onChange={handleChange("country")} size="small" sx={errors.country ? errorFieldStyle : fieldStyle} />
              {errors.country && <Typography sx={errorTextSx}>{errors.country}</Typography>}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Business Type *
              </Typography>
              <TextField fullWidth placeholder="Road Construction" value={form.business_type} onChange={handleChange("business_type")} size="small" sx={errors.business_type ? errorFieldStyle : fieldStyle} />
              {errors.business_type && <Typography sx={errorTextSx}>{errors.business_type}</Typography>}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: "0.25rem", color: colors.black }}>
                Message *
              </Typography>
              <TextField
                fullWidth multiline rows={4}
                placeholder="Describe your specific industrial needs..."
                value={form.requirements} onChange={handleChange("requirements")} sx={errors.requirements ? errorFieldStyle : fieldStyle}
              />
              {errors.requirements && <Typography sx={errorTextSx}>{errors.requirements}</Typography>}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth variant="contained" onClick={handleSubmit} disabled={loading}
                sx={{
                  mt: "0.25rem", borderRadius: "0.125rem", backgroundColor: colors.primary,
                  fontFamily: fontFamily.body, fontWeight: 700, fontSize: "1rem",
                  height: "3.625rem", pt: "1.0625rem", pb: "1.0625rem", px: "2rem",
                  textTransform: "none",
                }}
              >
                {loading ? "Sending..." : "Submit Partnership Request"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Gradient CTA Section */}
      <CTASection
        title={page.performance?.title}
        primaryButtonText={page.performance?.primary_button_text}
        secondaryButtonText={page.performance?.secondary_button_text}
        onPrimaryClick={() => router.push("/products")}
        onSecondaryClick={() => router.push("/contact")}
      />

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
