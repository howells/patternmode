// CategoryBar Component [v1.0.0] - Pure Implementation

"use client";

import type {
  AvailableChartColorsKeys,
} from "../../lib/chartUtils";

import React from "react";

import {
  AvailableChartColors,
  getColorClassName,
} from "../../lib/chartUtils";
import { cx } from "../../lib/utils";
import { Tooltip } from "../tooltip";

/**
 * Determines the background color for the marker based on its position.
 *
 * Calculates which category segment the marker falls into and returns
 * the corresponding color class.
 *
 * @param marker - Marker position value.
 * @param values - Array of category values.
 * @param colors - Array of color themes for categories.
 * @returns CSS color class name.
 */
const getMarkerBgColor = (
  marker: number | undefined,
  values: number[],
  colors: AvailableChartColorsKeys[],
): string => {
  if (marker === undefined) {
    return "";
  }

  if (marker === 0) {
    for (let index = 0; index < values.length; index++) {
      if (values[index] > 0) {
        return getColorClassName(colors[index], "bg");
      }
    }
  }

  let prefixSum = 0;
  for (let index = 0; index < values.length; index++) {
    prefixSum += values[index];
    if (prefixSum >= marker) {
      return getColorClassName(colors[index], "bg");
    }
  }

  return getColorClassName(colors[values.length - 1], "bg");
};

/**
 * Calculates the left position percentage for a value.
 *
 * Converts an absolute value to a percentage position within the total range.
 *
 * @param value - Value to position.
 * @param maxValue - Maximum value in the range.
 * @returns Percentage position (0-100).
 */
const getPositionLeft = (value: number | undefined, maxValue: number): number =>
  value ? (value / maxValue) * 100 : 0;

/**
 * Sums all values in a numeric array.
 *
 * Helper function for calculating total values in category data.
 *
 * @param arr - Array of numbers to sum.
 * @returns Total sum of array values.
 */
const sumNumericArray = (arr: number[]) =>
  arr.reduce((prefixSum, num) => prefixSum + num, 0);

/**
 * Formats numbers for display in labels.
 *
 * Shows integers as-is and decimals rounded to one decimal place.
 *
 * @param num - Number to format.
 * @returns Formatted number string.
 */
const formatNumber = (num: number): string => {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(1);
};

const BarLabels = ({ values }: { values: number[] }) => {
  const sumValues = React.useMemo(() => sumNumericArray(values), [values]);
  let prefixSum = 0;
  let sumConsecutiveHiddenLabels = 0;

  return (
    <div
      className={cx(
        // base
        "relative mb-2 flex h-5 w-full text-sm font-medium",
        // text color
        "text-zinc-700 dark:text-zinc-300",
      )}
    >
      <div className="absolute bottom-0 left-0 flex items-center">0</div>
      {values.map((widthPercentage, index) => {
        prefixSum += widthPercentage;

        const showLabel
          = (widthPercentage >= 0.1 * sumValues
            || sumConsecutiveHiddenLabels >= 0.09 * sumValues)
          && sumValues - prefixSum >= 0.1 * sumValues
          && prefixSum >= 0.1 * sumValues
          && prefixSum < 0.9 * sumValues;

        sumConsecutiveHiddenLabels = showLabel
          ? 0
          : (sumConsecutiveHiddenLabels += widthPercentage);

        const widthPositionLeft = getPositionLeft(widthPercentage, sumValues);

        return (
          <div
            key={`item-${index}`}
            className="flex items-center justify-end pr-0.5"
            style={{ width: `${widthPositionLeft}%` }}
          >
            {showLabel
              ? (
                  <span
                    className={cx("block translate-x-1/2 text-sm tabular-nums")}
                  >
                    {formatNumber(prefixSum)}
                  </span>
                )
              : null}
          </div>
        );
      })}
      <div className="absolute right-0 bottom-0 flex items-center">
        {formatNumber(sumValues)}
      </div>
    </div>
  );
};

