import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight } from "./icons";

/**
 * "About the author" card at the end of every article. The company is the
 * author (posts carry a company byline, per the company-first voice), so this
 * is an about-the-business card: what we do, one line of belief, and a soft
 * route to the next step. Deliberately no fake headshot or invented persona.
 */
export function AuthorBox() {
  return (
    <aside className="author-box" aria-label={`About ${site.name}`}>
      <img src="/roble-media-lab-icon.svg" alt="" width={52} height={52} />
      <div>
        <h2>About {site.name}</h2>
        <p>
          {site.name} helps businesses simplify how they operate, using practical AI, automation, modern websites, and
          business systems that reduce manual work and improve the customer experience.
        </p>
        <p className="author-box-belief">
          We believe businesses don&rsquo;t need more software. They need systems that work together.
        </p>
        <div className="author-box-links">
          <Link className="text-link" href={site.bookingPath}>
            Book a Free Discovery Call <ArrowRight />
          </Link>
          <Link className="text-link" href="/about">
            More about us <ArrowRight />
          </Link>
        </div>
      </div>
    </aside>
  );
}
