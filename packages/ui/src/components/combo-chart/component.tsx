// Tremor ComboChart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { AxisDomain } from "recharts/types/util/types";

import type { AvailableChartColorsKeys } from "../../lib/chartUtils";
import isEqual from "fast-deep-equal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import {
  Bar,
  CartesianGrid,
  Dot,
  Label,
  Line,
  ComposedChart as RechartsComposedChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useOnWindowResize } from "../../hooks/use-on-window-resize";
import {
  AvailableChartColors,

  constructCategoryColors,
  getColorClassName,
  getYAxisDomain,
  hasOnlyOneValueForKey,
} from "../../lib/chartUtils";
import { cx } from "../../lib/utils";

// #region Shape

/**
 * Renders customized bar shapes with hover and selection states.
 *
 * Creates interactive bar elements with visual feedback for active states.
 * Handles opacity changes based on legend interactions and active selections.
 *
 * @param props - Shape properties from Recharts.
 * @param activeBar - Currently active bar data for comparison.
 * @param activeLegend - Active legend item name.
 * @param layout - Chart layout orientation.
 */
const renderShape = (
  props: any,
  activeBar: any | undefined,
  activeLegend: string | undefined,
  layout: string,
) => {
  const { fillOpacity, name, payload, value } = props;
  let { x, width, y, height } = props;

  if (layout === "horizontal" && height < 0) {
    y += height;
    height = Math.abs(height); // height must be a positive number
  }
  else if (layout === "vertical" && width < 0) {
    x += width;
    width = Math.abs(width); // width must be a positive number
  }

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={
        activeBar || (activeLegend && activeLegend !== name)
          ? isEqual(activeBar, { ...payload, value })
            ? fillOpacity
            : 0.3
          : fillOpacity
      }
    />
  );
};

// #region Legend

/**
 * Props for individual legend items in the chart legend.
 */
type LegendItemProps = {
  /**
   * Category name for the legend item.
   * The display name for this data series in the legend.
   */
  name: string;
  /**
   * Color theme for the visual indicator.
   * Chart color theme used for the legend indicator styling.
   */
  color: AvailableChartColorsKeys;
  /**
   * Click handler for legend interactions.
   * Callback function triggered when the legend item is clicked for filtering.
   */
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
  /**
   * Currently active legend category.
   * Name of the currently selected/active legend item for highlighting.
   */
  activeLegend?: string;
  /**
   * Chart type for styling the indicator.
   * Determines the visual style of the legend indicator (bar or line).
   */
  chartType: "bar" | "line";
};

const LegendItem = ({
  name,
  color,
  onClick,
  activeLegend,
  chartType,
}: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  const colorClass = getColorClassName(color, "bg");

  return (
    <li
      className={cx(
        // base
        "group inline-flex flex-nowrap items-center gap-1.5 rounded-sm px-2 py-1 whitespace-nowrap transition",
        hasOnValueChange
          ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
          : "cursor-default",
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <span
        className={cx(
          { "size-2 rounded-xs": chartType === "bar" },
          {
            "h-[3px] w-3.5 shrink-0 rounded-full": chartType === "line",
          },
          "shrink-0",
          colorClass,
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
        )}
        aria-hidden={true}
      />
      <p
        className={cx(
          // base
          "truncate text-xs whitespace-nowrap",
          // text color
          "text-zinc-700 dark:text-zinc-300",
          hasOnValueChange
          && "group-hover:text-zinc-900 dark:group-hover:text-zinc-50",
          activeLegend && activeLegend !== name ? "opacity-40" : "opacity-100",
        )}
      >
        {name}
      </p>
    </li>
  );
};

type ScrollButtonProps = {
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
};

const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const Icon = icon;
  const [isPressed, setIsPressed] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        onClick?.();
      }, 300);
    }
    else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPressed, onClick]);

  React.useEffect(() => {
    if (disabled) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setIsPressed(false);
    }
  }, [disabled]);

  return (
    <button
      type="button"
      className={cx(
        // base
        "group inline-flex size-5 items-center truncate rounded-sm transition",
        disabled
          ? "cursor-not-allowed text-zinc-400 dark:text-zinc-600"
          : "cursor-pointer text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
      )}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setIsPressed(false);
      }}
    >
      <Icon className="size-full" aria-hidden="true" />
    </button>
  );
};

