"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { persistUtmsFromUrl } from "@/lib/utm";

// Site-wide, render-nothing capture. Persists any UTM params from the landing URL so
// they survive navigation to the contact form. Re-checks on route change in case the
// visitor arrives on a deep link.
export function UtmCapture() {
  const pathname = usePathname();
  useEffect(() => {
    persistUtmsFromUrl();
  }, [pathname]);
  return null;
}
