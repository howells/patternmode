import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { progressCircleVariants } from "./variants";

export type ProgressCircleProps = {
  /**
   * Current progress value (0 to max).
   * Set to null for indeterminate/loading state where progress is unknown.
   * Values outside the 0-max range will be automatically clamped.
   */
  "value"?: number | null;

  /**
   * Maximum value for progress calculation.
   * Used to calculate the completion percentage and normalize the progress arc.
   * Defaults to 100 for percentage-based progress display.
   */
  "max"?: number;

  /**
   * Circle radius in pixels.
   * When specified, overrides the size variant and creates a custom-sized circle.
   * The total component size will be radius * 2.
   */
  "radius"?: number;

  /**
   * Stroke width of the progress circle in pixels.
   * Controls the thickness of both the background track and progress indicator.
   * Larger values create thicker progress rings.
   */
  "strokeWidth"?: number;

  /**
   * Custom content to display in the center of the circle.
   * When provided, overrides the default label and value display.
   * Perfect for icons, custom text, or complex content layouts.
   */
  "children"?: React.ReactNode;

  /**
   * Label text to display below or alongside the progress value.
   * Provides context about what the progress represents.
   * Hidden when custom children are provided.
   */
  "label"?: string;

  /**
   * Whether to show the current progress value as text.
   * Displays the formatted progress value in the center of the circle.
   * Can be combined with a label for additional context.
   */
  "showValue"?: boolean;

  /**
   * Function to format the displayed progress value.
   * Receives the current value and maximum value as parameters.
   * Useful for custom units, decimal places, or display formats.
   * Defaults to percentage display (e.g., "75%").
   */
  "valueFormatter"?: (value: number | null, max: number) => string;

  /**
   * Accessible label for screen readers.
   * Provides context about the progress indicator's purpose.
   * Defaults to the label prop or "Progress circle" if not specified.
   */
  "aria-label"?: string;

  /**
   * ID of element that describes the progress indicator.
   * References additional descriptive text for screen readers.
   * Useful for providing detailed progress context or instructions.
   */
  "aria-describedby"?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "value"> & VariantProps<typeof progressCircleVariants>;
