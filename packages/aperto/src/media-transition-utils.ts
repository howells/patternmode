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

export const rectTarget = (rect: ApertoRect): TargetAndTransition => ({
  height: rect.height,
  left: rect.left,
  top: rect.top,
  width: rect.width,
});

export const transitionDurationMs = (transition: Transition): number =>
  typeof transition.duration === "number" ? transition.duration * 1000 : 450;
