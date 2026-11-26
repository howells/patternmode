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
 *
 * Depth may be fractional while the panels above it move, so every output is
 * continuous in depth: a panel recedes smoothly as a new one slides in over
 * it, and comes forward as the one above is dragged away. Panels beyond
 * renderThreshold stay at the edge position and fade out over the last step.
 */
export const getStackTransform = (depth: number, stacking: StackingConfig): StackTransform => {
  if (depth <= 0) {
    return { borderRadius: 0, offset: 0, opacity: 1, scale: 1 };
  }
  // Clamp visual depth so panels beyond threshold stay at the edge position
  const visualDepth = Math.min(depth, Math.max(0, stacking.renderThreshold - 1));
  const fadeOut = Math.min(1, Math.max(0, stacking.renderThreshold - depth));
  return {
    borderRadius: stacking.radius,
    offset: visualDepth * stacking.offsetStep,
    opacity: Math.max(0, 1 - visualDepth * stacking.opacityStep) * fadeOut,
    scale: Math.max(0.5, 1 - visualDepth * stacking.scaleStep),
  };
};
/** Corner radii for the animate target; side sheets set one radius, bottom sheets set the corners. */
export interface AnimatedBorderRadius {
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
}

/**
 * Border radius values for the animate target.
 * Must be animated (not static CSS) so Motion applies scale correction
 * when panels are scaled. See: https://motion.dev/docs/react-layout-animations#scale-correction
 */
export const getAnimatedBorderRadius = (
  side: Side,
  depth: number,
  stacking: StackingConfig,
): AnimatedBorderRadius => {
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
 * Safe-area insets. They read as 0 unless the page sets
 * `viewport-fit=cover`, so they change nothing for a page that doesn't.
 */
const SAFE_AREA = {
  bottom: "env(safe-area-inset-bottom, 0px)",
  left: "env(safe-area-inset-left, 0px)",
  right: "env(safe-area-inset-right, 0px)",
  top: "env(safe-area-inset-top, 0px)",
} as const;
/**
 * The bottom inset a bottom Sheet's content must clear. The panel runs to the
 * screen's edge and does not pad itself: scrolling content passes under the
 * home indicator, as on iOS, and pads its own end by this much. `Sheet.Body`
 * and the default layout's content already do; a composable Sheet with its
 * own scroller adds `padding-bottom: var(--stacksheet-safe-bottom)` to it.
 */
export const SAFE_BOTTOM = "--stacksheet-safe-bottom";
export const SAFE_BOTTOM_PADDING = `var(${SAFE_BOTTOM}, 0px)`;
const SAFE_BOTTOM_VALUE = { [SAFE_BOTTOM]: SAFE_AREA.bottom };
/** Resting height of a bottom sheet in a contained stack: a share of its container. */
const CONTAINED_BOTTOM_SHEET_HEIGHT = "85%";
/**
 * Positioning styles for a panel, accounting for side, width, and depth.
 * `width` is the Sheet's own side Panel width; it defaults to the stack's.
 * Stacked Panels recede by a px offset and scale from the stack edge, so
 * Panels of different widths stack without further adjustment.
 *
 * A `contained` stack (rendered into a `container`) positions its Panels
 * absolutely within that element, sizes bottom Sheets against its height, and
 * leaves the screen's safe areas alone: they belong to the viewport.
 */
export const getPanelStyles = (
  side: Side,
  config: ResolvedConfig,
  index: number,
  fitted = false,
  width = config.width,
  contained = false,
): CSSProperties => {
  const { maxWidth, zIndex } = config;
  const sheetHeight = contained ? CONTAINED_BOTTOM_SHEET_HEIGHT : BOTTOM_SHEET_HEIGHT;
  const base: CSSProperties = {
    // Inherited: nothing tapped inside a Sheet gets the browser's grey flash.
    // The Sheet's own controls give press feedback with `:active` instead.
    WebkitTapHighlightColor: "transparent",
    display: "flex",
    flexDirection: "column",
    // The panel is focused programmatically on open (to move focus into the
    // dialog); it's not a keyboard tab stop, so suppress the container ring.
    outline: "none",
    position: contained ? "absolute" : "fixed",
    transformOrigin: getTransformOrigin(side),
    willChange: "transform",
    zIndex: zIndex + 10 + index,
  };
  if (side === "bottom") {
    const bottomSheet: CSSProperties = {
      ...base,
      bottom: 0,
      // dvh tracks the dynamic viewport on iOS Safari (accounts for browser chrome).
      // A fitted Sheet takes its content's height, up to the same cap.
      height: fitted ? "auto" : sheetHeight,
      left: 0,
      // borderRadius is animated via Motion's animate prop for scale correction
      maxHeight: sheetHeight,
      right: 0,
    };
    // The surface runs to the bottom edge; its content clears the home
    // indicator itself, so a background it paints reaches the edge too.
    return contained ? bottomSheet : { ...bottomSheet, ...SAFE_BOTTOM_VALUE };
  }
  // Left or right side panel
  // Full-height side panels clear the notch, the home indicator and, in
  // landscape, the sensor housing on their outer edge. All zero on desktop.
  const edge: CSSProperties = side === "right" ? { right: 0 } : { left: 0 };
  if (contained) {
    return { ...base, ...edge, bottom: 0, maxWidth, top: 0, width };
  }
  const safeEdge: CSSProperties =
    side === "right" ? { paddingRight: SAFE_AREA.right } : { paddingLeft: SAFE_AREA.left };
  return {
    ...base,
    ...edge,
    ...safeEdge,
    bottom: 0,
    maxWidth,
    paddingBottom: SAFE_AREA.bottom,
    paddingTop: SAFE_AREA.top,
    top: 0,
    width,
  };
};
