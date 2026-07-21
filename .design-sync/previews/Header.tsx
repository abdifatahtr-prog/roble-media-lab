import { Header } from "roble-media-lab-v2";

// .site-header is position:fixed, so it pins to the top of the card viewport.
// The spacer below gives it the page background it normally sits against,
// otherwise the nav floats over an empty white box and reads as broken.
export const Default = () => (
  <div style={{ minHeight: 260, background: "var(--cloud)" }}>
    <Header />
  </div>
);
