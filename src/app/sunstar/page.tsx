import { Metadata } from "next";
import SunstarContent from "./SunstarContent";

export const metadata: Metadata = {
  description: "Sunstar by SR Resources - high-performance industrial lubricants and specialty petroleum products.",
  openGraph: { title: "Sunstar - SR Resources", description: "High-performance industrial lubricants." },
};

export default function Sunstar() {
  return <SunstarContent />;
}
