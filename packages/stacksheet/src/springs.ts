import type { SpringConfig } from "./types";

/**
 * Spring presets inspired by iOS animation feel.
 *
 * - `subtle` — Barely noticeable bounce, professional.
 * - `snappy` — Quick, responsive for interactions.
 * - `stiff` — Very quick, controlled. Panels, drawers. **(default)**
 */
export const springs = {
  snappy: { damping: 28, mass: 0.8, stiffness: 400 },
  stiff: { damping: 40, mass: 1, stiffness: 400 },
  subtle: { damping: 30, mass: 1, stiffness: 300 },
} as const satisfies Record<string, SpringConfig>;

export type SpringPreset = keyof typeof springs;
