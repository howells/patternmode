import type { TargetAndTransition } from "motion/react";
import type { ApertoMediaItem } from "./types";

export interface ApertoRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

/** A Media Transition clone's flight between two measured rects. */
export interface ApertoMediaTransition {
  from: ApertoRect;
  item: ApertoMediaItem;
  to: ApertoRect;
}

export const rectFromElement = (element: Element | null): ApertoRect | null => {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width,
  };
};

/**
 * The rect the shared element actually flies from/to on the thumbnail side.
 *
 * Thumbnails commonly wrap the media in extra chrome (captions, badges), so
 * measuring the trigger itself would fly the clone from the whole card —
 * visibly distorting the media's aspect in flight. Measure the media instead:
 * an explicit `[data-aperto-media-source]`, else the first `img`/`video`,
 * falling back to the trigger.
 */
export const rectFromTrigger = (trigger: Element | null): ApertoRect | null => {
  if (!trigger) {
    return null;
  }

  const media = trigger.querySelector("[data-aperto-media-source], img, video");
  return rectFromElement(media ?? trigger);
};

const hasArea = (rect: ApertoRect): boolean => rect.width > 0 && rect.height > 0;

/**
 * True when a flight cannot visibly animate in a real browser: either both
 * ends have identical non-zero geometry (so Motion may skip
 * `onAnimationComplete` and strand the transition phase), or one end has area
 * while the other is collapsed/hidden (flying to or from a 0x0 corner).
 * Two 0x0 rects (unlaid-out jsdom) return false so tests still exercise flights.
 */
export const isDegenerateFlight = (from: ApertoRect, to: ApertoRect): boolean => {
  const fromHasArea = hasArea(from);
  const toHasArea = hasArea(to);
  if (fromHasArea !== toHasArea) {
    return true;
  }
  if (!fromHasArea) {
    return false;
  }
  return (
    from.left === to.left &&
    from.top === to.top &&
    from.width === to.width &&
    from.height === to.height
  );
};

export const rectTarget = (rect: ApertoRect): TargetAndTransition => ({
  height: rect.height,
  left: rect.left,
  top: rect.top,
  width: rect.width,
});
