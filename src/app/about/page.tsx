import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  description: "Learn about SR Resources - our vision, leadership, core businesses, and commitment to industrial excellence.",
  openGraph: { title: "About - SR Resources", description: "Our vision, leadership, and core businesses." },
};

export default function About() {
  return <AboutContent />;
}
