"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Button, Grid, Breadcrumbs, Link as MuiLink } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getProductBySlug } from "@/services/ProductService";
import { getProductPage } from "@/services/PageService";
import { Product, ProductPage } from "@/interfaces/Strapi";
import BrandSection from "@/components/BrandSection/BrandSection";
import CustomerSection from "@/components/CustomerSection/CustomerSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import CTASection from "@/components/CTASection/CTASection";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

const labelSx = { fontFamily: fontFamily.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)", minWidth: 150, flexShrink: 0 };
const valueSx = { fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.white };

export default function ProductDetailContent() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<ProductPage | null>(null);

  useEffect(() => {
    getProductPage().then((res) => setPage(res?.data));
    if (params?.slug) {
      getProductBySlug(params.slug as string).then((res) => {
        setProduct(res?.data?.[0] || null);
      });
    }
  }, [params?.slug]);

  if (!product) return null;

  const handleDownloadReport = () => {
    if (product.report?.url) window.open(`${API_URL}${product.report.url}`, "_blank");
  };

  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ backgroundColor: colors.black, px: { xs: 2, md: 4 }, pt: 4 }}>
        <Box sx={{ maxWidth: "80rem", mx: "auto" }}>
          <Breadcrumbs separator="/" sx={{ fontFamily: fontFamily.body, fontSize: "1rem", "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.6)" } }}>
            <MuiLink href="/products" underline="always" sx={{ color: colors.white, fontWeight: 600 }}>Products</MuiLink>
            {product.category?.name && (
              <Typography sx={{ fontFamily: fontFamily.body, color: "rgba(255,255,255,0.6)" }}>{product.category.name}</Typography>
            )}
            <Typography sx={{ fontFamily: fontFamily.body, color: "rgba(255,255,255,0.6)" }}>{product.title}</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Hero Product Section */}
      <Box sx={{ backgroundColor: colors.black, px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      <Box sx={{ maxWidth: "80rem", mx: "auto" }}>
        <Grid container spacing={4}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            {product.image && (
              <Box
                component="img"
                src={`${API_URL}${product.image.url}`}
                alt={product.title}
                sx={{
                  width: "100%", height: { xs: "20rem", md: "28rem" },
                  objectFit: "cover", borderRadius: "8px", backgroundColor: "#1a1a1a",
                }}
              />
            )}
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            {product.tagline && (
              <Box sx={{ backgroundColor: colors.primary, display: "inline-block", px: 2, py: 0.5, mb: 2 }}>
                <Typography sx={{ color: colors.white, fontFamily: fontFamily.heading, fontWeight: 600, letterSpacing: 3, fontSize: "0.7rem", textTransform: "uppercase" }}>
                  {product.tagline}
                </Typography>
              </Box>
            )}
            <Typography sx={{ fontFamily: fontFamily.hero, fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 3rem)", color: colors.white, mb: 0.5 }}>
              {product.title}
            </Typography>
            {product.productCode && (
              <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)", mb: 3 }}>
                {product.productCode}
              </Typography>
            )}

            {/* Info Rows */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
              {product.category?.name && (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>Product Category</Typography>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.primary }}>{product.category.name}</Typography>
                </Box>
              )}
              {product.product_group?.name && (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>Group</Typography>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.white }}>{product.product_group.name}</Typography>
                </Box>
              )}
              {product.quantityOptions && (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography sx={{ fontFamily: fontFamily.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>Quantity Options</Typography>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.white }}>{product.quantityOptions}</Typography>
                </Box>
              )}
            </Box>

            {/* Product Overview */}
            {product.productOverview && (
              <>
                <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.25rem", color: colors.white, mb: 1 }}>
                  Product Overview
                </Typography>
                <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, mb: 3 }}>
                  {product.productOverview}
                </Typography>
              </>
            )}

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleDownloadReport}
                disabled={!product.report?.url}
                sx={{
                  borderRadius: "4px", borderColor: colors.white, color: colors.white,
                  fontFamily: fontFamily.body, fontWeight: 600, fontSize: "1rem",
                  textTransform: "none", px: 5, py: 1.5,
                  "&:hover": { borderColor: colors.white, backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                {product.primary_button_Text || "Reports"}
              </Button>
              <Button
                variant="contained"
                onClick={() => (router.push("/contact"))}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: "4px", backgroundColor: colors.primary,
                  fontFamily: fontFamily.body, fontWeight: 600, fontSize: "1rem",
                  textTransform: "none", px: 5, py: 1.5, boxShadow: "none",
                }}
              >
                {product.secondary_button_Text || "Request Quote"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Box>

      {/* Other Details Section */}
      {(product.overview_details?.length > 0 || product.technical_snapshots?.length > 0) && (
        <Box sx={{ backgroundColor: colors.black, py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
          <Box sx={{ maxWidth: "80rem", mx: "auto" }}>
            <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 900, fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.white, textTransform: "uppercase", mb: 4 }}>
              Other Details
            </Typography>
            <Grid container spacing={6}>
              {product.overview_details?.length > 0 && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.25rem", color: colors.white, mb: 3 }}>
                    Product Overview
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {product.overview_details.map((d) => (
                      <Box key={d.id} sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                        <Typography sx={labelSx}>{d.label}</Typography>
                        <Typography sx={valueSx}>{d.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              )}
              {product.technical_snapshots?.length > 0 && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1.25rem", color: colors.white, mb: 3 }}>
                    Technical Snapshot
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {product.technical_snapshots.map((t) => (
                      <Box key={t.id} sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                        <Typography sx={labelSx}>{t.label}</Typography>
                        <Typography sx={valueSx}>{t.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Disclaimer */}
      {product.disclaimer && (
        <Box sx={{ backgroundColor: colors.black, pb: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              maxWidth: "80rem", mx: "auto", backgroundColor: "rgba(36,99,235,0.15)",
              borderRadius: "8px", p: { xs: 3, md: 4 },
            }}
          >
            <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "1rem", color: colors.primary, mb: 1 }}>
              Disclaimer
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.heading, fontWeight: 700, fontSize: "0.95rem", color: colors.white, lineHeight: 1.7 }}>
              {product.disclaimer}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Brands */}
      <BrandSection title={page?.brand?.title || ""} description={page?.brand?.description || ""} />

      {/* Customer Testimonials */}
      <CustomerSection title={page?.customer?.title || ""} description={page?.customer?.description || ""} />

      {/* FAQ */}
      <FAQSection title={page?.quesAns?.title || ""} description={page?.quesAns?.description || ""} />

      {/* CTA Section */}
      {page && page.cta_section && (
        <CTASection
          title={page.cta_section.title}
          primaryButtonText={page.cta_section.primary_button_text}
          secondaryButtonText={page.cta_section.secondary_button_text}
          onPrimaryClick={() => (router.push("/products"))}
          onSecondaryClick={() => (router.push("/contact"))}
        />
      )}
    </>
  );
}
