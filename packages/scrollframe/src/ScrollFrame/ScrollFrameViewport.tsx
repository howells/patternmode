"use client";

import { joinClassNames } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { MouseEvent, PointerEvent } from "react";
import { forwardRef, useCallback, useRef } from "react";

import { useScrollFrame } from "./ScrollFrameContext";
import type { ScrollFrameViewportProps } from "./ScrollFrameTypes";
import { isDragScrollIgnored, setRef, supportsAxis } from "./ScrollFrameUtils";

function getDragDistance(
  offset: { x: number; y: number },
  axis: "horizontal" | "vertical" | "both",
): number {
  if (axis === "horizontal") {
    return Math.abs(offset.x);
  }
  if (axis === "vertical") {
    return Math.abs(offset.y);
  }
  return Math.hypot(offset.x, offset.y);
}

function resolveDragAxis(
  offset: { x: number; y: number },
  contextAxes: "vertical" | "horizontal" | "both",
  configAxis: "auto" | "vertical" | "horizontal" | "both",
) {
  if (configAxis !== "auto") {
    return configAxis;
  }
  if (contextAxes !== "both") {
    return contextAxes;
  }
  return Math.abs(offset.x) >= Math.abs(offset.y) ? "horizontal" : "vertical";
}

interface DragScrollSession {
  pointerId: number;
  scrollLeft: number;
  scrollTop: number;
  startX: number;
  startY: number;
}

function clearPageSelection() {
  if (typeof window === "undefined") {
    return;
  }
  window.getSelection()?.removeAllRanges();
}

export const ScrollFrameViewport = forwardRef<
  HTMLDivElement,
  ScrollFrameViewportProps
>(function ScrollFrameViewport(
  {
    children,
    className,
    contentClassName,
    contentStyle,
    viewportRef,
    ...props
  },
  ref,
) {
  const context = useScrollFrame();
  const { axes, dragScroll, registerViewport, setDragging, viewport } = context;
  const sessionRef = useRef<DragScrollSession | null>(null);
  const committedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const assignRef = useCallback(
    (node: HTMLDivElement | null) => {
      registerViewport(node);
      setRef(ref, node);
      setRef(viewportRef, node);
    },
    [ref, registerViewport, viewportRef],
  );

  const endDrag = useCallback(() => {
    if (committedRef.current) {
      setDragging(false);
    }
    sessionRef.current = null;
    committedRef.current = false;
  }, [setDragging]);

  const handlePointerDownCapture = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !(
          dragScroll &&
          viewport &&
          event.button === 0 &&
          !isDragScrollIgnored(event.target, dragScroll.ignoreSelector)
        )
      ) {
        sessionRef.current = null;
        return;
      }

      sessionRef.current = {
        pointerId: event.pointerId,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
        startX: event.clientX,
        startY: event.clientY,
      };
      committedRef.current = false;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [dragScroll, viewport],
  );

  const handlePointerMoveCapture = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const session = sessionRef.current;
      if (
        !(
          dragScroll &&
          viewport &&
          session &&
          event.pointerId === session.pointerId
        )
      ) {
        return;
      }

      const offset = {
        x: event.clientX - session.startX,
        y: event.clientY - session.startY,
      };
      const axis = resolveDragAxis(offset, axes, dragScroll.axis);
      const canScrollHorizontally =
        (axis === "horizontal" || axis === "both") &&
        supportsAxis(axes, "horizontal");
      const canScrollVertically =
        (axis === "vertical" || axis === "both") &&
        supportsAxis(axes, "vertical");
      if (!(canScrollHorizontally || canScrollVertically)) {
        return;
      }

      if (!committedRef.current) {
        if (getDragDistance(offset, axis) < dragScroll.activationDistance) {
          return;
        }
        committedRef.current = true;
        suppressClickRef.current = true;
        setDragging(true);
      }

      clearPageSelection();
      if (canScrollHorizontally) {
        viewport.scrollLeft = session.scrollLeft - offset.x;
      }
      if (canScrollVertically) {
        viewport.scrollTop = session.scrollTop - offset.y;
      }
      event.preventDefault();
    },
    [axes, dragScroll, setDragging, viewport],
  );

  const handlePointerEndCapture = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerId === sessionRef.current?.pointerId) {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }
      endDrag();
    },
    [endDrag],
  );

  const handleClickCapture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!suppressClickRef.current) {
        return;
      }
      suppressClickRef.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  return (
    <RadixScrollArea.Viewport
      {...props}
      className={joinClassNames("patternmode-scrollframe__viewport", className)}
      data-slot="scrollframe-viewport"
      data-testid="scrollframe-viewport"
      ref={assignRef}
    >
      <div
        className={joinClassNames(
          "patternmode-scrollframe__content",
          contentClassName,
        )}
        data-scrollframe-drag-surface={dragScroll ? "" : undefined}
        data-slot="scrollframe-content"
        data-testid="scrollframe-content"
        onClickCapture={handleClickCapture}
        onPointerCancelCapture={handlePointerEndCapture}
        onPointerDownCapture={handlePointerDownCapture}
        onPointerMoveCapture={handlePointerMoveCapture}
        onPointerUpCapture={handlePointerEndCapture}
        style={contentStyle}
      >
        {children}
      </div>
    </RadixScrollArea.Viewport>
  );
});
