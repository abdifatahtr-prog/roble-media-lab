import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

// Custom renderers for MDX article bodies. Body text is styled by the `.prose`
// wrapper in globals.css; here we only special-case links so internal
// cross-links (the knowledge-library structure) use Next's client router and
// external links open safely in a new tab.
function MdxLink({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: MdxLink
};
