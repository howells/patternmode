export interface DistributionBarSegment {
  color: string;
  id: string;
  label?: string;
  value: number;
}

export type DistributionBarSegmentUpdate = Partial<
  Omit<DistributionBarSegment, "value">
> & {
  value?: never;
};

export function getDistributionTotal(
  segments: DistributionBarSegment[],
): number {
  return segments.reduce(
    (sum, segment) => sum + sanitizeValue(segment.value),
    0,
  );
}

export function getDistributionBoundaryPercent(
  segments: DistributionBarSegment[],
  boundaryIndex: number,
): number {
  const total = getDistributionTotal(segments);
  if (total <= 0) {
    return 0;
  }

  const boundaryValue = segments
    .slice(0, boundaryIndex + 1)
    .reduce((sum, segment) => sum + sanitizeValue(segment.value), 0);
  return roundValue((boundaryValue / total) * 100);
}

export function moveDistributionBoundary(
  segments: DistributionBarSegment[],
  boundaryIndex: number,
  deltaValue: number,
  minValue: number,
): DistributionBarSegment[] {
  const left = segments[boundaryIndex];
  const right = segments[boundaryIndex + 1];
  if (!(left && right)) {
    return segments;
  }

  const pairTotal = sanitizeValue(left.value) + sanitizeValue(right.value);
  const clampedMin = Math.max(0, Math.min(minValue, pairTotal / 2));
  const nextLeft = clamp(
    sanitizeValue(left.value) + deltaValue,
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
}

export function removeDistributionSegment(
  segments: DistributionBarSegment[],
  segmentId: string,
): DistributionBarSegment[] {
  if (segments.length <= 1) {
    return segments;
  }

  const removed = segments.find((segment) => segment.id === segmentId);
  if (!removed) {
    return segments;
  }

  const remaining = segments.filter((segment) => segment.id !== segmentId);
  const removedValue = sanitizeValue(removed.value);
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
      sanitizeValue(segment.value) +
        (removedValue * sanitizeValue(segment.value)) / remainingTotal,
    );
    assignedValue += nextValue;
    return { ...segment, value: nextValue };
  });
}

export function updateDistributionSegment(
  segments: DistributionBarSegment[],
  segmentId: string,
  update: DistributionBarSegmentUpdate,
): DistributionBarSegment[] {
  return segments.map((segment) =>
    segment.id === segmentId ? { ...segment, ...update } : segment,
  );
}

function sanitizeValue(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundValue(value: number): number {
  return Number(value.toFixed(1));
}
