import { joinClassNames } from "@patternmode/system";
import { domMax, LazyMotion, m } from "motion/react";
import type { PanInfo } from "motion/react";
import type { CSSProperties, HTMLAttributes, KeyboardEvent } from "react";
import { useRef } from "react";

import {
  getDistributionBoundaryPercent,
  getDistributionTotal,
  moveDistributionBoundary,
} from "./distribution-bar-math";
import type { DistributionBarSegment } from "./distribution-bar-math";

export interface DistributionDisplayProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "role" | "onSelect"
> {
  /** Label used in summary legends for assigned segment weight. */
  assignedLabel?: string;
  /** Label used when `emptyValue` contributes unassigned weight. */
  emptyLabel?: string;
  /**
   * Extra unassigned weight included in derived percentage calculations.
   *
   * Default `0`.
   */
  emptyValue?: number;
  /**
   * Legend style for the read-only display.
   *
   * Default `"segments"`.
   */
  legend?: "segments" | "summary" | false;
  /**
   * When provided, each segment renders as a button and selecting one
   * invokes this callback. Pair with `selectedSegmentId` to mark a segment
   * as selected (renders a ring). Read-only by default.
   */
  onSegmentSelect?: (segment: DistributionBarSegment) => void;
  segments: DistributionBarSegment[];
  /** Id of the selected segment — renders a ring on that segment. */
  selectedSegmentId?: string;
}

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
  onChange?: (segments: DistributionBarSegment[]) => void;
  /** Weighted segments; displayed percentages are derived from their total. */
  segments: DistributionBarSegment[];
  /**
   * Keyboard adjustment amount for boundary handles.
   *
   * Default `1`.
   */
  step?: number;
}

interface DistributionSegmentsProps {
  emptyValue?: number;
  onSegmentSelect?: (segment: DistributionBarSegment) => void;
  segments: DistributionBarSegment[];
  selectedSegmentId?: string;
  total: number;
}

interface DistributionSegmentLegendProps {
  emptyLabel?: string;
  emptyValue?: number;
  segments: DistributionBarSegment[];
  total: number;
}

interface DistributionSummaryLegendProps {
  assignedLabel: string;
  emptyLabel: string;
  emptyValue: number;
  total: number;
}

interface DistributionBarHandleProps {
  "aria-label": string;
  boundaryPercent: number;
  onDrag: (info: PanInfo) => void;
  onDragEnd: (info: PanInfo) => void;
  onDragStart: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

const getRenderableDistributionValue = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, value) : 0;

const getDerivedDistributionPercentage = (value: number, total: number): number => {
  if (!(total > 0 && Number.isFinite(value))) {
    return 0;
  }

  return Math.round((Math.max(0, value) / total) * 100);
};

const getDistributionDisplayTotal = (
  segments: DistributionBarSegment[],
  emptyValue: number,
): number => getDistributionTotal(segments) + getRenderableDistributionValue(emptyValue);

const getDistributionDisplayAccessibleLabel = (
  segments: DistributionBarSegment[],
  emptyValue: number,
  emptyLabel: string,
  total: number,
): string => {
  const segmentLabels = segments.map(
    (segment) =>
      `${segment.label ?? segment.id} ${getDerivedDistributionPercentage(segment.value, total)}%`,
  );
  if (emptyValue > 0) {
    segmentLabels.push(`${emptyLabel} ${getDerivedDistributionPercentage(emptyValue, total)}%`);
  }

  return segmentLabels.join(", ");
};

