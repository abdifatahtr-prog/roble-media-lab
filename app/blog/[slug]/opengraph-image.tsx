import { ImageResponse } from "next/og";
import { getPost, getPostSlugs } from "@/lib/blog";
import { site } from "@/content/site";

export const alt = "Roble Media Lab · Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

/**
 * Per-post social-share image, generated at build time (file-based metadata
 * outranks the config-based kind, so this is what WhatsApp/LinkedIn/X show).
 * Same brand panel as the site-wide card in app/opengraph-image.tsx, but
 * carrying the post's own pillar and title, so a shared article no longer
 * shows the generic homepage card.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Insights";
  const pillar = post?.pillarLabel ?? "Insights";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #12203a 0%, #0B1020 58%, #123e42 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#14B8A6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#0B1020"
            }}
          >
            R
          </div>
          <div style={{ display: "flex", gap: 9, fontSize: 30, fontWeight: 700 }}>
            <span>Roble</span>
            <span style={{ color: "#53d8c8" }}>Media Lab</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", color: "#53d8c8" }}>
            {pillar}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: title.length > 55 ? 54 : 64,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              maxWidth: 1020
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25, color: "#8f9bad" }}>
          <span>{site.url.replace("https://", "")}/blog</span>
          {post && <span>{post.readTime}</span>}
        </div>
      </div>
    ),
    { ...size }
  );
}
