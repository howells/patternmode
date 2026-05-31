import type { Easing } from "motion/react";

export const durations = {
  snappy: 0.22,
  moderate: 0.4,
} as const;

export const easings = {
  customGentle: [0.25, 0.1, 0.12, 1],
  snappy: [0.22, 1, 0.36, 1],
} satisfies Record<string, Easing>;

export const springs = {
  bouncy: { stiffness: 260, damping: 12, mass: 1 },
  natural: { stiffness: 200, damping: 20, mass: 1 },
  snappy: { stiffness: 400, damping: 28, mass: 0.8 },
  stiff: { stiffness: 500, damping: 30, mass: 1 },
} as const;
