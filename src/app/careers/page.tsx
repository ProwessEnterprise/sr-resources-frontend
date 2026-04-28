import { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  description: "Join SR Resources - explore career opportunities, company culture, and open positions in the energy industry.",
  openGraph: { title: "Careers - SR Resources", description: "Career opportunities at SR Resources." },
};

export default function Careers() {
  return <CareersContent />;
}
