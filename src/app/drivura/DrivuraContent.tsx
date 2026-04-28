"use client";

import { useEffect, useState } from "react";
import { getDrivuraPage } from "@/services/PageService";
import { BrandPageData } from "@/interfaces/Strapi";
import BrandPageView from "@/components/BrandPageView/BrandPageView";

export default function DrivuraContent() {
  const [page, setPage] = useState<BrandPageData | null>(null);

  useEffect(() => {
    getDrivuraPage().then((res) => setPage(res?.data));
  }, []);

  if (!page) return null;

  return <BrandPageView page={page} />;
}
