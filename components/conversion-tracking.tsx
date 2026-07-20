"use client";

import { useEffect } from "react";
import { trackCtaClick } from "@/lib/gtag";

/**
 * One delegated listener for every WhatsApp and booking CTA on the site.
 *
 * Why delegation instead of an onClick on each link: those CTAs live in server
 * components (the CTA panel, the hero, the footer, the pricing cards). Adding
 * handlers would mean converting each one to a client component and shipping more
 * JS, and every future CTA would have to remember to wire itself up. A single
 * capture-phase listener on document catches them all, including ones added later,
 * and costs one tiny client component.
 *
 * Fires on mousedown/click of the anchor, not on navigation, so it still records
 * the intent when the click opens WhatsApp in another app and the page never
 * unloads.
 */
export function ConversionTracking() {
  useEffect(() => {
    function zoneOf(el: HTMLElement): string {
      if (el.classList.contains("whatsapp-fab") || el.closest(".whatsapp-fab")) return "floating";
      if (el.closest(".site-header")) return "header";
      if (el.closest(".footer")) return "footer";
      if (el.closest(".site-cta")) return "cta_panel";
      if (el.closest(".price-card")) return "pricing_card";
      if (el.closest(".page-hero, .home-hero")) return "hero";
      return "body";
    }

    function onClick(event: MouseEvent) {
      const el = event.target as HTMLElement | null;
      const link = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const name =
        href.startsWith("https://wa.me/") ? "whatsapp_click"
        : href === "/book" || href.includes("zohobookings.com") ? "book_call_click"
        : null;
      if (!name) return;

      trackCtaClick(name, {
        link_location: zoneOf(link),
        link_text: (link.textContent ?? "").trim().slice(0, 60) || undefined,
        page_path: window.location.pathname,
        // Set by the CTA panel on service pages so we can see which service drove the chat.
        service: link.dataset.service || undefined
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
