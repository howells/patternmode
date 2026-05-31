/**
 * Duration tokens for animations.
 *
 * Values are in seconds for Framer Motion / motion-react compatibility.
 * Use `durationMs` for millisecond values (e.g., Tailwind CSS, setTimeout).
 *
 * Scale:
 * - instant: No animation (0ms)
 * - quick: Micro-interactions, exits, hovers (120ms)
 * - snappy: Crisp gestures that should feel instantaneous but readable (220ms)
 * - normal: Dialogs, sheets, reveals (250ms)
 * - moderate: Enter animations, page transitions (400ms)
 * - slow: Long-running animations like shimmer (1000ms)
 */
export const durations = {
  instant: 0,
  moderate: 0.4,
  normal: 0.25,
  quick: 0.12,
  slow: 1,
  snappy: 0.22,
} as const;

/** Duration tokens in milliseconds for CSS/Tailwind usage. */
export const durationMs = {
  instant: 0,
  moderate: 400,
  normal: 250,
  quick: 120,
  slow: 1000,
  snappy: 220,
} as const;

export type Duration = keyof typeof durations;
