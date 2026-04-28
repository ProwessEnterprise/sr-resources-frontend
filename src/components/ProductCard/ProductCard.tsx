"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Card, CardMedia, CardContent, Chip, Button } from "@mui/material";
import { Product } from "@/interfaces/Strapi";
import { colors, fontFamily } from "@/theme/theme";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

interface ProductCardProps {
  product: Product;
  onDownloadReport?: (product: Product) => void;
}

export default function ProductCard({ product, onDownloadReport }: ProductCardProps) {
  const router = useRouter();
  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        overflow: "hidden",
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.black,
        border: "0.0625rem solid rgba(236, 242, 253, 0.2)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ height: "15rem", objectFit: "cover", backgroundColor: "#1a1a1a" }}
          image={product.image ? `${API_URL}${product.image.url}` : "/placeholder.png"}
          alt={product.title}
        />
        {product.category?.name && (
          <Chip
            label={product.category.name}
            sx={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              backgroundColor: colors.primary,
              color: colors.white,
              fontFamily: fontFamily.heading,
              fontWeight: 700,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              borderRadius: "0.125rem",
              height: "1.75rem",
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: "1.5rem" }}>
        <Typography
          sx={{
            fontFamily: fontFamily.heading,
            fontWeight: 700,
            fontSize: "1.125rem",
            color: colors.white,
            mb: "0.5rem",
          }}
        >
          {product.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: fontFamily.body,
            fontSize: "0.85rem",
            color: colors.frame,
            lineHeight: 1.6,
            mb: "1.25rem",
            flex: 1,
          }}
        >
          {product.productOverview?.slice(0, 120)}
          {product.productOverview?.length > 120 ? "..." : ""}
        </Typography>
        <Box sx={{ display: "flex", gap: "0.75rem" }}>
          <Button
            variant="outlined"
            onClick={() => onDownloadReport?.(product)}
            disabled={!product.report?.url}
            sx={{
              borderRadius: "0.125rem",
              borderColor: colors.white,
              color: colors.white,
              fontFamily: fontFamily.body,
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "none",
              px: "1.5rem",
              py: "0.5rem",
              "&:hover": { borderColor: colors.white, backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            Reports
          </Button>
          <Button
            variant="contained"
            onClick={() => (router.push(`/products/${product.slug}`))}
            sx={{
              borderRadius: "0.125rem",
              backgroundColor: colors.primary,
              fontFamily: fontFamily.body,
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "none",
              px: "1.5rem",
              py: "0.5rem",
              boxShadow: "none",
              "&:hover": { backgroundColor: colors.primary, opacity: 0.9 },
            }}
          >
            View Product
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
