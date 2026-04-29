import { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Statement | SR Resources",
  alternates: { canonical: "/legal/privacy-statement" },
};

export default function PrivacyStatement() {
  return <LegalPage field="privacy_statement" />;
}
