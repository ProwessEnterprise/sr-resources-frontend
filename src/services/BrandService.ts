import { Brand, StrapiListResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getBrands = async () => {
  const response = await getRequest("/brands?populate=image");
  return response?.rawResponse?.data as StrapiListResponse<Brand>;
};

