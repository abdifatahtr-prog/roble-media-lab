import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="page-lead">{children}</div>
      </div>
    </section>
  );
}
