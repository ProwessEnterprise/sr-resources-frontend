import { Category, SubCategory, Group, StrapiListResponse } from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

export const getCategories = async () => {
  const response = await getRequest(
    "/categories?populate[0]=image&populate[1]=sub_categories&populate[2]=sub_categories.groups"
  );
  return response?.rawResponse?.data as StrapiListResponse<Category>;
};

export const getSubCategories = async (categoryDocumentId?: string) => {
  let query = "/sub-categories?populate=groups";
  if (categoryDocumentId) query += `&filters[category][documentId][$eq]=${categoryDocumentId}`;
  const response = await getRequest(query);
  return response?.rawResponse?.data as StrapiListResponse<SubCategory>;
};

export const getGroups = async (subCategoryDocumentId?: string) => {
  let query = "/groups";
  if (subCategoryDocumentId) query += `?filters[sub_category][documentId][$eq]=${subCategoryDocumentId}`;
  const response = await getRequest(query);
  return response?.rawResponse?.data as StrapiListResponse<Group>;
};
