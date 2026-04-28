import { Product, StrapiListResponse, StrapiSingleResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

const PRODUCT_POPULATE =
  "populate[0]=image&populate[1]=category&populate[2]=sub_category&populate[3]=product_group&populate[4]=overview_details&populate[5]=technical_snapshots&populate[6]=report";

export const getProducts = async (filters?: {
  category?: string;
  sub_category?: string;
  group?: string;
  search?: string;
}) => {
  let query = `/products?${PRODUCT_POPULATE}`;
  if (filters?.category) query += `&filters[category][documentId][$eq]=${filters.category}`;
  if (filters?.sub_category) query += `&filters[sub_category][documentId][$eq]=${filters.sub_category}`;
  if (filters?.group) query += `&filters[product_group][documentId][$eq]=${filters.group}`;
  if (filters?.search) query += `&filters[title][$containsi]=${filters.search}`;
  query += "&pagination[pageSize]=100";
  const response = await getRequest(query);
  return response?.rawResponse?.data as StrapiListResponse<Product>;
};

export const getProductBySlug = async (slug: string) => {
  const response = await getRequest(`/products?filters[slug][$eq]=${slug}&${PRODUCT_POPULATE}`);
  return response?.rawResponse?.data as StrapiListResponse<Product>;
};

export const getFeaturedProducts = async () => {
  const response = await getRequest(`/products?filters[featured][$eq]=true&${PRODUCT_POPULATE}&pagination[pageSize]=100`);
  return response?.rawResponse?.data as StrapiListResponse<Product>;
};
