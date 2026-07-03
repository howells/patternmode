"use client";

import { joinClassNames } from "@patternmode/system";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { MouseEvent, PointerEvent } from "react";
import { useRef } from "react";

import { useScrollFrame } from "./scroll-frame-context";
import type {
  ScrollFrameContextValue,
  ScrollFrameResolvedDragScrollConfig,
  ScrollFrameViewportProps,
} from "./scroll-frame-types";
import { getMaskVars, isDragScrollIgnored, setRef, supportsAxis } from "./scroll-frame-utils";

const getDragDistance = (
  offset: { x: number; y: number },
  axis: "horizontal" | "vertical" | "both",
): number => {
  if (axis === "horizontal") {
    return Math.abs(offset.x);
  }
  if (axis === "vertical") {
    return Math.abs(offset.y);
  }
  return Math.hypot(offset.x, offset.y);
};

const resolveDragAxis = (
  offset: { x: number; y: number },
  contextAxes: "vertical" | "horizontal" | "both",
  configAxis: "auto" | "vertical" | "horizontal" | "both",
) => {
  if (configAxis !== "auto") {
    return configAxis;
  }
  if (contextAxes !== "both") {
    return contextAxes;
  }
  return Math.abs(offset.x) >= Math.abs(offset.y) ? "horizontal" : "vertical";
};

interface DragScrollSession {
  pointerId: number;
  scrollLeft: number;
  scrollTop: number;
  startX: number;
  startY: number;
}

const clearPageSelection = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.getSelection()?.removeAllRanges();
};

const canStartDrag = (
  event: PointerEvent<HTMLDivElement>,
  dragScroll: ScrollFrameResolvedDragScrollConfig,
) => event.button === 0 && !isDragScrollIgnored(event.target, dragScroll.ignoreSelector);

const useDragScrollHandlers = ({
  axes,
  dragScroll,
  setDragging,
  viewport,
}: Pick<ScrollFrameContextValue, "axes" | "dragScroll" | "setDragging" | "viewport">) => {
  const sessionRef = useRef<DragScrollSession | null>(null);
  const committedRef = useRef(false);
  const suppressClickRef = useRef(false);

  const endDrag = () => {
    if (committedRef.current) {
      setDragging(false);
    }
    sessionRef.current = null;
    committedRef.current = false;
  };

  const handlePointerDownCapture = (event: PointerEvent<HTMLDivElement>) => {
    const activeDragScroll = dragScroll;
    const activeViewport = viewport;
    if (
      activeDragScroll === null ||
      activeViewport === null ||
      !canStartDrag(event, activeDragScroll)
    ) {
      sessionRef.current = null;
      return;
    }

    sessionRef.current = {
      pointerId: event.pointerId,
      scrollLeft: activeViewport.scrollLeft,
      scrollTop: activeViewport.scrollTop,
      startX: event.clientX,
      startY: event.clientY,
    };
    committedRef.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMoveCapture = (event: PointerEvent<HTMLDivElement>) => {
    const session = sessionRef.current;
    if (
      !(
        dragScroll !== null &&
        viewport !== null &&
        session !== null &&
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
      (axis === "horizontal" || axis === "both") && supportsAxis(axes, "horizontal");
    const canScrollVertically =
      (axis === "vertical" || axis === "both") && supportsAxis(axes, "vertical");
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
  };

  const handlePointerEndCapture = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerId === sessionRef.current?.pointerId) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    endDrag();
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) {
      return;
    }
    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    handleClickCapture,
    handlePointerDownCapture,
    handlePointerEndCapture,
    handlePointerMoveCapture,
  };
};

export const ScrollFrameViewport = ({
  children,
  className,
  contentClassName,
  contentStyle,
  ref,
  style,
  viewportRef,
  ...props
}: ScrollFrameViewportProps) => {
  const context = useScrollFrame();
  const { axes, dragScroll, edgeState, fadeMode, fades, registerViewport, setDragging, viewport } =
    context;
  const {
    handleClickCapture,
    handlePointerDownCapture,
    handlePointerEndCapture,
    handlePointerMoveCapture,
  } = useDragScrollHandlers({ axes, dragScroll, setDragging, viewport });
  const assignRef = (node: HTMLDivElement | null) => {
    registerViewport(node);
    setRef(ref, node);
    setRef(viewportRef, node);
  };
  const maskStyle = fadeMode === "mask" ? getMaskVars(axes, edgeState, fades) : undefined;

  return (
    <RadixScrollArea.Viewport
      {...props}
      className={joinClassNames("patternmode-scrollframe__viewport", className)}
      data-fade-mode={fadeMode === "mask" ? "mask" : undefined}
      data-slot="scrollframe-viewport"
      data-testid="scrollframe-viewport"
      ref={assignRef}
      style={maskStyle === undefined ? style : { ...maskStyle, ...style }}
    >
      <div
        className={joinClassNames("patternmode-scrollframe__content", contentClassName)}
        data-scrollframe-drag-surface={dragScroll === null ? undefined : ""}
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
};
