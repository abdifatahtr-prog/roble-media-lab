import { serverEnv } from "@/lib/env";
import { log } from "@/lib/log";

// Thin wrapper over Resend's REST API. Uses a plain fetch so it runs on the
// Cloudflare Worker with no SDK. Never throws: returns false when the API key is
// missing or the send fails, so callers can decide how to degrade.

export interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendEmail(args: SendEmailArgs): Promise<boolean> {
  const apiKey = serverEnv("RESEND_API_KEY");
  if (!apiKey) return false;

  const from = serverEnv("CONTACT_FROM_EMAIL") || "Roble Media Lab <website@roblemedialab.co.ke>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
        ...(args.replyTo ? { reply_to: args.replyTo } : {})
      })
    });

    if (!res.ok) {
      log.error("resend_http_error", { status: res.status });
      return false;
    }
    return true;
  } catch (error) {
    log.error("resend_request_threw", { reason: (error as Error)?.message });
    return false;
  }
}
