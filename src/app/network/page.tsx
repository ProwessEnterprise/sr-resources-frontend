import { Metadata } from "next";
import NetworkContent from "./NetworkContent";

export const metadata: Metadata = {
  title: "Network & Partners | SR Resources",
  description: "SR Resources global network - business partners, customer relationships, and partnership opportunities.",
  alternates: { canonical: "/network" },
  openGraph: { title: "Network & Partners | SR Resources", description: "Our global network and partnerships." },
};

export default function Network() {
  return <NetworkContent />;
}
