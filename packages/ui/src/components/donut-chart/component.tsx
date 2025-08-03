// Tremor DonutChart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Donut Chart Component.
 *
 * A donut and pie chart component built on Recharts for visualizing proportional data.
 * Supports both donut (with center hole) and pie (solid circle) variants with interactive features.
 */

"use client";

import type { AvailableChartColorsKeys } from "../../lib/chartUtils";
import React from "react";

import {
  Pie,
  PieChart as ReChartsDonutChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

import {
  AvailableChartColors,
  constructCategoryColors,
  getColorClassName,
} from "../../lib/chartUtils";
import { cx } from "../../lib/utils";

/**
 * Sums all values in a numeric array.
 */
const sumNumericArray = (arr: number[]): number =>
  arr.reduce((sum, num) => sum + num, 0);

/**
 * Parses chart data and adds color information.
 */
const parseData = (
  data: Record<string, any>[],
  categoryColors: Map<string, AvailableChartColorsKeys>,
  category: string,
) =>
  data.map(dataPoint => ({
    ...dataPoint,
    color: categoryColors.get(dataPoint[category]) || AvailableChartColors[0],
    className: getColorClassName(
      categoryColors.get(dataPoint[category]) || AvailableChartColors[0],
      "fill",
    ),
  }));

/**
 * Calculates the total value for center label display.
 */
const calculateDefaultLabel = (data: any[], valueKey: string): number => {
  if (!data || !Array.isArray(data) || !valueKey) { return 0; }
  return sumNumericArray(
    data
      .map(dataPoint => dataPoint?.[valueKey])
      .filter(value => typeof value === "number" && !isNaN(value)),
  );
};

/**
 * Processes label input for center display.
 */
const parseLabelInput = (
  labelInput: string | undefined,
  valueFormatter: (value: number) => string,
  data: any[],
  valueKey: string,
): string =>
  labelInput || valueFormatter(calculateDefaultLabel(data, valueKey));

// #region Tooltip

type TooltipProps = Pick<ChartTooltipProps, "active" | "payload">;

/**
 * Individual payload item for chart tooltips.
 */
type PayloadItem = {
  /**
   * Category name for the chart segment.
   */
  category: string;
  /**
   * Numeric value of the segment.
   */
  value: number;
  /**
   * Color theme for the segment.
   */
  color: AvailableChartColorsKeys;
};

/**
 * Props for chart tooltip components.
 */
type ChartTooltipProps = {
  /**
   * Whether tooltip should be visible.
   */
  active: boolean | undefined;
  /**
   * Array of data items to display.
   */
  payload: PayloadItem[];
  /**
   * Function to format values for display.
   */
  valueFormatter: (value: number) => string;
};

const ChartTooltip = ({
  active,
  payload,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          "rounded-md border text-sm shadow-md",
          // border color
          "border-zinc-200 dark:border-zinc-800",
          // background color
          "bg-white dark:bg-zinc-950",
        )}
      >
        <div className={cx("space-y-1 px-4 py-2")}>
          {payload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    "size-2 shrink-0 rounded-full",
                    getColorClassName(color, "bg"),
                  )}
                />
                <p
                  className={cx(
                    // base
                    "text-right whitespace-nowrap",
                    // text color
                    "text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  "text-right font-medium whitespace-nowrap tabular-nums",
                  // text color
                  "text-zinc-900 dark:text-zinc-50",
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

/**
 * Renders inactive chart segments with reduced opacity.
 */
const renderInactiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, className }
    = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      className={className}
      fill=""
      opacity={0.3}
      style={{ outline: "none" }}
    />
  );
};

/**
 * Chart variant type definition.
 */
type DonutChartVariant = "donut" | "pie";

/**
 * Base event properties for chart interactions.
 */
type BaseEventProps = {
  /**
   * Event type identifier.
   */
  eventType: "sector";
  /**
   * Category that was clicked.
   */
  categoryClicked: string;
  /**
   * Additional event data.
   */
  [key: string]: number | string;
};

/**
 * Event handler props for donut chart interactions.
 */
type DonutChartEventProps = BaseEventProps | null | undefined;

