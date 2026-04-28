import { News, StrapiListResponse, StrapiSingleResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getNewsList = async () => {
  const response = await getRequest("/newses?populate=image&sort=createdAt:desc");
  return response?.rawResponse?.data as StrapiListResponse<News>;
};

export const getNewsBySlug = async (slug: string) => {
  const response = await getRequest(`/newses?filters[slug][$eq]=${slug}&populate=image`);
  return response?.rawResponse?.data as StrapiListResponse<News>;
};
