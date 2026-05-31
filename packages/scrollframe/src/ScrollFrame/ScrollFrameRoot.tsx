"use client";

import { joinClassNames, toCssSize } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { DEFAULT_EDGE_STATE, ScrollFrameContext } from "./ScrollFrameContext";
import type {
  ScrollFrameContextValue,
  ScrollFrameEdge,
  ScrollFrameEdgeState,
  ScrollFrameRootProps,
} from "./ScrollFrameTypes";
import {
  defaultControlAxis,
  getAxisState,
  getPageStep,
  getReducedMotionPreference,
  resolveDragScrollConfig,
  resolveRadixType,
  supportsAxis,
} from "./ScrollFrameUtils";

export const ScrollFrameRoot = forwardRef<HTMLDivElement, ScrollFrameRootProps>(
  function ScrollFrameRoot(
    {
      axes = "vertical",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      className,
      controlVisibility = "auto",
      dragScroll,
      fadeColor,
      fadeSize,
      role,
      scrollbars = "auto",
      scrollBehavior = getReducedMotionPreference() ? "auto" : "smooth",
      scrollStep = "page",
      style,
      ...props
    },
    ref
  ) {
    const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
    const [edgeState, setEdgeState] =
      useState<ScrollFrameEdgeState>(DEFAULT_EDGE_STATE);
    const [isDragging, setDragging] = useState(false);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const contextRef = useRef<ScrollFrameContextValue | null>(null);
    const resolvedDragScroll = useMemo(
      () => resolveDragScrollConfig(dragScroll),
      [dragScroll]
    );

    const measure = useCallback(() => {
      const node = viewportRef.current;
      if (!node) {
        return;
      }
      setEdgeState({
        horizontal: getAxisState(node, "horizontal"),
        vertical: getAxisState(node, "vertical"),
      });
    }, []);
    const measureRef = useRef(measure);
    measureRef.current = measure;

    const registerViewport = useCallback((node: HTMLDivElement | null) => {
      viewportRef.current = node;
      setViewport(node);
      if (node) {
        queueMicrotask(() => measureRef.current());
      }
    }, []);

    const scrollByStep = useCallback(
      (direction: ScrollFrameEdge, axis = defaultControlAxis(axes)) => {
        const node = viewportRef.current;
        if (!node) {
          return;
        }
        const rawStep =
          typeof scrollStep === "function" && contextRef.current
            ? scrollStep(contextRef.current, axis)
            : scrollStep === "page"
              ? getPageStep(node, axis)
              : scrollStep;
        const distance = direction === "end" ? rawStep : -rawStep;
        node.scrollBy({
          [axis === "vertical" ? "top" : "left"]: distance,
          behavior: scrollBehavior,
        });
      },
      [axes, scrollBehavior, scrollStep]
    );

    const context = useMemo<ScrollFrameContextValue>(
      () => ({
        axes,
        controlVisibility,
        dragScroll: resolvedDragScroll,
        edgeState,
        isDragging,
        registerViewport,
        scrollbars,
        scrollBehavior,
        scrollByStep,
        scrollStep,
        setDragging,
        viewport,
      }),
      [
        axes,
        controlVisibility,
        resolvedDragScroll,
        edgeState,
        isDragging,
        registerViewport,
        scrollbars,
        scrollBehavior,
        scrollByStep,
        scrollStep,
        viewport,
      ]
    );
    contextRef.current = context;

    useEffect(() => {
      if (!viewport) {
        return;
      }

      const handleMeasure = () => measureRef.current();
      handleMeasure();
      const ResizeObserverCtor = globalThis.ResizeObserver;
      const resizeObserver = ResizeObserverCtor
        ? new ResizeObserverCtor(handleMeasure)
        : null;
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
          data-axis-horizontal={
            supportsAxis(axes, "horizontal") ? "true" : "false"
          }
          data-axis-vertical={supportsAxis(axes, "vertical") ? "true" : "false"}
          data-axes={axes}
          data-drag-scroll={resolvedDragScroll ? "true" : undefined}
          data-drag-scroll-cursor={
            resolvedDragScroll?.cursor ? "true" : undefined
          }
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
  }
);
