import type { CSSProperties } from "react";
import { getSnapOffset } from "./snap-points";
import { BOTTOM_SHEET_HEIGHT } from "./stacking";
import type { getStackTransform, SlideValues } from "./stacking";
import type { Side, StacksheetClassNames } from "./types";

// `header` is deprecated (the header bar is gone) and intentionally dropped
// from the resolved shape — nothing applies it anymore.
export type ResolvedClassNames = Required<Omit<StacksheetClassNames, "header">>;
const EMPTY_CLASSNAMES: ResolvedClassNames = {
  backdrop: "",
  panel: "",
};
export const resolveClassNames = (cn?: StacksheetClassNames): ResolvedClassNames => {
  if (!cn) {
    return EMPTY_CLASSNAMES;
  }
  return {
    backdrop: cn.backdrop ?? "",
    panel: cn.panel ?? "",
  };
};
export const buildAriaProps = ({
  ariaLabel,
  hasDescription,
  hasTitle,
  isComposable,
  isModal,
  isTop,
  panelId,
}: {
  ariaLabel: string;
  hasDescription: boolean;
  hasTitle: boolean;
  isComposable: boolean;
  isModal: boolean;
  isTop: boolean;
  panelId: string;
}): Record<string, string | undefined> => {
  if (!isTop) {
    return {};
  }
  const props: Record<string, string | undefined> = { role: "dialog" };
  if (isModal) {
    props["aria-modal"] = "true";
  }
  if (isComposable) {
    // Only reference the title element when a Sheet.Title is actually
    // mounted — otherwise fall back to the sheet's aria-label so the
    // dialog is never left with a dangling aria-labelledby.
    if (hasTitle) {
      props["aria-labelledby"] = `${panelId}-title`;
    } else {
      props["aria-label"] = ariaLabel;
    }
    if (hasDescription) {
      props["aria-describedby"] = `${panelId}-desc`;
    }
  } else {
    props["aria-label"] = ariaLabel;
  }
  return props;
};
export const getDragTransform = (
  side: Side,
  offset: number,
): {
  x?: number;
  y?: number;
} => {
  if (offset === 0) {
    return {};
  }
  switch (side) {
    case "right": {
      return { x: offset };
    }
    case "left": {
      return { x: -offset };
    }
    case "bottom": {
      return { y: offset };
    }
    default: {
      return {};
    }
  }
};
export const VISUAL_TWEEN = {
  duration: 0.25,
  ease: "easeOut" as const,
  type: "tween" as const,
};
const SHADOW_SM = "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 6px 12px 0px rgba(0,0,0,0.06)";
const SHADOW_LG =
  "0px 8px 24px 0px rgba(0,0,0,0.06), 0px 24px 48px 0px rgba(0,0,0,0.04), 0px 48px 96px 0px rgba(0,0,0,0.03)";
export const getShadow = (isNested: boolean): string => (isNested ? SHADOW_SM : SHADOW_LG);

export const buildPanelStyle = (
  panelStyles: CSSProperties,
  isTop: boolean,
  hasPanelClass: boolean,
  isDragging: boolean,
  keyboardInset: number,
  clampHeight: boolean,
): CSSProperties => ({
  ...panelStyles,
  // Lift the sheet above the on-screen keyboard. `bottom` (not the Motion `y`
  // transform) so drag/snap math is untouched. Height is clamped only for
  // non-snap sheets — snap sheets already resize off the shrunk visual viewport.
  ...(keyboardInset > 0
    ? {
        bottom: keyboardInset,
        ...(clampHeight ? { maxHeight: `calc(${BOTTOM_SHEET_HEIGHT} - ${keyboardInset}px)` } : {}),
      }
    : {}),
  pointerEvents: isTop ? "auto" : "none",
  ...(isTop ? {} : { contain: "layout style paint" }),
  ...(isDragging ? { transition: "none" } : {}),
  ...(hasPanelClass
    ? {}
    : {
        background: "var(--background, #fff)",
        borderColor: "var(--border, transparent)",
      }),
});
export const buildPanelTransition = (
  isDragging: boolean,
  isTop: boolean,
  spring: Record<string, unknown>,
  stackSpring: Record<string, unknown>,
) => {
  if (isDragging) {
    return { duration: 0, type: "tween" as const };
  }
  const base = isTop ? spring : stackSpring;
  return { ...base, borderRadius: VISUAL_TWEEN, boxShadow: VISUAL_TWEEN };
};
export const computeSnapYOffset = (
  side: Side,
  snapHeights: number[],
  activeSnapIndex: number,
  measuredHeight: number,
): number => {
  if (side !== "bottom" || snapHeights.length === 0 || measuredHeight <= 0) {
    return 0;
  }
  return getSnapOffset(activeSnapIndex, snapHeights, measuredHeight);
};
export const getBottomSlideDistance = (measuredHeight: number): number => {
  if (measuredHeight > 0) {
    return measuredHeight;
  }
  if (typeof window !== "undefined") {
    return window.innerHeight;
  }
  return 1000;
};
export const resolveSlideFrom = (
  side: Side,
  slideFrom: SlideValues,
  measuredHeight: number,
): SlideValues => {
  if (side !== "bottom") {
    return slideFrom;
  }
  return { y: getBottomSlideDistance(measuredHeight) };
};
export const buildAnimateTarget = (
  slideTarget: SlideValues,
  stackOffset: {
    x?: number;
    y?: number;
  },
  dragOffset: {
    x?: number;
    y?: number;
  },
  transform: ReturnType<typeof getStackTransform>,
  animatedRadius: Record<string, number>,
  transition: Record<string, unknown>,
  snapYOffset: number,
  isTop: boolean,
) => {
  const base = {
    ...slideTarget,
    ...stackOffset,
    ...dragOffset,
    ...animatedRadius,
    boxShadow: getShadow(!isTop),
    opacity: transform.opacity,
    scale: transform.scale,
    transition,
  };
  if (snapYOffset > 0) {
    return { ...base, y: (dragOffset.y ?? 0) + snapYOffset };
  }
  return base;
};
export const getInitialRadius = (side: Side): Record<string, number> => {
  if (side === "bottom") {
    return {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    };
  }
  return { borderRadius: 0 };
};
