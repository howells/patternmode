import type * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithoutRef, Ref } from "react";

import type {
  ScrollFrameAxes,
  ScrollFrameAxis,
  ScrollFrameAxisState,
  ScrollFrameDragScrollConfig,
  ScrollFrameEdge,
  ScrollFrameFadeConfig,
  ScrollFrameFadeEdges,
  ScrollFrameResolvedDragScrollConfig,
  ScrollFrameScrollbarVisibility,
} from "./scroll-frame-types";

const DEFAULT_DRAG_SCROLL_IGNORE_SELECTOR =
  "input, textarea, select, option, [contenteditable], [data-scrollframe-no-drag]";
const DEFAULT_DRAG_SCROLL_ACTIVATION_DISTANCE = 8;

export const setRef = <T>(ref: Ref<T> | undefined, value: T | null): void => {
  if (ref === undefined || ref === null) {
    return;
  }
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
};

export const resolveRadixType = (
  scrollbars: ScrollFrameScrollbarVisibility,
): ComponentPropsWithoutRef<typeof RadixScrollArea.Root>["type"] => {
  if (scrollbars === "hidden") {
    return "always";
  }
  return scrollbars === "auto" ? "scroll" : scrollbars;
};

export const supportsAxis = (axes: ScrollFrameAxes, axis: ScrollFrameAxis): boolean =>
  axes === "both" || axes === axis;

export const defaultControlAxis = (axes: ScrollFrameAxes): ScrollFrameAxis =>
  axes === "horizontal" ? "horizontal" : "vertical";

export const resolveDragScrollConfig = (
  dragScroll: boolean | ScrollFrameDragScrollConfig | undefined,
): ScrollFrameResolvedDragScrollConfig | null => {
  if (dragScroll !== true && typeof dragScroll !== "object") {
    return null;
  }

  const config = typeof dragScroll === "object" ? dragScroll : {};
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

export const shouldRenderFade = (
  fades: ScrollFrameFadeConfig | undefined,
  axis: ScrollFrameAxis,
  edge: ScrollFrameEdge,
): boolean => {
  if (fades === false || fades === "none") {
    return false;
  }
  if (fades !== undefined && typeof fades === "object") {
    const axisEdges = normalizeFadeEdges(fades[axis]);
    return axisEdges === "both" || axisEdges === edge;
  }
  const edges = normalizeFadeEdges(fades);
  return edges === "both" || edges === edge;
};

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

export const getReducedMotionPreference = (): boolean => {
  if (typeof window === "undefined" || window.matchMedia === undefined) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getPageStep = (node: HTMLDivElement, axis: ScrollFrameAxis): number => {
  const size = axis === "vertical" ? node.clientHeight : node.clientWidth;
  return Math.max(1, size * 0.85);
};
