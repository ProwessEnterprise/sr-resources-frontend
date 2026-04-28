import { Blog, StrapiListResponse, StrapiSingleResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getBlogs = async () => {
  const response = await getRequest("/blogs?populate[0]=image&populate[1]=category");
  return response?.rawResponse?.data as StrapiListResponse<Blog>;
};

export const getBlog = async (documentId: string) => {
  const response = await getRequest(`/blogs/${documentId}?populate[0]=image&populate[1]=category`);
  return response?.rawResponse?.data as StrapiSingleResponse<Blog>;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await getRequest(`/blogs?filters[slug][$eq]=${slug}&populate[0]=image&populate[1]=category`);
  return response?.rawResponse?.data as StrapiListResponse<Blog>;
};

