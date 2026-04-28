import { postRequest } from "./Rest";

export const submitContactInquiry = async (data: {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity: string;
  requirements: string;
}) => {
  return await postRequest("/contact-inquiries", {
    data: {
      full_name: data.fullName,
      company_name: data.companyName,
      email: data.email,
      phone: data.phone,
      product_interest: data.productInterest,
      quantity: data.quantity,
      requirements: data.requirements,
    },
  });
};

export const submitPartnerInquiry = async (data: {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  business_type: string;
  requirements: string;
}) => {
  return await postRequest("/partner-inquiries", {
    data: {
      full_name: data.full_name,
      company_name: data.company_name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      business_type: data.business_type,
      requirements: data.requirements,
    },
  });
};
