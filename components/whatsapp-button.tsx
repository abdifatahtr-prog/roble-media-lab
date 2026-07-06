import { site } from "@/content/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="26" height="26">
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 01-4.84-1.32l-.35-.2-3.6.94.96-3.5-.23-.36a9.45 9.45 0 01-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.44 9.44 0 012.79 6.72c-.01 5.24-4.28 9.5-9.52 9.5zM20.5 3.5A11.4 11.4 0 0012.05 0C5.75 0 .62 5.13.62 11.43c0 2.01.53 3.98 1.53 5.71L.5 24l6.98-1.83a11.4 11.4 0 005.56 1.42h.01c6.3 0 11.43-5.13 11.43-11.43 0-3.05-1.19-5.92-3.35-8.08z" />
    </svg>
  );
}

// Floating WhatsApp CTA. Renders only when a number is configured in content/site.ts.
export function WhatsAppButton() {
  if (!site.whatsapp) return null;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Roble Media Lab on WhatsApp"
    >
      <WhatsAppIcon />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
