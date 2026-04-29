import { Metadata } from "next";
import BusinessContent from "./BusinessContent";

export const metadata: Metadata = {
  title: "Business Divisions | SR Resources",
  description: "SR Resources business divisions - bulk liquid storage, manufacturing, logistics, international trading, and infrastructure.",
  alternates: { canonical: "/business" },
  openGraph: { title: "Business Divisions | SR Resources", description: "Our business divisions and operations." },
};

export default function Business() {
  return <BusinessContent />;
}
