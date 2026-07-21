import { Reveal } from "roble-media-lab-v2";

// Reveal starts at opacity 0 and animates in on framer-motion's `whileInView`.
// In the capture browser that combination photographs as an empty card: the page
// clock is frozen (page.clock.setFixedTime) and the intersection that triggers
// the animation doesn't fire reliably across successive story navigations, so
// cells were being screenshotted still at opacity 0.
//
// Reveal already has an honest non-animated path: useReducedMotion() makes it
// render `initial: false`, i.e. its settled state with no animation and no
// intersection dependency. That is exactly what a still image should show.
//
// MotionConfig does NOT work here -- framer-motion's useReducedMotion() reads the
// media query directly rather than the config context -- so the media query
// itself is stubbed, at module scope so it lands before React first renders.
if (typeof window !== "undefined") {
  const real = window.matchMedia?.bind(window);
  window.matchMedia = ((q: string) =>
    /prefers-reduced-motion/.test(q)
      ? {
          matches: true,
          media: q,
          onchange: null,
          addListener() {},
          removeListener() {},
          addEventListener() {},
          removeEventListener() {},
          dispatchEvent: () => false
        }
      : real(q)) as typeof window.matchMedia;
}

const Settled = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 32 }}>{children}</div>
);

export const Default = () => (
  <Settled>
    <Reveal>
      <h2 style={{ fontFamily: "var(--font-sora)", margin: 0 }}>Practical AI for real businesses</h2>
      <p style={{ color: "var(--slate)" }}>
        Content wrapped in Reveal fades and lifts into place as it enters the viewport.
      </p>
    </Reveal>
  </Settled>
);

// `delay` staggers a group so items arrive in sequence rather than together.
export const Staggered = () => (
  <Settled>
    <div style={{ display: "grid", gap: 16 }}>
      {["Discover", "Design", "Deploy"].map((label, i) => (
        <Reveal key={label} delay={i * 0.1}>
          <div
            style={{
              padding: "16px 20px",
              border: "1px solid var(--line)",
              borderRadius: 14,
              background: "var(--white)",
              fontWeight: 600
            }}
          >
            {label}
          </div>
        </Reveal>
      ))}
    </div>
  </Settled>
);

// With `href`, the whole revealed block becomes one link.
export const AsLink = () => (
  <Settled>
    <Reveal href="/services">
      <div style={{ padding: "16px 20px", border: "1px solid var(--line)", borderRadius: 14 }}>
        See what we do <span aria-hidden="true">→</span>
      </div>
    </Reveal>
  </Settled>
);
