/**
 * Line Chart Component.
 *
 * A comprehensive line chart component built on Recharts for displaying
 * time series data, trends, and multi-category comparisons. Features
 * interactive legends, tooltips, and extensive customization options.
 *
 * Features:
 * - Multiple data series with configurable colors
 * - Interactive legend with optional slider for overflow
 * - Customizable tooltips with value formatting
 * - Click interactions for data points and categories
 * - Responsive design with auto-sizing
 * - Axis labels and grid lines
 * - Dark mode support
 * - Animation controls
 * - Null value handling.
 *
 * Built on Recharts library:
 * https://recharts.org/en-US/api/LineChart.
 *
 * @example
 * ```tsx
 * // Basic line chart
 * const data = [
 *   { month: 'Jan', sales: 100, profit: 20 },
 *   { month: 'Feb', sales: 150, profit: 35 },
 *   { month: 'Mar', sales: 200, profit: 50 }
 * ];
 *
 * <LineChart
 *   data={data}
 *   index="month"
 *   categories={['sales', 'profit']}
 *   colors={['blue', 'green']}
 *   valueFormatter={(value) => `$${value}`}
 * />
 *
 * // Interactive chart with callbacks
 * <LineChart
 *   data={timeSeriesData}
 *   index="date"
 *   categories={['revenue', 'expenses']}
 *   onValueChange={(event) => {
 *     if (event) {
 *       console.log('Clicked:', event.categoryClicked);
 *     }
 *   }}
 *   showLegend
 *   enableLegendSlider
 *   xAxisLabel="Date"
 *   yAxisLabel="Amount ($)"
 * />
 *
 * // Custom styling and formatting
 * <LineChart
 *   data={data}
 *   index="x"
 *   categories={['y1', 'y2', 'y3']}
 *   colors={['red', 'blue', 'green']}
 *   valueFormatter={(val) => `${val.toFixed(2)}%`}
 *   showGridLines={false}
 *   connectNulls
 *   autoMinValue
 *   className="h-96"
 * />
 * ```
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import type { AxisDomain } from "recharts/types/util/types";

import type { AvailableChartColorsKeys } from "../../lib/chartUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import {
  CartesianGrid,
  Dot,
  Label,
  Line,
  Legend as RechartsLegend,
  LineChart as RechartsLineChart,
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

// #region Legend

/**
 * Props for individual legend items.
 *
 * Configuration for legend item appearance and interaction.
 */
type LegendItemProps = {
  /**
   * Display name for the legend item.
   */
  name: string;
  /**
   * Color key from available chart colors.
   */
  color: AvailableChartColorsKeys;
  /**
   * Optional click handler for legend interactions.
   */
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
  /**
   * Currently active legend item name.
   */
  activeLegend?: string;
};

/**
 * Line chart component for displaying data trends and changes over time.
 *
 * @id line-chart
 * @name LineChart
 * @icon TrendingUp
 * @category charts
 * @component
 * @see {@link https://recharts.org/en-US/api/LineChart}
 * @param props - Component properties.
 */
