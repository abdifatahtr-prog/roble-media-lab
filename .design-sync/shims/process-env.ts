// Minimal `process.env` stand-in for the design-sync bundle.
//
// content/site.ts reads process.env.NEXT_PUBLIC_SITE_URL at module scope. In a
// browser `process` is undefined, so the whole bundle IIFE threw before it could
// assign window.RML -- which is why every component failed to render at once.
//
// Imported for side effects as the FIRST import in ds-entry.tsx: ESM evaluates
// imports in source order, so this runs before any component module touches
// process.
declare global {
  // eslint-disable-next-line no-var
  var process: { env: Record<string, string | undefined> } | undefined;
}

globalThis.process ??= { env: {} };
globalThis.process.env ??= {};

// The production URL, so anything deriving canonical links or WhatsApp hrefs
// resolves the same way it does on the live site.
globalThis.process.env.NEXT_PUBLIC_SITE_URL ??= "https://roblemedialab.co.ke";

export {};
