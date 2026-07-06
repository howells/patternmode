import type { TargetAndTransition, Transition } from "motion/react";
import type { ApertoMediaItem } from "./types";

export interface ApertoRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface ApertoMediaTransition {
  from: ApertoRect;
  item: ApertoMediaItem;
  phase: "opening" | "closing";
  to?: ApertoRect;
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

export const rectTarget = (rect: ApertoRect): TargetAndTransition => ({
  height: rect.height,
  left: rect.left,
  top: rect.top,
  width: rect.width,
});

export const transitionDurationMs = (transition: Transition): number =>
  typeof transition.duration === "number" ? transition.duration * 1000 : 450;
