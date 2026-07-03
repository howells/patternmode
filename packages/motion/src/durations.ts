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

export type Duration = keyof typeof durations;

const toMs = (seconds: number): number => Math.round(seconds * 1000);

/** Duration tokens in milliseconds for CSS/Tailwind usage. Derived from `durations`. */
export const durationMs: Record<Duration, number> = {
  instant: toMs(durations.instant),
  moderate: toMs(durations.moderate),
  normal: toMs(durations.normal),
  quick: toMs(durations.quick),
  slow: toMs(durations.slow),
  snappy: toMs(durations.snappy),
};
