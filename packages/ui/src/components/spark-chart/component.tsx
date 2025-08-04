// Tremor Spark Chart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { AxisDomain } from "recharts/types/util/types";

import type { AvailableChartColorsKeys } from "../../lib/chartUtils";
import React from "react";

import {
  Area,
  Bar,
  Line,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  AvailableChartColors,

  constructCategoryColors,
  getColorClassName,
  getYAxisDomain,
} from "../../lib/chartUtils";
import { cx } from "../../lib/utils";

// #region SparkAreaChart

type SparkAreaChartProps = {
  /**
   * Array of data objects to display in the chart.
   * Each object should contain keys matching the index and categories.
   */
  data: Record<string, any>[];
  /**
   * Array of category names to plot as data series.
   * These should match keys in the data objects.
   */
  categories: string[];
  /**
   * Key name for the x-axis data field in each data object.
   * Used to identify the horizontal axis values.
   */
  index: string;
  /**
   * Array of color names for chart styling.
   * Uses predefined color palette for consistent theming.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Whether to automatically calculate minimum value for better scaling.
   * When true, chart will start from the minimum data value instead of zero.
   */
  autoMinValue?: boolean;
  /**
   * Explicit minimum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  minValue?: number;
  /**
   * Explicit maximum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  maxValue?: number;
  /**
   * Whether to connect null data points with lines.
   * When true, gaps in data will be bridged with connecting lines.
   */
  connectNulls?: boolean;
  /**
   * Chart stacking type for multiple data series.
   * Controls how multiple categories are displayed relative to each other.
   */
  type?: "default" | "stacked" | "percent";
  /**
   * Area fill style for visual appearance.
   * Controls the opacity and gradient of filled areas.
   */
  fill?: "gradient" | "solid" | "none";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Minimal sparkline area chart for inline data visualization and trend indication.
 */
const SparkAreaChart = ({ ref: forwardedRef, ...props }: SparkAreaChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const {
    data = [],
    categories = [],
    index,
    colors = AvailableChartColors,
    autoMinValue = false,
    minValue,
    maxValue,
    connectNulls = false,
    type = "default",
    className,
    fill = "gradient",
    ...other
  } = props;

  const categoryColors = constructCategoryColors(categories, colors);
  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const stacked = type === "stacked" || type === "percent";
  const areaId = React.useId();

  const getFillContent = (fillType: SparkAreaChartProps["fill"]) => {
    switch (fillType) {
      case "none":
        return <stop stopColor="currentColor" stopOpacity={0} />;
      case "gradient":
        return (
          <>
            <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </>
        );
      case "solid":
        return <stop stopColor="currentColor" stopOpacity={0.3} />;
      default:
        return <stop stopColor="currentColor" stopOpacity={0.3} />;
    }
  };

  return (
    <div
      ref={forwardedRef}
      className={cx("h-12 w-28", className)}
      tremor-id="tremor-raw"
      data-testid="spark-chart"
      {...other}
    >
      <ResponsiveContainer>
        <RechartsAreaChart
          data={data}
          margin={{
            bottom: 1,
            left: 1,
            right: 1,
            top: 1,
          }}
          stackOffset={type === "percent" ? "expand" : undefined}
        >
          <XAxis hide dataKey={index} />
          <YAxis hide={true} domain={yAxisDomain as AxisDomain} />

          {categories.map((category) => {
            const categoryId = `${areaId}-${category.replace(
              /[^a-z0-9]/gi,
              "",
            )}`;
            return (
              <React.Fragment key={category}>
                <defs>
                  <linearGradient
                    key={category}
                    className={cx(
                      getColorClassName(
                        categoryColors.get(
                          category,
                        ) as AvailableChartColorsKeys,
                        "text",
                      ),
                    )}
                    id={categoryId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    {getFillContent(fill)}
                  </linearGradient>
                </defs>
                <Area
                  className={cx(
                    getColorClassName(
                      categoryColors.get(
                        category,
                      ) as AvailableChartColorsKeys,
                      "stroke",
                    ),
                  )}
                  dot={false}
                  strokeOpacity={1}
                  name={category}
                  type="linear"
                  dataKey={category}
                  stroke=""
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  isAnimationActive={false}
                  connectNulls={connectNulls}
                  stackId={stacked ? "stack" : undefined}
                  fill={`url(#${categoryId})`}
                />
              </React.Fragment>
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

SparkAreaChart.displayName = "SparkAreaChart";

// #region SparkLineChart

type SparkLineChartProps = {
  /**
   * Array of data objects to display in the chart.
   * Each object should contain keys matching the index and categories.
   */
  data: Record<string, any>[];
  /**
   * Array of category names to plot as data series.
   * These should match keys in the data objects.
   */
  categories: string[];
  /**
   * Key name for the x-axis data field in each data object.
   * Used to identify the horizontal axis values.
   */
  index: string;
  /**
   * Array of color names for chart styling.
   * Uses predefined color palette for consistent theming.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Whether to automatically calculate minimum value for better scaling.
   * When true, chart will start from the minimum data value instead of zero.
   */
  autoMinValue?: boolean;
  /**
   * Explicit minimum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  minValue?: number;
  /**
   * Explicit maximum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  maxValue?: number;
  /**
   * Whether to connect null data points with lines.
   * When true, gaps in data will be bridged with connecting lines.
   */
  connectNulls?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Minimal sparkline line chart for inline data visualization and trend indication.
 */
const SparkLineChart = ({ ref: forwardedRef, ...props }: SparkLineChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const {
    data = [],
    categories = [],
    index,
    colors = AvailableChartColors,
    autoMinValue = false,
    minValue,
    maxValue,
    connectNulls = false,
    className,
    ...other
  } = props;

  const categoryColors = constructCategoryColors(categories, colors);
  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

  return (
    <div
      ref={forwardedRef}
      className={cx("h-12 w-28", className)}
      tremor-id="tremor-raw"
      data-testid="spark-chart"
      {...other}
    >
      <ResponsiveContainer>
        <RechartsLineChart
          data={data}
          margin={{
            bottom: 1,
            left: 1,
            right: 1,
            top: 1,
          }}
        >
          <XAxis hide dataKey={index} />
          <YAxis hide={true} domain={yAxisDomain as AxisDomain} />
          {categories.map(category => (
            <Line
              className={cx(
                getColorClassName(
                  categoryColors.get(category) as AvailableChartColorsKeys,
                  "stroke",
                ),
              )}
              dot={false}
              strokeOpacity={1}
              key={category}
              name={category}
              type="linear"
              dataKey={category}
              stroke=""
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              isAnimationActive={false}
              connectNulls={connectNulls}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

SparkLineChart.displayName = "SparkLineChart";

// #region SparkBarChart

type BarChartProps = {
  /**
   * Array of data objects to display in the chart.
   * Each object should contain keys matching the index and categories.
   */
  data: Record<string, any>[];
  /**
   * Key name for the x-axis data field in each data object.
   * Used to identify the horizontal axis values.
   */
  index: string;
  /**
   * Array of category names to plot as data series.
   * These should match keys in the data objects.
   */
  categories: string[];
  /**
   * Array of color names for chart styling.
   * Uses predefined color palette for consistent theming.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Whether to automatically calculate minimum value for better scaling.
   * When true, chart will start from the minimum data value instead of zero.
   */
  autoMinValue?: boolean;
  /**
   * Explicit minimum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  minValue?: number;
  /**
   * Explicit maximum value for the y-axis.
   * Overrides automatic calculation when set.
   */
  maxValue?: number;
  /**
   * Gap between bar categories as string or number.
   * Controls spacing between different data series.
   */
  barCategoryGap?: string | number;
  /**
   * Chart stacking type for multiple data series.
   * Controls how multiple categories are displayed relative to each other.
   */
  type?: "default" | "stacked" | "percent";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Minimal sparkline bar chart for inline data visualization and trend indication.
 */
const SparkBarChart = ({ ref: forwardedRef, ...props }: BarChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const {
    data = [],
    categories = [],
    index,
    colors = AvailableChartColors,
    autoMinValue = false,
    minValue,
    maxValue,
    barCategoryGap,
    type = "default",
    className,
    ...other
  } = props;

  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const stacked = type === "stacked" || type === "percent";

  return (
    <div
      ref={forwardedRef}
      className={cx("h-12 w-28", className)}
      tremor-id="tremor-raw"
      data-testid="spark-chart"
      {...other}
    >
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
          margin={{
            bottom: 1,
            left: 1,
            right: 1,
            top: 1,
          }}
          stackOffset={type === "percent" ? "expand" : undefined}
          barCategoryGap={barCategoryGap}
        >
          <XAxis hide dataKey={index} />
          <YAxis hide={true} domain={yAxisDomain as AxisDomain} />

          {categories.map(category => (
            <Bar
              className={cx(
                getColorClassName(
                  categoryColors.get(category) as AvailableChartColorsKeys,
                  "fill",
                ),
              )}
              key={category}
              name={category}
              type="linear"
              dataKey={category}
              stackId={stacked ? "stack" : undefined}
              isAnimationActive={false}
              fill=""
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

SparkBarChart.displayName = "SparkBarChart";

export { type BarChartProps, SparkAreaChart, type SparkAreaChartProps, SparkBarChart, SparkLineChart, type SparkLineChartProps };
