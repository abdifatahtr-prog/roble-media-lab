"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";
import { Turnstile, type TurnstileHandle, type TurnstileDiagEvent } from "./turnstile";
import { trackGenerateLead, trackTurnstile } from "@/lib/gtag";
import { getUtms } from "@/lib/utm";
import { services } from "@/content/site";

// Derived from the service list so the enquiry topics can never drift from what
// we actually sell. The value is sent to the CRM as free text.
const serviceOptions = [...services.map((service) => service.title), "Not Sure Yet"];
const DEFAULT_SERVICE = "Not Sure Yet";

// Cloudflare Turnstile site key. Public by design (rendered into the page), so it is
// safe to commit. A NEXT_PUBLIC_TURNSTILE_SITE_KEY env var overrides it if set at build.
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADzXcyuPsmyvAqbn";

type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const turnstileRef = useRef<TurnstileHandle>(null);

  const busy = status === "submitting" || status === "success";

  const resetTurnstile = useCallback(() => {
    setToken("");
    setRetryCount(0);
    turnstileRef.current?.reset();
  }, []);

  const onRetryCheck = useCallback(() => {
    setFormError("");
    setRetryCount((n) => n + 1);
    turnstileRef.current?.reset();
  }, []);

  const onVerify = useCallback((value: string) => {
    setToken(value);
    setRetryCount(0);
  }, []);
  const onExpire = useCallback(() => setToken(""), []);
  const onTurnstileError = useCallback(() => {
    setToken("");
    setRetryCount((n) => {
      const next = n + 1;
      // Auto-retry up to MAX_RETRIES times, then give up and show the error.
      if (next <= MAX_RETRIES) {
        // Reset immediately to let Cloudflare try again. The widget will show
        // "Verifying" while this happens (we hide the error during retries).
        setTimeout(() => turnstileRef.current?.reset(), 100);
      }
      return next;
    });
  }, []);

  // TEMPORARY diagnostic: report each Turnstile lifecycle event to GA4 (for the
  // team's dashboards) and beacon it to D1 (so the exact first-load error code is
  // readable via wrangler). Fire-and-forget; never blocks or surfaces to the user.
  const onDiag = useCallback((event: TurnstileDiagEvent, data: { code?: string; ms?: number }) => {
    trackTurnstile(event, data);
    try {
      const payload = JSON.stringify({ event, code: data.code, ms: data.ms });
      navigator.sendBeacon?.("/api/turnstile-diag", new Blob([payload], { type: "application/json" }));
    } catch {
      // diagnostics must never break the form
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return; // prevent duplicate submissions

    const form = event.currentTarget;
    const payload: Record<string, string> = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    if (turnstileSiteKey && !token) {
      if (retryCount > 0 && retryCount <= MAX_RETRIES) {
        setFormError("Still verifying your security check. Please wait a moment.");
      } else if (retryCount > MAX_RETRIES) {
        setFormError(
          "The security check isn't responding. Please refresh the page and try again, or contact us directly."
        );
      } else {
        setFormError("Please complete the verification below, then send your message.");
      }
      return;
    }

    payload.turnstileToken = token;
    payload.referrer = typeof document !== "undefined" ? document.referrer : "";
    Object.assign(payload, getUtms());

    setStatus("submitting");
    setErrors({});
    setFormError("");

    let res: Response;
    try {
      res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {
      setStatus("idle");
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      resetTurnstile();
      return;
    }

    if (res.ok) {
      setStatus("success");
      trackGenerateLead({
        selected_service: payload.service || DEFAULT_SERVICE,
        page_location: typeof window !== "undefined" ? window.location.href : undefined
      });
      router.push("/thank-you?from=enquiry");
      return;
    }

    const data = (await res.json().catch(() => ({}))) as { errors?: Errors; error?: string };
    setStatus("idle");
    resetTurnstile();
    if (data.errors) {
      setErrors(data.errors);
      setFormError("Please check the highlighted fields and try again.");
    } else {
      setFormError(data.error || "Something went wrong. Please try again, or email us directly.");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {/* Visual key for sighted users. Screen readers already announce each field's
          required state from the input's `required` attribute, so this is aria-hidden. */}
      <p className="form-legend" aria-hidden="true"><span className="req">*</span> Required</p>
      <div className="field">
        <label htmlFor="cf-name">Name <span className="req" aria-hidden="true">*</span></label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={busy}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
        />
        {errors.name && <span className="field-error" id="cf-name-error">{errors.name}</span>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-email">Email <span className="req" aria-hidden="true">*</span></label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={busy}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
          />
          {errors.email && <span className="field-error" id="cf-email-error">{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor="cf-company">Company or website <span className="optional">(optional)</span></label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" disabled={busy} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-service">What can we help with?</label>
        <select id="cf-service" name="service" defaultValue={DEFAULT_SERVICE} disabled={busy}>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">What would you like to improve? <span className="req" aria-hidden="true">*</span></label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          disabled={busy}
          placeholder="Tell us about the workflow, content, or AI idea on your mind. A few lines is plenty."
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message && <span className="field-error" id="cf-message-error">{errors.message}</span>}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. Leave empty. */}
      <div className="field-hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey && (
        <Turnstile
          ref={turnstileRef}
          siteKey={turnstileSiteKey}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onTurnstileError}
          onDiag={onDiag}
        />
      )}

      {/* During auto-retries (retryCount > 0 but <= MAX_RETRIES), show "Verifying"
          to set expectations. Only show the "Try again" button if retries are exhausted. */}
      {retryCount > 0 && retryCount <= MAX_RETRIES && !busy && (
        <p className="turnstile-verifying" role="status" aria-live="polite">
          Verifying your security check…
        </p>
      )}
      {retryCount > MAX_RETRIES && !busy && (
        <p className="turnstile-retry" role="status" aria-live="polite">
          The security check is taking longer than usual. Try refreshing the page, or{" "}
          <button type="button" className="link-button" onClick={onRetryCheck}>
            try again
          </button>
          .
        </p>
      )}

      {formError && <p className="form-error" role="alert">{formError}</p>}

      <div className="form-actions">
        <button className="button" type="submit" disabled={busy} aria-disabled={busy}>
          {status === "submitting" ? "Sending…" : <>Send Message <ArrowRight /></>}
        </button>
        <span className="form-note">We reply within one business day.</span>
      </div>

      {/* Screen-reader-only live region for submission status. */}
      <p className="sr-only" role="status" aria-live="polite">
        {status === "submitting" ? "Sending your message, please wait." : ""}
        {status === "success" ? "Your message has been sent. Redirecting to confirmation." : ""}
      </p>
    </form>
  );
}