type DonutChartProps = {
  /**
   * Array of data objects for chart rendering.
   * Each object should contain category and value fields.
   */
  data: Record<string, any>[];
  /**
   * Key name for category field in data.
   * This field will be used to identify different segments.
   */
  category: string;
  /**
   * Key name for value field in data.
   * This field should contain numeric values for chart segments.
   */
  value: string;
  /**
   * Color themes for chart segments.
   * Array of color names to apply to different segments.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Chart variant (donut with center hole or solid pie).
   * @default "donut"
   */
  variant?: DonutChartVariant;
  /**
   * Function to format values for display.
   * Used in tooltips and center labels.
   * @default (value) => value.toString()
   */
  valueFormatter?: (value: number) => string;
  /**
   * Custom label text for center display.
   * Only shown when showLabel is true and variant is "donut".
   */
  label?: string;
  /**
   * Whether to show center label (donut variant only).
   * @default false
   */
  showLabel?: boolean;
  /**
   * Whether to show tooltips on hover.
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Callback for chart click interactions.
   * Called when user clicks on chart segments.
   */
  onValueChange?: (value: DonutChartEventProps) => void;
  /**
   * Callback for tooltip events.
   * Called when tooltip state changes.
   */
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  /**
   * Custom tooltip component.
   * Replaces the default tooltip with custom implementation.
   */
  customTooltip?: React.ComponentType<TooltipProps>;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Donut chart component for displaying proportional data with a hollow center.
 */
const DonutChart = (
  { ref: forwardedRef, data = [], value, category, colors = AvailableChartColors, variant = "donut", valueFormatter = (value: number) => value.toString(), label, showLabel = false, showTooltip = true, onValueChange, tooltipCallback, customTooltip, className, ...other }: DonutChartProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const CustomTooltip = customTooltip;
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
    undefined,
  );
    // Safety checks for required props
  if (!value || !category) {
    console.warn("DonutChart: Both \"value\" and \"category\" props are required");
    return (
      <div
        ref={forwardedRef}
        className={cx("h-40 w-40 flex items-center justify-center text-sm text-zinc-500", className)}
        tremor-id="tremor-raw"
        {...other}
      >
        Missing required props
      </div>
    );
  }

  const validData = data.filter(item =>
    item
    && typeof item === "object"
    && item[category] != null
    && typeof item[value] === "number"
    && !isNaN(item[value]),
  );

  const isDonut = variant === "donut";
  const parsedLabelInput = parseLabelInput(
    label,
    valueFormatter,
    validData,
    value,
  );

  // Handle empty or invalid data
  if (validData.length === 0) {
    return (
      <div
        ref={forwardedRef}
        className={cx("h-40 w-40 flex items-center justify-center text-sm text-zinc-500", className)}
        tremor-id="tremor-raw"
        {...other}
      >
        No data available
      </div>
    );
  }

  const categories = Array.from(new Set(validData.map(item => item[category])));
  const categoryColors = constructCategoryColors(categories, colors);

  const prevActiveRef = React.useRef<boolean | undefined>(undefined);
  const prevCategoryRef = React.useRef<string | undefined>(undefined);

  const handleShapeClick = (
    data: any,
    index: number,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    if (!onValueChange) { return; }

    if (activeIndex === index) {
      setActiveIndex(undefined);
      onValueChange(null);
    }
    else {
      setActiveIndex(index);
      onValueChange({
        eventType: "sector",
        categoryClicked: data.payload[category],
        ...data.payload,
      });
    }
  };

  return (
    <div
      ref={forwardedRef}
      className={cx("h-40 w-40", className)}
      tremor-id="tremor-raw"
      {...other}
    >
      <ResponsiveContainer className="size-full">
        <ReChartsDonutChart
          onClick={
            onValueChange && activeIndex !== undefined
              ? () => {
                  setActiveIndex(undefined);
                  onValueChange(null);
                }
              : undefined
          }
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {showLabel && isDonut && (
            <text
              className="fill-zinc-700 dark:fill-zinc-300"
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {parsedLabelInput}
            </text>
          )}
          <Pie
            className={cx(
              "stroke-white dark:stroke-zinc-950 [&_.recharts-pie-sector]:outline-hidden",
              onValueChange ? "cursor-pointer" : "cursor-default",
            )}
            data={parseData(validData, categoryColors, category)}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={isDonut ? "75%" : "0%"}
            outerRadius="100%"
            stroke=""
            strokeLinejoin="round"
            dataKey={value}
            nameKey={category}
            isAnimationActive={false}
            onClick={handleShapeClick}
            inactiveShape={renderInactiveShape}
            style={{ outline: "none" }}
          />
          {showTooltip && (
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              content={({ active, payload }) => {
                const cleanPayload = payload
                  ? payload.map((item: any) => ({
                      category: item.payload[category],
                      value: item.value,
                      color: categoryColors.get(
                        item.payload[category],
                      ) as AvailableChartColorsKeys,
                    }))
                  : [];

                const payloadCategory: string = cleanPayload[0]?.category;

                if (
                  tooltipCallback
                  && (active !== prevActiveRef.current
                    || payloadCategory !== prevCategoryRef.current)
                ) {
                  tooltipCallback({
                    active,
                    payload: cleanPayload,
                  });
                  prevActiveRef.current = active;
                  prevCategoryRef.current = payloadCategory;
                }

                return showTooltip && active
                  ? (
                      CustomTooltip
                        ? (
                            <CustomTooltip active={active} payload={cleanPayload} />
                          )
                        : (
                            <ChartTooltip
                              active={active}
                              payload={cleanPayload}
                              valueFormatter={valueFormatter}
                            />
                          )
                    )
                  : null;
              }}
            />
          )}
        </ReChartsDonutChart>
      </ResponsiveContainer>
    </div>
  );
};

DonutChart.displayName = "DonutChart";

export { DonutChart, type DonutChartEventProps, type DonutChartProps, type TooltipProps };
