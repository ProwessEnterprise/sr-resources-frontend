import { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | SR Resources",
  description: "Join SR Resources - explore career opportunities, company culture, and open positions in the energy industry.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers | SR Resources", description: "Career opportunities at SR Resources." },
};

export default function Careers() {
  return <CareersContent />;
}
