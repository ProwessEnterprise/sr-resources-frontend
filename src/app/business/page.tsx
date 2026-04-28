import { Metadata } from "next";
import BusinessContent from "./BusinessContent";

export const metadata: Metadata = {
  description: "SR Resources business divisions - bulk liquid storage, manufacturing, logistics, international trading, and infrastructure.",
  openGraph: { title: "Business Divisions - SR Resources", description: "Our business divisions and operations." },
};

export default function Business() {
  return <BusinessContent />;
}
