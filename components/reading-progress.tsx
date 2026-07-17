"use client";

import { useEffect, useRef } from "react";

/**
 * Thin progress bar pinned to the top of article pages, filling as the reader
 * scrolls. Width is driven by transform (not width) so it never triggers
 * layout, and updates are batched through requestAnimationFrame. aria-hidden:
 * it is a decorative affordance, not information a screen reader needs.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={barRef} className="reading-progress-bar" />
    </div>
  );
}
