// Meter Component [v1.0.0] - Base UI Implementation

import type { VariantProps } from "tailwind-variants";

import type { GlobalSemanticVariant } from "../../lib/variants";
import { Meter as BaseMeter } from "@base-ui-components/react/meter";
import * as React from "react";

import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

// Meter-specific color mappings that work well for progress indicators
const meterColorMap = {
  default: {
    track: "bg-blue-200 dark:bg-blue-500/30",
    indicator: "bg-blue-500 dark:bg-blue-500",
  },
  neutral: {
    track: "bg-zinc-200 dark:bg-zinc-500/40",
    indicator: "bg-zinc-500 dark:bg-zinc-500",
  },
  success: {
    track: "bg-emerald-200 dark:bg-emerald-500/30",
    indicator: "bg-emerald-500 dark:bg-emerald-500",
  },
  info: {
    track: "bg-sky-200 dark:bg-sky-500/30",
    indicator: "bg-sky-500 dark:bg-sky-500",
  },
  warning: {
    track: "bg-yellow-200 dark:bg-yellow-500/30",
    indicator: "bg-yellow-500 dark:bg-yellow-500",
  },
  error: {
    track: "bg-red-200 dark:bg-red-500/30",
    indicator: "bg-red-500 dark:bg-red-500",
  },
  critical: {
    track: "bg-rose-200 dark:bg-rose-500/30",
    indicator: "bg-rose-500 dark:bg-rose-500",
  },
  positive: {
    track: "bg-teal-200 dark:bg-teal-500/30",
    indicator: "bg-teal-500 dark:bg-teal-500",
  },
  negative: {
    track: "bg-rose-200 dark:bg-rose-500/30",
    indicator: "bg-rose-500 dark:bg-rose-500",
  },
} as const;

const meterVariants = tv({
  slots: {
    track: "",
    indicator: "",
  },
  variants: {
    variant: meterColorMap,
  },
  defaultVariants: {
    variant: "default",
  },
});

type MeterProps = {
  /**
   * Current numeric value to display within the meter range.
   * This value determines how much of the meter track is filled by the indicator.
   */
  value: number;
  /**
   * Minimum value for the meter range.
   * The meter will calculate percentage based on this lower bound.
   * @default 0
   */
  min?: number;
  /**
   * Maximum value for the meter range.
   * The meter will calculate percentage based on this upper bound.
   * @default 100
   */
  max?: number;
  /**
   * Whether to enable smooth animation transitions when the value changes.
   * When true, the indicator will animate smoothly to new positions.
   * @default true
   */
  showAnimation?: boolean;
  /**
   * Whether to display the formatted value text above the meter.
   * Shows either the formatted percentage or custom formatted value.
   * @default true
   */
  showValue?: boolean;
  /**
   * Optional descriptive label text displayed above the meter.
   * Provides context about what the meter is measuring.
   */
  label?: string;
  /**
   * Custom function to format the displayed value text.
   * Receives the current value, min, and max to create custom formatting.
   * If not provided, displays as percentage (e.g., "65%").
   */
  formatValue?: (value: number, min: number, max: number) => string;
  /**
   * Color variant using the global semantic variant system.
   * Controls both the track background and indicator colors.
   * @default "default"
   */
  variant?: GlobalSemanticVariant;
} & React.ComponentPropsWithoutRef<typeof BaseMeter.Root> & VariantProps<typeof meterVariants>;

/**
 * A graphical meter component for displaying scalar values within a known range.
 */
const Meter = (
  { ref, value, min = 0, max = 100, showAnimation = true, showValue = true, label, formatValue, variant, className, ...props }: MeterProps & { ref?: React.RefObject<React.ElementRef<typeof BaseMeter.Root> | null> },
) => {
  const { track, indicator } = meterVariants({ variant });

  const defaultFormatValue = (
    val: number,
    minVal: number,
    maxVal: number,
  ) => {
    const percentage = Math.round(((val - minVal) / (maxVal - minVal)) * 100);
    return `${percentage}%`;
  };

  const formattedValue = formatValue
    ? formatValue(value, min, max)
    : defaultFormatValue(value, min, max);

  return (
    <BaseMeter.Root
      ref={ref}
      value={value}
      min={min}
      max={max}
      className={cx("flex w-full items-center gap-3", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <BaseMeter.Label
                className={cx(
                  // base
                  "text-sm font-medium leading-6",
                  // text color
                  "text-zinc-900 dark:text-zinc-50",
                )}
              >
                {label}
              </BaseMeter.Label>
            )}
            {showValue && (
              <BaseMeter.Value
                className={cx(
                  // base
                  "text-sm font-medium leading-6 tabular-nums",
                  // text color
                  "text-zinc-900 dark:text-zinc-50",
                )}
              >
                {formattedValue => formattedValue}
              </BaseMeter.Value>
            )}
          </div>
        )}

        <BaseMeter.Track
          className={cx(
            // base
            "relative h-1.5 w-full overflow-hidden rounded-full",
            // background
            track(),
            // border
            "shadow-[inset_0_0_0_1px] shadow-zinc-200/50 dark:shadow-zinc-800/50",
          )}
        >
          <BaseMeter.Indicator
            className={cx(
              // base
              "h-full rounded-full",
              // background
              indicator(),
              // animation
              showAnimation && "transition-all duration-500 ease-out",
            )}
          />
        </BaseMeter.Track>
      </div>
    </BaseMeter.Root>
  );
};

Meter.displayName = "Meter";

export { Meter, type MeterProps, meterVariants };
