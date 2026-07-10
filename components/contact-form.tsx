"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "./icons";
import { Turnstile, type TurnstileHandle } from "./turnstile";
import { trackGenerateLead } from "@/lib/gtag";
import { getUtms } from "@/lib/utm";

const serviceOptions = [
  "AI Automation",
  "Website Development",
  "SEO",
  "AI Content Systems",
  "Consulting",
  "Not Sure Yet"
];
const DEFAULT_SERVICE = "Not Sure Yet";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  const busy = status === "submitting" || status === "success";

  const resetTurnstile = useCallback(() => {
    setToken("");
    turnstileRef.current?.reset();
  }, []);

  const onVerify = useCallback((value: string) => setToken(value), []);
  const onExpire = useCallback(() => setToken(""), []);
  const onTurnstileError = useCallback(() => setToken(""), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return; // prevent duplicate submissions

    const form = event.currentTarget;
    const payload: Record<string, string> = Object.fromEntries(
      new FormData(form).entries()
    ) as Record<string, string>;

    if (turnstileSiteKey && !token) {
      setFormError("Please complete the verification below, then send your message.");
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
      <div className="field">
        <label htmlFor="cf-name">Name</label>
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
          <label htmlFor="cf-email">Email</label>
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
        <label htmlFor="cf-message">What would you like to improve?</label>
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
        />
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
