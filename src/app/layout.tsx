import type { Metadata } from "next";
import { Inter, Manrope, Orbitron } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Box } from "@mui/material";
import { organizationJsonLd } from "@/lib/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337/api";

async function getHeaderData() {
  try {
    const url = new URL(`${API}/header?populate=logo_image`);
    if (!url.href.startsWith(API)) return null;
    const res = await fetch(url.href, { next: { revalidate: 60 } });
    const json = await res.json();
    return json?.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const header = await getHeaderData();
  const API_ROOT = API.replace("/api", "");
  const logoUrl = header?.logo_image?.url ? `${API_ROOT}${header.logo_image.url}` : undefined;
  return {
    metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
    title: "SR Resources",
    description: "SR Resources - Industrial Excellence",
    icons: logoUrl ? { icon: logoUrl } : undefined,
    robots: { index: true, follow: true },
    alternates: SITE_URL ? { canonical: SITE_URL } : undefined,
    openGraph: {
      type: "website",
      siteName: "SR Resources",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const header = await getHeaderData();

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${orbitron.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(header)) }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeRegistry>
          <Header />
          <Box component="main" sx={{ mt: "72px" }}>
            {children}
          </Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
