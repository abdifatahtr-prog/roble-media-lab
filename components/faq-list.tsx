"use client";

import { useId, useState } from "react";

// `headingLevel` keeps the document outline correct in both places this renders:
// on /faq the questions sit directly under the page h1, so they must be h2, while
// on the home page they sit under a section h2 and must be h3.
export function FAQList({
  items,
  headingLevel = 3
}: {
  items: readonly (readonly [string, string])[];
  headingLevel?: 2 | 3;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const Heading = `h${headingLevel}` as "h2" | "h3";
  // Unique per rendered instance so two FAQ lists on one page can't collide.
  const uid = useId();
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const isOpen = open === index;
        const btnId = `${uid}-btn-${index}`;
        const panelId = `${uid}-panel-${index}`;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={question}>
            <Heading>
              <button id={btnId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : index)}>
                <span>{question}</span><span className="faq-plus" aria-hidden="true">+</span>
              </button>
            </Heading>
            {/* aria-labelledby ties the answer back to its question. The answer is
                inert + visually collapsed via CSS when closed, which also removes
                it from the accessibility tree, so aria-expanded and what the
                screen reader can reach stay in sync. */}
            <div className="faq-answer" id={panelId} role="region" aria-labelledby={btnId} inert={!isOpen}><div><p>{answer}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
