import type { SnapPoint } from "./types";

const SNAP_POINT_RE = /^(?<value>\d+(?:\.\d+)?)(?<unit>px|rem|em|vh|%)$/u;

const getRootFontSize = (): number =>
  typeof document === "undefined"
    ? 16
    : Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

const resolveUnitPx = (value: number, unit: string, viewportHeight: number): number => {
  if (unit === "px") {
    return value;
  }
  if (unit === "rem" || unit === "em") {
    return value * getRootFontSize();
  }
  if (unit === "vh" || unit === "%") {
    return (value / 100) * viewportHeight;
  }
  return 0;
};

/**
 * Resolve a snap point value to pixels given the viewport height.
 * - number 0-1: fraction of viewport (0.5 → 50% of vh)
 * - number > 1: pixel value (300 → 300px)
 * - string: parsed via regex for CSS unit support
 */
const resolveSnapPointPx = (point: SnapPoint, viewportHeight: number): number => {
  if (typeof point === "number") {
    return point <= 1 ? point * viewportHeight : point;
  }
  if (typeof point === "string") {
    const match = SNAP_POINT_RE.exec(point);
    const rawValue = match?.groups?.value;
    const unit = match?.groups?.unit;
    if (rawValue === undefined || unit === undefined) {
      return 0;
    }
    return resolveUnitPx(Number.parseFloat(rawValue), unit, viewportHeight);
  }
  return 0;
};
/**
 * Resolve all snap points to sorted pixel heights (ascending).
 * Returns an array of heights in px that the drawer should snap to.
 */
export const resolveSnapPoints = (points: SnapPoint[], viewportHeight: number): number[] => {
  if (points.length === 0) {
    return [];
  }
  const resolved: number[] = [];
  for (const point of points) {
    const px = resolveSnapPointPx(point, viewportHeight);
    if (px > 0) {
      resolved.push(px);
    }
  }
  // Sort ascending (smallest snap point first)
  resolved.sort((a, b) => a - b);
  // Deduplicate (1px tolerance)
  const deduped: number[] = [];
  for (const px of resolved) {
    const last = deduped.at(-1);
    if (last === undefined || Math.abs(px - last) > 1) {
      deduped.push(px);
    }
  }
  return deduped;
};
/** Velocity threshold (px/ms) for skipping intermediate snap points */
const SNAP_VELOCITY_THRESHOLD = 0.4;
/** Max velocity to consider for snap offset calculation */
const MAX_SNAP_VELOCITY = 2;
/** Multiplier to convert velocity to pixel offset for snap target */
const SNAP_VELOCITY_MULTIPLIER = 150;
/**
 * Given the current drag offset (from fully open), resolved snap heights,
 * the panel height, and release velocity, find the best snap point index.
 *
 * `dragOffset` is positive in the dismiss direction (downward for bottom sheets).
 * Snap heights are "how tall the drawer should be" (ascending order).
 *
 * Returns -1 if the gesture indicates full dismissal.
 */
export const findSnapTarget = (
  dragOffset: number,
  panelHeight: number,
  snapHeights: number[],
  velocity: number,
  currentIndex: number,
  sequential: boolean,
): number => {
  if (snapHeights.length === 0) {
    return -1;
  }
  // Convert snap heights to offsets from fully open (panelHeight = 0 offset)
  // A smaller snap height = larger offset from top = more closed
  const snapOffsets = snapHeights.map((h) => panelHeight - h);
  // Current position = dragOffset from fully open
  const currentPos = dragOffset;
  if (sequential) {
    // Sequential mode: only snap to adjacent points
    // Positive velocity means dismissing.
    const direction = velocity > 0 ? 1 : -1;
    // Snap heights are ascending, so -1 moves toward the more closed point.
    const nextIndex = currentIndex - direction;
    if (nextIndex < 0) {
      // Dismiss.
      return -1;
    }
    if (nextIndex >= snapHeights.length) {
      // Fully open.
      return snapHeights.length - 1;
    }
    return nextIndex;
  }
  // Velocity-based: project position forward based on velocity
  const velocityOffset =
    Math.abs(velocity) >= SNAP_VELOCITY_THRESHOLD
      ? Math.min(Math.max(velocity, -MAX_SNAP_VELOCITY), MAX_SNAP_VELOCITY) *
        SNAP_VELOCITY_MULTIPLIER
      : 0;
  const projectedPos = currentPos + velocityOffset;
  // Find nearest snap offset to projected position
  const first = snapOffsets[0] ?? 0;
  let bestIndex = 0;
  let bestDist = Math.abs(projectedPos - first);
  for (let i = 1; i < snapOffsets.length; i += 1) {
    const offset = snapOffsets[i] ?? 0;
    const dist = Math.abs(projectedPos - offset);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }
  // Check if dismissal is closer than (or equal to) any snap point.
  // Ties favor dismiss — the user dragged past the last snap point.
  const dismissDist = Math.abs(projectedPos - panelHeight);
  if (dismissDist <= bestDist) {
    return -1;
  }
  return bestIndex;
};
/**
 * Get the Y offset for a snap point relative to fully open (0 offset).
 * Returns the number of pixels the drawer should be translated down from fully open.
 */
export const getSnapOffset = (
  snapIndex: number,
  snapHeights: number[],
  panelHeight: number,
): number => {
  if (snapIndex < 0 || snapIndex >= snapHeights.length) {
    return 0;
  }
  const targetHeight = snapHeights[snapIndex] ?? 0;
  return panelHeight - targetHeight;
};