/**
 * Props for the CategoryBar component.
 */
type CategoryBarProps = {
  /**
   * Array of numeric values for each category.
   * Represents the data points that will be displayed as proportional segments.
   */
  values: number[];
  /**
   * Color themes for each category (defaults to chart colors).
   * Controls the visual appearance of each segment in the bar.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Optional marker with position, tooltip, and animation.
   * Displays a visual indicator at a specific value position on the bar.
   */
  marker?: {
    /**
     * Position value for the marker.
     * Determines where the marker appears along the bar.
     */
    value: number;
    /**
     * Optional tooltip text to show on hover.
     * Provides additional context when users interact with the marker.
     */
    tooltip?: string;
    /**
     * Whether to animate marker position changes.
     * Enables smooth transitions when marker value updates.
     */
    showAnimation?: boolean;
  };
  /**
   * Whether to show numeric labels above the bar.
   * Controls visibility of value indicators along the bar.
   */
  showLabels?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Horizontal bar chart component for categorical data comparison and ranking.
 */
const CategoryBar = (
  { ref: forwardedRef, values = [], colors = AvailableChartColors, marker, showLabels = true, className, ...props }: CategoryBarProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const markerBgColor = React.useMemo(
    () => getMarkerBgColor(marker?.value, values, colors),
    [marker, values, colors],
  );

  const maxValue = React.useMemo(() => sumNumericArray(values), [values]);

  const adjustedMarkerValue = React.useMemo(() => {
    if (marker === undefined) { return undefined; }
    if (marker.value < 0) { return 0; }
    if (marker.value > maxValue) { return maxValue; }
    return marker.value;
  }, [marker, maxValue]);

  const markerPositionLeft: number = React.useMemo(
    () => getPositionLeft(adjustedMarkerValue, maxValue),
    [adjustedMarkerValue, maxValue],
  );

  return (
    <div
      ref={forwardedRef}
      className={cx(className)}
      aria-label="Category bar"
      aria-valuenow={marker?.value}
      tremor-id="tremor-raw"
      {...props}
    >
      {showLabels ? <BarLabels values={values} /> : null}
      <div className="relative flex h-1.5 w-full items-center">
        <div className="flex h-full flex-1 items-center gap-0.5 overflow-hidden rounded-full">
          {values.map((value, index) => {
            const barColor = colors[index] ?? "gray";
            const percentage = (value / maxValue) * 100;
            return (
              <div
                key={`item-${index}`}
                className={cx(
                  "h-full",
                  getColorClassName(
                    barColor as AvailableChartColorsKeys,
                    "bg",
                  ),
                  percentage === 0 && "hidden",
                )}
                style={{ width: `${percentage}%` }}
              />
            );
          })}
        </div>

        {marker !== undefined
          ? (
              <div
                className={cx(
                  "absolute w-2 -translate-x-1/2",
                  marker.showAnimation
                  && "transform-gpu transition-all duration-300 ease-in-out",
                )}
                style={{
                  left: `${markerPositionLeft}%`,
                }}
              >
                {marker.tooltip
                  ? (
                      <Tooltip content={marker.tooltip}>
                        <div
                          aria-hidden="true"
                          className={cx(
                            "relative mx-auto h-4 w-1 rounded-full ring-2",
                            "ring-white dark:ring-zinc-950",
                            markerBgColor,
                          )}
                        >
                          <div
                            aria-hidden
                            className="absolute size-7 -translate-x-[45%] -translate-y-[15%]"
                          >
                          </div>
                        </div>
                      </Tooltip>
                    )
                  : (
                      <div
                        className={cx(
                          "mx-auto h-4 w-1 rounded-full ring-2",
                          "ring-white dark:ring-zinc-950",
                          markerBgColor,
                        )}
                      />
                    )}
              </div>
            )
          : null}
      </div>
    </div>
  );
};

CategoryBar.displayName = "CategoryBar";

export { CategoryBar, type CategoryBarProps };
