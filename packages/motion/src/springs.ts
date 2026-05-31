/**
 * Spring configuration tokens inspired by iOS animation feel.
 *
 * Physics-based springs use stiffness, damping, and mass.
 * These provide natural, velocity-aware animations.
 *
 * Spring personalities:
 * - soft: Very gentle, slow settle — loaders, radial pickers
 * - subtle: Barely noticeable bounce, professional
 * - natural: Balanced, default choice
 * - playful: Character with bounce
 * - bouncy: Visible bounce, energetic — popovers, hints
 * - snappy: Quick, responsive for interactions
 * - stiff: Very quick, controlled — panels, drawers
 * - swift: Instant, zero overshoot — dropdowns, popovers
 */
export const springs = {
  bouncy: { damping: 12, mass: 1, stiffness: 260, type: "spring" },
  natural: { damping: 20, mass: 1, stiffness: 200, type: "spring" },
  playful: { damping: 15, mass: 1, stiffness: 170, type: "spring" },
  snappy: { damping: 28, mass: 0.8, stiffness: 400, type: "spring" },
  soft: { damping: 18, mass: 1, stiffness: 120, type: "spring" },
  stiff: { damping: 30, mass: 1, stiffness: 500, type: "spring" },
  subtle: { damping: 30, mass: 1, stiffness: 300, type: "spring" },
  swift: { damping: 30, mass: 0.5, stiffness: 500, type: "spring" },
} as const;

export type SpringType = keyof typeof springs;
