import type * as React from "react";

export type ProgressStepState = "inactive" | "active" | "complete" | "error";

export type ProgressStep = {
  /** Primary step label shown next to/under the dot */
  title: React.ReactNode;
  /** Optional descriptive text for the step */
  description?: React.ReactNode;
  /** Explicit state. If omitted, computed from `current` */
  state?: ProgressStepState;
};

export type ProgressStepsProps = {
  /** Layout orientation */
  orientation?: "vertical" | "horizontal";
  /** Index of the current step (0-based). Used when steps don't provide explicit state */
  current?: number;
  /** Steps to render */
  steps: ProgressStep[];
  /** Optional aria-label for the list */
  "aria-label"?: string;
} & Omit<React.HTMLAttributes<HTMLOListElement>, "children">;
