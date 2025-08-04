import type { VariantProps } from "tailwind-variants";

import { Progress as BaseProgress } from "@base-ui-components/react/progress";
import React from "react";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";
import {
  defaultValueFormatter,
  progressAnimationClasses,
  progressLabelVariants,
  progressValueVariants,
  sharedProgressVariants,
} from "../progress-utils";

/**
 * Tailwind variants for progress components.
 *
 * Defines styling slots for different parts of the progress indicator
 * with variants for colors and animation states.
 */
const progressVariants = tv({
  slots: {
    /**
     * Root container with horizontal layout.
     */
    root: "flex w-full items-center",
    /**
     * Track background container.
     */
    track: "relative flex h-1.5 w-full items-center rounded-full",
    /**
     * Progress indicator fill.
     */
    indicator: "h-full flex-col rounded-full",
    /**
     * Label text styling.
     */
    label: [progressLabelVariants.base, "ml-2 whitespace-nowrap"],
    /**
     * Value text styling.
     */
    value: [progressValueVariants.base, "ml-2 whitespace-nowrap"],
  },
  variants: {
    variant: {
      /**
       * Default blue color scheme.
       */
      default: {
        track: `bg-${sharedProgressVariants.default.lightBg} dark:bg-${sharedProgressVariants.default.darkBg}`,
        indicator: `bg-${sharedProgressVariants.default.light} dark:bg-${sharedProgressVariants.default.dark}`,
      },
      /**
       * Neutral gray color scheme.
       */
      neutral: {
        track: `bg-${sharedProgressVariants.neutral.lightBg} dark:bg-${sharedProgressVariants.neutral.darkBg}`,
        indicator: `bg-${sharedProgressVariants.neutral.light} dark:bg-${sharedProgressVariants.neutral.dark}`,
      },
      /**
       * Warning yellow/orange color scheme.
       */
      warning: {
        track: `bg-${sharedProgressVariants.warning.lightBg} dark:bg-${sharedProgressVariants.warning.darkBg}`,
        indicator: `bg-${sharedProgressVariants.warning.light} dark:bg-${sharedProgressVariants.warning.dark}`,
      },
      /**
       * Error red color scheme.
       */
      error: {
        track: `bg-${sharedProgressVariants.error.lightBg} dark:bg-${sharedProgressVariants.error.darkBg}`,
        indicator: `bg-${sharedProgressVariants.error.light} dark:bg-${sharedProgressVariants.error.dark}`,
      },
      /**
       * Success green color scheme.
       */
      success: {
        track: `bg-${sharedProgressVariants.success.lightBg} dark:bg-${sharedProgressVariants.success.darkBg}`,
        indicator: `bg-${sharedProgressVariants.success.light} dark:bg-${sharedProgressVariants.success.dark}`,
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
  },
  defaultVariants: {
    variant: "default",
    showAnimation: true,
  },
});

/**
 * Root progress component built on Base UI's Progress primitive.
 */
const Progress = (props: React.ComponentPropsWithoutRef<typeof BaseProgress.Root>) => (
  <BaseProgress.Root data-testid="progress" {...props}>
    {props.children}
  </BaseProgress.Root>
);
Progress.displayName = "Progress";

/**
 * Progress track component containing the background rail.
 */
const ProgressTrack = ({ ref, className, variant, showAnimation, ...props }: React.ComponentPropsWithoutRef<typeof BaseProgress.Track>
  & VariantProps<typeof progressVariants> & { ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Track> | null> }) => {
  const { track } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Track
      ref={ref}
      className={cx(track(), className)}
      {...props}
    />
  );
};
ProgressTrack.displayName = "ProgressTrack";

/**
 * Visual indicator showing progress completion.
 */
const ProgressIndicator = ({ ref, className, variant, showAnimation, ...props }: React.ComponentPropsWithoutRef<typeof BaseProgress.Indicator>
  & VariantProps<typeof progressVariants> & { ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Indicator> | null> }) => {
  const { indicator } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Indicator
      ref={ref}
      className={cx(indicator(), className)}
      {...props}
    />
  );
};
ProgressIndicator.displayName = "ProgressIndicator";

/**
 * Accessible label for the progress bar.
 */
const ProgressLabel = ({ ref, className, variant, showAnimation, ...props }: React.ComponentPropsWithoutRef<typeof BaseProgress.Label>
  & VariantProps<typeof progressVariants> & { ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Label> | null> }) => {
  const { label } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Label
      ref={ref}
      className={cx(label(), className)}
      {...props}
    />
  );
};
ProgressLabel.displayName = "ProgressLabel";

/**
 * Displays the current progress value.
 */
const ProgressValue = ({ ref, className, variant, showAnimation, ...props }: React.ComponentPropsWithoutRef<typeof BaseProgress.Value>
  & VariantProps<typeof progressVariants> & { ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Value> | null> }) => {
  const { value } = progressVariants({ variant, showAnimation });
  return (
    <BaseProgress.Value
      ref={ref}
      className={cx(value(), className)}
      {...props}
    />
  );
};
ProgressValue.displayName = "ProgressValue";

/**
 * Props for the ProgressBar component.
 */
type ProgressBarProps = {
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
  variant?: VariantProps<typeof progressVariants>["variant"];
  /**
   * Whether to enable smooth animation transitions.
   * When true, progress changes animate smoothly; when false, changes are instant.
   */
  showAnimation?: boolean;
} & React.ComponentPropsWithoutRef<typeof BaseProgress.Root>;

/**
 * Complete progress bar with all components composed together.
 */
const ProgressBar = (
  { ref, value = 0, max = 100, label, showValue = false, valueFormatter, showAnimation = true, variant = "default", className, ...props }: ProgressBarProps & { ref?: React.RefObject<React.ElementRef<typeof BaseProgress.Root> | null> },
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
};
ProgressBar.displayName = "ProgressBar";

export {
  Progress,
  ProgressBar,
  type ProgressBarProps,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  progressVariants,
};
