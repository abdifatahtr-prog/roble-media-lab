"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchIndex, type SearchItem } from "@/lib/search-index";
import { SearchIcon } from "./icons";

// A command palette in the GitHub/Cloudflare mould: the search icon opens an
// overlay at the top of the current page instead of navigating to /search, so
// the field is under the cursor rather than a scroll away.
//
// Built on the native <dialog> + showModal(), which is doing a lot of a11y work
// for free and correctly: it traps focus, closes on Escape, marks the rest of
// the page inert for screen readers, and restores focus to whatever was focused
// before it opened. A hand-rolled div would have to reimplement all four.
//
// The field itself follows the ARIA combobox-with-listbox pattern: arrow keys
// move a virtual cursor via aria-activedescendant while real focus stays in the
// input, so the user can keep typing while browsing results.
export function SearchDialog({ index, open, onClose }: { index: SearchItem[]; open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // What had focus when the palette opened, and whether to hand focus back to
  // it when it closes (true for a dismissal, false when we navigated away).
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchIndex(index, query), [index, query]);

  useEffect(() => setActive(0), [query]);

  // The `open` prop is the single source of truth and this effect makes the DOM
  // match it. Deliberately NOT driven by the dialog's own `close` event: that
  // event turned out not to be observable reliably here, and every time it was
  // missed the React state stayed stuck at "open" — which left the page
  // scroll-locked and the header icon dead, because setting state to the value
  // it already held re-ran nothing. Every dismissal calls requestClose().
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      // Remember the opener so focus can go back to it on close. showModal() is
      // supposed to restore focus by itself, but it was observed landing on
      // <body> instead, which drops a keyboard user at the top of the document
      // with no idea where they were — so restore it explicitly below.
      openerRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) dialog.showModal();
      // showModal() focuses the first focusable child, which happens to be the
      // input today. Be explicit anyway: the field is the entire point of
      // opening this, and it should not depend on DOM order staying put.
      inputRef.current?.focus();
      // showModal() does not stop the page underneath from scrolling.
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
      setQuery("");
      setActive(0);
      // Restore focus only when the palette was dismissed. If the user picked a
      // result we have just navigated, and pulling focus back to the header
      // would fight the new page for it.
      if (restoreFocusRef.current) openerRef.current?.focus();
      openerRef.current = null;
      restoreFocusRef.current = true;
    }
  }, [open]);

  // Release the scroll lock if this ever unmounts while open, so a stuck lock
  // can never outlive the component.
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const requestClose = useCallback(() => onClose(), [onClose]);

  // Backdrop click. Bound natively rather than as an onClick on <dialog>,
  // because a click handler on a non-interactive element is a real a11y smell
  // (jsx-a11y flags it): there is no keyboard equivalent of "click the
  // backdrop". Escape is the keyboard path, so this stays mouse-only and never
  // sits in the tab order.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (e: MouseEvent) => { if (e.target === dialog) requestClose(); };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [requestClose]);

  const go = useCallback((href: string) => {
    restoreFocusRef.current = false;
    requestClose();
    router.push(href);
  }, [requestClose, router]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape lives here rather than on the <dialog> because the input is the
    // only focusable thing inside the modal, so it always sees the key first —
    // and a keyboard listener belongs on an interactive element. It is handled
    // explicitly instead of relying on the UA close watcher alone: this is the
    // one dismissal path a keyboard-only user cannot work around if it fails.
    if (e.key === "Escape") {
      e.preventDefault();
      requestClose();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].href);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="search-dialog"
      // Safety net for the case where the browser closes the dialog itself
      // (a real Escape press hitting the UA close watcher): route that back
      // into state so the two can't drift apart.
      onClose={requestClose}
      onCancel={requestClose}
      aria-label="Search the website"
    >
      <div className="search-dialog-panel">
        <div className="search-dialog-field">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-dialog-results"
            aria-activedescendant={results.length ? `search-result-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Search services and insights"
            autoComplete="off"
            placeholder="Search services and insights..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <kbd className="search-dialog-esc">Esc</kbd>
        </div>

        {/* Announced politely so screen-reader users hear the count change
            without focus moving out of the field — WCAG 4.1.3. */}
        <p className="sr-only" role="status" aria-live="polite">
          {query ? (results.length ? `${results.length} result${results.length === 1 ? "" : "s"} found.` : "No matching pages found.") : ""}
        </p>

        {/* Each result is a real <a>, not a div with a click handler. That makes
            it activatable by any input method for free, and lets cmd/middle-click
            open a result in a new tab the way a search result should.
            tabIndex={-1} keeps them out of the tab order, because this is the
            combobox pattern: real focus stays in the input and the arrow keys
            move aria-activedescendant instead. */}
        <div className="search-dialog-results" id="search-dialog-results" role="listbox" aria-label="Search results">
          {results.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              id={`search-result-${i}`}
              role="option"
              aria-selected={i === active}
              tabIndex={-1}
              className={i === active ? "is-active" : ""}
              onMouseEnter={() => setActive(i)}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                go(item.href);
              }}
            >
              <span className="search-dialog-type">{item.type}</span>
              <span className="search-dialog-title">{item.title}</span>
              <span className="search-dialog-desc">{item.description}</span>
            </Link>
          ))}
        </div>

        {query && !results.length && <p className="search-dialog-empty">No matching pages found.</p>}

        <div className="search-dialog-hints" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>esc</kbd> to close</span>
        </div>
      </div>
    </dialog>
  );
}
