import { FAQ, StrapiListResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getFAQs = async () => {
  const response = await getRequest("/frequentlyasked-questions");
  return response?.rawResponse?.data as StrapiListResponse<FAQ>;
};

