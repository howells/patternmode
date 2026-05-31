import type { TargetAndTransition, Transition } from "motion/react";

export interface ApertoRect {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface ApertoMediaTransition {
  from: ApertoRect;
  item: import("./types").ApertoMediaItem;
  phase: "opening" | "closing";
  to?: ApertoRect;
}

export function rectFromElement(element: Element | null): ApertoRect | null {
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
}

export function rectTarget(rect: ApertoRect): TargetAndTransition {
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width,
  };
}

export function transitionDurationMs(transition: Transition): number {
  return typeof transition.duration === "number"
    ? transition.duration * 1000
    : 450;
}
