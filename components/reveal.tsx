"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Reveal({ children, className = "", delay = 0 }: PropsWithChildren<{ className?: string; delay?: number }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
