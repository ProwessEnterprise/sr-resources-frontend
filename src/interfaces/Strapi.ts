// ============ Strapi Common Types ============
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  } | null;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: StrapiPagination };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// ============ Brand ============
export interface Brand {
  id: number;
  documentId: string;
  label: string;
  title: string;
  description: string;
  buttonName: string;
  image: StrapiImage | null;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Category ============
export interface Category {
  id: number;
  documentId: string;
  name: string;
  description: string;
  image: StrapiImage | null;
  products?: Product[];
  blogs?: Blog[];
  sub_categories?: SubCategory[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Sub Category ============
export interface SubCategory {
  id: number;
  documentId: string;
  name: string;
  category?: Category;
  groups?: Group[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Group ============
export interface Group {
  id: number;
  documentId: string;
  name: string;
  sub_category?: SubCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Product Detail Components ============
export interface OverviewDetail {
  id: number;
  label: string;
  value: string;
}

export interface TechnicalSnapshot {
  id: number;
  label: string;
  value: string;
}

// ============ Product ============
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  tagline: string;
  productCode: string;
  image: StrapiImage | null;
  category?: Category;
  sub_category?: SubCategory;
  product_group?: Group;
  quantityOptions: string;
  productOverview: string;
  overview_details: OverviewDetail[];
  technical_snapshots: TechnicalSnapshot[];
  report: StrapiImage | null;
  primary_button_Text: string;
  secondary_button_Text: string;
  disclaimer: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Blog ============
export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  read_time: string;
  description: any;
  image: StrapiImage | null;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ News ============
export interface News {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  image: StrapiImage | null;
  description: any;
  button_text: string;
  read_time: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Customer ============
export interface Customer {
  id: number;
  documentId: string;
  name: string;
  description: string;
  profile_image: StrapiImage | null;
  logo_image: StrapiImage | null;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ FAQ ============
export interface FAQ {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Reusable Components ============
export interface HeroSectionData {
  id: number;
  hero_tagline: string;
  hero_title: string;
  hero_description: string;
  hero_primarybutton_text: string;
  hero_secondarybutton_text: string;
  hero_image: StrapiImage | null;
}

export interface TitleDescription {
  id: number;
  title: string;
  description: string;
}

export interface MapSection {
  id: number;
  title: string;
  primary_button_text: string;
  secondary_button_text: string;
}

export interface PerformanceMetrics {
  id: number;
  title: string;
  description: string;
  image: StrapiImage | null;
}

// ============ Cards Component ============
export interface CardItem {
  id: number;
  title: string;
  description: string;
  image: StrapiImage | null;
  contact?: string;
}

// ============ Trusted Partners Page ============
export interface TrustedPartnersPage {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: StrapiImage | null;
  stats: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Home Page ============
export interface HomePage {
  id: number;
  documentId: string;
  product_title: string;
  hero_section: HeroSectionData;
  blogs: TitleDescription;
  customer: TitleDescription;
  brands: TitleDescription;
  quesAns: TitleDescription;
  map: MapSection;
  company_overview: PerformanceMetrics;
  company_metrics: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ About Page ============
export interface AboutPage {
  id: number;
  documentId: string;
  chairman_title: string;
  chairman_subtitle: string;
  chairman_quote: string;
  chairman_image: StrapiImage | null;
  intro_label: string;
  intro_title: string;
  intro_description: string;
  herosection: HeroSectionData;
  map: MapSection;
  vision_future_endeavours: CardItem[];
  core_businesses: CardItem[];
  brand: TitleDescription;
  core_business: TitleDescription;
  vision: TitleDescription;
  chairman_metrics: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Contact Page ============
export interface OfficeLocation {
  id: number;
  office_name: string;
  office_address: string;
}

export interface ContactPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  help: CardItem[];
  our_strategic_keypoints: string;
  office_locations: OfficeLocation[];
  map: MapSection;
  request_quote: TitleDescription;
  our_strategic: TitleDescription;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Product Page ============
export interface ProductPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  product: TitleDescription;
  brand: TitleDescription;
  customer: TitleDescription;
  quesAns: TitleDescription;
  cta_section: MapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Blog Page ============
export interface BlogPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  blogs: TitleDescription;
  map: MapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Career Page ============
export interface CareerPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  office_address: string;
  jobs_title: string;
  resources: CardItem[];
  resource: TitleDescription;
  map: MapSection;
  life_at_details: PerformanceMetrics;
  office_details: TitleDescription;
  quesAns: TitleDescription;
  application_form?: TitleDescription;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Network Page ============
export interface NetworkPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  customer_weserve_label: string;
  customer_we_serve: StrapiImage[];
  business_partners: TitleDescription;
  business_partners_images: StrapiImage[];
  customer: TitleDescription;
  performance: MapSection;
  become_partners: TitleDescription;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Job Opening ============
export interface JobOpening {
  id: number;
  documentId: string;
  role: string;
  hrEmail: string;
  type: "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
  experience: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Header ============
export interface Header {
  id: number;
  documentId: string;
  title: string;
  menu_item: any;
  buttonName: string;
  logo_image: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Footer ============
export interface Footer {
  id: number;
  documentId: string;
  title: string;
  description: string;
  footerLinks: any;
  copyright: string;
  terms_of_use: any;
  privacy_statement: any;
  trademark: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Contact Info ============
export interface ContactInfo {
  id: number;
  documentId: string;
  info: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Company Overview ============
export interface CompanyOverview {
  id: number;
  documentId: string;
  title: string;
  description: string;
  imageUrl: StrapiImage | null;
  stats: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Vision ============
export interface Vision {
  id: number;
  documentId: string;
  title: string;
  description: string;
  points: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Location ============
export interface Location {
  id: number;
  documentId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Business Label ============
export interface BusinessLabel {
  id: number;
  label: string;
}

// ============ Business Page ============
export interface BusinessPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  bulkliquid_storage: PerformanceMetrics;
  bulkliquid_storage_keypoints: string;
  manufacturing_blending: PerformanceMetrics;
  manufacturing_blending_keypoints: string;
  logistics_transportation: PerformanceMetrics;
  logistics_transportation_keypoints: string;
  international_trading: PerformanceMetrics;
  international_trading_keypoints: string;
  infrastructure_scale: PerformanceMetrics;
  infrastructure_scale_keypoints: string;
  products_stored: TitleDescription;
  products_stored_labels: BusinessLabel[];
  facilities: TitleDescription;
  facilities_labels: BusinessLabel[];
  brand: TitleDescription;
  quesAns: TitleDescription;
  cta_section: MapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Business ============
export interface Business {
  id: number;
  documentId: string;
  title: string;
  description: string;
  sections: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Media Page ============
export interface MediaPage {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  news: TitleDescription;
  media: TitleDescription;
  person_name: string;
  company_address: string;
  email: string;
  phone_number_one: string;
  phone_number_two: string;
  profile_image: StrapiImage | null;
  executive: TitleDescription;
  chairman_name: string;
  chairman_role: string;
  chairman_profile: any;
  chairman_image: StrapiImage | null;
  ceo_name: string;
  ceo_role: string;
  ceo_profile: any;
  ceo_image: StrapiImage | null;
  quesAns: TitleDescription;
  cta_section: MapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// ============ Brand Page (Drivura / Sunstar) ============
export interface BrandPageData {
  id: number;
  documentId: string;
  hero_section: HeroSectionData;
  performance: PerformanceMetrics;
  performance_matrics: any;
  product_category_title: string;
  product_category: CardItem[];
  product_category_button: string;
  featured_product_title: string;
  customer: TitleDescription;
  quesAns: TitleDescription;
  cta_section: MapSection;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
