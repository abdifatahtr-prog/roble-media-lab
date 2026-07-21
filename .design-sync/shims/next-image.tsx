// Shim for `next/image`, used only by the design-sync bundle.
//
// Two problems with the real component here: it needs Next's image optimiser
// endpoint, and it resolves `/foo.svg` against a server that doesn't exist in the
// Claude Design runtime. So this renders a plain <img> and swaps any public/ path
// for the inlined data URI in assets.generated.ts — which keeps the logo marks
// visible with no network access at all.
import type { ImgHTMLAttributes } from "react";
import { PUBLIC_ASSETS } from "./assets.generated";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string;
  width?: number | string;
  height?: number | string;
  // next-only props, accepted and discarded so callers type-check unchanged
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  loader?: unknown;
  unoptimized?: boolean;
};

export default function Image({
  src,
  width,
  height,
  priority,
  fill,
  quality,
  placeholder,
  blurDataURL,
  loader,
  unoptimized,
  style,
  ...rest
}: ImageProps) {
  const resolved = PUBLIC_ASSETS[src] ?? src;
  const fillStyle = fill
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", objectFit: "cover" as const }
    : undefined;
  return (
    <img
      src={resolved}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  );
}
