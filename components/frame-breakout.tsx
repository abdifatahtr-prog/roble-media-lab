"use client";

import { useEffect } from "react";

// When this page is loaded inside an embed iframe (e.g. Jotform redirects its own
// iframe here after a submission), break out and take over the full browser tab so the
// visitor sees the real, full-page thank-you instead of it squeezed inside the form card.
// Does nothing on a normal top-level visit (booking redirect, direct link, etc.).
export function FrameBreakout() {
  useEffect(() => {
    if (window.top && window.top !== window.self) {
      try {
        window.top.location.replace(window.location.href);
      } catch {
        // Cross-origin top (shouldn't happen for a same-origin redirect) — ignore.
      }
    }
  }, []);
  return null;
}
