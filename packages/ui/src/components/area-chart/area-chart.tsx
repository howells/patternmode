// Tremor AreaChart [v1.0.0]
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import type { AxisDomain } from "recharts/types/util/types";
import type { AvailableChartColorsKeys } from "../../lib/chartUtils";

import {
    Area,
    CartesianGrid,
    Dot,
    Label,
    Line,
    AreaChart as RechartsAreaChart,
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

// #region Legend

/**
 * Props for individual legend items.
 *
 * @interface LegendItemProps
 * @example
 * ```tsx
 * <AreaChart data={data} />
 * ```
 */
interface LegendItemProps {
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
}

/**
 * Individual legend item component with color indicator and label.
 *
 * Renders a clickable legend item with a colored indicator dot and text label.
 * Supports hover states and visual feedback for active/inactive states.
 *
 * @component
 * @id area-chart
 * @name Area Chart
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
 * @interface ScrollButtonProps
 */
interface ScrollButtonProps {
  /**
   * Icon component to display in button.
   */
  icon: React.ElementType;
  /**
   * Callback when button is clicked.
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
}

/**
 * Scroll button for navigating legend items when scrolling is enabled.
 *
 * Provides continuous scrolling when held down and proper disabled states.
 * Used for horizontal legend navigation when content overflows.
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
 * Props for the chart legend component.
 *
 * @interface LegendProps
 * @augments React.OlHTMLAttributes<HTMLOListElement>
 */
interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
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
}

/**
 * Scroll state for legend navigation.
 *
 * Tracks whether scrolling is available in each direction.
 */
interface HasScrollProps {
  /**
   * Whether left scroll is available.
   */
  left: boolean;
  /**
   * Whether right scroll is available.
   */
  right: boolean;
}

/**
 * Chart legend component with optional horizontal scrolling.
 *
 * Displays category labels with color indicators. Supports keyboard navigation
 * and horizontal scrolling when legend content overflows the container.
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
 * Chart legend wrapper with dynamic height calculation and positioning.
 *
 * Integrates with Recharts Legend component to provide custom legend rendering
 * with proper alignment, height calculation, and responsive behavior.
 *
 * @param payload - Legend data from Recharts.
 * @param categoryColors - Color mapping for categories.
 * @param setLegendHeight - Callback to update legend height.
 * @param activeLegend - Currently active legend item.
 * @param onClick - Click handler for legend items.
 * @param enableLegendSlider - Whether to enable scrolling.
 * @param legendPosition - Horizontal alignment.
 * @param yAxisWidth - Width of Y axis for alignment.
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
 * Tooltip data structure for chart interactions.
 *
 * Simplified version of ChartTooltipProps for external tooltip callbacks.
 */
type TooltipProps = Pick<ChartTooltipProps, "active" | "payload" | "label">;

/**
 * Individual data point in tooltip payload.
 *
 * Represents a single data series value in the tooltip display.
 */
interface PayloadItem {
  /**
   * Category/series name.
   */
  category: string;
  /**
   * Numeric value.
   */
  value: number;
  /**
   * Index identifier.
   */
  index: string;
  /**
   * Display color.
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
}

/**
 * Props for the chart tooltip component.
 *
 * @interface ChartTooltipProps
 */
interface ChartTooltipProps {
  /**
   * Whether tooltip is currently active.
   */
  active: boolean | undefined;
  /**
   * Array of data points to display.
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
}

/**
 * Default tooltip component for area charts.
 *
 * Displays formatted data values with color-coded indicators and labels.
 * Provides consistent styling and layout for chart data on hover.
 */
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
            {payload.map(({ value, category, color }, index) => (
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

// #region AreaChart

/**
 * Active dot state for area chart interactions.
 *
 * Tracks which specific data point is currently selected.
 */
interface ActiveDot {
  /**
   * Data point index.
   */
  index?: number;
  /**
   * Data series key.
   */
  dataKey?: string;
}

/**
 * Base event data for chart interactions.
 *
 * Common structure for click events on chart elements.
 */
interface BaseEventProps {
  /**
   * Type of element clicked.
   */
  eventType: "dot" | "category";
  /**
   * Category that was clicked.
   */
  categoryClicked: string;
  /**
   * Additional data properties.
   */
  [key: string]: number | string;
}

/**
 * Event data passed to onValueChange callback.
 *
 * Contains information about chart interactions or null when cleared.
 */
type AreaChartEventProps = BaseEventProps | null | undefined;

/**
 * Props for the AreaChart component.
 *
 * Comprehensive configuration options for area chart visualization
 * including data binding, styling, interactivity, and display options.
 *
 * @interface AreaChartProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of data objects to visualize.
   */
  data: Record<string, any>[];
  /**
   * Key in data objects to use for X-axis values.
   */
  index: string;
  /**
   * Array of data keys to display as chart series.
   */
  categories: string[];
  /**
   * Color scheme for chart series.
   */
  colors?: AvailableChartColorsKeys[];
  /**
   * Function to format displayed values.
   */
  valueFormatter?: (value: number) => string;
  /**
   * Show only first and last X-axis labels.
   */
  startEndOnly?: boolean;
  /**
   * Whether to display X-axis.
   */
  showXAxis?: boolean;
  /**
   * Whether to display Y-axis.
   */
  showYAxis?: boolean;
  /**
   * Whether to show grid lines.
   */
  showGridLines?: boolean;
  /**
   * Width of Y-axis in pixels.
   */
  yAxisWidth?: number;
  /**
   * X-axis tick interval strategy.
   */
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart";
  /**
   * Whether to show tooltip on hover.
   */
  showTooltip?: boolean;
  /**
   * Whether to display legend.
   */
  showLegend?: boolean;
  /**
   * Auto-calculate minimum Y value.
   */
  autoMinValue?: boolean;
  /**
   * Fixed minimum Y-axis value.
   */
  minValue?: number;
  /**
   * Fixed maximum Y-axis value.
   */
  maxValue?: number;
  /**
   * Allow decimal values on Y-axis.
   */
  allowDecimals?: boolean;
  /**
   * Callback for chart interactions.
   */
  onValueChange?: (value: AreaChartEventProps) => void;
  /**
   * Enable horizontal legend scrolling.
   */
  enableLegendSlider?: boolean;
  /**
   * Minimum gap between X-axis ticks.
   */
  tickGap?: number;
  /**
   * Connect line segments over null values.
   */
  connectNulls?: boolean;
  /**
   * Label for X-axis.
   */
  xAxisLabel?: string;
  /**
   * Label for Y-axis.
   */
  yAxisLabel?: string;
  /**
   * Chart stacking type.
   */
  type?: "default" | "stacked" | "percent";
  /**
   * Legend horizontal alignment.
   */
  legendPosition?: "left" | "center" | "right";
  /**
   * Area fill style.
   */
  fill?: "gradient" | "solid" | "none";
  /**
   * Callback for tooltip state changes.
   */
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  /**
   * Custom tooltip component.
   */
  customTooltip?: React.ComponentType<TooltipProps>;
}

/**
 * A comprehensive area chart component built with Recharts.
 *
 * Provides rich data visualization with multiple area series, interactive legends,
 * tooltips, and extensive customization options. Supports stacking, percentage
 * views, gradient fills, and responsive design.
 *
 * @param data - Array of data objects for visualization.
 * @param index - Key for X-axis values.
 * @param categories - Data series to display.
 * @param colors - Color scheme for series.
 * @param valueFormatter - Value formatting function.
 * @param type - Chart type (default, stacked, percent).
 * @param fill - Area fill style (gradient, solid, none).
 * @param onValueChange - Interaction callback.
 * @param showLegend - Whether to show legend.
 * @param showTooltip - Whether to show tooltips.
 * @param customTooltip - Custom tooltip component
 *
 * @component
 * @example
 * ```tsx
 * // Basic area chart
 * <AreaChart
 *   data={[
 *     { date: "2023-01", sales: 100, profit: 20 },
 *     { date: "2023-02", sales: 150, profit: 30 },
 *     { date: "2023-03", sales: 120, profit: 25 }
 *   ]}
 *   index="date"
 *   categories={["sales", "profit"]}
 * />
 *
 * // Stacked area chart with custom colors
 * <AreaChart
 *   data={performanceData}
 *   index="quarter"
 *   categories={["revenue", "expenses", "profit"]}
 *   colors={["blue", "red", "green"]}
 *   type="stacked"
 *   valueFormatter={(value) => `$${value.toLocaleString()}`}
 * />
 *
 * // Interactive chart with legend
 * <AreaChart
 *   data={timeSeriesData}
 *   index="timestamp"
 *   categories={["visitors", "conversions"]}
 *   onValueChange={(event) => {
 *     if (event) {
 *       console.log('Clicked:', event.categoryClicked, event.eventType);
 *     }
 *   }}
 *   enableLegendSlider
 *   legendPosition="center"
 * />
 *
 * // Percentage view with custom tooltip
 * <AreaChart
 *   data={marketShareData}
 *   index="month"
 *   categories={["mobile", "desktop", "tablet"]}
 *   type="percent"
 *   fill="solid"
 *   customTooltip={({ active, payload, label }) => {
 *     if (!active || !payload) return null;
 *     return (
 *       <div className="bg-white p-3 border rounded">
 *         <h3>{label}</h3>
 *         {payload.map(item => (
 *           <div key={item.category}>
 *             {item.category}: {item.value}%
 *           </div>
 *         ))}
 *       </div>
 *     );
 *   }}
 * />
 * ```
 *
 * @see https://recharts.org/en-US/api/AreaChart - Recharts documentation
 */
const AreaChart = ({ ref, ...props }: AreaChartProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
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
      type = "default",
      legendPosition = "right",
      fill = "gradient",
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
    const stacked = type === "stacked" || type === "percent";
    const areaId = React.useId();

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

    const getFillContent = ({
      fillType,
      activeDot,
      activeLegend,
      category,
    }: {
      fillType: AreaChartProps["fill"];
      activeDot: ActiveDot | undefined;
      activeLegend: string | undefined;
      category: string;
    }) => {
      const stopOpacity
        = activeDot || (activeLegend && activeLegend !== category) ? 0.1 : 0.3;

      switch (fillType) {
        case "none":
          return <stop stopColor="currentColor" stopOpacity={0} />;
        case "gradient":
          return (
            <>
              <stop
                offset="5%"
                stopColor="currentColor"
                stopOpacity={stopOpacity}
              />
              <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
            </>
          );
        case "solid":
        default:
          return <stop stopColor="currentColor" stopOpacity={stopOpacity} />;
      }
    };

    function valueToPercent(value: number) {
      return `${(value * 100).toFixed(0)}%`;
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
          <RechartsAreaChart
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
            stackOffset={type === "percent" ? "expand" : undefined}
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
              tickFormatter={
                type === "percent" ? valueToPercent : valueFormatter
              }
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
            {categories.map((category) => {
              const categoryId = `${areaId}-${category.replace(
                /[^a-z0-9]/gi,
                "",
              )}`;
              return (
                <React.Fragment key={category}>
                  <defs key={`defs-${category}`}>
                    <linearGradient
                      key={`gradient-${category}`}
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
                      {getFillContent({
                        fillType: fill,
                        activeDot,
                        activeLegend,
                        category,
                      })}
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
                    key={`area-${category}`}
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
            {/* hidden lines to increase clickable target area */}
            {onValueChange
              ? categories.map(category => (
                  <Line
                    className={cx("cursor-pointer")}
                    strokeOpacity={0}
                    key={`line-${category}`}
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
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

AreaChart.displayName = "AreaChart";

export { AreaChart, type AreaChartEventProps, type TooltipProps };
