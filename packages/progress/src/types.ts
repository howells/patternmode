import type { Progress as BaseProgress } from "@base-ui-components/react/progress";
import type * as React from "react";

export type ProgressBarProps = {
  /**
   * Optional label text to display next to the progress bar.
   * Provides context about what task or process is being tracked.
   */
  label?: string;
  /**
   * Whether to show the current progress value as formatted text.
   * When enabled, displays the progress as a percentage or custom format.
   */
  showValue?: boolean;
  /**
   * Custom function to format the displayed value.
   * Receives the current value and maximum value, returns formatted string.
   * @param value - Current progress value or null.
   * @param max - Maximum progress value.
   * @returns Formatted string to display.
   */
  valueFormatter?: (value: number | null, max: number) => string;
  /**
   * Color variant for the progress indicator.
   * Affects both the track background and indicator fill colors.
   */
  variant?: "default" | "neutral" | "warning" | "error" | "success";
  /**
   * Whether to enable smooth animation transitions.
   * When true, progress changes animate smoothly; when false, changes are instant.
   */
  showAnimation?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseProgress.Root>;
