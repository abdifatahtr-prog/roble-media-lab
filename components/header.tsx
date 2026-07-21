"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { SearchItem } from "@/lib/search-index";
import { SearchDialog } from "./search-dialog";
import { ArrowUpRight, CloseIcon, MenuIcon, SearchIcon } from "./icons";

const links = [
  ["/services", "Services"],
  ["/pricing", "Pricing"],
  ["/about", "About"],
  ["/resources", "Resources"],
  ["/blog", "Insights"],
  ["/contact", "Contact"]
] as const;

export function Header({ searchIndex }: { searchIndex: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Cmd/Ctrl+K and "/" open the palette, the two shortcuts people already have
  // in their fingers from GitHub and Cloudflare. "/" is ignored while the user
  // is typing somewhere else, or it would swallow the slash in the contact form.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Escape closes the open mobile menu and returns focus to the toggle, so a
  // keyboard user is never stranded with focus inside a menu they can't dismiss.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // True when the current path matches a nav destination, so we can flag it with
  // aria-current for assistive tech (the underline alone is only a visual cue).
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="shell nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Roble Media Lab home">
          <Image src="/roble-media-lab-icon.svg" width={38} height={38} alt="" priority />
          <span>Roble <b>Media Lab</b></span>
        </Link>
        <div className="desktop-nav">
          {links.map(([href, label]) => (
            <Link className={isActive(href) ? "active" : ""} aria-current={isActive(href) ? "page" : undefined} href={href} key={href}>{label}</Link>
          ))}
          {/* Still a real link to /search: that keeps it working with JS off,
              and keeps cmd/middle-click "open in new tab" behaving like a link.
              The click handler intercepts the plain-click case and opens the
              palette instead. Opening it here, synchronously inside the click,
              is also what lets iOS Safari raise the keyboard — a focus() in an
              effect after a route change does not count as user-initiated. */}
          <Link
            href="/search"
            className="icon-link"
            aria-label="Search"
            aria-keyshortcuts="Meta+K Control+K"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              setSearchOpen(true);
            }}
          >
            <SearchIcon />
          </Link>
          <Link className="button button-small" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
        </div>
        <button ref={menuButtonRef} className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      {/* The closed menu collapses to 0px via grid-template-rows, which hides it
          visually but leaves it in the layout — all seven links stayed focusable
          and were still announced by screen readers, so a keyboard user on a
          phone tabbed into a menu that wasn't open. `inert` takes the whole
          subtree out of the tab order and the accessibility tree without
          touching the open/close animation. */}
      <div className={`mobile-nav ${open ? "is-open" : ""}`} id="mobile-navigation" inert={!open}>
        <div className="shell">
          {links.map(([href, label]) => <Link aria-current={isActive(href) ? "page" : undefined} href={href} key={href}>{label}</Link>)}
          {/* The search icon lives in .desktop-nav, so before this the mobile
              menu had no route into search at all. */}
          <Link
            href="/search"
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              setOpen(false);
              setSearchOpen(true);
            }}
          >
            Search
          </Link>
          <Link className="button" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
        </div>
      </div>
      <SearchDialog index={searchIndex} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
