"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-level MotionConfig that respects the user's `prefers-reduced-motion`
 * OS setting. Place once in each app's root layout to cover all animated
 * descendants.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
