"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState, useCallback } from "react";
import {
  Box, Typography, Button, Grid,
  MenuItem, Select, FormControl, InputBase, SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { getProductPage } from "@/services/PageService";
import { getProducts } from "@/services/ProductService";
import { getCategories, getSubCategories, getGroups } from "@/services/CategoryService";
import { ProductPage, Product, Category, SubCategory, Group } from "@/interfaces/Strapi";
import HeroSection from "@/components/HeroSection/HeroSection";
import CTASection from "@/components/CTASection/CTASection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { colors, fontFamily } from "@/theme/theme";
import PageLoader from "@/components/PageLoader/PageLoader";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "";

const selectSx = {
  fontFamily: fontFamily.heading,
  fontWeight: 700,
  fontSize: "0.875rem",
  textTransform: "uppercase" as const,
  backgroundColor: "transparent",
  border: `0.0625rem solid ${colors.frame}`,
  borderRadius: "0.125rem",
  color: colors.white,
  "& .MuiSelect-select": { py: "0.875rem", px: "1rem" },
  "& fieldset": { border: "none" },
  "& .MuiSvgIcon-root": { color: colors.white },
};

const menuProps = {
  anchorOrigin: { vertical: "bottom" as const, horizontal: "left" as const },
  transformOrigin: { vertical: "top" as const, horizontal: "left" as const },
  slotProps: {
    paper: {
      sx: {
        borderRadius: "0.125rem",
        mt: "0.25rem",
        boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,0.1)",
        "& .MuiList-root": { p: 0 },
        "& .MuiMenuItem-root": {
          fontFamily: fontFamily.heading,
          fontWeight: 700,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          color: colors.black,
          borderRadius: 0,
          "&:hover": { backgroundColor: colors.background },
          "&.Mui-selected": { backgroundColor: colors.background, color: colors.primary },
        },
      },
    },
  },
};

export default function ProductsContent() {
  const router = useRouter();
  const [page, setPage] = useState<ProductPage | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProductPage().then((res) => setPage(res?.data));
    getCategories().then((res) => setCategories(res?.data || []));
  }, []);

  const fetchProducts = useCallback(() => {
    getProducts({
      category: selectedCategory || undefined,
      sub_category: selectedSubCategory || undefined,
      group: selectedGroup || undefined,
      search: search || undefined,
    }).then((res) => setProducts(res?.data || []));
  }, [selectedCategory, selectedSubCategory, selectedGroup, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCategoryChange = async (e: SelectChangeEvent) => {
    const val = e.target.value;
    setSelectedCategory(val);
    setSelectedSubCategory("");
    setSelectedGroup("");
    setGroups([]);
    if (val) {
      const res = await getSubCategories(val);
      setSubCategories(res?.data || []);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = async (e: SelectChangeEvent) => {
    const val = e.target.value;
    setSelectedSubCategory(val);
    setSelectedGroup("");
    if (val) {
      const res = await getGroups(val);
      setGroups(res?.data || []);
    } else {
      setGroups([]);
    }
  };

  const handleDownloadReport = (product: Product) => {
    if (product.report?.url) {
      window.open(`${API_URL}${product.report.url}`, "_blank");
    }
  };

  if (!page) return <PageLoader />;

  return (
    <>
      <HeroSection
        bgImage={page.hero_section?.hero_image ? `${API_URL}${page.hero_section.hero_image.url}` : undefined}
        tagline={page.hero_section?.hero_tagline}
        title={page.hero_section?.hero_title}
        description={page.hero_section?.hero_description}
        primaryBtnText={page.hero_section?.hero_primarybutton_text}
        secondaryBtnText={page.hero_section?.hero_secondarybutton_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />

      <Box sx={{ backgroundColor: colors.black, py: { xs: "2rem", md: "5rem" }, px: { xs: "1rem", md: "2rem" } }}>
      <Box sx={{ maxWidth: "80rem", mx: "auto" }}>
        <Typography
          sx={{
            fontFamily: fontFamily.heading, fontWeight: 900,
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: colors.white,
            textTransform: "uppercase", mb: "0.5rem",
          }}
        >
          {page.product?.title || "Core Product Portfolio"}
        </Typography>
        <Typography sx={{ fontFamily: fontFamily.body, fontSize: "0.875rem", color: colors.frame, lineHeight: 1.7, mb: "2.5rem", maxWidth: "37.5rem" }}>
          {page.product?.description}
        </Typography>

        {/* Filters */}
        <Grid container spacing="1rem" sx={{ mb: "2.5rem", alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <Select value={selectedCategory} onChange={handleCategoryChange} displayEmpty sx={selectSx} MenuProps={menuProps}>
                <MenuItem value="">Category</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.documentId} value={c.documentId}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <Select value={selectedSubCategory} onChange={handleSubCategoryChange} displayEmpty disabled={!selectedCategory} sx={selectSx} MenuProps={menuProps}>
                <MenuItem value="">Sub Category</MenuItem>
                {subCategories.map((sc) => (
                  <MenuItem key={sc.documentId} value={sc.documentId}>{sc.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth>
              <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} displayEmpty disabled={!selectedSubCategory} sx={selectSx} MenuProps={menuProps}>
                <MenuItem value="">Group</MenuItem>
                {groups.map((g) => (
                  <MenuItem key={g.documentId} value={g.documentId}>{g.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: "flex", border: `0.0625rem solid ${colors.frame}`, borderRadius: "0.125rem", overflow: "hidden", height: "3.125rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", px: "0.75rem", color: colors.frame }}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="SEARCH PRODUCT"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchProducts()}
                sx={{
                  flex: 1, fontFamily: fontFamily.heading,
                  fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase",
                  color: colors.white,
                }}
              />
              <Button
                onClick={fetchProducts}
                variant="contained"
                sx={{
                  borderRadius: 0, backgroundColor: colors.primary,
                  fontFamily: fontFamily.body, fontWeight: 600,
                  fontSize: "0.875rem", textTransform: "none",
                  px: "1.5rem", boxShadow: "none",
                  "&:hover": { backgroundColor: colors.primary, opacity: 0.9 },
                }}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Product Cards */}
        <Grid container spacing="1.5rem" sx={{ justifyContent: "center" }}>
          {products.map((product) => (
            <Grid key={product.documentId} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard product={product} onDownloadReport={handleDownloadReport} />
            </Grid>
          ))}
        </Grid>

        {products.length === 0 && (
          <Typography sx={{ textAlign: "center", py: "3rem", fontFamily: fontFamily.body, color: colors.frame }}>
            No products found.
          </Typography>
        )}
      </Box>
      </Box>

      {/* CTA Section */}
      <CTASection
        title={page.cta_section.title || "Partner with a reliable energy supplier"}
        primaryButtonText={page.cta_section.primary_button_text}
        secondaryButtonText={page.cta_section.secondary_button_text}
        onPrimaryClick={() => (router.push("/products"))}
        onSecondaryClick={() => (router.push("/contact"))}
      />
    </>
  );
}
