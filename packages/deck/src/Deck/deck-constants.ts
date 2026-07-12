import type { AdvanceDirection } from "../types";

export const DEFAULT_VISIBLE_COUNT = 3;
export const DEFAULT_DISTANCE_THRESHOLD = 0.35;
export const DEFAULT_VELOCITY_THRESHOLD = 500;
export const DEFAULT_PEEK_OFFSET = 16;
export const DEFAULT_SCALE_STEP = 0.045;
export const DEFAULT_ROTATION = 6;
export const DEFAULT_PERSPECTIVE = 1000;
export const DEFAULT_DRAG_ELASTIC = 0.9;
export const DEFAULT_DIRECTIONS: AdvanceDirection[] = ["left", "right"];

/** Card width assumed when the active card cannot be measured (e.g. jsdom). */
export const FALLBACK_CARD_WIDTH = 320;

export const DRAG_TILT_MAX = 15;
export const DRAG_TILT_RAMP = 250;
export const DRAG_INFLUENCE_RAMP = 80;
export const EXIT_ROTATION = 20;
export const BG_RESPONSE_FACTOR = 0.4;
export const BG_RESPONSE_RAMP = 150;

/*
 * Card motion springs.
 *
 * Each is an intentional fork of a nearby `@howells/motion` spring token: Deck
 * tunes stiffness/damping (and omits the token `mass` term, so Motion's default
 * mass of 1 applies) for card weight, so these keep their own numeric values
 * rather than importing a token that would change the rendered feel. Named and
 * hoisted here so the forks are documented and deduplicated in one place.
 */

/** Intentional fork of `springs.snappy` (damping 25 vs 28, no mass 0.8 term): card rotation settle. */
export const CARD_ROTATE_SPRING = { damping: 25, stiffness: 400, type: "spring" } as const;

/** Intentional fork of `springs.subtle` (stiffness 320 vs 300, damping 28 vs 30): default card transform. */
export const CARD_DEFAULT_SPRING = { damping: 28, stiffness: 320, type: "spring" } as const;

/** Intentional fork of `springs.subtle` (stiffness 350 vs 300, damping 28 vs 30): card scale. */
export const CARD_SCALE_SPRING = { damping: 28, stiffness: 350, type: "spring" } as const;

/** Intentional fork of `springs.subtle` (damping 28 vs 30): card vertical settle. */
export const CARD_Y_SPRING = { damping: 28, stiffness: 300, type: "spring" } as const;

/** Intentional fork of `springs.snappy` (damping 32 vs 28, stiffness 280 vs 400, no mass term): fast card exit. */
export const CARD_EXIT_FAST_SPRING = { damping: 32, stiffness: 280, type: "spring" } as const;

/** Intentional fork of `springs.playful` (damping 25 vs 15, stiffness 180 vs 170): slow card exit. */
export const CARD_EXIT_SLOW_SPRING = { damping: 25, stiffness: 180, type: "spring" } as const;
