import { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use | SR Resources",
  alternates: { canonical: "/legal/terms-of-use" },
};

export default function TermsOfUse() {
  return <LegalPage field="terms_of_use" />;
}
