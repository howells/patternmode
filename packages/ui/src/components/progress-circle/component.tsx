import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import {
  clampValue,
  defaultValueFormatter,
  getProgressPercentage,
  progressAnimationClasses,
  progressLabelVariants,
  progressValueVariants,
  sharedProgressVariants,
} from "../progress-utils";

/**
 * Tailwind variants for the progress circle component.
 *
 * Defines styling slots for different parts of the circular progress indicator
 * with variants for colors, animation states, and sizes.
 */
const progressCircleVariants = tv({
  slots: {
    /**
     * Root container with relative positioning.
     */
    root: "relative",
    /**
     * SVG element rotated to start progress from top.
     */
    svg: "-rotate-90 transform",
    /**
     * Background track circle.
     */
    track: "transition-colors ease-linear",
    /**
     * Progress indicator circle.
     */
    indicator: "transition-colors ease-linear",
    /**
     * Content overlay area.
     */
    content: "absolute inset-0 flex items-center justify-center",
    /**
     * Label text styling.
     */
    label: progressLabelVariants.base,
    /**
     * Value text styling.
     */
    value: progressValueVariants.base,
  },
  variants: {
    variant: {
      /**
       * Default blue color scheme.
       */
      default: {
        track: `stroke-${sharedProgressVariants.default.lightBg} dark:stroke-${sharedProgressVariants.default.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.default.light} dark:stroke-${sharedProgressVariants.default.dark}`,
      },
      /**
       * Neutral gray color scheme.
       */
      neutral: {
        track: `stroke-${sharedProgressVariants.neutral.lightBg} dark:stroke-${sharedProgressVariants.neutral.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.neutral.light} dark:stroke-${sharedProgressVariants.neutral.dark}`,
      },
      /**
       * Warning yellow/orange color scheme.
       */
      warning: {
        track: `stroke-${sharedProgressVariants.warning.lightBg} dark:stroke-${sharedProgressVariants.warning.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.warning.light} dark:stroke-${sharedProgressVariants.warning.dark}`,
      },
      /**
       * Error red color scheme.
       */
      error: {
        track: `stroke-${sharedProgressVariants.error.lightBg} dark:stroke-${sharedProgressVariants.error.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.error.light} dark:stroke-${sharedProgressVariants.error.dark}`,
      },
      /**
       * Success green color scheme.
       */
      success: {
        track: `stroke-${sharedProgressVariants.success.lightBg} dark:stroke-${sharedProgressVariants.success.darkBg}`,
        indicator: `stroke-${sharedProgressVariants.success.light} dark:stroke-${sharedProgressVariants.success.dark}`,
      },
    },
    showAnimation: {
      /**
       * Smooth progress animation enabled.
       */
      true: {
        indicator: progressAnimationClasses.enabled,
      },
      /**
       * No animation, instant progress updates.
       */
      false: {
        indicator: progressAnimationClasses.disabled,
      },
    },
    size: {
      /**
       * Extra small - 32px (2rem).
       */
      xs: { root: "w-8 h-8" },
      /**
       * Small - 48px (3rem).
       */
      sm: { root: "w-12 h-12" },
      /**
       * Medium - 64px (4rem).
       */
      md: { root: "w-16 h-16" },
      /**
       * Large - 80px (5rem).
       */
      lg: { root: "w-20 h-20" },
      /**
       * Extra large - 96px (6rem).
       */
      xl: { root: "w-24 h-24" },
    },
  },
  defaultVariants: {
    variant: "default",
    showAnimation: true,
    size: "md",
  },
});

type ProgressCircleProps = {
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

/**
 * Circular progress indicator for displaying completion status and loading states.
 */
const ProgressCircle = ({ ref, value = 0, max = 100, radius = 32, strokeWidth = 6, showAnimation = true, variant = "default", size, className, children, label, showValue = false, valueFormatter, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, ...props }: ProgressCircleProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const safeValue = value !== null ? clampValue(value, 0, max) : null;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = getProgressPercentage(safeValue, max);
  const offset = circumference - (percentage / 100) * circumference;

  const formatValue = valueFormatter || defaultValueFormatter;
  const {
    root,
    svg,
    track,
    indicator,
    content,
    label: labelClass,
    value: valueClass,
  } = progressCircleVariants({ variant, showAnimation, size });

  // Determine effective size from size variant or radius
  const effectiveSize = size ? undefined : radius * 2;

  return (
    <div
      data-testid="progress-circle"
      ref={ref}
      className={cx(root(), className)}
      role="progressbar"
      aria-label={ariaLabel || label || "Progress circle"}
      aria-valuenow={safeValue ?? undefined}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-describedby={ariaDescribedBy}
      data-max={max}
      data-value={safeValue}
      data-percentage={Math.round(percentage)}
      style={
        effectiveSize
          ? { width: effectiveSize, height: effectiveSize }
          : undefined
      }
      {...props}
    >
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className={cx(svg(), "w-full h-full")}
      >
        {/* Background track */}
        <circle
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className={track()}
        />
        {/* Progress indicator */}
        {safeValue !== null && safeValue >= 0 && (
          <circle
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            fill="transparent"
            strokeLinecap="round"
            className={indicator()}
          />
        )}
      </svg>

      {/* Content area */}
      <div className={content()}>
        {children || (
          <div className="flex flex-col items-center justify-center text-center">
            {showValue && (
              <span className={valueClass()}>
                {formatValue(safeValue, max)}
              </span>
            )}
            {label && !showValue && (
              <span className={labelClass()}>{label}</span>
            )}
            {label && showValue && (
              <span className={cx(labelClass(), "text-xs mt-1")}>
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle, type ProgressCircleProps, progressCircleVariants };
