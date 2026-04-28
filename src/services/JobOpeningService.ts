import { JobOpening, StrapiListResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getJobOpenings = async () => {
  const response = await getRequest("/job-openings");
  return response?.rawResponse?.data as StrapiListResponse<JobOpening>;
};

