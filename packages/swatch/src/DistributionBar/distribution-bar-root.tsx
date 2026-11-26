import { deriveDistribution, joinClassNames, sanitizeWeight } from "@patternmode/system";
import type { HTMLAttributes, KeyboardEvent, PointerEvent } from "react";
import { useRef, useState } from "react";
import {
  deriveSegmentDistribution,
  getDistributionTotal,
  moveDistributionBoundary,
} from "../Distribution/distribution-math";
import type { DistributionSegment } from "../Distribution/distribution-math";
import {
  DistributionSegmentLegend,
  DistributionSegments,
} from "../Distribution/distribution-parts";

export interface DistributionBarProps extends Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  "onChange"
> {
  /**
   * Show the per-segment legend below the bar, or hide it.
   *
   * Default `"segments"`.
   */
  legend?: "segments" | false;
  /**
   * Minimum weight each side of a dragged boundary must retain.
   *
   * Default `4`.
   */
  minValue?: number;
  /** Receives the full next segment list after drag or keyboard boundary moves. */
  onChange?: (segments: DistributionSegment[]) => void;
  /** Weighted segments; displayed percentages are derived from their total. */
  segments: DistributionSegment[];
  /**
   * Keyboard adjustment amount for boundary handles.
   *
   * Default `1`.
   */
  step?: number;
}

interface DistributionBarHandleProps {
  "aria-label": string;
  "aria-valuenow": number;
  "aria-valuetext": string;
  boundaryPercent: number;
  onDrag: (deltaX: number) => void;
  onDragEnd: (deltaX: number) => void;
  onDragStart: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

const DistributionBarHandle = ({
  "aria-label": ariaLabel,
  "aria-valuenow": ariaValueNow,
  "aria-valuetext": ariaValueText,
  boundaryPercent,
  onDrag,
  onDragEnd,
  onDragStart,
  onKeyDown,
}: DistributionBarHandleProps) => {
  const dragRef = useRef<{ pointerId: number; startX: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) {
      return;
    }
    if ("setPointerCapture" in event.currentTarget) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX };
    onDragStart();
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) {
      return;
    }
    onDrag(event.clientX - drag.startX);
  };

  const finishPointer = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (drag === null || drag.pointerId !== event.pointerId) {
      return;
    }
    if (
      "hasPointerCapture" in event.currentTarget &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    onDragEnd(event.clientX - drag.startX);
  };

  return (
    <button
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={ariaValueNow}
      aria-valuetext={ariaValueText}
      className="patternmode-distribution-bar__handle"
      onKeyDown={onKeyDown}
      onPointerCancel={finishPointer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role, react-doctor/prefer-tag-over-role -- the handle is a draggable boundary control with its own keyboard handling; no native input provides this drag behaviour.
      role="slider"
      style={{ left: `calc(${boundaryPercent}% - 1.375rem)` }}
      tabIndex={0}
      type="button"
    />
  );
};

/* The WAI-ARIA slider keys: arrows step, Page keys take ten steps, Home and
   End move the boundary as far as `minValue` allows. Unhandled, Home, End and
   the Page keys scroll the page instead. */
const getBoundaryKeyDelta = (
  key: string,
  segments: DistributionSegment[],
  boundaryIndex: number,
  step: number,
): number | undefined => {
  const pairTotal =
    sanitizeWeight(segments[boundaryIndex]?.value ?? 0) +
    sanitizeWeight(segments[boundaryIndex + 1]?.value ?? 0);
  switch (key) {
    case "ArrowLeft":
    case "ArrowDown": {
      return -step;
    }
    case "ArrowRight":
    case "ArrowUp": {
      return step;
    }
    case "PageDown": {
      return -step * 10;
    }
    case "PageUp": {
      return step * 10;
    }
    case "Home": {
      return -pairTotal;
    }
    case "End": {
      return pairTotal;
    }
    default: {
      return undefined;
    }
  }
};

