"use client";

import React from "react";
import { AreaChart } from "./component";

const previewData = [
  { month: "Jan", sales: 4000, expenses: 2400 },
  { month: "Feb", sales: 3000, expenses: 1398 },
  { month: "Mar", sales: 2000, expenses: 9800 },
  { month: "Apr", sales: 2780, expenses: 3908 },
  { month: "May", sales: 1890, expenses: 4800 },
  { month: "Jun", sales: 2390, expenses: 3800 },
];

export type AreaChartPreviewProps = {
  /**
   * Chart stacking type.
   * Controls how multiple series are displayed.
   */
  type?: "default" | "stacked" | "percent";
  /**
   * Area fill style.
   * Controls the visual appearance of area regions.
   */
  fill?: "gradient" | "solid" | "none";
  /**
   * Whether to show grid lines.
   * Helps with value reading but can add visual noise.
   */
  showGridLines?: boolean;
  /**
   * Whether to display legend.
   * Shows category names with color indicators.
   */
  showLegend?: boolean;
  /**
   * Color scheme for chart series.
   * Colors are applied to categories in order.
   */
  colors?: Array<"blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia">;
};

export function AreaChartPreview({
  type = "default",
  fill = "gradient",
  showGridLines = true,
  showLegend = true,
  colors = ["blue", "pink"],
}: AreaChartPreviewProps = {}) {
  return (
    <div className="p-8 w-full max-w-2xl">
      <AreaChart
        data={previewData}
        index="month"
        categories={["sales", "expenses"]}
        valueFormatter={value => `$${value.toLocaleString()}`}
        colors={colors}
        type={type}
        fill={fill}
        showGridLines={showGridLines}
        showLegend={showLegend}
      />
    </div>
  );
}

// Preview props for prop explorer
export const areaChartPreviewProps = [
  {
    name: "type",
    type: "select",
    description: "Chart stacking type - controls how multiple series are displayed.",
    options: ["default", "stacked", "percent"],
    defaultValue: "default",
  },
  {
    name: "fill",
    type: "select",
    description: "Area fill style - controls the visual appearance of area regions.",
    options: ["gradient", "solid", "none"],
    defaultValue: "gradient",
  },
  {
    name: "showGridLines",
    type: "boolean",
    description: "Whether to show grid lines - helps with value reading but can add visual noise.",
    defaultValue: true,
  },
  {
    name: "showLegend",
    type: "boolean",
    description: "Whether to display legend - shows category names with color indicators.",
    defaultValue: true,
  },
  {
    name: "colors",
    type: "select",
    description: "Color scheme for chart series - colors are applied to categories in order.",
    options: [
      { label: "Blue & Pink", value: ["blue", "pink"] },
      { label: "Emerald & Amber", value: ["emerald", "amber"] },
      { label: "Violet & Pink", value: ["violet", "pink"] },
    ],
    defaultValue: ["blue", "pink"],
  },
];
