import {
  HomePage, AboutPage, ContactPage, ProductPage, BlogPage, CareerPage, NetworkPage, BusinessPage, MediaPage, BrandPageData,
  Header, Footer, Location,
  StrapiSingleResponse, StrapiListResponse,
} from "@/interfaces/Strapi";
import { getRequest } from "./Rest";

// Home Page
export const getHomePage = async () => {
  const response = await getRequest(
    "/home-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=blogs&populate[3]=customer&populate[4]=brands&populate[5]=quesAns&populate[6]=map&populate[7]=company_overview&populate[8]=company_overview.image"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<HomePage>;
};

// About Page
export const getAboutPage = async () => {
  const response = await getRequest(
    "/about-page?populate[0]=chairman_image&populate[1]=herosection&populate[2]=herosection.hero_image&populate[3]=map&populate[4]=vision_future_endeavours&populate[5]=vision_future_endeavours.image&populate[6]=core_businesses&populate[7]=core_businesses.image&populate[8]=brand&populate[9]=core_business&populate[10]=vision"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<AboutPage>;
};

// Contact Page
export const getContactPage = async () => {
  const response = await getRequest(
    "/contact-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=help&populate[3]=help.image&populate[4]=office_locations&populate[5]=map&populate[6]=request_quote&populate[7]=our_strategic"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<ContactPage>;
};

// Product Page
export const getProductPage = async () => {
  const response = await getRequest(
    "/product-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=product&populate[3]=brand&populate[4]=customer&populate[5]=quesAns&populate[6]=cta_section"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<ProductPage>;
};


// Blog Page
export const getBlogPage = async () => {
  const response = await getRequest(
    "/blog-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=blogs&populate[3]=map"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<BlogPage>;
};

// Header
export const getHeader = async () => {
  const response = await getRequest("/header?populate=logo_image");
  return response?.rawResponse?.data as StrapiSingleResponse<Header>;
};

// Footer
export const getFooter = async () => {
  const response = await getRequest("/footer");
  return response?.rawResponse?.data as StrapiSingleResponse<Footer>;
};


// Location
export const getLocations = async () => {
  const response = await getRequest("/locations");
  return response?.rawResponse?.data as StrapiListResponse<Location>;
};

// Career Page
export const getCareerPage = async () => {
  const response = await getRequest(
    "/career-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=resources&populate[3]=resources.image&populate[4]=map&populate[5]=resource&populate[6]=life_at_details&populate[7]=life_at_details.image&populate[8]=office_details&populate[9]=quesAns"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<CareerPage>;
};

// Network Page
export const getNetworkPage = async () => {
  const response = await getRequest(
    "/network-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=customer_we_serve&populate[3]=business_partners&populate[4]=business_partners_images&populate[5]=customer&populate[6]=performance&populate[7]=become_partners"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<NetworkPage>;
};

// Business Page
export const getBusinessPage = async () => {
  const response = await getRequest(
    "/business-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=bulkliquid_storage&populate[3]=bulkliquid_storage.image&populate[4]=manufacturing_blending&populate[5]=manufacturing_blending.image&populate[6]=logistics_transportation&populate[7]=logistics_transportation.image&populate[8]=international_trading&populate[9]=international_trading.image&populate[10]=infrastructure_scale&populate[11]=infrastructure_scale.image&populate[12]=products_stored&populate[13]=products_stored_labels&populate[14]=facilities&populate[15]=facilities_labels&populate[16]=brand&populate[17]=quesAns&populate[18]=cta_section"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<BusinessPage>;
};


// Media Page
export const getMediaPage = async () => {
  const response = await getRequest(
    "/media-page?populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=news&populate[3]=media&populate[4]=profile_image&populate[5]=executive&populate[6]=chairman_image&populate[7]=ceo_image&populate[8]=quesAns&populate[9]=cta_section"
  );
  return response?.rawResponse?.data as StrapiSingleResponse<MediaPage>;
};

// Drivura Page
const BRAND_PAGE_POPULATE = "populate[0]=hero_section&populate[1]=hero_section.hero_image&populate[2]=performance&populate[3]=performance.image&populate[4]=product_category&populate[5]=product_category.image&populate[6]=customer&populate[7]=quesAns&populate[8]=cta_section";

export const getDrivuraPage = async () => {
  const response = await getRequest(`/drivura?${BRAND_PAGE_POPULATE}`);
  return response?.rawResponse?.data as StrapiSingleResponse<BrandPageData>;
};

// Sunstar Page
export const getSunstarPage = async () => {
  const response = await getRequest(`/sunstar?${BRAND_PAGE_POPULATE}`);
  return response?.rawResponse?.data as StrapiSingleResponse<BrandPageData>;
};