type LegendProps = {
  categories: { name: string; chartType: "bar" | "line" }[];
  barCategoryColors: Map<string, AvailableChartColorsKeys>;
  lineCategoryColors: Map<string, AvailableChartColorsKeys>;
  onClickLegendItem?: (
    category: string,
    color: AvailableChartColorsKeys
  ) => void;
  activeLegend?: string;
  enableLegendSlider?: boolean;
} & React.OlHTMLAttributes<HTMLOListElement>;

type HasScrollProps = {
  left: boolean;
  right: boolean;
};

const Legend = ({ ref, ...props }: LegendProps & { ref?: React.RefObject<HTMLOListElement | null> }) => {
  const {
    categories,
    barCategoryColors,
    lineCategoryColors,
    onClickLegendItem,
    activeLegend,
    enableLegendSlider = false,
    className,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);
  const [isKeyDowned, setIsKeyDowned] = React.useState<string | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const checkScroll = React.useCallback(() => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) { return; }

    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll
      = scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  }, [setHasScroll]);

  const scrollToTest = React.useCallback(
    (direction: "left" | "right") => {
      const element = scrollableRef?.current;
      const width = element?.clientWidth ?? 0;

      if (element && enableLegendSlider) {
        element.scrollTo({
          left:
            direction === "left"
              ? element.scrollLeft - width
              : element.scrollLeft + width,
          behavior: "smooth",
        });
        setTimeout(() => {
          checkScroll();
        }, 400);
      }
    },
    [enableLegendSlider, checkScroll],
  );

  React.useEffect(() => {
    const keyDownHandler = (key: string) => {
      if (key === "ArrowLeft") {
        scrollToTest("left");
      }
      else if (key === "ArrowRight") {
        scrollToTest("right");
      }
    };
    if (isKeyDowned) {
      keyDownHandler(isKeyDowned);
      intervalRef.current = setInterval(() => {
        keyDownHandler(isKeyDowned);
      }, 300);
    }
    else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isKeyDowned, scrollToTest]);

  const keyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setIsKeyDowned(e.key);
    }
  };
  const keyUp = (e: KeyboardEvent) => {
    e.stopPropagation();
    setIsKeyDowned(null);
  };

  React.useEffect(() => {
    const scrollable = scrollableRef?.current;
    if (enableLegendSlider) {
      checkScroll();
      scrollable?.addEventListener("keydown", keyDown);
      scrollable?.addEventListener("keyup", keyUp);
    }

    return () => {
      scrollable?.removeEventListener("keydown", keyDown);
      scrollable?.removeEventListener("keyup", keyUp);
    };
  }, [checkScroll, enableLegendSlider]);

  return (
    <ol
      ref={ref}
      className={cx("relative overflow-hidden", className)}
      {...other}
    >
      <div
        ref={scrollableRef}
        className={cx(
          "flex h-full",
          enableLegendSlider
            ? hasScroll?.right || hasScroll?.left
              ? "snap-mandatory items-center overflow-auto pr-12 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : ""
            : "flex-wrap",
        )}
      >
        {categories.map((category, index) => {
          const barColor = barCategoryColors.get(category.name);
          const lineColor = lineCategoryColors.get(category.name);
          return (
            <LegendItem
              key={`item-${index}`}
              name={category.name}
              chartType={category.chartType}
              onClick={onClickLegendItem}
              activeLegend={activeLegend}
              color={category.chartType === "bar" ? barColor! : lineColor!}
            />
          );
        })}
      </div>
      {enableLegendSlider && (hasScroll?.right || hasScroll?.left) ? (
        <>
          <div
            className={cx(
              // base
              "absolute top-0 right-0 bottom-0 flex h-full items-center justify-center pr-1",
              // background color
              "bg-white dark:bg-zinc-950",
            )}
          >
            <ScrollButton
              icon={ChevronLeft}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest("left");
              }}
              disabled={!hasScroll?.left}
            />
            <ScrollButton
              icon={ChevronRight}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest("right");
              }}
              disabled={!hasScroll?.right}
            />
          </div>
        </>
      ) : null}
    </ol>
  );
};

