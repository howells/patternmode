import { sanitizeWeight } from "@patternmode/system";
import type { CSSProperties } from "react";
import { getDerivedDistributionPercentage } from "./distribution-math";
import type { DistributionSegment } from "./distribution-math";

/**
 * The pieces `DistributionBar` (the editor) and `DistributionDisplay` (the
 * read-only sibling) both draw.
 *
 * They live here rather than inside either component so that neither owns the
 * other. The class names stay on the `patternmode-distribution-bar__*` prefix
 * because they are the published styling contract — consumers target them —
 * and renaming them would be a breaking change for a naming problem the module
 * boundary already solves.
 */

type DistributionSegmentStyle = CSSProperties &
  Partial<Record<`--${string}`, number | string | undefined>>;

interface DistributionSegmentsProps {
  emptyValue?: number;
  onSegmentSelect?: (segment: DistributionSegment) => void;
  segments: DistributionSegment[];
  selectedSegmentId?: string;
  total: number;
}

interface DistributionSegmentLegendProps {
  emptyLabel?: string;
  emptyValue?: number;
  segments: DistributionSegment[];
  total: number;
}

/** The coloured track: one element per segment, plus any unassigned remainder. */
export const DistributionSegments = ({
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
        width: total > 0 ? `${(sanitizeWeight(segment.value) / total) * 100}%` : "0%",
      } satisfies DistributionSegmentStyle;
      const isSelected = selectedSegmentId === segment.id;

      if (onSegmentSelect) {
        return (
          <button
            aria-label={`${segment.label ?? segment.id} ${getDerivedDistributionPercentage(segment.value, total)}%`}
            aria-pressed={isSelected}
            className="patternmode-distribution-bar__segment"
            data-selected={isSelected ? "true" : undefined}
            key={segment.id}
            onClick={() => {
              onSegmentSelect(segment);
            }}
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
          width: total > 0 ? `${(sanitizeWeight(emptyValue) / total) * 100}%` : "0%",
        }}
      />
    ) : null}
  </div>
);

/** Swatch-and-label legend, one entry per segment. */
export const DistributionSegmentLegend = ({
  emptyLabel,
  emptyValue = 0,
  segments,
  total,
}: DistributionSegmentLegendProps) => (
  <div className="patternmode-distribution-bar__legend">
    {segments.map((segment) => {
      const segmentStyle = {
        "--patternmode-distribution-segment-color": segment.color,
        backgroundColor: undefined,
      } satisfies DistributionSegmentStyle;

      return (
        <span key={segment.id}>
          <span
            aria-hidden="true"
            className="patternmode-distribution-bar__swatch"
            style={segmentStyle}
          />
          {segment.label ?? segment.id} {getDerivedDistributionPercentage(segment.value, total)}%
        </span>
      );
    })}
    {emptyValue > 0 && emptyLabel !== undefined && emptyLabel !== "" ? (
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
