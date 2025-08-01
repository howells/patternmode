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

/**
 * Props for the Meter component.
 *
 * @interface MeterProps
 * @augments React.ComponentPropsWithoutRef<typeof BaseMeter.Root>
 * @augments VariantProps<typeof meterVariants>
 * @example
 * ```tsx
 * <Meter value={75} />
 * ```
 */
type MeterProps = {
  /**
   * Current numeric value to display.
   */
  value: number;
  /**
   * Minimum value (defaults to 0).
   */
  min?: number;
  /**
   * Maximum value (defaults to 100).
   */
  max?: number;
  /**
   * Whether to show animation on value changes.
   */
  showAnimation?: boolean;
  /**
   * Whether to display the current value.
   */
  showValue?: boolean;
  /**
   * Optional label text.
   */
  label?: string;
  /**
   * Custom function to format the displayed value.
   */
  formatValue?: (value: number, min: number, max: number) => string;
  /**
   * Color variant using the global semantic variant system.
   */
  variant?: GlobalSemanticVariant;
} & React.ComponentPropsWithoutRef<typeof BaseMeter.Root> & VariantProps<typeof meterVariants>;

/**
 * A graphical meter component built on Base UI's Meter primitive.
 *
 * Based on Base UI's Meter (https://base-ui.com/react/components/meter),
 * providing accessible visual representation of numeric values within a range.
 * Features optional labels, value display, animations, and multiple color variants
 * perfect for showing progress, usage levels, or status indicators.
 *
 * @category charts
 * @icon Gauge
 * @param value - Current numeric value to display.
 * @param min - Minimum value (defaults to 0).
 * @param max - Maximum value (defaults to 100).
 * @param variant - Color variant (default, neutral, warning, error, success).
 * @param showAnimation - Whether to show smooth transitions.
 * @param showValue - Whether to display the formatted value.
 * @param label - Optional descriptive label.
 * @param formatValue - Custom value formatting function.
 *
 * @component
 * @example
 * ```tsx
 * // Basic meter
 * <Meter value={75} />
 *
 * // With label and custom formatting
 * <Meter
 *   value={24}
 *   max={32}
 *   label="Storage Used"
 *   showValue
 *   formatValue={(value, min, max) => `${value}GB of ${max}GB`}
 * />
 *
 * // Different variants for different states
 * <Meter value={90} variant="success" label="Upload Complete" />
 * <Meter value={45} variant="warning" label="Disk Usage" />
 * <Meter value={95} variant="error" label="Memory Usage" />
 * <Meter value={60} variant="neutral" label="Progress" />
 *
 * // Without animation
 * <Meter value={30} showAnimation={false} />
 *
 * // Custom range
 * <Meter
 *   value={150}
 *   min={0}
 *   max={200}
 *   label="Custom Scale"
 *   showValue
 * />
 *
 * // Multiple meters for comparison
 * <div className="space-y-4">
 *   <Meter value={85} variant="success" label="CPU Usage" />
 *   <Meter value={62} variant="warning" label="Memory Usage" />
 *   <Meter value={40} variant="default" label="Disk Usage" />
 * </div>
 * ```
 *
 * @see https://base-ui.com/react/components/meter - Base UI documentation
 */
/**
 * Meter component for displaying scalar values within a known range with thresholds.
 *
 * @id meter
 * @name Meter
 * @icon Gauge
 * @category ui
 * @component
 * @see {@link https://www.base-ui.com/react/components/meter}
 * @param props - Component properties.
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