const LegendItem = ({
  name,
  color,
  onClick,
  activeLegend,
}: LegendItemProps) => {
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
          "h-[3px] w-3.5 shrink-0 rounded-full",
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

/**
 * Props for legend scroll buttons.
 *
 * Configuration for navigation buttons in scrollable legends.
 */
type ScrollButtonProps = {
  /**
   * Icon component to display.
   */
  icon: React.ElementType;
  /**
   * Click handler for scroll action.
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
};

/**
 * Scroll button component for navigating legend overflow.
 *
 * Provides left/right navigation for legends that exceed container width.
 * Supports continuous scrolling with mouse hold and keyboard interaction.
 */
const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const /**
         *
         */
    Icon = icon;
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

/**
 * Props for the Legend component.
 *
 * Configuration for chart legend display and interaction.
 */
type LegendProps = {
  /**
   * Array of category names to display.
   */
  categories: string[];
  /**
   * Optional color mapping for categories.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Click handler for legend item interactions.
   */
  onClickLegendItem?: (category: string, color: string) => void;
  /**
   * Currently active legend item.
   */
  activeLegend?: string;
  /**
   * Whether to enable horizontal scrolling for overflow.
   */
  enableLegendSlider?: boolean;
} & React.OlHTMLAttributes<HTMLOListElement>;

/**
 * Scroll state tracking for legend navigation.
 *
 * Tracks whether scrolling is available in each direction.
 */
type HasScrollProps = {
  /**
   * Whether scrolling left is available.
   */
  left: boolean;
  /**
   * Whether scrolling right is available.
   */
  right: boolean;
};

/**
 * Interactive legend component for chart categories.
 *
 * Displays chart categories with color indicators and optional scrolling
 * for overflow content. Supports click interactions and keyboard navigation.
 *
 * @component
 * @example
 * ```tsx
 * <Legend
 *   categories={['Sales', 'Profit', 'Revenue']}
 *   colors={['blue', 'green', 'red']}
 *   onClickLegendItem={(category, color) => {
 *     console.log('Clicked:', category);
 *   }}
 *   enableLegendSlider
 * />
 * ```
 */
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
            key={`item-${index}`}
            name={category}
            color={colors[index] as AvailableChartColorsKeys}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
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
 * Chart legend wrapper component for Recharts integration.
 *
 * Integrates the custom Legend component with Recharts legend system,
 * handling positioning, height calculations, and responsive behavior.
 *
 * @param payload - Recharts legend payload data.
 * @param categoryColors - Color mapping for categories.
 * @param setLegendHeight - Height setter for layout calculations.
 * @param activeLegend - Currently active legend item.
 * @param onClick - Legend click handler.
 * @param enableLegendSlider - Whether to enable scrolling.
 * @param legendPosition - Legend alignment position.
 * @param yAxisWidth - Y-axis width for positioning.
 */
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

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const legendPayload = payload.filter((item: any) => item.type !== "none");

  const paddingLeft
    = legendPosition === "left" && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      ref={legendRef}
      style={{ paddingLeft }}
      className={cx(
        "flex items-center",
        { "justify-center": legendPosition === "center" },
        { "justify-start": legendPosition === "left" },
        { "justify-end": legendPosition === "right" },
      )}
    >
      <Legend
        categories={legendPayload.map((entry: any) => entry.value)}
        colors={legendPayload.map((entry: any) =>
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

/**
 * Props passed to tooltip components.
 *
 * Subset of ChartTooltipProps for external tooltip components.
 */
type TooltipProps = Pick<ChartTooltipProps, "active" | "payload" | "label">;

/**
 * Individual data item in tooltip payload.
 *
 * Represents a single data series value in the tooltip.
 */
type PayloadItem = {
  /**
   * Category name for the data point.
   */
  category: string;
  /**
   * Numeric value for the data point.
   */
  value: number;
  /**
   * Index value from the data.
   */
  index: string;
  /**
   * Color key for the data series.
   */
  color: AvailableChartColorsKeys;
  /**
   * Optional type identifier.
   */
  type?: string;
  /**
   * Raw data payload.
   */
  payload: any;
};

/**
 * Props for the ChartTooltip component.
 *
 * Configuration for tooltip display and formatting.
 */
type ChartTooltipProps = {
  /**
   * Whether the tooltip is currently active.
   */
  active: boolean | undefined;
  /**
   * Array of data items to display.
   */
  payload: PayloadItem[];
  /**
   * Label for the tooltip (usually x-axis value).
   */
  label: string;
  /**
   * Function to format numeric values.
   */
  valueFormatter: (value: number) => string;
};

/**
 * Default tooltip component for line charts.
 *
 * Displays data values in a formatted card with category colors and labels.
 * Shows when hovering over chart elements.
 *
 * @component
 * @example
 * ```tsx
 * // Used internally by LineChart
 * <ChartTooltip
 *   active={true}
 *   payload={[
 *     { category: 'Sales', value: 100, color: 'blue', index: '0', payload: {} }
 *   ]}
 *   label="January"
 *   valueFormatter={(val) => `$${val}`}
 * />
 * ```
 */
const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const legendPayload = payload.filter((item: any) => item.type !== "none");
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
          {legendPayload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    "h-[3px] w-3.5 shrink-0 rounded-full",
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

// #region LineChart

/**
 * Active dot state for tracking selected data points.
 *
 * Identifies which specific data point is currently active.
 */
type ActiveDot = {
  /**
   * Data point index in the series.
   */
  index?: number;
  /**
   * Data key/category name.
   */
  dataKey?: string;
};

/**
 * Base event properties for chart interactions.
 *
 * Common structure for click and selection events.
 */
type BaseEventProps = {
  /**
   * Type of interaction event.
   */
  eventType: "dot" | "category";
  /**
   * Name of the clicked category.
   */
  categoryClicked: string;
  /**
   * Additional data properties.
   */
  [key: string]: number | string;
};

/**
 * Event props passed to onValueChange callbacks.
 *
 * Can be null when clearing selection or undefined for no event.
 */
type LineChartEventProps = BaseEventProps | null | undefined;

/**
 * Props for the LineChart component.
 *
 * Comprehensive configuration for line chart appearance, behavior, and interactions.
 *
 * @interface LineChartProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
type LineChartProps = {
  /**
   * Array of data objects to chart.
   */
  data: Record<string, any>[];
  /**
   * Key name for x-axis values.
   */
  index: string;
  /**
   * Array of data keys to display as lines.
   */
  categories: string[];
  /**
   * Optional color mapping for categories.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Function to format displayed values.
   */
  valueFormatter?: (value: number) => string;
  /**
   * Whether to show only start and end x-axis labels.
   */
  startEndOnly?: boolean;
  /**
   * Whether to display the x-axis.
   */
  showXAxis?: boolean;
  /**
   * Whether to display the y-axis.
   */
  showYAxis?: boolean;
  /**
   * Whether to show grid lines.
   */
  showGridLines?: boolean;
  /**
   * Width of the y-axis area in pixels.
   */
  yAxisWidth?: number;
  /**
   * X-axis tick interval strategy.
   */
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart";
  /**
   * Whether to show tooltips on hover.
   */
  showTooltip?: boolean;
  /**
   * Whether to display the legend.
   */
  showLegend?: boolean;
  /**
   * Whether to automatically determine minimum y-value.
   */
  autoMinValue?: boolean;
  /**
   * Fixed minimum y-axis value.
   */
  minValue?: number;
  /**
   * Fixed maximum y-axis value.
   */
  maxValue?: number;
  /**
   * Whether to allow decimal values on y-axis.
   */
  allowDecimals?: boolean;
  /**
   * Callback for chart interaction events.
   */
  onValueChange?: (value: LineChartEventProps) => void;
  /**
   * Whether to enable legend scrolling for overflow.
   */
  enableLegendSlider?: boolean;
  /**
   * Minimum gap between x-axis ticks.
   */
  tickGap?: number;
  /**
   * Whether to connect lines across null values.
   */
  connectNulls?: boolean;
  /**
   * Label text for x-axis.
   */
  xAxisLabel?: string;
  /**
   * Label text for y-axis.
   */
  yAxisLabel?: string;
  /**
   * Legend alignment position.
   */
  legendPosition?: "left" | "center" | "right";
  /**
   * Callback for tooltip state changes.
   */
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  /**
   * Custom tooltip component.
   */
  customTooltip?: React.ComponentType<TooltipProps>;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Line chart component for displaying data trends and changes over time.
 *
 * @id line-chart
 * @name LineChart
 * @icon TrendingUp
 * @category charts
 * @component
 * @see {@link https://recharts.org/en-US/api/LineChart}
 * @param props - Component properties.
 */
const LineChart = ({ ref, ...props }: LineChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const {
    data = [],
    categories = [],
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
    connectNulls = false,
    className,
    onValueChange,
    enableLegendSlider = false,
    tickGap = 5,
    xAxisLabel,
    yAxisLabel,
    legendPosition = "right",
    tooltipCallback,
    customTooltip,
    ...other
  } = props;
  const /**
         *
         */
    CustomTooltip = customTooltip;
  const paddingValue
      = (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
  const [legendHeight, setLegendHeight] = React.useState(60);
  const [activeDot, setActiveDot] = React.useState<ActiveDot | undefined>(
    undefined,
  );
  const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
    undefined,
  );
  const categoryColors = constructCategoryColors(categories, colors);

  const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
  const hasOnValueChange = !!onValueChange;
  const prevActiveRef = React.useRef<boolean | undefined>(undefined);
  const prevLabelRef = React.useRef<string | undefined>(undefined);

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
    if (
      (dataKey === activeLegend && !activeDot)
      || (hasOnlyOneValueForKey(data, dataKey)
        && activeDot
        && activeDot.dataKey === dataKey)
    ) {
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
    setActiveDot(undefined);
  }

  return (
    <div ref={ref} className={cx("h-80 w-full", className)} {...other}>
      <ResponsiveContainer>
        <RechartsLineChart
          data={data}
          onClick={
            hasOnValueChange && (activeLegend || activeDot)
              ? () => {
                  setActiveDot(undefined);
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
            padding={{ left: paddingValue, right: paddingValue }}
            hide={!showXAxis}
            dataKey={index}
            interval={startEndOnly ? "preserveStartEnd" : intervalType}
            tick={{ transform: "translate(0, 6)" }}
            ticks={
              startEndOnly
                ? [data[0][index], data[data.length - 1][index]]
                : undefined
            }
            fill=""
            stroke=""
            className={cx(
              // base
              "text-xs",
              // text fill
              "fill-zinc-500 dark:fill-zinc-500",
            )}
            tickLine={false}
            axisLine={false}
            minTickGap={tickGap}
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
            type="number"
            domain={yAxisDomain as AxisDomain}
            tick={{ transform: "translate(-3, 0)" }}
            fill=""
            stroke=""
            className={cx(
              // base
              "text-xs",
              // text fill
              "fill-zinc-500 dark:fill-zinc-500",
            )}
            tickFormatter={valueFormatter}
            allowDecimals={allowDecimals}
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
            cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
            offset={20}
            position={{ y: 0 }}
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
            <Line
              className={cx(
                getColorClassName(
                  categoryColors.get(category) as AvailableChartColorsKeys,
                  "stroke",
                ),
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
                        categoryColors.get(
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
                          categoryColors.get(
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
          {/* hidden lines to increase clickable target area */}
          {onValueChange
            ? categories.map(category => (
                <Line
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
                  connectNulls={connectNulls}
                  onClick={(props: any, event) => {
                    event.stopPropagation();
                    const { name } = props;
                    onCategoryClick(name);
                  }}
                />
              ))
            : null}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

LineChart.displayName = "LineChart";

export { LineChart, type LineChartEventProps, type LineChartProps, type TooltipProps };
