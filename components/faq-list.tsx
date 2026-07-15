"use client";

import { useState } from "react";

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
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <div className={`faq-item ${open === index ? "is-open" : ""}`} key={question}>
          <Heading>
            <button aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
              <span>{question}</span><span className="faq-plus" aria-hidden="true">+</span>
            </button>
          </Heading>
          <div className="faq-answer"><div><p>{answer}</p></div></div>
        </div>
      ))}
    </div>
  );
}
