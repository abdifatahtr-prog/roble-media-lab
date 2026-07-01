"use client";

import { useState } from "react";

export function FAQList({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <div className={`faq-item ${open === index ? "is-open" : ""}`} key={question}>
          <h3>
            <button aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
              <span>{question}</span><span className="faq-plus" aria-hidden="true">+</span>
            </button>
          </h3>
          <div className="faq-answer"><div><p>{answer}</p></div></div>
        </div>
      ))}
    </div>
  );
}
