"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, CloseIcon, MenuIcon, SearchIcon } from "./icons";

const links = [
  ["/services", "Services"],
  ["/pricing", "Pricing"],
  ["/about", "About"],
  ["/resources", "Resources"],
  ["/blog", "Insights"],
  ["/contact", "Contact"]
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="shell nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Roble Media Lab home">
          <Image src="/roble-media-lab-icon.svg" width={38} height={38} alt="" priority />
          <span>Roble <b>Media Lab</b></span>
        </Link>
        <div className="desktop-nav">
          {links.map(([href, label]) => (
            <Link className={pathname.startsWith(href) ? "active" : ""} href={href} key={href}>{label}</Link>
          ))}
          <Link href="/search" className="icon-link" aria-label="Search"><SearchIcon /></Link>
          <Link className="button button-small" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
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
          {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
          <Link className="button" href={site.bookingPath}>Book a Free Discovery Call <ArrowUpRight /></Link>
        </div>
      </div>
    </header>
  );
}
