import { Metadata } from "next";
import BlogsContent from "./BlogsContent";

export const metadata: Metadata = {
  title: "Blogs | SR Resources",
  description: "SR Resources blog - industry insights, company news, and expert articles on petroleum and energy.",
  alternates: { canonical: "/blogs" },
  openGraph: { title: "Blogs | SR Resources", description: "Industry insights and company news." },
};

export default function Blogs() {
  return <BlogsContent />;
}
