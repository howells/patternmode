// Meter Component [v1.0.0] - Base UI Implementation

import type { MeterProps } from "./types";
import { Meter as BaseMeter } from "@base-ui-components/react/meter";

import * as React from "react";
import { cx } from "../../lib/utils";
import { meterVariants } from "./variants";

/**
 * A graphical meter component for displaying scalar values within a known range.
 */
const Meter = (
  { ref, value, min = 0, max = 100, variant, className, ...props }: MeterProps & { ref?: React.RefObject<React.ElementRef<typeof BaseMeter.Root> | null> },
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
      data-testid="meter"
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

export { Meter };
