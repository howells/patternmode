import type ConfettiFunction from "canvas-confetti";

/**
 * Fire a subtle confetti burst in the brand color palette.
 * Respects prefers-reduced-motion automatically.
 *
 * @param options - Optional configuration
 * @param options.origin - Confetti origin point (0-1 coordinates). Defaults to bottom-right (0.95, 0.85).
 *
 * @example
 * ```ts
 * await fireSuccessConfetti();
 * await fireSuccessConfetti({ origin: { x: 0.5, y: 0.5 } });
 * ```
 */
export async function fireSuccessConfetti(options?: {
  origin?: { x: number; y: number };
}) {
  // Only run in browser
  if (typeof window === "undefined") {
    return;
  }

  // Dynamic import for client-only library
  const confetti: typeof ConfettiFunction = (await import("canvas-confetti"))
    .default;

  // Default origin: bottom-right where toasts appear
  const origin = options?.origin ?? { x: 0.95, y: 0.85 };

  confetti({
    particleCount: 80,
    spread: 55,
    origin,
    colors: [
      "#fdba74", // brand-accent (orange-300)
      "#fff7ed", // brand-soft (orange-50)
      "#fb923c", // orange-400
      "#fed7aa", // orange-200
    ],
    gravity: 0.9,
    scalar: 0.8,
    drift: 0,
    ticks: 150,
    disableForReducedMotion: true,
    zIndex: 9999, // Ensure confetti appears above dialogs/modals
  });
}

/**
 * Fire a subtle emoji confetti burst from a specific origin point.
 * Respects prefers-reduced-motion automatically.
 *
 * @param options - Configuration
 * @param options.emoji - The emoji character to use as confetti particles
 * @param options.origin - Confetti origin point (0-1 coordinates). Defaults to center (0.5, 0.5).
 *
 * @example
 * ```ts
 * await fireEmojiConfetti({ emoji: "🎉" });
 * await fireEmojiConfetti({ emoji: "⭐", origin: { x: 0.5, y: 0.3 } });
 * ```
 */
export async function fireEmojiConfetti(options: {
  emoji: string;
  origin?: { x: number; y: number };
}) {
  if (typeof window === "undefined") {
    return;
  }

  const confetti = (await import("canvas-confetti")).default;
  const scalar = 2;
  const shape = confetti.shapeFromText({ text: options.emoji, scalar });

  const origin = options.origin ?? { x: 0.5, y: 0.5 };

  confetti({
    spread: 55,
    ticks: 160,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 20,
    shapes: [shape],
    scalar: 1.2,
    origin,
    particleCount: 35,
    disableForReducedMotion: true,
    zIndex: 9999,
  });
}
