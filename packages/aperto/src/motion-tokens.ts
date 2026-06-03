import type { Easing } from "motion/react";

export const durations = {
  moderate: 0.4,
  snappy: 0.22,
} as const;

export const easings = {
  customGentle: [0.25, 0.1, 0.12, 1],
  snappy: [0.22, 1, 0.36, 1],
} satisfies Record<string, Easing>;

export const springs = {
  bouncy: { damping: 12, mass: 1, stiffness: 260 },
  natural: { damping: 20, mass: 1, stiffness: 200 },
  snappy: { damping: 28, mass: 0.8, stiffness: 400 },
  stiff: { damping: 30, mass: 1, stiffness: 500 },
} as const;
