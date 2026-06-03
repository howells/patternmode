"use client";

import { joinClassNames, toCssSize } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { DEFAULT_EDGE_STATE, ScrollFrameContext } from "./scroll-frame-context";
import type {
  ScrollFrameContextValue,
  ScrollFrameEdge,
  ScrollFrameEdgeState,
  ScrollFrameRootProps,
} from "./scroll-frame-types";
import {
  defaultControlAxis,
  getAxisState,
  getPageStep,
  getReducedMotionPreference,
  resolveDragScrollConfig,
  resolveRadixType,
  supportsAxis,
} from "./scroll-frame-utils";

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
  scrollBehavior = getReducedMotionPreference() ? "auto" : "smooth",
  scrollStep = "page",
  style,
  ...props
}: ScrollFrameRootProps) => {
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
  const [edgeState, setEdgeState] = useState<ScrollFrameEdgeState>(DEFAULT_EDGE_STATE);
  const [isDragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const contextRef = useRef<ScrollFrameContextValue | null>(null);
  const resolvedDragScroll = resolveDragScrollConfig(dragScroll);

  const measure = () => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }
    setEdgeState({
      horizontal: getAxisState(node, "horizontal"),
      vertical: getAxisState(node, "vertical"),
    });
  };
  const measureRef = useRef(measure);
  measureRef.current = measure;

  const registerViewport = (node: HTMLDivElement | null) => {
    viewportRef.current = node;
    setViewport(node);
    if (node) {
      queueMicrotask(() => measureRef.current());
    }
  };

  const scrollByStep = (direction: ScrollFrameEdge, axis = defaultControlAxis(axes)) => {
    const node = viewportRef.current;
    if (!node) {
      return;
    }
    let rawStep: number;

    if (typeof scrollStep === "function" && contextRef.current) {
      rawStep = scrollStep(contextRef.current, axis);
    } else if (scrollStep === "page") {
      rawStep = getPageStep(node, axis);
    } else if (typeof scrollStep === "number") {
      rawStep = scrollStep;
    } else {
      rawStep = getPageStep(node, axis);
    }

    const distance = direction === "end" ? rawStep : -rawStep;
    node.scrollBy({
      [axis === "vertical" ? "top" : "left"]: distance,
      behavior: scrollBehavior,
    });
  };

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

  useEffect(() => {
    if (!viewport) {
      return;
    }

    const handleMeasure = () => measureRef.current();
    handleMeasure();
    const ResizeObserverCtor = globalThis.ResizeObserver;
    const resizeObserver = ResizeObserverCtor ? new ResizeObserverCtor(handleMeasure) : null;
    resizeObserver?.observe(viewport);
    viewport.addEventListener("scroll", handleMeasure, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      viewport.removeEventListener("scroll", handleMeasure);
    };
  }, [viewport]);

  const rootStyle = {
    "--patternmode-scrollframe-fade-color": fadeColor,
    "--patternmode-scrollframe-fade-size": toCssSize(fadeSize),
    ...style,
  } as CSSProperties;

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
        data-drag-scroll={resolvedDragScroll ? "true" : undefined}
        data-drag-scroll-cursor={resolvedDragScroll?.cursor ? "true" : undefined}
        data-dragging={isDragging ? "true" : undefined}
        data-scrollbar-visibility={scrollbars}
        data-slot="scrollframe"
        ref={ref}
        role={role ?? (ariaLabel || ariaLabelledBy ? "region" : undefined)}
        style={rootStyle}
        type={resolveRadixType(scrollbars)}
      >
        {children}
      </RadixScrollArea.Root>
    </ScrollFrameContext.Provider>
  );
};
