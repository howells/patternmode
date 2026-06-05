import type { HTMLAttributes } from "react";

export const STATUS_MARK_PROGRESS_STEPS = [
  "null",
  "empty",
  "quarter",
  "half",
  "three-quarter",
  "full",
] as const;

export const STATUS_MARK_STATUSES = STATUS_MARK_PROGRESS_STEPS;
export const STATUS_MARK_PROGRESS_VALUES = [0, 25, 50, 75, 100] as const;
export const STATUS_MARK_TONES = ["neutral", "accent", "muted"] as const;
export const STATUS_MARK_VARIANTS = ["fill", "border"] as const;
export const STATUS_MARK_MOTIONS = ["smooth", "snap", "reduced"] as const;

export type StatusMarkMotion = (typeof STATUS_MARK_MOTIONS)[number] | false;
export type StatusMarkProgressStep = (typeof STATUS_MARK_PROGRESS_STEPS)[number];
export type StatusMarkProgressValue = (typeof STATUS_MARK_PROGRESS_VALUES)[number];
export type StatusMarkStatus = StatusMarkProgressStep;
export type StatusMarkTone = (typeof STATUS_MARK_TONES)[number];
export type StatusMarkVariant = (typeof STATUS_MARK_VARIANTS)[number];

export type ResolvedStatusProgress =
  | {
      progress: null;
      status: "null";
    }
  | {
      progress: StatusMarkProgressValue;
      status: Exclude<StatusMarkProgressStep, "null">;
    };

export interface StatusMarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Active progress color. Overrides the selected visual `tone` when supplied.
   */
  color?: string;
  /**
   * Accessible label for the visual state. Omit only when adjacent text already
   * names the same progress and the mark should be decorative.
   */
  label?: string;
  /**
   * Transition preset for movement between progress steps.
   *
   * Default `"smooth"`.
   */
  motion?: StatusMarkMotion;
  /**
   * Named discrete progress step. Use `"null"` only when progress is explicitly
   * not yet known or measured.
   */
  status?: StatusMarkProgressStep;
  /**
   * Size token used for the mark dimensions.
   *
   * Default `"base"`.
   */
  size?: "2xl" | "2xs" | "3xl" | "base" | "lg" | "sm" | "xl" | "xs";
  /**
   * Visual emphasis treatment. Tone changes color only; progress shape carries
   * meaning.
   *
   * Default `"neutral"`.
   */
  tone?: StatusMarkTone;
  /**
   * Color used for inactive track or placeholder structure.
   */
  trackColor?: string;
  /**
   * Numeric progress input. Values are clamped from 0 to 100 and snapped to the
   * nearest discrete visual step: 0, 25, 50, 75, or 100.
   */
  value?: number;
  /**
   * Visual treatment for known progress. Null progress renders the same dashed
   * placeholder in every variant.
   *
   * Default `"fill"`.
   */
  variant?: StatusMarkVariant;
}

const STEP_PROGRESS: Record<Exclude<StatusMarkProgressStep, "null">, StatusMarkProgressValue> = {
  empty: 0,
  full: 100,
  half: 50,
  quarter: 25,
  "three-quarter": 75,
};

const PROGRESS_STEP: Record<StatusMarkProgressValue, Exclude<StatusMarkProgressStep, "null">> = {
  0: "empty",
  100: "full",
  25: "quarter",
  50: "half",
  75: "three-quarter",
};

const snapProgress = (value: number | undefined): StatusMarkProgressValue => {
  if (value === undefined || Number.isNaN(value)) {
    return 0;
  }

  const clamped = Math.min(100, Math.max(0, value));
  return (Math.round(clamped / 25) * 25) as StatusMarkProgressValue;
};

/** Resolves named or numeric progress input into a discrete StatusMark step. */
export const resolveStatusProgress = ({
  status,
  value,
}: Pick<StatusMarkProps, "status" | "value">): ResolvedStatusProgress => {
  if (status === "null") {
    return {
      progress: null,
      status,
    };
  }

  if (status) {
    return {
      progress: STEP_PROGRESS[status],
      status,
    };
  }

  const progress = snapProgress(value);
  return {
    progress,
    status: PROGRESS_STEP[progress],
  };
};
