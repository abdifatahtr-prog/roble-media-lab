// Shim for `next/link`, used only by the design-sync bundle.
//
// The real next/link needs the App Router context, which doesn't exist outside a
// Next app — components importing it would render blank in Claude Design. A plain
// anchor is the honest equivalent: same markup, same classes, same styling.
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | { pathname?: string };
  children?: ReactNode;
  // next-only props, accepted and discarded so callers type-check unchanged
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

export default function Link({
  href,
  children,
  prefetch,
  replace,
  scroll,
  shallow,
  passHref,
  legacyBehavior,
  ...rest
}: LinkProps) {
  const resolved = typeof href === "string" ? href : (href?.pathname ?? "#");
  return (
    <a href={resolved} {...rest}>
      {children}
    </a>
  );
}
