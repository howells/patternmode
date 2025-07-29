/**
 * Progress Components
 *
 * A comprehensive progress indicator system built on Base UI Progress components.
 * Provides linear progress bars with configurable styling, animations, labels,
 * and value display options for tracking task completion and loading states.
 *
 * Features:
 * - Base UI Progress integration for full accessibility
 * - Multiple color variants (default, neutral, warning, error, success)
 * - Optional smooth animations with transitions
 * - Label and value display components
 * - Custom value formatting functions
 * - Composed ProgressBar component for easy usage
 * - Consistent styling with design system
 * - Screen reader support and ARIA attributes
 *
 * Built on Base UI Progress documentation:
 * https://base-ui.com/react/components/progress
 *
 * @example
 * ```tsx
 * // Simple progress bar
 * <ProgressBar value={75} />
 *
 * // With label and value display
 * <ProgressBar
 *   value={60}
 *   label="Loading data"
 *   showValue
 *   variant="success"
 * />
 *
 * // Custom composition
 * <Progress value={45} max={100}>
 *   <ProgressLabel>Custom Progress</ProgressLabel>
 *   <ProgressTrack variant="warning">
 *     <ProgressIndicator variant="warning" />
 *   </ProgressTrack>
 *   <ProgressValue>
 *     {(formatted, value) => `${value}% complete`}
 *   </ProgressValue>
 * </Progress>
 *
 * // File upload progress
 * <ProgressBar
 *   value={uploadedBytes}
 *   max={totalBytes}
 *   label="Uploading files"
 *   showValue
 *   valueFormatter={(value, max) =>
 *     `${Math.round((value / max) * 100)}% (${value}/${max} bytes)`
 *   }
 *   variant="default"
 * />
 *
 * // Task completion
 * <ProgressBar
 *   value={completedTasks}
 *   max={totalTasks}
 *   label="Processing tasks"
 *   showValue
 *   valueFormatter={(value, max) => `${value} of ${max} tasks`}
 *   variant="success"
 *   showAnimation
 * />
 * ```
 */

import { cx } from "../../lib/utils";
import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import {
  defaultValueFormatter,
  progressAnimationClasses,
  progressLabelVariants,
  progressValueVariants,
  sharedProgressVariants,
  type ProgressVariant,
} from "../progress-utils";

/**
 * Tailwind variants for progress components.
 *
 * Defines styling slots for different parts of the progress indicator
 * with variants for colors and animation states.
 */
