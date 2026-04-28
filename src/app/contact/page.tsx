import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  description: "Contact SR Resources - request a quote, find office locations, and get in touch with our team.",
  openGraph: { title: "Contact Us - SR Resources", description: "Get in touch with SR Resources." },
};

export default function Contact() {
  return <ContactContent />;
}
