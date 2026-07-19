"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "./icons";

/**
 * Floating WhatsApp CTA. Renders only when a number is configured in content/site.ts.
 * The click is picked up by <ConversionTracking />, which listens for every wa.me
 * link on the page, so there is no handler to wire up here.
 *
 * It tucks away over the footer's legal strip. Fixed at the bottom-right, it sat
 * directly on top of the Privacy and Terms links — not a near miss, a total
 * cover: hit-testing the centre of both links returned the button itself, so
 * neither was clickable at the bottom of any page.
 *
 * Tucking is scoped to that last strip rather than the whole footer because this
 * is the primary way people start a conversation, and hiding it for the entire
 * footer would cost real chats. By the time the legal line is on screen the
 * reader has passed the closing CTA panel (WhatsApp, primary) and the footer's
 * own "Book a Free Discovery Call", so nothing is lost here.
 *
 * A scroll listener, deliberately not an IntersectionObserver: IO callbacks only
 * run when frames render, which made the state untestable in headless panes and
 * ties a correctness feature (legal links must stay clickable) to compositor
 * timing. One getBoundingClientRect per scroll event on one element is nothing.
 */
export function WhatsAppButton() {
  const href = whatsappHref();
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    if (!href) return;
    const strip = document.querySelector(".footer-bottom");
    if (!strip) return;
    // Same scroll-listener idiom as the header's is-scrolled state. The 96px
    // headroom starts the tuck before the strip reaches the fold, so the two
    // never visibly cross.
    const update = () =>
      setTucked(
        strip.getBoundingClientRect().top <
          (window.innerHeight || document.documentElement.clientHeight) + 96
      );
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [href]);

  if (!href) return null;
  // aria-label leads with the visible "Chat on WhatsApp" text so the accessible
  // name is a superset of it (WCAG 2.5.3 Label in Name). The label can't be
  // dropped in favour of the text alone: the <span> is display:none on mobile,
  // where the label becomes the only accessible name.
  return (
    <a
      className={`whatsapp-fab${tucked ? " is-tucked" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Roble Media Lab"
    >
      <WhatsAppIcon width={26} height={26} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
