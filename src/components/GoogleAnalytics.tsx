"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "../lib/gtag";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // send initial pageview + subsequent client-side navigations
    gtag.pageview(window.location.pathname + window.location.search);
  }, [pathname]);

  return null;
}
