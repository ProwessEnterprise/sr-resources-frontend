"use client";

import { useEffect, useState } from "react";
import { getDrivuraPage } from "@/services/PageService";
import { BrandPageData } from "@/interfaces/Strapi";
import BrandPageView from "@/components/BrandPageView/BrandPageView";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function DrivuraContent() {
  const [page, setPage] = useState<BrandPageData | null>(null);

  useEffect(() => {
    getDrivuraPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return <PageLoader />;

  return <BrandPageView page={page} />;
}
