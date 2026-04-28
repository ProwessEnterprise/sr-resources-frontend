import { Customer, StrapiListResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getCustomers = async () => {
  const response = await getRequest("/customers?populate[0]=profile_image&populate[1]=logo_image");
  return response?.rawResponse?.data as StrapiListResponse<Customer>;
};

