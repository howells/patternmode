import type { Ref, RefCallback } from "react";

import type {
  ScrollFrameAxes,
  ScrollFrameAxis,
  ScrollFrameAxisState,
  ScrollFrameDragScrollConfig,
  ScrollFrameEdge,
  ScrollFrameEdgeState,
  ScrollFrameFadeConfig,
  ScrollFrameFadeEdges,
  ScrollFrameResolvedDragScrollConfig,
} from "./scroll-frame-types";

const DEFAULT_DRAG_SCROLL_IGNORE_SELECTOR =
  "input, textarea, select, option, [contenteditable], [data-scrollframe-no-drag]";
const DEFAULT_DRAG_SCROLL_ACTIVATION_DISTANCE = 8;

const isRefCallback = <T>(ref: Ref<T>): ref is RefCallback<T> => typeof ref === "function";

export const setRef = <T>(ref: Ref<T> | undefined, value: T | null): void => {
  if (ref === undefined || ref === null) {
    return;
  }
  if (isRefCallback(ref)) {
    ref(value);
    return;
  }
  ref.current = value;
};

export const supportsAxis = (axes: ScrollFrameAxes, axis: ScrollFrameAxis): boolean =>
  axes === "both" || axes === axis;

export const defaultControlAxis = (axes: ScrollFrameAxes): ScrollFrameAxis =>
  axes === "horizontal" ? "horizontal" : "vertical";

const isDragScrollConfig = (
  dragScroll: boolean | ScrollFrameDragScrollConfig,
): dragScroll is ScrollFrameDragScrollConfig => typeof dragScroll === "object";

export const resolveDragScrollConfig = (
  dragScroll: boolean | ScrollFrameDragScrollConfig | undefined,
): ScrollFrameResolvedDragScrollConfig | null => {
  if (dragScroll === undefined || dragScroll === false) {
    return null;
  }

  const config = isDragScrollConfig(dragScroll) ? dragScroll : {};
  return {
    activationDistance: config.activationDistance ?? DEFAULT_DRAG_SCROLL_ACTIVATION_DISTANCE,
    axis: config.axis ?? "auto",
    cursor: config.cursor ?? true,
    ignoreSelector: config.ignoreSelector ?? DEFAULT_DRAG_SCROLL_IGNORE_SELECTOR,
  };
};

export const isDragScrollIgnored = (
  target: EventTarget | null,
  ignoreSelector: string,
): boolean => {
  if (!(target instanceof Element)) {
    return true;
  }
  if (target instanceof HTMLElement && target.isContentEditable) {
    return true;
  }
  return Boolean(target.closest(ignoreSelector));
};

const normalizeFadeEdges = (
  fadeEdges: ScrollFrameFadeEdges | undefined,
): "none" | "start" | "end" | "both" => {
  if (fadeEdges === undefined || fadeEdges === true) {
    return "both";
  }
  if (fadeEdges === false) {
    return "none";
  }
  return fadeEdges;
};

type ScrollFrameFadeAxes = Partial<Record<ScrollFrameAxis, ScrollFrameFadeEdges>>;

const isFadeAxes = (fades: ScrollFrameFadeConfig): fades is ScrollFrameFadeAxes =>
  typeof fades === "object";

export const shouldRenderFade = (
  fades: ScrollFrameFadeConfig | undefined,
  axis: ScrollFrameAxis,
  edge: ScrollFrameEdge,
): boolean => {
  if (fades === false || fades === "none") {
    return false;
  }
  if (fades !== undefined && isFadeAxes(fades)) {
    const axisEdges = normalizeFadeEdges(fades[axis]);
    return axisEdges === "both" || axisEdges === edge;
  }
  const edges = normalizeFadeEdges(fades);
  return edges === "both" || edges === edge;
};

export interface ScrollFrameMaskVars {
  "--patternmode-scrollframe-mask-bottom": string;
  "--patternmode-scrollframe-mask-left": string;
  "--patternmode-scrollframe-mask-right": string;
  "--patternmode-scrollframe-mask-top": string;
}

const MASK_EDGE_SIZE = "var(--patternmode-scrollframe-fade-size)";

const getMaskEdgeSize = (
  axes: ScrollFrameAxes,
  edgeState: ScrollFrameEdgeState,
  fades: ScrollFrameFadeConfig,
  axis: ScrollFrameAxis,
  edge: ScrollFrameEdge,
): string => {
  if (!supportsAxis(axes, axis) || !shouldRenderFade(fades, axis, edge)) {
    return "0px";
  }
  const state = edgeState[axis];
  const atEdge = edge === "start" ? state.atStart : state.atEnd;
  return state.scrollable && !atEdge ? MASK_EDGE_SIZE : "0px";
};

/**
 * Measured mask-ramp sizes for a viewport in `"mask"` fade mode.
 *
 * Mirrors the painted fades' visibility rules: a ramp collapses to `0px` when
 * its edge is unreachable (axis disabled, edge excluded by `fades`, content
 * not scrollable) or currently rested against.
 */
export const getMaskVars = (
  axes: ScrollFrameAxes,
  edgeState: ScrollFrameEdgeState,
  fades: ScrollFrameFadeConfig,
): ScrollFrameMaskVars => ({
  "--patternmode-scrollframe-mask-bottom": getMaskEdgeSize(
    axes,
    edgeState,
    fades,
    "vertical",
    "end",
  ),
  "--patternmode-scrollframe-mask-left": getMaskEdgeSize(
    axes,
    edgeState,
    fades,
    "horizontal",
    "start",
  ),
  "--patternmode-scrollframe-mask-right": getMaskEdgeSize(
    axes,
    edgeState,
    fades,
    "horizontal",
    "end",
  ),
  "--patternmode-scrollframe-mask-top": getMaskEdgeSize(
    axes,
    edgeState,
    fades,
    "vertical",
    "start",
  ),
});

export const getAxisState = (node: HTMLDivElement, axis: ScrollFrameAxis): ScrollFrameAxisState => {
  const max =
    axis === "vertical"
      ? node.scrollHeight - node.clientHeight
      : node.scrollWidth - node.clientWidth;
  const position = axis === "vertical" ? node.scrollTop : node.scrollLeft;
  const scrollable = max > 1;
  return {
    atEnd: !scrollable || position >= max - 1,
    atStart: position <= 1,
    scrollable,
  };
};

const axisStateEqual = (a: ScrollFrameAxisState, b: ScrollFrameAxisState): boolean =>
  a.atEnd === b.atEnd && a.atStart === b.atStart && a.scrollable === b.scrollable;

/**
 * Structural equality for two edge-state snapshots.
 *
 * `getAxisState` allocates a fresh object on every measurement, so a naive
 * `setState(readEdgeState(node))` always changes the reference and forces a
 * render even when nothing moved. Paired with a ResizeObserver — whose callback
 * fires on the very layout changes a render can cause — that turns into an
 * unbounded render loop (observed with an always-on, centered horizontal
 * scrollbar). Callers gate `setState` on this so identical metrics are a no-op.
 */
export const edgeStateEqual = (a: ScrollFrameEdgeState, b: ScrollFrameEdgeState): boolean =>
  axisStateEqual(a.horizontal, b.horizontal) && axisStateEqual(a.vertical, b.vertical);

export const getPageStep = (node: HTMLDivElement, axis: ScrollFrameAxis): number => {
  const size = axis === "vertical" ? node.clientHeight : node.clientWidth;
  return Math.max(1, size * 0.85);
};
