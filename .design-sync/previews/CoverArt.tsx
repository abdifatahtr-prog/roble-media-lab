import { CoverArt } from "roble-media-lab-v2";

// CoverArt is deterministic per slug: every post gets branded artwork with no
// image asset. These are real slugs, so each cell shows a genuinely different
// composition rather than the same art relabelled.
//
// It is always rendered inside .post-cover, which supplies the ink panel the
// strokes are drawn against. On its own the art is near-invisible pale line work
// on white, so the wrapper is part of an honest preview, not decoration.
const Panel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: 24, width: 420 }}>
    <span className="post-cover post-cover-mini has-art" aria-hidden="true">
      <span className="post-cover-art">{children}</span>
    </span>
  </div>
);

export const Automation = () => (
  <Panel>
    <CoverArt slug="whatsapp-is-your-front-desk" />
  </Panel>
);

export const Websites = () => (
  <Panel>
    <CoverArt slug="what-a-business-website-is-for" />
  </Panel>
);

export const CaseStudy = () => (
  <Panel>
    <CoverArt slug="how-we-built-this-site" />
  </Panel>
);
