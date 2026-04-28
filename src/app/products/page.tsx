import { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  description: "Explore SR Resources core product portfolio - petroleum products, industrial chemicals, and specialty lubricants.",
  openGraph: { title: "Products - SR Resources", description: "Core product portfolio of petroleum and industrial products." },
};

export default function Products() {
  return <ProductsContent />;
}
