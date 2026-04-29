import { Metadata } from "next";
import DrivuraContent from "./DrivuraContent";

export const metadata: Metadata = {
  title: "Drivura | SR Resources",
  description: "Drivura by SR Resources - premium automotive lubricants and engine oils built for modern engines.",
  alternates: { canonical: "/drivura" },
  openGraph: { title: "Drivura | SR Resources", description: "Premium automotive lubricants and engine oils." },
};

export default function Drivura() {
  return <DrivuraContent />;
}