Legend.displayName = "Legend";

/**
 * Main legend component for combo charts.
 */
const ChartLegend = (
  { payload }: any,
  barCategoryColors: Map<string, AvailableChartColorsKeys>,
  lineCategoryColors: Map<string, AvailableChartColorsKeys>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick?: (category: string, color: AvailableChartColorsKeys) => void,
  enableLegendSlider?: boolean,
  legendPosition?: "left" | "center" | "right",
  barYAxisWidth?: number,
  lineYAxisWidth?: number,
) => {
  const legendRef = React.useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const filteredPayload = payload.filter((item: any) => item.type !== "none");

  const paddingLeft
    = legendPosition === "left" && barYAxisWidth ? barYAxisWidth - 8 : 0;
  const paddingRight
    = (legendPosition === "right" || legendPosition === undefined)
      && lineYAxisWidth
      ? lineYAxisWidth - 8
      : 52;

  return (
    <div
      style={{ paddingLeft, paddingRight }}
      ref={legendRef}
      className={cx(
        "flex items-center",
        { "justify-center": legendPosition === "center" },
        {
          "justify-start": legendPosition === "left",
        },
        { "justify-end": legendPosition === "right" },
      )}
    >
      <Legend
        categories={filteredPayload.map((entry: any) => ({
          name: entry.value,
          chartType: entry.type === "rect" ? "bar" : entry.type,
        }))}
        barCategoryColors={barCategoryColors}
        lineCategoryColors={lineCategoryColors}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
        enableLegendSlider={enableLegendSlider}
      />
    </div>
  );
};

// #region Tooltip

type TooltipProps = Pick<ChartTooltipProps, "active" | "payload" | "label">;

/**
 * Individual payload item for chart tooltips.
 */
type PayloadItem = {
  /**
   * Category name for the data point.
   * The series name this data point belongs to.
   */
  category: string;
  /**
   * Numeric value of the data point.
   * The actual data value for this point in the series.
   */
  value: number;
  /**
   * Index value from the chart data.
   * The x-axis value or index for this data point.
   */
  index: string;
  /**
   * Color theme for bar chart elements.
   * Color scheme used for bar series visualization.
   */
  barColor: AvailableChartColorsKeys;
  /**
   * Color theme for line chart elements.
   * Color scheme used for line series visualization.
   */
  lineColor: AvailableChartColorsKeys;
  /**
   * Chart type for the data point.
   * Indicates whether this data point represents a bar or line series.
   */
  chartType: "bar" | "line";
  /**
   * Data type from Recharts.
   * Internal Recharts type information for rendering.
   */
  type: string;
  /**
   * Raw payload data from Recharts.
   * Complete data object from the original dataset.
   */
  payload: any;
};

/**
 * Props for chart tooltip components.
 */
type ChartTooltipProps = {
  /**
   * Whether tooltip should be visible.
   * Controls the visibility state of the tooltip component.
   */
  active: boolean | undefined;
  /**
   * Array of data items to display.
   * Collection of data points to show in the tooltip.
   */
  payload: PayloadItem[];
  /**
   * X-axis label for the tooltip.
   * The x-axis value or category label for the current tooltip position.
   */
  label: string;
  /**
   * Formatter function for bar values.
   * Custom formatting function for displaying bar chart values.
   */
  barValueFormatter?: (value: number) => string;
  /**
   * Formatter function for line values.
   * Custom formatting function for displaying line chart values.
   */
  lineValueFormatter?: (value: number) => string;
};

/**
 * Default tooltip component for combo charts.
 */
