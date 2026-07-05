import type { CSSProperties } from "react";
import type { ResolvedConfig, Side, StackingConfig } from "./types";

/**
 * Resting height of a bottom sheet. `dvh` tracks the dynamic viewport on iOS
 * Safari (accounts for browser chrome). Shared so the keyboard-inset `calc()`
 * in `buildPanelStyle` can't drift from the panel's base height.
 */
export const BOTTOM_SHEET_HEIGHT = "85dvh";
// ── Depth transforms ────────────────────────────
export interface StackTransform {
  borderRadius: number;
  offset: number;
  opacity: number;
  scale: number;
}
/**
 * Compute visual transforms for a panel at a given depth.
 * depth=0 is the top (foreground) panel.
 * Panels beyond renderThreshold are clamped to the edge position and faded out.
 */
export const getStackTransform = (depth: number, stacking: StackingConfig): StackTransform => {
  if (depth <= 0) {
    return { borderRadius: 0, offset: 0, opacity: 1, scale: 1 };
  }
  const beyondThreshold = depth >= stacking.renderThreshold;
  // Clamp visual depth so panels beyond threshold stay at the edge position
  const visualDepth = beyondThreshold ? stacking.renderThreshold - 1 : depth;
  return {
    borderRadius: stacking.radius,
    offset: visualDepth * stacking.offsetStep,
    opacity: beyondThreshold ? 0 : Math.max(0, 1 - visualDepth * stacking.opacityStep),
    scale: Math.max(0.5, 1 - visualDepth * stacking.scaleStep),
  };
};
/**
 * Border radius values for the animate target.
 * Must be animated (not static CSS) so Motion applies scale correction
 * when panels are scaled. See: https://motion.dev/docs/react-layout-animations#scale-correction
 */
export const getAnimatedBorderRadius = (
  side: Side,
  depth: number,
  stacking: StackingConfig,
): Record<string, number> => {
  if (side === "bottom") {
    const radius = depth > 0 ? stacking.radius : 16;
    return {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    };
  }
  // Left/right panels: stacked panels get uniform radius, top panel gets none
  if (depth > 0) {
    return { borderRadius: stacking.radius };
  }
  return { borderRadius: 0 };
};
// ── Slide directions ────────────────────────────
export interface SlideValues {
  x?: string | number;
  y?: string | number;
}
/** Motion initial/exit values for sliding from the given side. */
export const getSlideFrom = (side: string): SlideValues => {
  switch (side) {
    case "right": {
      return { x: "100%" };
    }
    case "left": {
      return { x: "-100%" };
    }
    case "bottom": {
      return { y: "100%" };
    }
    default: {
      return { x: "100%" };
    }
  }
};
/** Motion animate target — the resting position. */
export const getSlideTarget = (): SlideValues => ({ x: 0, y: 0 });
/** Translate offset that pushes stacked panels away from the stack edge. */
export const getStackOffset = (
  side: string,
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
      return { x: -offset };
    }
    case "left": {
      return { x: offset };
    }
    case "bottom": {
      return { y: -offset };
    }
    default: {
      return {};
    }
  }
};
// ── Transform origin ────────────────────────────
/** Opposite-side origin so stacked panels recede away from the stack edge. */
const getTransformOrigin = (side: Side): string => {
  if (side === "right") {
    return "left center";
  }
  if (side === "left") {
    return "right center";
  }
  return "center top";
};
// ── Panel positioning ───────────────────────────
/**
 * Fixed-position styles for a panel, accounting for side, width, and depth.
 */
export const getPanelStyles = (
  side: Side,
  config: ResolvedConfig,
  index: number,
): CSSProperties => {
  const { width, maxWidth, zIndex } = config;
  const base: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    // The panel is focused programmatically on open (to move focus into the
    // dialog); it's not a keyboard tab stop, so suppress the container ring.
    outline: "none",
    position: "fixed",
    transformOrigin: getTransformOrigin(side),
    willChange: "transform",
    zIndex: zIndex + 10 + index,
  };
  if (side === "bottom") {
    return {
      ...base,
      bottom: 0,
      // dvh tracks the dynamic viewport on iOS Safari (accounts for browser chrome).
      height: BOTTOM_SHEET_HEIGHT,
      left: 0,
      // borderRadius is animated via Motion's animate prop for scale correction
      maxHeight: BOTTOM_SHEET_HEIGHT,
      right: 0,
    };
  }
  // Left or right side panel
  const sideStyles: CSSProperties =
    side === "right" ? { bottom: 0, right: 0, top: 0 } : { bottom: 0, left: 0, top: 0 };
  return {
    ...base,
    ...sideStyles,
    maxWidth,
    width,
  };
};
