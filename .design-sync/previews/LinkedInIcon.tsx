import { LinkedInIcon } from "roble-media-lab-v2";

// Icons inherit `currentColor` and take any SVG attribute, so size and colour are
// controlled by the surrounding element rather than props of their own.

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 28, padding: 32, color: "var(--ink)" }}>
    <LinkedInIcon width={16} height={16} />
    <LinkedInIcon width={24} height={24} />
    <LinkedInIcon width={40} height={40} />
  </div>
);

// On ink, the accent switches to --teal-light: --teal-dark fails contrast there.
export const OnInk = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: 32,
      background: "var(--ink)",
      color: "var(--teal-light)"
    }}
  >
    <LinkedInIcon width={24} height={24} />
    <LinkedInIcon width={40} height={40} />
  </div>
);