const DistributionSegments = ({
  emptyValue = 0,
  onSegmentSelect,
  segments,
  selectedSegmentId,
  total,
}: DistributionSegmentsProps) => (
  <div className="patternmode-distribution-bar__segments">
    {segments.map((segment) => {
      const segmentStyle = {
        "--patternmode-distribution-segment-color": segment.color,
        width:
          total > 0 ? `${(getRenderableDistributionValue(segment.value) / total) * 100}%` : "0%",
      } as CSSProperties;
      const isSelected = selectedSegmentId === segment.id;

      if (onSegmentSelect) {
        return (
          <button
            aria-label={`${segment.label ?? segment.id} ${getDerivedDistributionPercentage(segment.value, total)}%`}
            aria-pressed={isSelected}
            className="patternmode-distribution-bar__segment"
            data-selected={isSelected ? "true" : undefined}
            key={segment.id}
            onClick={() => onSegmentSelect(segment)}
            style={segmentStyle}
            type="button"
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className="patternmode-distribution-bar__segment"
          data-selected={isSelected ? "true" : undefined}
          key={segment.id}
          style={segmentStyle}
        />
      );
    })}
    {emptyValue > 0 ? (
      <div
        aria-hidden="true"
        className="patternmode-distribution-bar__segment patternmode-distribution-bar__segment--empty"
        style={{
          width:
            total > 0 ? `${(getRenderableDistributionValue(emptyValue) / total) * 100}%` : "0%",
        }}
      />
    ) : null}
  </div>
);

const DistributionSegmentLegend = ({
  emptyLabel,
  emptyValue = 0,
  segments,
  total,
}: DistributionSegmentLegendProps) => (
  <div className="patternmode-distribution-bar__legend">
    {segments.map((segment) => (
      <span key={segment.id}>
        <span
          aria-hidden="true"
          className="patternmode-distribution-bar__swatch"
          style={
            {
              "--patternmode-distribution-segment-color": segment.color,
            } as CSSProperties
          }
        />
        {segment.label ?? segment.id} {getDerivedDistributionPercentage(segment.value, total)}%
      </span>
    ))}
    {emptyValue > 0 && emptyLabel ? (
      <span>
        <span
          aria-hidden="true"
          className="patternmode-distribution-bar__swatch patternmode-distribution-bar__swatch--empty"
        />
        {emptyLabel} {getDerivedDistributionPercentage(emptyValue, total)}%
      </span>
    ) : null}
  </div>
);

const DistributionSummaryLegend = ({
  assignedLabel,
  emptyLabel,
  emptyValue,
  total,
}: DistributionSummaryLegendProps) => {
  const emptyPercentage = getDerivedDistributionPercentage(emptyValue, total);

  return (
    <div className="patternmode-distribution-bar__legend">
      <span>
        {Math.max(0, 100 - emptyPercentage)}% {assignedLabel}
      </span>
      {emptyValue > 0 ? (
        <span>
          {emptyPercentage}% {emptyLabel}
        </span>
      ) : null}
    </div>
  );
};

const DistributionBarHandle = ({
  "aria-label": ariaLabel,
  boundaryPercent,
  onDrag,
  onDragEnd,
  onDragStart,
  onKeyDown,
}: DistributionBarHandleProps) => (
  <LazyMotion features={domMax}>
    <m.button
      aria-label={ariaLabel}
      className="patternmode-distribution-bar__handle"
      drag="x"
      dragElastic={0}
      dragMomentum={false}
      dragSnapToOrigin
      onDrag={(_event, info) => onDrag(info)}
      onDragEnd={(_event, info) => onDragEnd(info)}
      onDragStart={onDragStart}
      onKeyDown={onKeyDown}
      style={{ left: `calc(${boundaryPercent}% - 1.375rem)` }}
      transformTemplate={() => "none"}
      type="button"
    />
  </LazyMotion>
);

export const DistributionDisplay = ({
  "aria-label": ariaLabel,
  assignedLabel = "assigned",
  className,
  emptyLabel = "unassigned",
  emptyValue = 0,
  legend = "segments",
  onSegmentSelect,
  segments,
  selectedSegmentId,
  ...props
}: DistributionDisplayProps) => {
  const total = getDistributionDisplayTotal(segments, emptyValue);
  const interactive = Boolean(onSegmentSelect);
  const accessibleLabel =
    ariaLabel ?? getDistributionDisplayAccessibleLabel(segments, emptyValue, emptyLabel, total);

  const content = (
    <>
      <div className="patternmode-distribution-bar__track">
        <DistributionSegments
          emptyValue={emptyValue}
          onSegmentSelect={onSegmentSelect}
          segments={segments}
          selectedSegmentId={selectedSegmentId}
          total={total}
        />
      </div>
      {legend === "segments" ? (
        <DistributionSegmentLegend
          emptyLabel={emptyLabel}
          emptyValue={emptyValue}
          segments={segments}
          total={total}
        />
      ) : null}
      {legend === "summary" ? (
        <DistributionSummaryLegend
          assignedLabel={assignedLabel}
          emptyLabel={emptyLabel}
          emptyValue={emptyValue}
          total={total}
        />
      ) : null}
    </>
  );
  const sharedClassName = joinClassNames("patternmode-distribution-display", className);

  return interactive ? (
    <fieldset
      {...(props as HTMLAttributes<HTMLFieldSetElement>)}
      aria-label={accessibleLabel}
      className={sharedClassName}
      data-slot="distribution-display"
    >
      {content}
    </fieldset>
  ) : (
    <figure
      {...props}
      aria-label={accessibleLabel}
      className={sharedClassName}
      data-slot="distribution-display"
    >
      {content}
    </figure>
  );
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
  const dragStartSegmentsRef = useRef<DistributionBarSegment[] | null>(null);
  const total = getDistributionTotal(segments);

  const moveBoundary = (boundaryIndex: number, deltaValue: number, sourceSegments = segments) => {
    onChange?.(moveDistributionBoundary(sourceSegments, boundaryIndex, deltaValue, minValue));
  };

  const handleDragStart = () => {
    dragStartSegmentsRef.current = segments;
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
          return (
            <DistributionBarHandle
              aria-label={label}
              boundaryPercent={boundaryPercent}
              key={`${segment.id}-${nextSegment?.id ?? "end"}`}
              onDrag={(info) => handleDrag(boundaryIndex, info)}
              onDragEnd={(info) => handleDragEnd(boundaryIndex, info)}
              onDragStart={handleDragStart}
              onKeyDown={(event) => handleKeyDown(event, boundaryIndex)}
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
