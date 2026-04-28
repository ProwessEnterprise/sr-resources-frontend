"use client";

import { useEffect, useState } from "react";
import { getSunstarPage } from "@/services/PageService";
import { BrandPageData } from "@/interfaces/Strapi";
import BrandPageView from "@/components/BrandPageView/BrandPageView";

export default function SunstarContent() {
  const [page, setPage] = useState<BrandPageData | null>(null);

  useEffect(() => {
    getSunstarPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return null;

  return <BrandPageView page={page} />;
}
