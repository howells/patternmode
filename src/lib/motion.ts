import { type Transition } from "motion/react";

/**
 * Apple's standard easing curves
 */
export const easings = {
  standard: [0.4, 0.0, 0.2, 1.0],
  deceleration: [0.0, 0.0, 0.2, 1.0],
  acceleration: [0.4, 0.0, 1.0, 1.0],
  sharp: [0.4, 0.0, 0.6, 1.0],
} as const;

export type EasingName = keyof typeof easings;

/**
 * Get easing array by name
 */
export function getEasing(name: EasingName) {
  return easings[name];
}

/**
 * Create transition with named easing
 */
export function transition(
  easing: EasingName,
  duration: number = 0.3
): Transition {
  return {
    duration,
    ease: easings[easing],
  };
}

/**
 * Spring configuration for magnetic effects
 */
export const springs = {
  magnetic: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 40,
  },
} as const;

export type SpringName = keyof typeof springs;

/**
 * Hook to check for reduced motion preference
 */
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
