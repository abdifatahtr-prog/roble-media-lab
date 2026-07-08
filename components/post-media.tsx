"use client";
import { useEffect, useRef, useState } from "react";

// Media components for blog posts, used as JSX inside .mdx files.
// If an image file is missing, they show a tidy "coming" placeholder instead
// of a broken image, so a post reads cleanly while screenshots are still being
// gathered.

function SmartImage({ src, alt, label }: { src: string; alt: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail to load before React hydrates and attaches onError, so
  // the event is missed. On mount, catch any image that already errored.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className="post-img">
      {label && !failed && <span className="post-img-label">{label}</span>}
      {failed ? (
        <div className="post-img-placeholder" role="img" aria-label={alt}>
          <span>{label ? `${label} — screenshot coming` : "Screenshot coming"}</span>
          <small>{alt}</small>
        </div>
      ) : (
        <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="post-figure">
      <SmartImage src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  caption
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  caption?: string;
}) {
  return (
    <figure className="post-figure post-beforeafter">
      <div className="post-beforeafter-grid">
        <SmartImage src={before} alt={beforeAlt} label="Before" />
        <SmartImage src={after} alt={afterAlt} label="After" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