const progressVariants = tv({
  slots: {
    /** Root container with horizontal layout */
    root: "flex w-full items-center",
    /** Track background container */
    track: "relative flex h-1.5 w-full items-center rounded-full",
    /** Progress indicator fill */
    indicator: "h-full flex-col rounded-full",
    /** Label text styling */
    label: [progressLabelVariants.base, "ml-2 whitespace-nowrap"],
    /** Value text styling */
    value: [progressValueVariants.base, "ml-2 whitespace-nowrap"],
  },
  variants: {
    variant: {
      /** Default blue color scheme */
      default: {
        track: `bg-${sharedProgressVariants.default.lightBg} dark:bg-${sharedProgressVariants.default.darkBg}`,
        indicator: `bg-${sharedProgressVariants.default.light} dark:bg-${sharedProgressVariants.default.dark}`,
      },
      /** Neutral gray color scheme */
      neutral: {
        track: `bg-${sharedProgressVariants.neutral.lightBg} dark:bg-${sharedProgressVariants.neutral.darkBg}`,
        indicator: `bg-${sharedProgressVariants.neutral.light} dark:bg-${sharedProgressVariants.neutral.dark}`,
      },
      /** Warning yellow/orange color scheme */
      warning: {
        track: `bg-${sharedProgressVariants.warning.lightBg} dark:bg-${sharedProgressVariants.warning.darkBg}`,
        indicator: `bg-${sharedProgressVariants.warning.light} dark:bg-${sharedProgressVariants.warning.dark}`,
      },
      /** Error red color scheme */
      error: {
        track: `bg-${sharedProgressVariants.error.lightBg} dark:bg-${sharedProgressVariants.error.darkBg}`,
        indicator: `bg-${sharedProgressVariants.error.light} dark:bg-${sharedProgressVariants.error.dark}`,
      },
      /** Success green color scheme */
      success: {
        track: `bg-${sharedProgressVariants.success.lightBg} dark:bg-${sharedProgressVariants.success.darkBg}`,
        indicator: `bg-${sharedProgressVariants.success.light} dark:bg-${sharedProgressVariants.success.dark}`,
      },
    },
    showAnimation: {
      /** Smooth progress animation enabled */
      true: {
        indicator: progressAnimationClasses.enabled,
      },
      /** No animation, instant progress updates */
      false: {
        indicator: progressAnimationClasses.disabled,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    showAnimation: true,
  },
});

/**
 * Root progress component built on Base UI's Progress primitive.
 *
 * Based on Base UI's Progress (https://base-ui.com/react/components/progress),
 * providing accessible progress indicators that display the completion status
 * of long-running tasks. Features proper screen reader support and flexible
 * configuration for different progress visualization needs.
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const Progress = BaseProgress.Root;
Progress.displayName = "Progress";

/**
 * Track container for the progress indicator.
 *
 * Based on Base UI's Progress.Track, providing the background container
 * for the progress indicator. Features variant-based styling with different
 * colors and optional animation support.
 *
 * @param variant - Color variant for the track background
 * @param showAnimation - Whether to show animation on progress changes
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const ProgressTrack = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Track>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Track> &
    VariantProps<typeof progressVariants>
>(({ className, variant, showAnimation, ...props }, ref) => {
  const { track } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Track
      ref={ref}
      className={cx(track(), className)}
      {...props}
    />
  );
});
ProgressTrack.displayName = "ProgressTrack";

/**
 * Visual indicator showing progress completion.
 *
 * Based on Base UI's Progress.Indicator, providing the filled portion
 * that visualizes task completion status. Automatically sized based on
 * the progress value with smooth transitions and variant-based coloring.
 *
 * @param variant - Color variant for the indicator
 * @param showAnimation - Whether to show smooth transition animations
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Indicator>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator> &
    VariantProps<typeof progressVariants>
>(({ className, variant, showAnimation, ...props }, ref) => {
  const { indicator } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Indicator
      ref={ref}
      className={cx(indicator(), className)}
      {...props}
    />
  );
});
ProgressIndicator.displayName = "ProgressIndicator";

/**
 * Accessible label for the progress bar.
 *
 * Based on Base UI's Progress.Label, providing semantic labeling
 * for screen readers and visual context. Essential for accessibility
 * and helps users understand what task is being tracked.
 *
 * @example
 * ```tsx
 * <ProgressLabel>Loading data...</ProgressLabel>
 * <ProgressLabel>Upload progress</ProgressLabel>
 * ```
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const ProgressLabel = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Label>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Label> &
    VariantProps<typeof progressVariants>
>(({ className, variant, showAnimation, ...props }, ref) => {
  const { label } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Label
      ref={ref}
      className={cx(label(), className)}
      {...props}
    />
  );
});
ProgressLabel.displayName = "ProgressLabel";

/**
 * Displays the current progress value.
 *
 * Based on Base UI's Progress.Value, providing formatted display
 * of current progress values. Supports custom formatting functions
 * and automatically updates as progress changes.
 *
 * @example
 * ```tsx
 * <ProgressValue>{(formattedValue, value) => `${value}%`}</ProgressValue>
 * <ProgressValue>{(formattedValue, value) => `${value}/100 items`}</ProgressValue>
 * ```
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const ProgressValue = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Value>,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Value> &
    VariantProps<typeof progressVariants>
>(({ className, variant, showAnimation, ...props }, ref) => {
  const { value } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Value
      ref={ref}
      className={cx(value(), className)}
      {...props}
    />
  );
});
ProgressValue.displayName = "ProgressValue";

/**
 * Props for the ProgressBar component.
 *
 * Configuration for the composed progress bar with label and value display options.
 *
 * @interface ProgressBarProps
 * @extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root>
 * @extends VariantProps<typeof progressVariants>
 */
interface ProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root>,
    VariantProps<typeof progressVariants> {
  /** Optional label text to display next to the progress bar */
  label?: string;
  /** Whether to show the current progress value */
  showValue?: boolean;
  /** Custom function to format the displayed value */
  valueFormatter?: (value: number | null, max: number) => string;
}

/**
 * Complete progress bar with all components composed together.
 *
 * Pre-composed progress bar combining all progress sub-components
 * with sensible defaults. Provides easy-to-use API for common progress
 * bar use cases while maintaining full customization options.
 *
 * @param value - Current progress value
 * @param max - Maximum progress value
 * @param label - Optional label text
 * @param showValue - Whether to display current value
 * @param valueFormatter - Custom value formatting function
 * @param variant - Color variant (default, neutral, warning, error, success)
 * @param showAnimation - Whether to animate progress changes
 *
 * @example
 * ```tsx
 * // Basic progress bar
 * <ProgressBar value={75} />
 *
 * // With label and value display
 * <ProgressBar
 *   value={45}
 *   max={100}
 *   label="Upload progress"
 *   showValue
 *   variant="default"
 * />
 *
 * // Custom value formatting
 * <ProgressBar
 *   value={3}
 *   max={10}
 *   label="Processing files"
 *   showValue
 *   valueFormatter={(value, max) => `${value} of ${max} files`}
 * />
 *
 * // Different variants
 * <ProgressBar value={85} variant="success" />
 * <ProgressBar value={25} variant="warning" />
 * <ProgressBar value={10} variant="error" />
 * ```
 *
 * @see https://base-ui.com/react/components/progress - Base UI documentation
 */
const ProgressBar = React.forwardRef<
  React.ElementRef<typeof BaseProgress.Root>,
  ProgressBarProps
>(
  (
    {
      value = 0,
      max = 100,
      label,
      showValue = false,
      valueFormatter,
      showAnimation = true,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const { root } = progressVariants({ variant, showAnimation });
    const formatValue = valueFormatter || defaultValueFormatter;

    return (
      <Progress
        ref={ref}
        value={value}
        max={max}
        className={cx(root(), className)}
        {...props}
      >
        {label && (
          <ProgressLabel variant={variant} showAnimation={showAnimation}>
            {label}
          </ProgressLabel>
        )}
        <ProgressTrack variant={variant} showAnimation={showAnimation}>
          <ProgressIndicator variant={variant} showAnimation={showAnimation} />
        </ProgressTrack>
        {showValue && (
          <ProgressValue variant={variant} showAnimation={showAnimation}>
            {(formattedValue, val) => formatValue(val, max)}
          </ProgressValue>
        )}
      </Progress>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export {
  Progress,
  ProgressBar,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue, // Composite component for backward compatibility
  progressVariants,
  type ProgressBarProps,
};
