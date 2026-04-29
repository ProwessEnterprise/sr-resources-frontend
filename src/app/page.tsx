import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "SR Resources | Petroleum & Industrial Products Supplier",
  description: "SR Resources - Leading petroleum and industrial products supplier with global operations in bulk liquid storage, manufacturing, and international trading.",
  alternates: { canonical: "/" },
  openGraph: { title: "SR Resources | Petroleum & Industrial Products Supplier", description: "Leading petroleum and industrial products supplier." },
};

export default function Home() {
  return <HomeContent />;
}
