import type { ReactNode } from "react";

/**
 * Shared page header.
 *
 * `variant="article"` is for blog posts, where the marketing hero's display
 * scale worked against the page: an 88px title filled the first screen on its
 * own. The article variant keeps the same layout and type, just at an editorial
 * size, so a reader lands on the header *and* the opening paragraph.
 */
export function PageHero({
  eyebrow,
  title,
  variant = "page",
  children
}: {
  eyebrow: string;
  title: string;
  variant?: "page" | "article";
  children: ReactNode;
}) {
  return (
    <section className={`page-hero${variant === "article" ? " page-hero-article" : ""}`}>
      <div className="shell page-hero-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="page-lead">{children}</div>
      </div>
    </section>
  );
}
