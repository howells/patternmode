import type { Side } from "../types";

export interface DragConfig {
  /** Current active snap point index */
  activeSnapIndex: number;
  /** Fraction of panel dimension to trigger close (0-1). Default: 0.25 */
  closeThreshold: number;
  /** Enable drag-driven dismissal. Default: true */
  enabled: boolean;
  /**
   * Travel (px from fully open, in the dismiss direction) of the Sheet's most
   * open resting position: 0, or the tallest Snap Point's offset. A drag past
   * it rubber-bands.
   */
  minTravel: number;
  /** When true, can't skip intermediate snap points */
  sequential: boolean;
  /** Side the panel is on — determines drag direction */
  side: Side;
  /** Resolved snap point heights in px (sorted ascending). Empty = no snap points. */
  snapHeights: number[];
  /** Velocity threshold (px/ms) to trigger close. Default: 0.5 */
  velocityThreshold: number;
}

/** Where a released drag should settle. */
export type DragOutcome = { kind: "dismiss" } | { kind: "rest" } | { index: number; kind: "snap" };

/**
 * The surface a drag moves. The drag reads and writes the panel's travel
 * (px from fully open, positive toward dismissal) directly, so a drag never
 * re-renders React.
 */
export interface DragTarget {
  /** The gesture committed: stop any running animation and return the current travel. */
  begin: () => number;
  /** The gesture ended. `velocity` is px/s along the dismiss direction. */
  end: (outcome: DragOutcome, velocity: number) => void;
  /** Follow the pointer. */
  move: (travel: number) => void;
}

export type DragAxis = "x" | "y";
export type DragSign = 1 | -1;
