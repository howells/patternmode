import type ConfettiFunction from "canvas-confetti";

/**
 * Fire a subtle confetti burst - perfect for success moments.
 * Respects prefers-reduced-motion automatically.
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
