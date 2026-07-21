"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero } from "@/components/page-hero";

export type SearchItem = { title: string; description: string; href: string; type: string };

export function SearchClient({ index }: { index: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus after mount rather than with the HTML autofocus attribute: autofocus is
  // unreliable on client-side navigations (the node is already hydrated when the
  // route changes) and browsers apply it inconsistently. Focusing in an effect
  // means one click on the header search icon lands the caret in the field.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? index.filter((item) => `${item.title} ${item.description} ${item.type}`.toLowerCase().includes(q)) : [];
  }, [query, index]);

  return (
    <>
      <PageHero eyebrow="Search" title="Find what you need.">
        <p>Search our services and practical insights.</p>
      </PageHero>
      <section className="content-section">
        <div className="shell narrow">
          <label htmlFor="site-search" style={{ display: "block", fontWeight: 700, marginBottom: 10 }}>Search the website</label>
          {/* Border #7d8b98 (3.42:1), not --line (1.27:1), so the field boundary
              clears WCAG 1.4.11 non-text contrast like the contact form. */}
          <input ref={inputRef} id="site-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “automation” or “content”" style={{ width: "100%", minHeight: 58, border: "1px solid #7d8b98", borderRadius: 14, padding: "0 18px", background: "white", fontSize: 17 }} />
          {/* Result count is a status message: announced politely without moving
              focus so screen-reader users know the list changed — WCAG 4.1.3. */}
          <p className="sr-only" role="status" aria-live="polite">
            {query ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"} found.` : "No matching pages found.") : ""}
          </p>
          <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
            {query && !results.length && <p>No matching pages found.</p>}
            {results.map((item) => (
              <Link className="plain-card" href={item.href} key={item.href}>
                <span className="eyebrow">{item.type}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
