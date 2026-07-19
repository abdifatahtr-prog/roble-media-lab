"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { PropsWithChildren } from "react";

// Reveal can render either a plain container or, when `href` is passed, a
// single navigable card — the whole box becomes one <a> so hover, focus, and
// the click target cover the entire card (see .service-card in globals.css),
// matching the article-card pattern. framer-motion wraps Next's Link so the
// scroll-in animation is preserved on the link form too.
//
// No aria-label prop on purpose: the link's accessible name comes from its
// visible children (heading + copy + cue), which keeps the accessible name a
// superset of the visible text — WCAG 2.5.3 Label in Name.
const MotionLink = motion.create(Link);

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  href?: string;
}>;

export function Reveal({ children, className = "", delay = 0, href }: RevealProps) {
  const reduce = useReducedMotion();
  const motionProps = {
    className,
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  if (href) {
    return (
      <MotionLink href={href} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
}
