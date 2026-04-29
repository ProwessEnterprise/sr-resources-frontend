import { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Trademarks | SR Resources",
  alternates: { canonical: "/legal/trademarks" },
};

export default function Trademarks() {
  return <LegalPage field="trademark" />;
}
