"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ArrowUpRight, CloseIcon, MenuIcon, SearchIcon } from "./icons";

const links = [
  ["/services", "Services"],
  ["/about", "About"],
  ["/resources", "Resources"],
  ["/blog", "Insights"]
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
          <Link className="button button-small" href={site.bookingPath}>Book a call <ArrowUpRight /></Link>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      <div className={`mobile-nav ${open ? "is-open" : ""}`} id="mobile-navigation">
        <div className="shell">
          {[...links, ["/contact", "Contact"] as const].map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
          <Link className="button" href={site.bookingPath}>Book a discovery call <ArrowUpRight /></Link>
        </div>
      </div>
    </header>
  );
}
