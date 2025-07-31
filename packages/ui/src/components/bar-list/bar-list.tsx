"use client";

import React from "react";
import { cx, focusRing } from "../../lib/utils";

/**
 * Data item for bar list visualization.
 * 
 * Represents a single bar with required name/value and optional metadata.
 * Can be extended with additional properties via generic type parameter.
 * 
 * @template T - Additional properties to include in bar data
 * @example
 * ```tsx
 * <BarList data={data} />
 * ```
 */
type Bar<T> = T & {
  /** Unique identifier for the bar (defaults to name if not provided) */
  key?: string;
  /** Optional URL to make the bar name clickable */
  href?: string;
  /** Numeric value for bar length calculation */
  value: number;
  /** Display name for the bar */
  name: string;
};

/**
 * Props for the BarList component.
 * 
 * Configuration for horizontal bar list visualization with optional
 * interactivity, sorting, and formatting options.
 * 
 * @template T - Additional properties in bar data items
 * @interface BarListProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 */
interface BarListProps<T = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of data items to visualize as bars */
  data: Bar<T>[];
  /** Function to format displayed values */
  valueFormatter?: (value: number) => string;
  /** Whether to animate bar width transitions */
  showAnimation?: boolean;
  /** Callback when a bar is clicked (makes bars interactive) */
  onValueChange?: (payload: Bar<T>) => void;
  /** How to sort the bars by value */
  sortOrder?: "ascending" | "descending" | "none";
}

/**
 * Internal implementation of the bar list component.
 * 
 * Renders a horizontal bar chart with proportional bar lengths, optional sorting,
 * click interactions, and value formatting. Bars are colored and can include
 * clickable links.
 *
 * @template T - Additional properties in bar data
 */
function BarListInner<T>(
  {
    data = [],
    valueFormatter = (value) => value.toString(),
    showAnimation = false,
    onValueChange,
    sortOrder = "descending",
    className,
    ...props
  }: BarListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const Component = onValueChange ? "button" : "div";
  const sortedData = React.useMemo(() => {
    if (sortOrder === "none") {
      return data;
    }
    return [...data].sort((a, b) => {
      return sortOrder === "ascending" ? a.value - b.value : b.value - a.value;
    });
  }, [data, sortOrder]);

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0);
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2)
    );
  }, [sortedData]);

  const rowHeight = "h-8";

  return (
    <div
      ref={forwardedRef}
      className={cx("flex justify-between space-x-6", className)}
      aria-sort={sortOrder}
      {...props}
    >
      <div className="relative w-full space-y-1.5">
        {sortedData.map((item, index) => (
          <Component
            key={item.key ?? item.name}
            onClick={() => {
              onValueChange?.(item);
            }}
            className={cx(
              // base
              "group w-full rounded-sm",
              // focus
              focusRing,
              onValueChange
                ? [
                    "-m-0! cursor-pointer",
                    // hover
                    "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                  ]
                : ""
            )}
          >
            <div
              className={cx(
                // base
                "flex items-center rounded-sm transition-all",
                rowHeight,
                // background color
                "bg-blue-200 dark:bg-blue-900",
                onValueChange
                  ? "group-hover:bg-blue-300 dark:group-hover:bg-blue-800"
                  : "",
                // margin and duration
                {
                  "mb-0": index === sortedData.length - 1,
                  "duration-800": showAnimation,
                }
              )}
              style={{ width: `${widths[index]}%` }}
            >
              <div className={cx("absolute left-2 flex max-w-full pr-2")}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={cx(
                      // base
                      "truncate whitespace-nowrap rounded-sm text-sm",
                      // text color
                      "text-zinc-900 dark:text-zinc-50",
                      // hover
                      "hover:underline hover:underline-offset-2",
                      // focus
                      focusRing
                    )}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p
                    className={cx(
                      // base
                      "truncate whitespace-nowrap text-sm",
                      // text color
                      "text-zinc-900 dark:text-zinc-50"
                    )}
                  >
                    {item.name}
                  </p>
                )}
              </div>
            </div>
          </Component>
        ))}
      </div>
      <div>
        {sortedData.map((item, index) => (
          <div
            key={item.key ?? item.name}
            className={cx(
              "flex items-center justify-end",
              rowHeight,
              index === sortedData.length - 1 ? "mb-0" : "mb-1.5"
            )}
          >
            <p
              className={cx(
                // base
                "truncate whitespace-nowrap text-sm leading-none",
                // text color
                "text-zinc-900 dark:text-zinc-50"
              )}
            >
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

BarListInner.displayName = "BarList";

/**
 * A horizontal bar list component for displaying ranked data.
 * 
 * Creates a simple horizontal bar chart where bar lengths are proportional
 * to their values. Supports sorting, click interactions, custom formatting,
 * and optional animations. Ideal for showing rankings, comparisons, or
 * progress indicators.
 *
 * @template T - Additional properties to include in bar data
 * @param data - Array of bar data items
 * @param valueFormatter - Function to format displayed values
 * @param showAnimation - Whether to animate bar width changes
 * @param onValueChange - Callback for bar clicks (enables interactivity)
 * @param sortOrder - How to sort bars (ascending, descending, or none)
 *
 *
 * @id bar-list
 * @name BarList
 * @component
 * @example
 * ```tsx
 * // Basic bar list
 * <BarList
 *   data={[
 *     { name: "Product A", value: 120 },
 *     { name: "Product B", value: 80 },
 *     { name: "Product C", value: 200 }
 *   ]}
 * />
 *
 * // With custom formatting and sorting
 * <BarList
 *   data={salesData}
 *   valueFormatter={(value) => `$${value.toLocaleString()}`}
 *   sortOrder="ascending"
 *   showAnimation
 * />
 *
 * // Interactive with click handling
 * <BarList
 *   data={categoryData}
 *   onValueChange={(bar) => {
 *     console.log('Clicked:', bar.name, bar.value);
 *     setSelectedCategory(bar.name);
 *   }}
 *   sortOrder="descending"
 * />
 *
 * // With clickable links
 * <BarList
 *   data={[
 *     { 
 *       name: "Documentation", 
 *       value: 45, 
 *       href: "/docs" 
 *     },
 *     { 
 *       name: "API Reference", 
 *       value: 32, 
 *       href: "/api" 
 *     }
 *   ]}
 *   valueFormatter={(value) => `${value}%`}
 * />
 *
 * // Extended with custom data
 * <BarList<{ category: string; trend: 'up' | 'down' }>
 *   data={[
 *     { 
 *       name: "Sales", 
 *       value: 150, 
 *       category: "revenue", 
 *       trend: "up" 
 *     },
 *     { 
 *       name: "Marketing", 
 *       value: 75, 
 *       category: "expense", 
 *       trend: "down" 
 *     }
 *   ]}
 *   onValueChange={(bar) => {
 *     console.log('Trend:', bar.trend, 'Category:', bar.category);
 *   }}
 * />
 * ```
 */
/**
 * A horizontal bar chart component for displaying comparative data with optional interactivity.
 *
 * @id bar-list
 * @name BarList
 * @component
 */
const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof BarListInner>;

export { BarList, type BarListProps, type Bar };