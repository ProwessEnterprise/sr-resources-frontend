import { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Products | SR Resources",
  description: "Explore SR Resources core product portfolio - petroleum products, industrial chemicals, and specialty lubricants.",
  alternates: { canonical: "/products" },
  openGraph: { title: "Products | SR Resources", description: "Core product portfolio of petroleum and industrial products." },
};

export default function Products() {
  return <ProductsContent />;
}
