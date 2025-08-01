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
  data: Record<string, any>[];
  categories: string[];
  index: string;
  colors?: AvailableChartColorsKeys[];
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  connectNulls?: boolean;
  type?: "default" | "stacked" | "percent";
  fill?: "gradient" | "solid" | "none";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Minimal sparkline chart for inline data visualization and trend indication.
 *
 * @id spark-chart
 * @name SparkChart
 * @icon TrendingUp
 * @category charts
 * @component
 * @see {@link https://recharts.org/en-US/api/LineChart}
 * @param props - Component properties.
 * @param props.data - Array of data objects to display in the chart.
 * @param props.categories - Array of category names to plot.
 * @param props.index - Key name for the x-axis data field.
 * @param props.colors - Array of color names for chart styling.
 * @param props.autoMinValue - Whether to automatically calculate minimum value.
 * @param props.minValue - Explicit minimum value for the y-axis.
 * @param props.maxValue - Explicit maximum value for the y-axis.
 * @param props.connectNulls - Whether to connect null data points with lines.
 * @param props.type - Chart stacking type (default, stacked, percent).
 * @param props.fill - Area fill style (gradient, solid, none).
 * @param props.className - Additional CSS classes.
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
  data: Record<string, any>[];
  categories: string[];
  index: string;
  colors?: AvailableChartColorsKeys[];
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  connectNulls?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

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
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  barCategoryGap?: string | number;
  type?: "default" | "stacked" | "percent";
} & React.HTMLAttributes<HTMLDivElement>;

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
