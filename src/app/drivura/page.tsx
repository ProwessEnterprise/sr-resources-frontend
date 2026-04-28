import { Metadata } from "next";
import DrivuraContent from "./DrivuraContent";

export const metadata: Metadata = {
  description: "Drivura by SR Resources - premium automotive lubricants and engine oils built for modern engines.",
  openGraph: { title: "Drivura - SR Resources", description: "Premium automotive lubricants and engine oils." },
};

export default function Drivura() {
  return <DrivuraContent />;
}
