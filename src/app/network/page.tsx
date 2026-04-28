import { Metadata } from "next";
import NetworkContent from "./NetworkContent";

export const metadata: Metadata = {
  description: "SR Resources global network - business partners, customer relationships, and partnership opportunities.",
  openGraph: { title: "Network & Partners - SR Resources", description: "Our global network and partnerships." },
};

export default function Network() {
  return <NetworkContent />;
}
