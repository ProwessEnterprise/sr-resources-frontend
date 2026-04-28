import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  description: "SR Resources - Leading petroleum and industrial products supplier with global operations in bulk liquid storage, manufacturing, and international trading.",
  openGraph: { title: "SR Resources", description: "Leading petroleum and industrial products supplier." },
};

export default function Home() {
  return <HomeContent />;
}
