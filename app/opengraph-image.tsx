import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Roble Media Lab: Practical AI & Content Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share image, generated at build time. No static asset to maintain.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #12203a 0%, #0B1020 58%, #123e42 100%)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#14B8A6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#0B1020"
            }}
          >
            R
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 34, fontWeight: 700 }}>
            <span>Roble</span>
            <span style={{ color: "#53d8c8" }}>Media Lab</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Practical AI &amp;
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#53d8c8" }}>
            content systems.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#bdc8d5", maxWidth: 900 }}>
            Clear systems people can actually use, for growing businesses in Kenya &amp; East Africa.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#8f9bad" }}>{site.url.replace("https://", "")}</div>
      </div>
    ),
    { ...size }
  );
}
