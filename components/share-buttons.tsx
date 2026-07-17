"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, FacebookIcon, LinkIcon, LinkedInIcon, XIcon } from "./icons";

/**
 * Share row at the foot of an article. Plain intent links (no SDK scripts —
 * every social embed script is a tracking payload the reader never asked for),
 * plus a copy-link button for WhatsApp/email, which is where sharing actually
 * happens in this market. "Copied" state is announced via aria-live.
 */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const networks = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Icon: LinkedInIcon
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: XIcon
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Icon: FacebookIcon
    }
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (old browser / non-secure context): do nothing
      // rather than claim a copy that did not happen.
    }
  }

  return (
    <div className="share-row">
      <span className="share-label">Share this article</span>
      {networks.map(({ label, href, Icon }) => (
        <a
          key={label}
          className="share-button"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon />
        </a>
      ))}
      <button className="share-button share-button-copy" type="button" onClick={copyLink} aria-live="polite">
        {copied ? <CheckIcon /> : <LinkIcon />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
