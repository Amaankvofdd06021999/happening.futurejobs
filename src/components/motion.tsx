import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Shared easing for a calm, confident motion language (matches the brand).
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COMPS = {
  div: motion.div,
  section: motion.section,
  span: motion.span,
  li: motion.li,
} as const;

type Tag = keyof typeof COMPS;

/**
 * Fade + rise into view on scroll. SSR-safe and reduced-motion aware:
 * when the user prefers reduced motion, the element renders statically.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const Comp = (COMPS[as] ?? motion.div) as typeof motion.div;
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
    >
      {children}
    </Comp>
  );
}

/** Reveal on scroll, plus a subtle lift on hover. For cards. */
export function RevealLift({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      whileHover={{ y: -6 }}
    >
      {children}
    </motion.div>
  );
}
