"use client";

import type { AxisDomain } from "recharts/types/util/types";
import type { AvailableChartColorsKeys } from "../../lib/chartUtils";
import { useWindowSize } from "@uidotdev/usehooks";
import { isEqual } from "es-toolkit";
import { ChevronLeft, ChevronRight } from "lucide-react";

import React from "react";

import {
  Bar,
  CartesianGrid,
  Label,
  BarChart as RechartsBarChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
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

// #region Shape

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

type LegendItemProps = {
  /**
   * Display name for the legend item.
   */
  name: string;
  /**
   * Color theme for the legend indicator.
   */
  color: AvailableChartColorsKeys;
  /**
   * Callback when legend item is clicked.
   */
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
  /**
   * Currently active legend item name.
   */
  activeLegend?: string;
};

const LegendItem: React.FC<LegendItemProps> = ({
  name,
  color,
  onClick,
  activeLegend,
}) => {
  const hasOnValueChange = !!onClick;
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
          "size-2 shrink-0 rounded-xs",
          getColorClassName(color, "bg"),
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
  /**
   * Icon component to display.
   */
  icon: React.ElementType;
  /**
   * Click handler for scrolling.
   */
  onClick?: () => void;
  /**
   * Whether button is disabled.
   */
  disabled?: boolean;
};

const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const Icon = icon;
  const [isPressed, setIsPressed] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        onClick?.();
      }, 300);
    }
    else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPressed, onClick]);

  React.useEffect(() => {
    if (disabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
  /**
   * Array of category names to display.
   */
  categories: string[];
  /**
   * Color scheme for legend items.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Callback when legend item is clicked.
   */
  onClickLegendItem?: (category: string, color: string) => void;
  /**
   * Currently active legend category.
   */
  activeLegend?: string;
  /**
   * Whether to enable horizontal scrolling for long legends.
   */
  enableLegendSlider?: boolean;
} & React.OlHTMLAttributes<HTMLOListElement>;

type HasScrollProps = {
  /**
   * Whether left scroll is available.
   */
  left: boolean;
  /**
   * Whether right scroll is available.
   */
  right: boolean;
};

const Legend = ({ ref, ...props }: LegendProps & { ref?: React.RefObject<HTMLOListElement | null> }) => {
  const {
    categories,
    colors = AvailableChartColors,
    className,
    onClickLegendItem,
    activeLegend,
    enableLegendSlider = false,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const scrollButtonsRef = React.useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);
  const [isKeyDowned, setIsKeyDowned] = React.useState<string | null>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const checkScroll = React.useCallback(() => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) {
      return;
    }

    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll
      = scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  }, [setHasScroll]);

  const scrollToTest = React.useCallback(
    (direction: "left" | "right") => {
      const element = scrollableRef?.current;
      const scrollButtons = scrollButtonsRef?.current;
      const scrollButtonsWith = scrollButtons?.clientWidth ?? 0;
      const width = element?.clientWidth ?? 0;

      if (element && enableLegendSlider) {
        element.scrollTo({
          left:
            direction === "left"
              ? element.scrollLeft - width + scrollButtonsWith
              : element.scrollLeft + width - scrollButtonsWith,
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
        tabIndex={0}
        className={cx(
          "flex h-full",
          enableLegendSlider
            ? hasScroll?.right || hasScroll?.left
              ? "snap-mandatory items-center overflow-auto pr-12 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : ""
            : "flex-wrap",
        )}
      >
        {categories.map((category, index) => (
          <LegendItem
            key={category}
            name={category}
            color={colors[index] as AvailableChartColorsKeys}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
      </div>
      {enableLegendSlider && (hasScroll?.right || hasScroll?.left)
        ? (
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
          )
        : null}
    </ol>
  );
};

Legend.displayName = "Legend";

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, AvailableChartColorsKeys>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick?: (category: string, color: string) => void,
  enableLegendSlider?: boolean,
  legendPosition?: "left" | "center" | "right",
  yAxisWidth?: number,
) => {
  const legendRef = React.useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  React.useEffect(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  }, [windowSize.width, windowSize.height, setLegendHeight]);

  const filteredPayload = payload.filter((item: any) => item.type !== "none");

  const paddingLeft
    = legendPosition === "left" && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      style={{ paddingLeft }}
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
        categories={filteredPayload.map((entry: any) => entry.value)}
        colors={filteredPayload.map((entry: any) =>
          categoryColors.get(entry.value),
        )}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
        enableLegendSlider={enableLegendSlider}
      />
    </div>
  );
};

// #region Tooltip

type TooltipProps = Pick<ChartTooltipProps, "active" | "payload" | "label">;

type PayloadItem = {
  /**
   * Category/series name.
   */
  category: string;
  /**
   * Numeric value of the bar.
   */
  value: number;
  /**
   * Index identifier.
   */
  index: string;
  /**
   * Display color theme.
   */
  color: AvailableChartColorsKeys;
  /**
   * Chart element type.
   */
  type?: string;
  /**
   * Raw data payload.
   */
  payload: any;
};

type ChartTooltipProps = {
  /**
   * Whether tooltip is currently active/visible.
   */
  active: boolean | undefined;
  /**
   * Array of data points to display in tooltip.
   */
  payload: PayloadItem[];
  /**
   * X-axis label for the data point.
   */
  label: string;
  /**
   * Function to format displayed values.
   */
  valueFormatter: (value: number) => string;
};

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          "rounded-md border text-sm shadow-md",
          // border color
          " dark:border-zinc-800",
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
          {payload.map(({ value, category, color }, _index) => (
            <div
              key={category}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    "size-2 shrink-0 rounded-xs",
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

// #region BarChart

type BaseEventProps = {
  /**
   * Type of element that was clicked.
   */
  eventType: "category" | "bar";
  /**
   * Category that was clicked.
   */
  categoryClicked: string;
  /**
   * Additional data properties from the clicked element.
   */
  [key: string]: number | string;
};

type BarChartEventProps = BaseEventProps | null | undefined;

type BarChartProps = {
  /**
   * Array of data objects to visualize.
   * Each object should contain the index field and category fields.
   */
  data: Record<string, any>[];
  /**
   * Key in data objects to use for category axis values.
   * Usually represents categories or time periods.
   */
  index: string;
  /**
   * Array of data keys to display as chart series.
   * Each category becomes a set of bars in the chart.
   */
  categories: string[];
  /**
   * Color scheme for chart series.
   * Colors are applied to categories in order.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Function to format displayed values.
   * Applied to tooltip and axis labels.
   */
  valueFormatter?: (value: number) => string;
  /**
   * Show only first and last category axis labels.
   * Useful for reducing label clutter on wide charts.
   */
  startEndOnly?: boolean;
  /**
   * Whether to display X-axis.
   * Set to false for minimal chart presentations.
   */
  showXAxis?: boolean;
  /**
   * Whether to display Y-axis.
   * Set to false for minimal chart presentations.
   */
  showYAxis?: boolean;
  /**
   * Whether to show grid lines.
   * Helps with value reading but can add visual noise.
   */
  showGridLines?: boolean;
  /**
   * Width of Y-axis in pixels.
   * Adjust based on expected value lengths.
   */
  yAxisWidth?: number;
  /**
   * Category axis tick interval strategy.
   * Controls how axis labels are distributed.
   */
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart";
  /**
   * Whether to show tooltip on hover.
   * Provides detailed value information on interaction.
   */
  showTooltip?: boolean;
  /**
   * Whether to display legend.
   * Shows category names with color indicators.
   */
  showLegend?: boolean;
  /**
   * Auto-calculate minimum value axis value.
   * When true, chart will start from the minimum data value.
   */
  autoMinValue?: boolean;
  /**
   * Fixed minimum value axis value.
   * Overrides auto-calculation when set.
   */
  minValue?: number;
  /**
   * Fixed maximum value axis value.
   * Overrides auto-calculation when set.
   */
  maxValue?: number;
  /**
   * Allow decimal values on value axis.
   * Set to false for integer-only displays.
   */
  allowDecimals?: boolean;
  /**
   * Callback for chart interactions (bar clicks, legend clicks).
   * Fired when bars or legend items are clicked.
   */
  onValueChange?: (value: BarChartEventProps) => void;
  /**
   * Enable horizontal legend scrolling.
   * Useful when legend items exceed container width.
   */
  enableLegendSlider?: boolean;
  /**
   * Minimum gap between category axis ticks.
   * Prevents label overlap on dense data.
   */
  tickGap?: number;
  /**
   * Gap between bar categories (string percentage or number pixels).
   * Controls spacing between different category groups.
   */
  barCategoryGap?: string | number;
  /**
   * Label for X-axis.
   * Displayed below the axis for context.
   */
  xAxisLabel?: string;
  /**
   * Label for Y-axis.
   * Displayed vertically along the axis.
   */
  yAxisLabel?: string;
  /**
   * Chart orientation (horizontal or vertical bars).
   * Controls bar direction and axis arrangement.
   */
  layout?: "vertical" | "horizontal";
  /**
   * Bar stacking type (default, stacked, or percentage).
   * Controls how multiple series are displayed.
   */
  type?: "default" | "stacked" | "percent";
  /**
   * Legend horizontal alignment.
   * Controls legend positioning within its container.
   */
  legendPosition?: "left" | "center" | "right";
  /**
   * Callback for tooltip state changes.
   * Provides external access to tooltip data.
   */
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  /**
   * Custom tooltip component.
   * Replace default tooltip with custom implementation.
   */
  customTooltip?: React.ComponentType<TooltipProps>;
} & React.HTMLAttributes<HTMLDivElement>;

const EMPTY_DATA_ARRAY: any[] = [];
const EMPTY_CATEGORIES_ARRAY: string[] = [];

/**
 * Bar chart component for comparing categorical data with horizontal or vertical bars.
 */
const BarChart = ({ ref: forwardedRef, ...props }: BarChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const {
    data = EMPTY_DATA_ARRAY,
    categories = EMPTY_CATEGORIES_ARRAY,
    index,
    colors = AvailableChartColors,
    valueFormatter = (value: number) => value.toString(),
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    showGridLines = true,
    yAxisWidth = 56,
    intervalType = "equidistantPreserveStart",
    showTooltip = true,
    showLegend = true,
    autoMinValue = false,
    minValue,
    maxValue,
    allowDecimals = true,
    className,
    onValueChange,
    enableLegendSlider = false,
    barCategoryGap,
    tickGap = 5,
    xAxisLabel,
    yAxisLabel,
    layout = "horizontal",
    type = "default",
    legendPosition = "right",
    tooltipCallback,
    customTooltip,
    ...other
  } = props;
  const CustomTooltip = customTooltip;
  const paddingValue
      = (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
  const [legendHeight, setLegendHeight] = React.useState(60);
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
    undefined,
  );
  const categoryColors = constructCategoryColors(categories, colors);
  const [activeBar, setActiveBar] = React.useState<any | undefined>(
    undefined,
  );
  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const hasOnValueChange = !!onValueChange;
  const stacked = type === "stacked" || type === "percent";

  const prevActiveRef = React.useRef<boolean | undefined>(undefined);
  const prevLabelRef = React.useRef<string | undefined>(undefined);

  function valueToPercent(value: number) {
    return `${(value * 100).toFixed(0)}%`;
  }

  function onBarClick(data: any, _: any, event: React.MouseEvent) {
    event.stopPropagation();
    if (!onValueChange) {
      return;
    }
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

  function onCategoryClick(dataKey: string) {
    if (!hasOnValueChange) {
      return;
    }
    if (dataKey === activeLegend && !activeBar) {
      setActiveLegend(undefined);
      onValueChange?.(null);
    }
    else {
      setActiveLegend(dataKey);
      onValueChange?.({
        eventType: "category",
        categoryClicked: dataKey,
      });
    }
    setActiveBar(undefined);
  }

  return (
    <div
      ref={forwardedRef}
      className={cx("h-80 w-full", className)}
      data-testid="bar-chart"
      {...other}
    >
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
          onClick={
            hasOnValueChange && (activeLegend || activeBar)
              ? () => {
                  setActiveBar(undefined);
                  setActiveLegend(undefined);
                  onValueChange?.(null);
                }
              : undefined
          }
          margin={{
            bottom: xAxisLabel ? 30 : undefined,
            left: yAxisLabel ? 20 : undefined,
            right: yAxisLabel ? 5 : undefined,
            top: 5,
          }}
          stackOffset={type === "percent" ? "expand" : undefined}
          layout={layout}
          barCategoryGap={barCategoryGap}
        >
          {showGridLines
            ? (
                <CartesianGrid
                  className={cx("stroke-zinc-200 stroke-1 dark:stroke-zinc-800")}
                  horizontal={layout !== "vertical"}
                  vertical={layout === "vertical"}
                />
              )
            : null}
          <XAxis
            hide={!showXAxis}
            tick={{
              transform:
                  layout !== "vertical" ? "translate(0, 6)" : undefined,
            }}
            fill=""
            stroke=""
            className={cx(
              // base
              "text-xs",
              // text fill
              "fill-zinc-500 dark:fill-zinc-500",
              { "mt-4": layout !== "vertical" },
            )}
            tickLine={false}
            axisLine={false}
            minTickGap={tickGap}
            {...(layout !== "vertical"
              ? {
                  padding: {
                    left: paddingValue,
                    right: paddingValue,
                  },
                  dataKey: index,
                  interval: startEndOnly ? "preserveStartEnd" : intervalType,
                  ticks: startEndOnly
                    ? [data[0][index], data[data.length - 1][index]]
                    : undefined,
                }
              : {
                  type: "number",
                  domain: yAxisDomain as AxisDomain,
                  tickFormatter:
                      type === "percent" ? valueToPercent : valueFormatter,
                  allowDecimals,
                })}
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
            width={yAxisWidth}
            hide={!showYAxis}
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
              transform:
                  layout !== "vertical"
                    ? "translate(-3, 0)"
                    : "translate(0, 0)",
            }}
            {...(layout !== "vertical"
              ? {
                  type: "number",
                  domain: yAxisDomain as AxisDomain,
                  tickFormatter:
                      type === "percent" ? valueToPercent : valueFormatter,
                  allowDecimals,
                }
              : {
                  dataKey: index,
                  ticks: startEndOnly
                    ? [data[0][index], data[data.length - 1][index]]
                    : undefined,
                  type: "category",
                  interval: "equidistantPreserveStart",
                })}
          >
            {yAxisLabel && (
              <Label
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                angle={-90}
                offset={-15}
                className="fill-zinc-800 text-sm font-medium dark:fill-zinc-200"
              >
                {yAxisLabel}
              </Label>
            )}
          </YAxis>
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            isAnimationActive={true}
            animationDuration={100}
            cursor={{ fill: "#d1d5db", opacity: "0.15" }}
            offset={20}
            position={{
              y: layout === "horizontal" ? 0 : undefined,
              x: layout === "horizontal" ? undefined : yAxisWidth + 20,
            }}
            content={({ active, payload, label }) => {
              const cleanPayload: TooltipProps["payload"] = payload
                ? payload.map((item: any) => ({
                    category: item.dataKey,
                    value: item.value,
                    index: item.payload[index],
                    color: categoryColors.get(
                      item.dataKey,
                    ) as AvailableChartColorsKeys,
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
                            valueFormatter={valueFormatter}
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
                      categoryColors,
                      setLegendHeight,
                      activeLegend,
                      hasOnValueChange
                        ? (clickedLegendItem: string) =>
                            onCategoryClick(clickedLegendItem)
                        : undefined,
                      enableLegendSlider,
                      legendPosition,
                      yAxisWidth,
                    )}
                />
              )
            : null}
          {categories.map(category => (
            <Bar
              className={cx(
                getColorClassName(
                  categoryColors.get(category) as AvailableChartColorsKeys,
                  "fill",
                ),
                onValueChange ? "cursor-pointer" : "",
              )}
              key={`bar-${category}`}
              name={category}
              type="linear"
              dataKey={category}
              stackId={stacked ? "stack" : undefined}
              isAnimationActive={false}
              fill=""
              shape={(props: any) =>
                renderShape(props, activeBar, activeLegend, layout)}
              onClick={onBarClick}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChart.displayName = "BarChart";

export { BarChart, type BarChartEventProps, type BarChartProps, type TooltipProps };
