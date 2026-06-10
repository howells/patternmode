"use client";

import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { MouseEvent } from "react";

import { useScrollFrame } from "./scroll-frame-context";
import type {
  ScrollFrameEdge,
  ScrollFrameEdgeState,
  ScrollFrameMovementControlProps,
} from "./scroll-frame-types";
import { defaultControlAxis } from "./scroll-frame-utils";

const isMovementBlocked = (
  axisState: ScrollFrameEdgeState[keyof ScrollFrameEdgeState],
  direction: ScrollFrameEdge,
) => !axisState.scrollable || (direction === "start" ? axisState.atStart : axisState.atEnd);

const getControlLabel = (label: string | undefined, direction: ScrollFrameEdge) =>
  label ?? (direction === "start" ? "Scroll backward" : "Scroll forward");

const getControlIcon = (direction: ScrollFrameEdge) =>
  direction === "start" ? (
    <ChevronLeft aria-hidden="true" size={16} strokeWidth={2} />
  ) : (
    <ChevronRight aria-hidden="true" size={16} strokeWidth={2} />
  );

const ScrollFrameMovementControl = ({
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
}: ScrollFrameMovementControlProps & { direction: ScrollFrameEdge }) => {
  const { axes, controlVisibility, edgeState, scrollByStep } = useScrollFrame();
  const isAsChild = asChild === true;
  const resolvedAxis = axis ?? defaultControlAxis(axes);
  const resolvedVisibility = visibility ?? controlVisibility;
  const axisState = edgeState[resolvedAxis];
  const movementBlocked = isMovementBlocked(axisState, direction);
  const hidden =
    resolvedVisibility === "hidden" || (resolvedVisibility === "auto" && movementBlocked);
  const controlDisabled = disabled === true || movementBlocked;
  const Comp = isAsChild ? Slot : "button";
  const label = getControlLabel(props["aria-label"], direction);

  if (hidden) {
    return null;
  }

  return (
    <Comp
      {...props}
      aria-disabled={isAsChild && controlDisabled ? true : props["aria-disabled"]}
      aria-label={label}
      className={joinClassNames("patternmode-scrollframe__control", className)}
      data-axis={resolvedAxis}
      data-direction={direction}
      data-slot="scrollframe-control"
      disabled={isAsChild ? undefined : controlDisabled}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && !controlDisabled) {
          scrollByStep(direction, resolvedAxis);
        }
      }}
      type={isAsChild ? undefined : (type ?? "button")}
    >
      {children ?? getControlIcon(direction)}
    </Comp>
  );
};

export const ScrollFramePrevious = (props: ScrollFrameMovementControlProps) => (
  <ScrollFrameMovementControl {...props} direction="start" />
);

export const ScrollFrameNext = (props: ScrollFrameMovementControlProps) => (
  <ScrollFrameMovementControl {...props} direction="end" />
);