const ChartTooltip = ({
  active,
  payload,
  label,
  barValueFormatter = (value: number): string => value.toString(),
  lineValueFormatter = (value: number): string => value.toString(),
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const filteredPayload = payload.filter((item: any) => item.type !== "none");
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
        <div className={cx("border-b border-inherit px-4 py-2")}>
          <p
            className={cx(
              // base
              "font-medium",
              // text color
              "text-zinc-900 dark:text-zinc-50",
            )}
          >
            {label}
          </p>
        </div>
        <div className={cx("space-y-1 px-4 py-2")}>
          {filteredPayload.map(
            ({ value, category, barColor, lineColor, chartType }, index) => (
              <div
                key={`id-${index}`}
                className="flex items-center justify-between space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex w-5 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className={cx(
                        { "size-2 rounded-xs": chartType === "bar" },
                        {
                          "h-[3px] w-3.5 shrink-0 rounded-full":
                            chartType === "line",
                        },
                        "shrink-0",
                        getColorClassName(
                          chartType === "bar" ? barColor : lineColor,
                          "bg",
                        ),
                      )}
                    />
                  </div>
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
                  {chartType === "bar"
                    ? barValueFormatter(value)
                    : lineValueFormatter(value)}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
  return null;
};

type ActiveDot = {
  index?: number;
  dataKey?: string;
};

type BaseEventProps = {
  eventType: "category" | "bar" | "dot";
  categoryClicked: string;
  [key: string]: number | string;
};

/**
 * Event handler props for combo chart interactions.
 */
type ComboChartEventProps = BaseEventProps | null | undefined;

type ChartSeries = {
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  valueFormatter?: (value: number) => string;
  showYAxis?: boolean;
  yAxisWidth?: number;
  allowDecimals?: boolean;
  yAxisLabel?: string;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
};

/**
 * Props for the ComboChart component.
 */
type ComboChartProps = {
  /**
   * Array of data objects for chart rendering.
   * The dataset containing all values to be visualized in the chart.
   */
  data: Record<string, any>[];
  /**
   * Key name for X-axis values.
   * The property name in data objects to use for x-axis categories.
   */
  index: string;
  /**
   * Whether to show only start/end X-axis labels.
   * When true, displays only the first and last x-axis labels.
   */
  startEndOnly?: boolean;
  /**
   * Whether to show X-axis.
   * Controls visibility of the x-axis and its labels.
   */
  showXAxis?: boolean;
  /**
   * Label for X-axis.
   * Optional text label to display below the x-axis.
   */
  xAxisLabel?: string;
  /**
   * Whether to display grid lines.
   * Controls visibility of horizontal grid lines in the chart.
   */
  showGridLines?: boolean;
  /**
   * Interval type for X-axis ticks.
   * Controls spacing and positioning of x-axis tick marks.
   */
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart";
  /**
   * Whether to display interactive legend.
   * Controls visibility and interactivity of the chart legend.
   */
  showLegend?: boolean;
  /**
   * Whether to show tooltips on hover.
   * Controls visibility of hover tooltips with data details.
   */
  showTooltip?: boolean;
  /**
   * Callback for chart interactions.
   * Function called when chart elements are clicked or interacted with.
   */
  onValueChange?: (value: ComboChartEventProps) => void;
  /**
   * Whether to enable legend scrolling.
   * Enables horizontal scrolling for legends with many items.
   */
  enableLegendSlider?: boolean;
  /**
   * Legend positioning.
   * Controls horizontal alignment of the legend within the chart.
   */
  legendPosition?: "left" | "center" | "right";
  /**
   * Minimum gap between X-axis ticks.
   * Controls spacing between x-axis tick marks in pixels.
   */
  tickGap?: number;
  /**
   * Whether to enable biaxial chart with separate Y-axes.
   * When true, uses separate y-axes for bar and line series.
   */
  enableBiaxial?: boolean;
  /**
   * Callback for tooltip events.
   * Function called when tooltip state changes for custom handling.
   */
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  /**
   * Custom tooltip component.
   * Override the default tooltip with a custom component.
   */
  customTooltip?: React.ComponentType<TooltipProps>;
  /**
   * Configuration for bar chart series.
   * Settings and data configuration for bar chart elements.
   */
  barSeries: ChartSeries & {
    /**
     * Bar chart type (default or stacked).
     * Controls whether bars are stacked or displayed side by side.
     */
    type?: "default" | "stacked";
  };
  /**
   * Configuration for line chart series.
   * Settings and data configuration for line chart elements.
   */
  lineSeries?: ChartSeries & {
    /**
     * Whether to connect null values.
     * When true, line continues through missing data points.
     */
    connectNulls?: boolean;
  };
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Combination chart supporting multiple chart types in a single visualization.
 */
const ComboChart = ({ ref: forwardedRef, ...props }: ComboChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const defaultSeries = {
    categories: [],
    colors: AvailableChartColors,
    valueFormatter: (value: number) => value.toString(),
    showYAxis: true,
    yAxisWidth: 56,
    yAxisLabel: undefined,
    allowDecimals: true,
    type: "default",
    autoMinValue: false,
    minValue: undefined,
    maxValue: undefined,
  };

  const defaultBarSeries = defaultSeries;
  const defaultLineSeries = {
    ...defaultSeries,
    connectNulls: false,
  };

  const {
    data = [],
    index,
    startEndOnly = false,
    showXAxis = true,
    showGridLines = true,
    intervalType = "equidistantPreserveStart",
    showTooltip = true,
    showLegend = true,
    legendPosition = "right",
    enableLegendSlider = false,
    onValueChange,
    tickGap = 5,
    xAxisLabel,
    enableBiaxial = false,

    barSeries = defaultBarSeries,
    lineSeries = defaultLineSeries,
    tooltipCallback,
    customTooltip,

    className,
    ...other
  } = props;
  const mergedBarSeries = { ...defaultBarSeries, ...barSeries };
  const mergedLineSeries = { ...defaultLineSeries, ...lineSeries };

  const CustomTooltip = customTooltip;

  const paddingValue
      = (!showXAxis
        && !mergedBarSeries.showYAxis
        && enableBiaxial
        && !mergedLineSeries.showYAxis)
      || (startEndOnly
        && !mergedBarSeries.showYAxis
        && enableBiaxial
        && !mergedLineSeries.showYAxis)
        ? 0
        : 20;
  const [legendHeight, setLegendHeight] = React.useState(60);
  const [activeDot, setActiveDot] = React.useState<ActiveDot | undefined>(
    undefined,
  );
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
    undefined,
  );

  const prevActiveRef = React.useRef<boolean | undefined>(undefined);
  const prevLabelRef = React.useRef<string | undefined>(undefined);

  const barCategoryColors = constructCategoryColors(
    mergedBarSeries.categories,
    mergedBarSeries.colors ?? AvailableChartColors,
  );
  const lineCategoryColors = constructCategoryColors(
    mergedLineSeries.categories,
    mergedLineSeries.colors ?? AvailableChartColors,
  );
  const [activeBar, setActiveBar] = React.useState<any | undefined>(
    undefined,
  );
  const barYAxisDomain = getYAxisDomain(
    mergedBarSeries.autoMinValue ?? false,
    mergedBarSeries.minValue,
    mergedBarSeries.maxValue,
  );
  const lineYAxisDomain = getYAxisDomain(
    mergedLineSeries.autoMinValue ?? false,
    mergedLineSeries.minValue,
    mergedLineSeries.maxValue,
  );
  const hasOnValueChange = !!onValueChange;
  const stacked = barSeries.type === "stacked";

  function onBarClick(data: any, _: any, event: React.MouseEvent) {
    event.stopPropagation();
    if (!onValueChange) { return; }
    if (isEqual(activeBar, { ...data.payload, value: data.value })) {
      setActiveLegend(undefined);
      setActiveBar(undefined);
      onValueChange?.(null);
    }
    else {
      setActiveLegend(data.tooltipPayload?.[0]?.dataKey);
      setActiveBar({
        ...data.payload,
        value: data.value,
      });
      onValueChange?.({
        eventType: "bar",
        categoryClicked: data.tooltipPayload?.[0]?.dataKey,
        ...data.payload,
      });
    }
  }

  function onDotClick(itemData: any, event: React.MouseEvent) {
    event.stopPropagation();

    if (!hasOnValueChange) { return; }
    if (
      (itemData.index === activeDot?.index
        && itemData.dataKey === activeDot?.dataKey)
      || (hasOnlyOneValueForKey(data, itemData.dataKey)
        && activeLegend
        && activeLegend === itemData.dataKey)
    ) {
      setActiveLegend(undefined);
      setActiveDot(undefined);
      onValueChange?.(null);
    }
    else {
      setActiveBar(undefined);
      setActiveLegend(itemData.dataKey);
      setActiveDot({
        index: itemData.index,
        dataKey: itemData.dataKey,
      });
      onValueChange?.({
        eventType: "dot",
        categoryClicked: itemData.dataKey,
        ...itemData.payload,
      });
    }
  }

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) { return; }

    if (dataKey === activeLegend && !activeBar && !activeDot) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    }
    else if (
      activeBar
      && activeBar.tooltipPayload?.[0]?.dataKey === dataKey
    ) {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    else {
      setActiveLegend(dataKey);
      setActiveBar(undefined);
      setActiveDot(undefined);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
  }

  return (
    <div
      ref={forwardedRef}
      className={cx("h-80 w-full", className)}
      {...other}
    >
      <ResponsiveContainer>
        <RechartsComposedChart
          data={data}
          onClick={
            hasOnValueChange && (activeLegend || activeBar || activeDot)
              ? () => {
                  setActiveBar(undefined);
                  setActiveDot(undefined);
                  setActiveLegend(undefined);
                  onValueChange?.(null);
                }
              : undefined
          }
          margin={{
            bottom: xAxisLabel ? 30 : undefined,
            left: mergedBarSeries.yAxisLabel ? 20 : undefined,
            right: mergedLineSeries.yAxisLabel ? 20 : undefined,
            top: 5,
          }}
        >
          {showGridLines
            ? (
                <CartesianGrid
                  className={cx("stroke-zinc-200 stroke-1 dark:stroke-zinc-800")}
                  horizontal={true}
                  vertical={false}
                />
              )
            : null}
          <XAxis
            hide={!showXAxis}
            tick={{
              transform: "translate(0, 6)",
            }}
            fill=""
            stroke=""
            className={cx(
              // base
              "mt-4 text-xs",
              // text fill
              "fill-zinc-500 dark:fill-zinc-500",
            )}
            tickLine={false}
            axisLine={false}
            minTickGap={tickGap}
            padding={{
              left: paddingValue,
              right: paddingValue,
            }}
            dataKey={index}
            interval={startEndOnly ? "preserveStartEnd" : intervalType}
            ticks={
              startEndOnly
                ? [data[0][index], data[data.length - 1][index]]
                : undefined
            }
          >
            {xAxisLabel && (
              <Label
                position="insideBottom"
                offset={-20}
                className="fill-zinc-800 text-sm font-medium dark:fill-zinc-200"
              >
                {xAxisLabel}
              </Label>
            )}
          </XAxis>
          <YAxis
            yAxisId={enableBiaxial ? "left" : undefined}
            width={mergedBarSeries.yAxisWidth}
            hide={!mergedBarSeries.showYAxis}
            axisLine={false}
            tickLine={false}
            fill=""
            stroke=""
            className={cx(
              // base
              "text-xs",
              // text fill
              "fill-zinc-500 dark:fill-zinc-500",
            )}
            tick={{
              transform: "translate(-3, 0)",
            }}
            type="number"
            domain={barYAxisDomain as AxisDomain}
            tickFormatter={mergedBarSeries.valueFormatter}
            allowDecimals={mergedBarSeries.allowDecimals}
          >
            {mergedBarSeries.yAxisLabel && (
              <Label
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                angle={-90}
                offset={-15}
                className="fill-zinc-800 text-sm font-medium dark:fill-zinc-200"
              >
                {mergedBarSeries.yAxisLabel}
              </Label>
            )}
          </YAxis>

          {enableBiaxial ? (
            <YAxis
              yAxisId="right"
              orientation="right"
              width={mergedLineSeries.yAxisWidth}
              hide={!mergedLineSeries.showYAxis}
              axisLine={false}
              tickLine={false}
              fill=""
              stroke=""
              className={cx(
                // base
                "text-xs",
                // text fill
                "fill-zinc-500 dark:fill-zinc-500",
              )}
              tick={{
                transform: "translate(3, 0)",
              }}
              type="number"
              domain={lineYAxisDomain as AxisDomain}
              tickFormatter={mergedLineSeries.valueFormatter}
              allowDecimals={mergedLineSeries.allowDecimals}
            >
              {mergedLineSeries.yAxisLabel && (
                <Label
                  position="insideRight"
                  style={{ textAnchor: "middle" }}
                  angle={-90}
                  offset={-15}
                  className="fill-zinc-800 text-sm font-medium dark:fill-zinc-200"
                >
                  {mergedLineSeries.yAxisLabel}
                </Label>
              )}
            </YAxis>
          ) : null}

          <Tooltip
            wrapperStyle={{ outline: "none" }}
            isAnimationActive={true}
            animationDuration={100}
            cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
            offset={20}
            position={{
              y: 0,
            }}
            content={({ active, payload, label }) => {
              const cleanPayload: TooltipProps["payload"] = payload
                ? payload.map((item: any) => ({
                    category: item.dataKey,
                    value: item.value,
                    index: item.payload[index],
                    barColor: barCategoryColors.get(
                      item.dataKey,
                    ) as AvailableChartColorsKeys,
                    lineColor: lineCategoryColors.get(
                      item.dataKey,
                    ) as AvailableChartColorsKeys,
                    chartType: barCategoryColors.get(item.dataKey)
                      ? "bar"
                      : ("line" as PayloadItem["chartType"]),
                    type: item.type,
                    payload: item.payload,
                  }))
                : [];

              if (
                tooltipCallback
                && (active !== prevActiveRef.current
                  || label !== prevLabelRef.current)
              ) {
                tooltipCallback({
                  active,
                  payload: cleanPayload,
                  label: label?.toString() ?? "",
                });
                prevActiveRef.current = active;
                prevLabelRef.current
                    = typeof label === "string" ? label : label?.toString();
              }

              return showTooltip && active
                ? (
                    CustomTooltip
                      ? (
                          <CustomTooltip
                            active={active}
                            payload={cleanPayload}
                            label={label?.toString() ?? ""}
                          />
                        )
                      : (
                          <ChartTooltip
                            active={active}
                            payload={cleanPayload}
                            label={label?.toString() ?? ""}
                            barValueFormatter={mergedBarSeries.valueFormatter}
                            lineValueFormatter={mergedLineSeries.valueFormatter}
                          />
                        )
                  )
                : null;
            }}
          />
          {showLegend
            ? (
                <RechartsLegend
                  verticalAlign="top"
                  height={legendHeight}
                  content={({ payload }) =>
                    ChartLegend(
                      { payload },
                      barCategoryColors,
                      lineCategoryColors,
                      setLegendHeight,
                      activeLegend,
                      hasOnValueChange
                        ? (clickedLegendItem: string) =>
                            onCategoryClick(clickedLegendItem)
                        : undefined,
                      enableLegendSlider,
                      legendPosition,
                      mergedBarSeries.yAxisWidth,
                      mergedLineSeries.yAxisWidth,
                    )}
                />
              )
            : null}
          {mergedBarSeries.categories.map(category => (
            <Bar
              yAxisId={enableBiaxial ? "left" : undefined}
              className={cx(
                getColorClassName(
                  barCategoryColors.get(category) as AvailableChartColorsKeys,
                  "fill",
                ),
                onValueChange ? "cursor-pointer" : "",
              )}
              key={category}
              name={category}
              type="linear"
              dataKey={category}
              stackId={stacked ? "stack" : undefined}
              isAnimationActive={false}
              fill=""
              shape={(props: any) =>
                renderShape(props, activeBar, activeLegend, "horizontal")}
              onClick={onBarClick}
            />
          ))}
          {/* hidden lines to increase clickable target area */}
          {onValueChange
            ? mergedLineSeries.categories.map(category => (
                <Line
                  yAxisId={enableBiaxial ? "right" : undefined}
                  className={cx("cursor-pointer")}
                  strokeOpacity={0}
                  key={category}
                  name={category}
                  type="linear"
                  dataKey={category}
                  stroke="transparent"
                  fill="transparent"
                  legendType="none"
                  tooltipType="none"
                  strokeWidth={12}
                  connectNulls={mergedLineSeries.connectNulls}
                  onClick={(props: any, event) => {
                    event.stopPropagation();
                    const { name } = props;
                    onCategoryClick(name);
                  }}
                />
              ))
            : null}
          {mergedLineSeries.categories.map(category => (
            <Line
              yAxisId={enableBiaxial ? "right" : undefined}
              className={cx(
                getColorClassName(
                  lineCategoryColors.get(
                    category,
                  ) as AvailableChartColorsKeys,
                  "stroke",
                ),
                hasOnValueChange && "cursor-pointer",
              )}
              strokeOpacity={
                activeDot || (activeLegend && activeLegend !== category)
                  ? 0.3
                  : 1
              }
              activeDot={(props: any) => {
                const {
                  cx: cxCoord,
                  cy: cyCoord,
                  stroke,
                  strokeLinecap,
                  strokeLinejoin,
                  strokeWidth,
                  dataKey,
                } = props;
                return (
                  <Dot
                    className={cx(
                      "stroke-white dark:stroke-zinc-950",
                      onValueChange ? "cursor-pointer" : "",
                      getColorClassName(
                        lineCategoryColors.get(
                          dataKey,
                        ) as AvailableChartColorsKeys,
                        "fill",
                      ),
                    )}
                    cx={cxCoord}
                    cy={cyCoord}
                    r={5}
                    fill=""
                    stroke={stroke}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                    strokeWidth={strokeWidth}
                    onClick={(_, event) => onDotClick(props, event)}
                  />
                );
              }}
              dot={(props: any) => {
                const {
                  stroke,
                  strokeLinecap,
                  strokeLinejoin,
                  strokeWidth,
                  cx: cxCoord,
                  cy: cyCoord,
                  dataKey,
                  index,
                } = props;

                if (
                  (hasOnlyOneValueForKey(data, category)
                    && !(
                      activeDot
                      || (activeLegend && activeLegend !== category)
                    ))
                    || (activeDot?.index === index
                      && activeDot?.dataKey === category)
                ) {
                  return (
                    <Dot
                      key={index}
                      cx={cxCoord}
                      cy={cyCoord}
                      r={5}
                      stroke={stroke}
                      fill=""
                      strokeLinecap={strokeLinecap}
                      strokeLinejoin={strokeLinejoin}
                      strokeWidth={strokeWidth}
                      className={cx(
                        "stroke-white dark:stroke-zinc-950",
                        onValueChange ? "cursor-pointer" : "",
                        getColorClassName(
                          lineCategoryColors.get(
                            dataKey,
                          ) as AvailableChartColorsKeys,
                          "fill",
                        ),
                      )}
                    />
                  );
                }
                return <React.Fragment key={index}></React.Fragment>;
              }}
              key={`${category}-line-id`}
              name={category}
              type="linear"
              dataKey={category}
              stroke=""
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              isAnimationActive={false}
              connectNulls={mergedLineSeries.connectNulls}
              onClick={(props: any, event) => {
                event.stopPropagation();
                const { name } = props;
                onCategoryClick(name);
              }}
            />
          ))}
        </RechartsComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

ComboChart.displayName = "ComboChart";

export { ComboChart, type ComboChartEventProps, type ComboChartProps, type TooltipProps };
