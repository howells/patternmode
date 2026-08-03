import { joinClassNames, sanitizeWeight } from "@patternmode/system";
import { domMax, LazyMotion, m } from "motion/react";
import type { PanInfo } from "motion/react";
import type { HTMLAttributes, KeyboardEvent } from "react";
import { useRef, useState } from "react";
import {
  getDistributionBoundaryPercent,
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
  onDrag: (info: PanInfo) => void;
  onDragEnd: (info: PanInfo) => void;
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
}: DistributionBarHandleProps) => (
  <LazyMotion features={domMax}>
    <m.button
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={ariaValueNow}
      aria-valuetext={ariaValueText}
      className="patternmode-distribution-bar__handle"
      drag="x"
      dragElastic={0}
      dragMomentum={false}
      dragSnapToOrigin
      onDrag={(_event, info) => {
        onDrag(info);
      }}
      onDragEnd={(_event, info) => {
        onDragEnd(info);
      }}
      onDragStart={onDragStart}
      onKeyDown={onKeyDown}
      role="slider"
      style={{ left: `calc(${boundaryPercent}% - 1.375rem)` }}
      tabIndex={0}
      transformTemplate={() => "none"}
      type="button"
    />
  </LazyMotion>
);

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
  const total = getDistributionTotal(segments);

  const moveBoundary = (boundaryIndex: number, deltaValue: number, sourceSegments = segments) => {
    onChange?.(moveDistributionBoundary(sourceSegments, boundaryIndex, deltaValue, minValue));
  };

  const handleDragStart = () => {
    dragStartSegmentsRef.current = segments;
    setDragging(true);
  };

  const handleDrag = (boundaryIndex: number, info: PanInfo) => {
    const sourceSegments = dragStartSegmentsRef.current ?? segments;
    const sourceTotal = getDistributionTotal(sourceSegments);
    const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
    if (!(trackWidth > 0 && sourceTotal > 0)) {
      return;
    }

    moveBoundary(boundaryIndex, (info.offset.x / trackWidth) * sourceTotal, sourceSegments);
  };

  const handleDragEnd = (boundaryIndex: number, info: PanInfo) => {
    handleDrag(boundaryIndex, info);
    dragStartSegmentsRef.current = null;
    setDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, boundaryIndex: number) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBoundary(boundaryIndex, -step);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBoundary(boundaryIndex, step);
    }
  };

  return (
    <fieldset
      {...props}
      aria-label={ariaLabel}
      className={joinClassNames("patternmode-distribution-bar", className)}
      data-dragging={dragging ? "true" : undefined}
      data-slot="distribution-bar"
    >
      <div className="patternmode-distribution-bar__track" ref={trackRef}>
        <DistributionSegments segments={segments} total={total} />
        {segments.slice(0, -1).map((segment, boundaryIndex) => {
          const nextSegment = segments[boundaryIndex + 1];
          const boundaryPercent = getDistributionBoundaryPercent(segments, boundaryIndex);
          const label = `Adjust ${segment.label ?? segment.id} and ${
            nextSegment?.label ?? nextSegment?.id
          } distribution`;
          const leftValue = sanitizeWeight(segment.value);
          const rightValue = sanitizeWeight(nextSegment?.value ?? 0);
          const pairTotal = leftValue + rightValue;
          /* Slider value: the left segment's share of the adjacent pair, so
             arrow keys and drags read as moving weight between neighbours. */
          const leftShare = pairTotal > 0 ? Math.round((leftValue / pairTotal) * 100) : 0;
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
              onDrag={(info) => {
                handleDrag(boundaryIndex, info);
              }}
              onDragEnd={(info) => {
                handleDragEnd(boundaryIndex, info);
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
        <DistributionSegmentLegend segments={segments} total={total} />
      ) : null}
    </fieldset>
  );
};
