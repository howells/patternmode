import { clamp, deriveDistribution, sanitizeWeight } from "@patternmode/system";
import type { WeightedColorSegment } from "@patternmode/system";

/**
 * Weighted segment used by DistributionBar and DistributionDisplay. Extends the
 * shared {@link WeightedColorSegment} with a required stable `id` for editing.
 *
 * Named for the shape rather than for either consumer. It used to be
 * `DistributionBarSegment`, which typed the read-only `DistributionDisplay` on
 * the *editor's* segment type — one of four independent signals telling readers
 * that the read-only component was the editor, and part of why two consumers
 * concluded the catalog had no read-only distribution at all.
 */
export interface DistributionSegment extends WeightedColorSegment {
  id: string;
}

/** Segment metadata update; weight changes happen through boundary movement. */
export type DistributionSegmentUpdate = Partial<Omit<DistributionSegment, "value">> & {
  value?: never;
};

const roundValue = (value: number): number => Number(value.toFixed(1));

/** Derives the shared distribution (sanitized weights, percentages, edges) for segments. */
export const deriveSegmentDistribution = (segments: DistributionSegment[]) =>
  deriveDistribution(segments.map((segment) => segment.value));

/** Sums sanitized segment weights, treating invalid or negative values as 0. */
export const getDistributionTotal = (segments: DistributionSegment[]): number =>
  deriveSegmentDistribution(segments).total;

/**
 * Returns the percentage position of the boundary after `boundaryIndex`,
 * rounded to one decimal. An index past the last segment reads as the end.
 */
export const getDistributionBoundaryPercent = (
  segments: DistributionSegment[],
  boundaryIndex: number,
): number => {
  const { edges } = deriveSegmentDistribution(segments);
  return roundValue(edges[Math.min(boundaryIndex + 1, segments.length)] ?? 0);
};

/**
 * Moves the boundary between two adjacent segments while preserving their sum.
 *
 * `deltaValue` is applied to the left segment and subtracted from the right
 * segment. `minValue` prevents either side of the pair from collapsing below a
 * caller-defined minimum.
 */
export const moveDistributionBoundary = (
  segments: DistributionSegment[],
  boundaryIndex: number,
  deltaValue: number,
  minValue: number,
): DistributionSegment[] => {
  const left = segments[boundaryIndex];
  const right = segments[boundaryIndex + 1];
  if (!(left && right)) {
    return segments;
  }

  const pairTotal = sanitizeWeight(left.value) + sanitizeWeight(right.value);
  const clampedMin = Math.max(0, Math.min(minValue, pairTotal / 2));
  const nextLeft = clamp(
    sanitizeWeight(left.value) + deltaValue,
    clampedMin,
    pairTotal - clampedMin,
  );
  const nextRight = pairTotal - nextLeft;

  return segments.map((segment, index) => {
    if (index === boundaryIndex) {
      return { ...segment, value: roundValue(nextLeft) };
    }
    if (index === boundaryIndex + 1) {
      return { ...segment, value: roundValue(nextRight) };
    }
    return segment;
  });
};

/** Removes a segment and redistributes its weight proportionally to the rest. */
export const removeDistributionSegment = (
  segments: DistributionSegment[],
  segmentId: string,
): DistributionSegment[] => {
  if (segments.length <= 1) {
    return segments;
  }

  const removed = segments.find((segment) => segment.id === segmentId);
  if (!removed) {
    return segments;
  }

  const remaining = segments.filter((segment) => segment.id !== segmentId);
  const removedValue = sanitizeWeight(removed.value);
  const remainingTotal = getDistributionTotal(remaining);
  if (remainingTotal <= 0) {
    const equalValue = removedValue / remaining.length;
    return remaining.map((segment) => ({
      ...segment,
      value: roundValue(equalValue),
    }));
  }

  let assignedValue = 0;
  const originalTotal = getDistributionTotal(segments);
  return remaining.map((segment, index) => {
    if (index === remaining.length - 1) {
      return { ...segment, value: roundValue(originalTotal - assignedValue) };
    }

    const nextValue = roundValue(
      sanitizeWeight(segment.value) +
        (removedValue * sanitizeWeight(segment.value)) / remainingTotal,
    );
    assignedValue += nextValue;
    return { ...segment, value: nextValue };
  });
};

/** Updates non-weight segment metadata such as label or color. */
export const updateDistributionSegment = (
  segments: DistributionSegment[],
  segmentId: string,
  update: DistributionSegmentUpdate,
): DistributionSegment[] =>
  segments.map((segment) => (segment.id === segmentId ? { ...segment, ...update } : segment));
