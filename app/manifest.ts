import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Web app manifest. Not for installability so much as identity: one more
// machine-readable declaration that this origin's name is exactly
// "Roble Media Lab", with the same icons used everywhere else.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#f8fafc",
    theme_color: "#0B1020",
    icons: [
      { src: "/roble-media-lab-icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "256x256", type: "image/png" }
    ]
  };
}
