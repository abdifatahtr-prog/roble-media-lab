"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

// Jotform's inline <script> tags can't run in React/Next, so we load the embed
// handler here instead. The handler listens for the form's postMessage events and
// auto-resizes the iframe to fit its real height (the 700px below is just a starting
// value). This effect also re-runs cleanly on client-side navigation back to /contact.
declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

const HANDLER_SRC = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
const ORIGIN = "https://form.jotform.com";

export function JotformEmbed() {
  const iframeId = `JotFormIFrame-${site.jotformId}`;

  useEffect(() => {
    const run = () => window.jotformEmbedHandler?.(`iframe[id='${iframeId}']`, ORIGIN);

    if (window.jotformEmbedHandler) {
      run();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${HANDLER_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = HANDLER_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", run);
    return () => script?.removeEventListener("load", run);
  }, [iframeId]);

  return (
    <iframe
      id={iframeId}
      title="Client Friction Audit"
      src={`${ORIGIN}/${site.jotformId}`}
      allow="geolocation; microphone; camera; fullscreen; payment"
      scrolling="no"
      style={{ display: "block", minWidth: "100%", maxWidth: "100%", width: "100%", height: 700, border: "none" }}
    />
  );
}
