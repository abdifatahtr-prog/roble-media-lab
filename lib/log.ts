// Structured, single-line JSON logging for the contact workflow. Cloudflare Workers
// observability captures console output, so emitting JSON keeps logs queryable.
//
// Sensitive data (name, email, message body, raw IP) is NEVER logged here. Callers
// pass a stable `ref` (enquiry reference) as a correlation id, plus non-identifying
// metadata (booleans, service, UTM source/medium/campaign, status codes).

type LogLevel = "info" | "warn" | "error";
type LogFields = Record<string, unknown>;

function emit(level: LogLevel, event: string, fields: LogFields = {}): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    scope: "contact",
    event,
    ...fields
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, fields?: LogFields) => emit("info", event, fields),
  warn: (event: string, fields?: LogFields) => emit("warn", event, fields),
  error: (event: string, fields?: LogFields) => emit("error", event, fields)
};
