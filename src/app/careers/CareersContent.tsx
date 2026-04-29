"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid, TextField, MenuItem, Button, CircularProgress, Alert } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CallMadeIcon from "@mui/icons-material/CallMade";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getCareerPage } from "@/services/PageService";

const careerIcons = [TrendingUpOutlinedIcon, FactoryOutlinedIcon, HandshakeOutlinedIcon, AccessTimeOutlinedIcon];
import { getJobOpenings } from "@/services/JobOpeningService";
import { submitCareerApplication } from "@/services/CareerApplicationService";
import { CareerPage, JobOpening, CardItem } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CTAMapSection from "@/components/CTAMapSection/CTAMapSection";
import { colors, fontFamily } from "@/theme/theme";
import PageLoader from "@/components/PageLoader/PageLoader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

export default function CareersContent() {
  const router = useRouter();
  const [page, setPage] = useState<CareerPage | null>(null);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", position: "", message: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCareerPage().then((res) => setPage(res?.data));
    getJobOpenings().then((res) => setJobs(res?.data || []));
  }, []);

  if (!page) return <PageLoader />;

  const hero = page.hero_section;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitCareerApplication({ ...form, resume: resume || undefined });
      setSubmitStatus("success");
      setForm({ full_name: "", email: "", phone: "", position: "", message: "" });
      setResume(null);
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
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
        onPrimaryClick={() => (router.push("/products"))}
      />

      {/* Why Join Section */}
      {page.resources?.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: colors.black,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            {page.resource?.title}
          </Typography>
          <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, mb: 5, maxWidth: 600 }}>
            {page.resource?.description}
          </Typography>
          <Grid container spacing={3}>
            {page.resources.map((card: CardItem, i: number) => {
              const Icon = careerIcons[i] || careerIcons[0];
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.id}>
                  <Box
                    sx={{
                      backgroundColor: colors.background,
                      borderRadius: "0.75rem",
                      border: `0.0625rem solid ${colors.primary}`,
                      p: "2rem",
                      minHeight: "18rem",
                      height: "100%",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-0.375rem)" },
                    }}
                  >
                    <Icon sx={{ fontSize: "2.5rem", color: colors.primary, mb: "1rem" }} />
                    <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.1rem", color: colors.black, mb: "0.5rem" }}>
                      {card.title}
                    </Typography>
                    <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, lineHeight: 1.7 }}>
                      {card.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Life At Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 } }}>
          <Box sx={{ flex: 1, pt: { md: 1 } }}>
            <Typography
              sx={{
                fontFamily: fontFamily.heading,
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                color: colors.black,
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              {page.life_at_details?.title}
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, lineHeight: 1.8 }}>
              {page.life_at_details?.description}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            {page.life_at_details?.image && (
              <Box
                component="img"
                src={`${API_URL}${page.life_at_details.image.url}`}
                alt={page.life_at_details.image.alternativeText || "Life at SR Resources"}
                sx={{ width: "100%", height: { xs: 300, md: 430 }, borderRadius: "8px", objectFit: "cover", boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Our Offices */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 4, md: 6 } }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ width: "100%", height: { xs: 350, md: 500 }, borderRadius: "8px", overflow: "hidden", boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(page.office_address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1, pt: { md: 1 } }}>
            <Typography
              sx={{
                fontFamily: fontFamily.heading,
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                color: colors.black,
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              {page.office_details?.title}
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, lineHeight: 1.8 }}>
              {page.office_details?.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Open Positions */}
      {jobs.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
          <Typography
            sx={{
              fontFamily: fontFamily.heading,
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 3rem)",
              color: colors.black,
              textTransform: "uppercase",
              mb: 4,
            }}
          >
            {page.jobs_title}
          </Typography>
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid size={{ xs: 12, md: 6 }} key={job.id}>
                <Box
                  sx={{
                    backgroundColor: colors.background,
                    borderRadius: "12px",
                    border: `0.0625rem solid ${colors.primary}`,
                    p: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, position: job.role }));
                    formRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Box>
                    <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.15rem", color: colors.black, mb: 0.5 }}>
                      {job.role}
                    </Typography>
                    <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.grey, display: "flex", alignItems: "center", gap: 1 }}>
                      {job.location}
                      <FiberManualRecordIcon sx={{ fontSize: "0.75rem", color: colors.grey }} />
                      {job.type}
                      <FiberManualRecordIcon sx={{ fontSize: "0.75rem", color: colors.grey }} />
                      {job.experience}
                    </Typography>
                  </Box>
                  <CallMadeIcon sx={{ color: colors.primary, fontSize: 55 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Application Form */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 4 }, maxWidth: "80rem", mx: "auto" }}>
        <Box ref={formRef} sx={{ backgroundColor: colors.background, borderRadius: 0, border: `1px solid ${colors.primary}`, p: { xs: 3, md: 5 } }}>
          <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: colors.black, textTransform: "uppercase", mb: 0.5 }}>
            {page.application_form?.title || "Apply for Position"}
          </Typography>
          <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: colors.grey, mb: 4 }}>
            {page.application_form?.description || "Join our Team"}
          </Typography>

          {submitStatus && (
            <Alert severity={submitStatus} sx={{ mb: 3 }} onClose={() => setSubmitStatus(null)}>
              {submitStatus === "success" ? "Application submitted successfully!" : "Failed to submit. Please try again."}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Full Name</Typography>
              <TextField fullWidth placeholder="John Doe" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Position Applying For</Typography>
              <TextField
                fullWidth
                select
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
                slotProps={{
                  select: {
                    displayEmpty: true,
                    renderValue: (value: unknown) => {
                      if (!value) return <span style={{ color: "#aaa" }}>Select Position</span>;
                      return value as string;
                    },
                    MenuProps: {
                      slotProps: {
                        paper: {
                          style: { borderRadius: 0 },
                        },
                      },
                    },
                  },
                }}
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.role} sx={{ borderRadius: 0 }}>{job.role}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Email Address</Typography>
              <TextField fullWidth placeholder="j.doe@company.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Phone Number</Typography>
              <TextField fullWidth placeholder="+00 000 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Upload Resume</Typography>
              <input type="file" accept=".pdf,.docx" ref={fileInputRef} hidden onChange={(e) => setResume(e.target.files?.[0] || null)} />
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{ border: `1px dashed ${colors.grey}`, borderRadius: 0, p: 3, textAlign: "center", cursor: "pointer", minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <CloudUploadOutlinedIcon sx={{ color: colors.grey, mb: 0.5 }} />
                <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.8rem", color: colors.grey }}>
                  {resume ? resume.name : "PDF, DOCX (Max 5MB)"}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontFamily: fontFamily.body, fontWeight: 600, fontSize: "0.75rem", color: colors.black, textTransform: "uppercase", mb: 1 }}>Message</Typography>
              <TextField fullWidth multiline rows={3} placeholder="Tell us more about yourself" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                disabled={submitting || !form.full_name || !form.email || !form.position || !form.phone || !resume}
                onClick={handleSubmit}
                sx={{ backgroundColor: colors.primary, fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", py: 1.5, borderRadius: 0, textTransform: "none", "&:hover": { backgroundColor: colors.primary } }}
              >
                {submitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Submit Application"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* FAQ */}
      <FAQSection title={page.quesAns?.title} description={page.quesAns?.description} />

      {/* CTA Map */}
      <CTAMapSection
        title={page.map?.title}
        primaryButtonText={page.map?.primary_button_text}
        secondaryButtonText={page.map?.secondary_button_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
