import { whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "./icons";

// Floating WhatsApp CTA. Renders only when a number is configured in content/site.ts.
// The click is picked up by <ConversionTracking />, which listens for every wa.me
// link on the page, so there is no handler to wire up here.
export function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Roble Media Lab on WhatsApp"
    >
      <WhatsAppIcon width={26} height={26} />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
