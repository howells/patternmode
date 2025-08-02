/**
 * Progress Circle Component.
 *
 * A circular progress indicator for displaying completion status, loading states,
 * and quantitative data visualization. Features customizable styling, animations,
 * and accessibility support.
 *
 * Features:
 * - Circular SVG-based progress visualization
 * - Multiple size variants (xs, sm, md, lg, xl)
 * - Color variants for different states (default, neutral, warning, error, success)
 * - Optional animation with smooth transitions
 * - Customizable radius and stroke width
 * - Label and value display options
 * - Full accessibility support with ARIA attributes
 * - Custom content support
 * - Value formatting functions.
 *
 * @category ui
 * @icon Circle
 * @example
 * ```tsx
 * // Basic progress circle
 * <ProgressCircle value={75} />
 *
 * // With label and value display
 * <ProgressCircle
 *   value={60}
 *   label="Completion"
 *   showValue
 *   variant="success"
 * />
 *
 * // Custom size and styling
 * <ProgressCircle
 *   value={45}
 *   size="lg"
 *   variant="warning"
 *   valueFormatter={(val, max) => `${val}/${max} tasks`}
 * />
 *
 * // Loading state
 * <ProgressCircle
 *   value={null}
 *   variant="neutral"
 *   showAnimation={false}
 * />
 *
 * // Custom content
 * <ProgressCircle value={90} variant="success">
 *   <div className="text-center">
 *     <CheckIcon className="w-6 h-6 text-green-500" />
 *     <span className="text-sm text-zinc-600">Complete</span>
 *   </div>
 * </ProgressCircle>
 *
 * // Data visualization
 * <ProgressCircle
 *   value={2.5}
 *   max={5}
 *   label="Rating"
 *   showValue
 *   valueFormatter={(val, max) => `${val?.toFixed(1) || 0}⭐`}
 *   className="mx-auto"
 * />
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../../lib/utils";
import {
  clampValue,
  defaultValueFormatter,
  getProgressPercentage,
  progressAnimationClasses,
  progressLabelVariants,
  progressValueVariants,
  sharedProgressVariants,
} from "../../progress-utils";

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

/**
 * Props for the ProgressCircle component.
 *
 * Configuration for circular progress indicators with styling, behavior,
 * and accessibility options.
 *
 * @interface ProgressCircleProps
 * @augments Omit<React.HTMLAttributes<HTMLDivElement>, "value">
 * @augments VariantProps<typeof progressCircleVariants>
 */
type ProgressCircleProps = {
  /**
   * Current progress value (0 to max), null for indeterminate state.
   */
  "value"?: number | null;
  /**
   * Maximum value for progress calculation.
   */
  "max"?: number;
  /**
   * Circle radius in pixels (overrides size variants).
   */
  "radius"?: number;
  /**
   * Stroke width of the progress circle.
   */
  "strokeWidth"?: number;
  /**
   * Custom content to display in the center.
   */
  "children"?: React.ReactNode;
  /**
   * Label text to display.
   */
  "label"?: string;
  /**
   * Whether to show the current value.
   */
  "showValue"?: boolean;
  /**
   * Function to format the displayed value.
   */
  "valueFormatter"?: (value: number | null, max: number) => string;
  /**
   * Accessible label for screen readers.
   */
  "aria-label"?: string;
  /**
   * ID of element describing the progress.
   */
  "aria-describedby"?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "value"> & VariantProps<typeof progressCircleVariants>;

/**
 * Circular progress indicator component for visualizing completion status.
 *
 * Displays progress as a circular arc with customizable styling, animations,
 * and content. Perfect for dashboards, loading states, and data visualization.
 *
 * @param value - Current progress value (0 to max).
 * @param max - Maximum value for progress calculation.
 * @param radius - Circle radius in pixels.
 * @param strokeWidth - Stroke width of the circle.
 * @param showAnimation - Whether to animate progress changes.
 * @param variant - Color scheme variant.
 * @param size - Size variant (xs, sm, md, lg, xl).
 * @param label - Optional label text.
 * @param showValue - Whether to display the current value.
 * @param valueFormatter - Function to format displayed values.
 * @param children - Custom content for the center area.
 *
 *
 * @id progress-circle
 * @name Progress Circle
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ProgressCircle value={75} />
 *
 * // With label and value
 * <ProgressCircle
 *   value={60}
 *   label="Progress"
 *   showValue
 *   variant="success"
 * />
 *
 * // Custom formatting
 * <ProgressCircle
 *   value={8}
 *   max={10}
 *   valueFormatter={(val, max) => `${val}/${max} complete`}
 * />
 *
 * // Large size with custom content
 * <ProgressCircle value={90} size="lg">
 *   <CheckIcon className="w-8 h-8 text-green-500" />
 * </ProgressCircle>
 * ```
 */
/**
 * Circular progress indicator for displaying completion percentage in compact spaces.
 *
 * @id progress-circle
 * @name ProgressCircle
 * @icon Circle
 * @category ui
 * @component
 * @see {@link https://www.base-ui.com/react/components/progress}
 * @param props - Component properties.
 */
const ProgressCircle = (
  { ref, value = 0, max = 100, radius = 32, strokeWidth = 6, showAnimation = true, variant = "default", size, className, children, label, showValue = false, valueFormatter, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, ...props }: ProgressCircleProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
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
