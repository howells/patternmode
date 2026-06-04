import type { HTMLAttributes } from "react";

export const STATUS_MARK_SCALE_STATUSES = [
  "empty",
  "quarter",
  "half",
  "three-quarter",
  "full",
] as const;

export const STATUS_MARK_SYMBOLIC_STATUSES = [
  "null",
  "pending",
  "blocked",
  "paused",
  "unknown",
  "unavailable",
  "complete",
] as const;

export const STATUS_MARK_STATUSES = [
  ...STATUS_MARK_SCALE_STATUSES,
  ...STATUS_MARK_SYMBOLIC_STATUSES,
] as const;

export const STATUS_MARK_TONES = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "muted",
] as const;

export const STATUS_MARK_MOTIONS = ["smooth", "snap", "reduced"] as const;

export type StatusMarkScaleStatus = (typeof STATUS_MARK_SCALE_STATUSES)[number];
export type StatusMarkSymbolicStatus = (typeof STATUS_MARK_SYMBOLIC_STATUSES)[number];
export type StatusMarkStatus = (typeof STATUS_MARK_STATUSES)[number];
export type StatusMarkTone = (typeof STATUS_MARK_TONES)[number];
export type StatusMarkMotion = (typeof STATUS_MARK_MOTIONS)[number] | false;

export interface StatusMarkState {
  progress: 0 | 25 | 50 | 75 | 100;
  status: StatusMarkStatus;
  variant: "scale" | "symbolic";
}

export interface StatusMarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Whether the outer track/border ring is shown.
   *
   * Default `true`.
   */
  border?: boolean;
  /**
   * Main color for the mark stroke, symbols, and segment fill fallback. Overrides
   * the selected semantic `tone` when supplied.
   */
  color?: string;
  /**
   * Whether scale states render with filled quadrants and a soft base disc.
   *
   * Default `true`.
   */
  fill?: boolean;
  /**
   * Color used for filled progress segments. Defaults to `color` or the selected
   * semantic tone.
   */
  fillColor?: string;
  /**
   * Accessible label for the visual state. Omit only when adjacent text already
   * names the same state and the mark should be decorative.
   */
  label?: string;
  /**
   * Transition preset for movement between statuses.
   *
   * Default `"smooth"`.
   */
  motion?: StatusMarkMotion;
  /**
   * Named discrete status. Symbolic statuses such as `"blocked"` override
   * numeric `value`; scale statuses such as `"half"` use the same visual scale
   * as numeric values.
   */
  status?: StatusMarkStatus;
  /**
   * Size token used for the mark dimensions.
   *
   * Default `"base"`.
   */
  size?: "2xl" | "2xs" | "3xl" | "base" | "lg" | "sm" | "xl" | "xs";
  /**
   * Semantic color treatment. Tone changes color only; shape continues to carry
   * the status meaning.
   *
   * Default `"neutral"`.
   */
  tone?: StatusMarkTone;
  /**
   * Color used for the empty track beneath the active status.
   */
  trackColor?: string;
  /**
   * Numeric status value. Values are clamped from 0 to 100 and snapped to the
   * nearest discrete visual step: 0, 25, 50, 75, or 100.
   */
  value?: number;
}

const SCALE_PROGRESS: Record<StatusMarkScaleStatus, StatusMarkState["progress"]> = {
  empty: 0,
  full: 100,
  half: 50,
  quarter: 25,
  "three-quarter": 75,
};

const PROGRESS_STATUS: Record<StatusMarkState["progress"], StatusMarkScaleStatus> = {
  0: "empty",
  100: "full",
  25: "quarter",
  50: "half",
  75: "three-quarter",
};

const SYMBOLIC_PROGRESS: Record<StatusMarkSymbolicStatus, StatusMarkState["progress"]> = {
  blocked: 0,
  complete: 100,
  null: 0,
  paused: 50,
  pending: 0,
  unavailable: 0,
  unknown: 0,
};

const isScaleStatus = (status: StatusMarkStatus): status is StatusMarkScaleStatus =>
  STATUS_MARK_SCALE_STATUSES.includes(status as StatusMarkScaleStatus);

const snapProgress = (value: number | undefined): StatusMarkState["progress"] => {
  if (value === undefined || Number.isNaN(value)) {
    return 0;
  }

  const clamped = Math.min(100, Math.max(0, value));
  return (Math.round(clamped / 25) * 25) as StatusMarkState["progress"];
};

/** Resolves numeric and named status inputs into the discrete rendered state. */
export const getStatusMarkState = ({
  status,
  value,
}: Pick<StatusMarkProps, "status" | "value">): StatusMarkState => {
  if (status) {
    if (isScaleStatus(status)) {
      return {
        progress: SCALE_PROGRESS[status],
        status,
        variant: "scale",
      };
    }

    return {
      progress: SYMBOLIC_PROGRESS[status],
      status,
      variant: "symbolic",
    };
  }

  const progress = snapProgress(value);
  return {
    progress,
    status: PROGRESS_STATUS[progress],
    variant: "scale",
  };
};
