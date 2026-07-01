import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark wordmark-light" href="/">
            <Image src="/roble-media-lab-icon.svg" width={40} height={40} alt="" />
            <span>Roble <b>Media Lab</b></span>
          </Link>
          <p>Clear content systems and practical AI solutions for growing businesses.</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/blog">Insights</Link><Link href="/resources">Resources</Link><Link href="/case-studies">Case studies</Link>
        </div>
        <div>
          <h2>Services</h2>
          {services.slice(0, 5).map((service) => <Link href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}
        </div>
        <div>
          <h2>Start a conversation</h2>
          <p>Tell us what is slowing your team down or making growth harder.</p>
          <a className="footer-cta" href={site.bookingUrl} target="_blank" rel="noreferrer">Book a discovery call <ArrowUpRight /></a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Roble Media Lab.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
