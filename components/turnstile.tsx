"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Cloudflare Turnstile widget (explicit render). The script is loaded once and shared.
// Callbacks are read through a ref so the widget is only rendered a single time per
// mount, avoiding duplicate widgets on re-render.

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      // Cloudflare passes the error code as the first argument.
      "error-callback"?: (code?: string) => void;
      "timeout-callback"?: () => void;
      theme?: "auto" | "light" | "dark";
      action?: string;
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

// TEMPORARY diagnostic surface: reports the widget lifecycle (with Cloudflare's
// error code and the elapsed time since render) so a real first-time device can
// reveal why the challenge briefly fails before self-healing. Remove with the
// onDiag wiring once the root cause is confirmed.
export type TurnstileDiagEvent = "verified" | "error" | "expired" | "timeout";

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Turnstile failed to load")));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  // TEMPORARY: lifecycle telemetry, see TurnstileDiagEvent above.
  onDiag?: (event: TurnstileDiagEvent, data: { code?: string; ms?: number }) => void;
}

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { siteKey, onVerify, onExpire, onError, onDiag },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  // Set when render() is called, so each callback can report ms-since-render.
  const renderedAtRef = useRef<number>(0);
  const callbacks = useRef({ onVerify, onExpire, onError, onDiag });
  callbacks.current = { onVerify, onExpire, onError, onDiag };

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  }));

  useEffect(() => {
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current) return;
        renderedAtRef.current = performance.now();
        const elapsed = () => Math.round(performance.now() - renderedAtRef.current);
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action: "contact",
          theme: "auto",
          callback: (token) => {
            callbacks.current.onVerify(token);
            callbacks.current.onDiag?.("verified", { ms: elapsed() });
          },
          "expired-callback": () => {
            callbacks.current.onExpire?.();
            callbacks.current.onDiag?.("expired", { ms: elapsed() });
          },
          "timeout-callback": () => {
            callbacks.current.onExpire?.();
            callbacks.current.onDiag?.("timeout", { ms: elapsed() });
          },
          "error-callback": (code) => {
            callbacks.current.onError?.();
            callbacks.current.onDiag?.("error", { code: code ? String(code) : undefined, ms: elapsed() });
          }
        });
      })
      .catch(() => {
        if (!cancelled) callbacks.current.onError?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget already gone
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div className="cf-turnstile-widget" ref={containerRef} />;
});
