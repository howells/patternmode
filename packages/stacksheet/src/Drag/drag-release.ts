import { findSnapTarget } from "../snap-points";
import type { DragConfig, DragOutcome } from "./drag-types";

/**
 * Decide where a released drag settles.
 *
 * `travel` is px from fully open in the dismiss direction; `velocity` is
 * px/ms in the same direction. Without Snap Points the direction of the
 * release decides first: a flick toward dismissal dismisses from anywhere,
 * a flick back toward open keeps the Sheet even past the close threshold,
 * and only an unhurried release falls back to the distance travelled.
 */
export const resolveRelease = (
  travel: number,
  velocity: number,
  panelSize: number,
  config: Pick<
    DragConfig,
    "activeSnapIndex" | "closeThreshold" | "sequential" | "snapHeights" | "velocityThreshold"
  >,
): DragOutcome => {
  if (config.snapHeights.length > 0) {
    const index = findSnapTarget(
      Math.max(0, travel),
      panelSize,
      config.snapHeights,
      velocity,
      config.activeSnapIndex,
      config.sequential,
    );
    return index === -1 ? { kind: "dismiss" } : { index, kind: "snap" };
  }
  if (velocity > config.velocityThreshold) {
    return { kind: "dismiss" };
  }
  if (velocity < -config.velocityThreshold) {
    return { kind: "rest" };
  }
  const size = panelSize > 0 ? panelSize : 1;
  return travel / size > config.closeThreshold ? { kind: "dismiss" } : { kind: "rest" };
};
