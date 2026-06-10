"use client";

import { joinClassNames, toCssSize } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";

import { DEFAULT_EDGE_STATE, ScrollFrameContext } from "./scroll-frame-context";
import type {
  ScrollFrameAxis,
  ScrollFrameAxes,
  ScrollFrameContextValue,
  ScrollFrameEdge,
  ScrollFrameEdgeState,
  ScrollFrameRootProps,
  ScrollFrameScrollBehavior,
  ScrollFrameScrollStep,
} from "./scroll-frame-types";
import {
  defaultControlAxis,
  edgeStateEqual,
  getAxisState,
  getPageStep,
  getReducedMotionPreference,
  resolveDragScrollConfig,
  resolveRadixType,
  supportsAxis,
} from "./scroll-frame-utils";

type ScrollFrameRootStyle = CSSProperties & {
  "--patternmode-scrollframe-fade-color"?: string;
  "--patternmode-scrollframe-fade-size"?: string;
};

const getDefaultScrollBehavior = (): ScrollFrameScrollBehavior =>
  getReducedMotionPreference() ? "auto" : "smooth";

const readEdgeState = (node: HTMLDivElement): ScrollFrameEdgeState => ({
  horizontal: getAxisState(node, "horizontal"),
  vertical: getAxisState(node, "vertical"),
});

const resolveScrollDistance = (
  node: HTMLDivElement,
  scrollStep: ScrollFrameScrollStep,
  context: ScrollFrameContextValue | null,
  axis: ScrollFrameAxis,
) => {
  if (typeof scrollStep === "number") {
    return scrollStep;
  }
  if (typeof scrollStep === "function" && context !== null) {
    return scrollStep(context, axis);
  }
  return getPageStep(node, axis);
};

const getRootRole = (
  role: ScrollFrameRootProps["role"],
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
) => {
  const hasRegionLabel =
    (ariaLabel !== undefined && ariaLabel !== "") ||
    (ariaLabelledBy !== undefined && ariaLabelledBy !== "");
  return role ?? (hasRegionLabel ? "region" : undefined);
};

const getRootStyle = (
  fadeColor: ScrollFrameRootProps["fadeColor"],
  fadeSize: ScrollFrameRootProps["fadeSize"],
  style: ScrollFrameRootProps["style"],
): ScrollFrameRootStyle => ({
  "--patternmode-scrollframe-fade-color": fadeColor,
  "--patternmode-scrollframe-fade-size": toCssSize(fadeSize),
  ...style,
});

const useMeasuredViewport = () => {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [edgeState, setEdgeState] = useState<ScrollFrameEdgeState>(DEFAULT_EDGE_STATE);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const measure = () => {
    const node = viewportRef.current;
    if (node === null) {
      return;
    }
    // Bail out when the metrics are unchanged. `readEdgeState` allocates a
    // fresh object every call, so a plain `setEdgeState(readEdgeState(node))`
    // always changes the reference and forces a render — and because the
    // ResizeObserver fires on the very layout changes a render can cause, that
    // turns into an unbounded loop (seen with an always-on, centered horizontal
    // scrollbar pegging the renderer at 100% CPU). Returning the previous
    // reference lets React skip the render and break the cycle.
    const next = readEdgeState(node);
    setEdgeState((previous) => (edgeStateEqual(previous, next) ? previous : next));
  };
  const measureRef = useRef(measure);
  measureRef.current = measure;

  const registerViewport = (node: HTMLDivElement | null) => {
    viewportRef.current = node;
    setViewport(node);
    if (node !== null) {
      queueMicrotask(() => {
        measureRef.current();
      });
    }
  };

  useEffect(() => {
    const cleanupMeasure = measureRef.current;
    if (viewport === null) {
      return () => {
        cleanupMeasure();
      };
    }

    const handleMeasure = () => {
      measureRef.current();
    };
    handleMeasure();
    const ResizeObserverCtor = globalThis.ResizeObserver;
    const resizeObserver =
      ResizeObserverCtor === undefined ? null : new ResizeObserverCtor(handleMeasure);
    resizeObserver?.observe(viewport);
    viewport.addEventListener("scroll", handleMeasure, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      viewport.removeEventListener("scroll", handleMeasure);
    };
  }, [viewport]);

  return { edgeState, registerViewport, viewport, viewportRef };
};

const useScrollByStep =
  (
    axes: ScrollFrameAxes,
    scrollBehavior: ScrollFrameScrollBehavior,
    scrollStep: ScrollFrameScrollStep,
    viewportRef: RefObject<HTMLDivElement | null>,
    contextRef: RefObject<ScrollFrameContextValue | null>,
  ) =>
  (direction: ScrollFrameEdge, axis = defaultControlAxis(axes)) => {
    const node = viewportRef.current;
    if (node === null) {
      return;
    }
    const rawStep = resolveScrollDistance(node, scrollStep, contextRef.current, axis);
    const distance = direction === "end" ? rawStep : -rawStep;
    node.scrollBy({
      [axis === "vertical" ? "top" : "left"]: distance,
      behavior: scrollBehavior,
    });
  };

export const ScrollFrameRoot = ({
  axes = "vertical",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  controlVisibility = "auto",
  dragScroll,
  fadeColor,
  fadeSize,
  ref,
  role,
  scrollbars = "auto",
  scrollBehavior = getDefaultScrollBehavior(),
  scrollStep = "page",
  style,
  ...props
}: ScrollFrameRootProps) => {
  const [isDragging, setDragging] = useState(false);
  const { edgeState, registerViewport, viewport, viewportRef } = useMeasuredViewport();
  const contextRef = useRef<ScrollFrameContextValue | null>(null);
  const resolvedDragScroll = resolveDragScrollConfig(dragScroll);
  const scrollByStep = useScrollByStep(axes, scrollBehavior, scrollStep, viewportRef, contextRef);

  const context: ScrollFrameContextValue = {
    axes,
    controlVisibility,
    dragScroll: resolvedDragScroll,
    edgeState,
    isDragging,
    registerViewport,
    scrollBehavior,
    scrollByStep,
    scrollStep,
    scrollbars,
    setDragging,
    viewport,
  };
  contextRef.current = context;
  const rootStyle = getRootStyle(fadeColor, fadeSize, style);

  return (
    <ScrollFrameContext.Provider value={context}>
      <RadixScrollArea.Root
        {...props}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={joinClassNames("patternmode-scrollframe", className)}
        data-axis-horizontal={supportsAxis(axes, "horizontal") ? "true" : "false"}
        data-axis-vertical={supportsAxis(axes, "vertical") ? "true" : "false"}
        data-axes={axes}
        data-drag-scroll={resolvedDragScroll === null ? undefined : "true"}
        data-drag-scroll-cursor={resolvedDragScroll?.cursor === true ? "true" : undefined}
        data-dragging={isDragging ? "true" : undefined}
        data-scrollbar-visibility={scrollbars}
        data-slot="scrollframe"
        ref={ref}
        role={getRootRole(role, ariaLabel, ariaLabelledBy)}
        style={rootStyle}
        type={resolveRadixType(scrollbars)}
      >
        {children}
      </RadixScrollArea.Root>
    </ScrollFrameContext.Provider>
  );
};
