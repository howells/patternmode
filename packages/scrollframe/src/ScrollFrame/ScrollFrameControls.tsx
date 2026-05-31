"use client";

import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MouseEvent } from "react";

import { useScrollFrame } from "./ScrollFrameContext";
import type {
  ScrollFrameEdge,
  ScrollFrameMovementControlProps,
} from "./ScrollFrameTypes";
import { defaultControlAxis } from "./ScrollFrameUtils";

export function ScrollFramePrevious(props: ScrollFrameMovementControlProps) {
  return <ScrollFrameMovementControl {...props} direction="start" />;
}

export function ScrollFrameNext(props: ScrollFrameMovementControlProps) {
  return <ScrollFrameMovementControl {...props} direction="end" />;
}

function ScrollFrameMovementControl({
  asChild,
  axis,
  children,
  className,
  direction,
  disabled,
  onClick,
  type,
  visibility,
  ...props
}: ScrollFrameMovementControlProps & { direction: ScrollFrameEdge }) {
  const { axes, controlVisibility, edgeState, scrollByStep } = useScrollFrame();
  const resolvedAxis = axis ?? defaultControlAxis(axes);
  const resolvedVisibility = visibility ?? controlVisibility;
  const axisState = edgeState[resolvedAxis];
  const movementBlocked =
    !axisState.scrollable ||
    (direction === "start" ? axisState.atStart : axisState.atEnd);
  const hidden =
    resolvedVisibility === "hidden" ||
    (resolvedVisibility === "auto" && movementBlocked);
  const controlDisabled = disabled || movementBlocked;
  const Comp = asChild ? Slot : "button";
  const label =
    props["aria-label"] ??
    (direction === "start" ? "Scroll backward" : "Scroll forward");

  if (hidden) {
    return null;
  }

  return (
    <Comp
      {...props}
      aria-disabled={asChild && controlDisabled ? true : props["aria-disabled"]}
      aria-label={label}
      className={joinClassNames("patternmode-scrollframe__control", className)}
      data-axis={resolvedAxis}
      data-direction={direction}
      data-slot="scrollframe-control"
      disabled={asChild ? undefined : controlDisabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && !controlDisabled) {
          scrollByStep(direction, resolvedAxis);
        }
      }}
      type={asChild ? undefined : (type ?? "button")}
    >
      {children ??
        (direction === "start" ? (
          <ChevronLeft aria-hidden="true" size={16} strokeWidth={2} />
        ) : (
          <ChevronRight aria-hidden="true" size={16} strokeWidth={2} />
        ))}
    </Comp>
  );
}
