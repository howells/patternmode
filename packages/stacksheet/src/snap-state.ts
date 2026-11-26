import { useState } from "react";
import { useStageHeight } from "./renderer-effects";
import { resolveSnapPoints } from "./snap-points";
import type { ResolvedConfig, SheetItem, Side } from "./types";

const getResolvedSnapHeights = (
  side: Side,
  snapPoints: ResolvedConfig["snapPoints"],
  stageHeight: number,
) => (side === "bottom" && snapPoints.length > 0 ? resolveSnapPoints(snapPoints, stageHeight) : []);

/** The Snap Point a stack opens on: `snapPointIndex`, clamped, or the tallest. */
const getDefaultSnapIndex = (snapCount: number, configuredIndex: number | undefined): number => {
  if (snapCount === 0) {
    return 0;
  }
  if (configuredIndex === undefined) {
    return snapCount - 1;
  }
  return Math.max(0, Math.min(snapCount - 1, configuredIndex));
};

/**
 * The active Snap Point of an open bottom stack. It starts at the configured
 * `snapPointIndex` (or the tallest) and follows the user's drags from there;
 * a new stack, or a change in the number of Snap Points, starts it over.
 */
export const useSnapState = (
  config: ResolvedConfig,
  isOpen: boolean,
  side: Side,
  stack: SheetItem[],
  container?: HTMLElement,
) => {
  const stageHeight = useStageHeight(
    isOpen && side === "bottom" && config.snapPoints.length > 0,
    container,
  );
  const snapHeights = getResolvedSnapHeights(side, config.snapPoints, stageHeight);
  const snapContext = isOpen ? stack.map((item) => item.id).join("\u0000") : "";
  const defaultSnapIndex = getDefaultSnapIndex(snapHeights.length, config.snapPointIndex);
  const [internalSnap, setInternalSnap] = useState({
    context: "",
    index: defaultSnapIndex,
    snapCount: snapHeights.length,
  });
  const activeSnapIndex =
    internalSnap.context === snapContext && internalSnap.snapCount === snapHeights.length
      ? internalSnap.index
      : defaultSnapIndex;
  const handleSnap = (index: number) => {
    setInternalSnap({
      context: snapContext,
      index,
      snapCount: snapHeights.length,
    });
    config.onSnapPointChange?.(index);
  };
  return { activeSnapIndex, handleSnap, snapHeights };
};
