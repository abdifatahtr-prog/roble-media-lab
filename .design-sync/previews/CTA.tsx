import { CTA } from "roble-media-lab-v2";

// The closing CTA is full-bleed by design, so it gets no padding frame.

export const Default = () => <CTA />;

// Service pages pass `service`, which opens the WhatsApp chat already on-topic.
export const ForService = () => <CTA service="Automation" />;