export const DistributionBar = ({
  "aria-label": ariaLabel,
  className,
  legend = "segments",
  minValue = 4,
  onChange,
  segments,
  step = 1,
  ...props
}: DistributionBarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartSegmentsRef = useRef<DistributionSegment[] | null>(null);
  const [dragging, setDragging] = useState(false);
  // Key presses move a boundary at once: the settle transition is for values
  // that change from outside, and would lag a held arrow key.
  const [keyAdjusting, setKeyAdjusting] = useState(false);
  const { edges, percentages } = deriveSegmentDistribution(segments);

  const moveBoundary = (boundaryIndex: number, deltaValue: number, sourceSegments = segments) => {
    onChange?.(moveDistributionBoundary(sourceSegments, boundaryIndex, deltaValue, minValue));
  };

  const handleDragStart = () => {
    dragStartSegmentsRef.current = segments;
    setKeyAdjusting(false);
    setDragging(true);
  };

  const handleDrag = (boundaryIndex: number, deltaX: number) => {
    const sourceSegments = dragStartSegmentsRef.current ?? segments;
    const sourceTotal = getDistributionTotal(sourceSegments);
    const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
    if (!(trackWidth > 0 && sourceTotal > 0)) {
      return;
    }

    moveBoundary(boundaryIndex, (deltaX / trackWidth) * sourceTotal, sourceSegments);
  };

  const handleDragEnd = (boundaryIndex: number, deltaX: number) => {
    handleDrag(boundaryIndex, deltaX);
    dragStartSegmentsRef.current = null;
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, boundaryIndex: number) => {
    const delta = getBoundaryKeyDelta(event.key, segments, boundaryIndex, step);
    if (delta === undefined) {
      return;
    }
    event.preventDefault();
    setKeyAdjusting(true);
    moveBoundary(boundaryIndex, delta);
  };

  return (
    <fieldset
      {...props}
      aria-label={ariaLabel}
      className={joinClassNames("patternmode-distribution-bar", className)}
      data-dragging={dragging ? "true" : undefined}
      data-key-adjusting={keyAdjusting ? "true" : undefined}
      data-slot="distribution-bar"
    >
      <div
        className="patternmode-distribution-bar__track"
        onBlur={() => {
          setKeyAdjusting(false);
        }}
        ref={trackRef}
      >
        <DistributionSegments percentages={percentages} segments={segments} />
        {segments.slice(0, -1).map((segment, boundaryIndex) => {
          const nextSegment = segments[boundaryIndex + 1];
          const boundaryPercent = Number((edges[boundaryIndex + 1] ?? 0).toFixed(1));
          const label = `Adjust ${segment.label ?? segment.id} and ${
            nextSegment?.label ?? nextSegment?.id
          } distribution`;
          /* Slider value: the left segment's share of the adjacent pair, so
             arrow keys and drags read as moving weight between neighbours. */
          const [pairPercentage = 0] = deriveDistribution([
            segment.value,
            nextSegment?.value ?? 0,
          ]).percentages;
          const leftShare = Math.round(pairPercentage);
          const valueText = `${segment.label ?? segment.id} ${leftShare}%, ${
            nextSegment?.label ?? nextSegment?.id
          } ${100 - leftShare}%`;
          return (
            <DistributionBarHandle
              aria-label={label}
              aria-valuenow={leftShare}
              aria-valuetext={valueText}
              boundaryPercent={boundaryPercent}
              key={`${segment.id}-${nextSegment?.id ?? "end"}`}
              onDrag={(deltaX) => {
                handleDrag(boundaryIndex, deltaX);
              }}
              onDragEnd={(deltaX) => {
                handleDragEnd(boundaryIndex, deltaX);
              }}
              onDragStart={handleDragStart}
              onKeyDown={(event) => {
                handleKeyDown(event, boundaryIndex);
              }}
            />
          );
        })}
      </div>
      {legend === "segments" ? (
        <DistributionSegmentLegend percentages={percentages} segments={segments} />
      ) : null}
    </fieldset>
  );
};
