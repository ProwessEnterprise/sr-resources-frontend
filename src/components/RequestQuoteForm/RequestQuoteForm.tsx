"use client";

import { useState } from "react";
import { Box, Typography, TextField, Grid, Snackbar, Alert } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { submitContactInquiry } from "@/services/ContactInquiryService";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { colors, fontFamily } from "@/theme/theme";
import CustomButton from "@/components/CustomButton/CustomButton";

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity: string;
  requirements: string;
}

const initialForm: FormData = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  productInterest: "",
  quantity: "",
  requirements: "",
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface RequestQuoteFormProps {
  title?: string;
  description?: string;
}

export default function RequestQuoteForm({ title, description }: RequestQuoteFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; severity: "success" | "error"; message: string }>({
    open: false,
    severity: "success",
    message: "",
  });

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.productInterest.trim()) newErrors.productInterest = "Product interest is required";
    if (!form.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!form.requirements.trim()) newErrors.requirements = "Requirement details are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await submitContactInquiry(form);
      if (res.status !== "success") throw new Error("Failed");
      setSnackbar({ open: true, severity: "success", message: "Inquiry submitted successfully!" });
      setForm(initialForm);
      setErrors({});
    } catch {
      setSnackbar({ open: true, severity: "error", message: "Failed to submit. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.background,
        borderRadius: "4px",
        border: `1px solid ${colors.primary}`,
        maxWidth: "100%",
        pt: "48px",
        pr: "48px",
        pb: "72px",
        pl: "48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative icons */}
      <Box sx={{ position: "absolute", top: 0, right: 1, opacity: 0.1 }}>
        <EngineeringIcon sx={{ fontSize: 140, color: colors.primary }} />
      </Box>

      <Typography
        sx={{
          fontFamily: fontFamily.heading,
          fontWeight: 900,
          fontSize: { xs: "1.3rem", md: "1.8rem" },
          color: colors.black,
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ width: "70%", fontFamily: "Manrope", fontWeight: 400, fontSize: "16px", lineHeight: "24px", letterSpacing: "0px", color: colors.grey, mb: 3 }}>
        {description}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Full Name *
          </Typography>
          <TextField fullWidth placeholder="John Doe" value={form.fullName} onChange={handleChange("fullName")} size="small" sx={errors.fullName ? errorFieldStyle : fieldStyle} />
          {errors.fullName && <Typography sx={errorTextSx}>{errors.fullName}</Typography>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Company Name *
          </Typography>
          <TextField fullWidth placeholder="Industrial Corp" value={form.companyName} onChange={handleChange("companyName")} size="small" sx={errors.companyName ? errorFieldStyle : fieldStyle} />
          {errors.companyName && <Typography sx={errorTextSx}>{errors.companyName}</Typography>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Email Address *
          </Typography>
          <TextField fullWidth placeholder="j.doe@company.com" type="email" value={form.email} onChange={handleChange("email")} size="small" sx={errors.email ? errorFieldStyle : fieldStyle} />
          {errors.email && <Typography sx={errorTextSx}>{errors.email}</Typography>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Phone Number *
          </Typography>
          <TextField fullWidth placeholder="+00 000 000 0000" value={form.phone} onChange={handleChange("phone")} size="small" sx={errors.phone ? errorFieldStyle : fieldStyle} />
          {errors.phone && <Typography sx={errorTextSx}>{errors.phone}</Typography>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Product Interest *
          </Typography>
          <TextField fullWidth placeholder="Infrastructure Materials" value={form.productInterest} onChange={handleChange("productInterest")} size="small" sx={errors.productInterest ? errorFieldStyle : fieldStyle} />
          {errors.productInterest && <Typography sx={errorTextSx}>{errors.productInterest}</Typography>}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Quantity Required *
          </Typography>
          <TextField fullWidth placeholder="e.g. 500 Metric Tons" value={form.quantity} onChange={handleChange("quantity")} size="small" sx={errors.quantity ? errorFieldStyle : fieldStyle} />
          {errors.quantity && <Typography sx={errorTextSx}>{errors.quantity}</Typography>}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", mb: 0.5, color: colors.black }}>
            Requirement Details *
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Describe your specific industrial needs..."
            value={form.requirements}
            onChange={handleChange("requirements")}
            sx={errors.requirements ? errorFieldStyle : fieldStyle}
          />
          {errors.requirements && <Typography sx={errorTextSx}>{errors.requirements}</Typography>}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomButton
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 1, fontWeight: 700, fontSize: "1rem", py: "12px" }}
          >
            {loading ? "Sending..." : "Submit Inquiry"}
          </CustomButton>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
