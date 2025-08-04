"use client";

import React from "react";
import { BarChart } from "./component";

const previewData = [
  { category: "A", value1: 4000, value2: 2400 },
  { category: "B", value1: 3000, value2: 1398 },
  { category: "C", value1: 2000, value2: 9800 },
  { category: "D", value1: 2780, value2: 3908 },
  { category: "E", value1: 1890, value2: 4800 },
];

export type BarChartPreviewProps = {
  /**
   * Chart orientation layout.
   * Controls whether bars are vertical or horizontal.
   */
  layout?: "vertical" | "horizontal";
  /**
   * Chart stacking type.
   * Controls how multiple series are displayed.
   */
  type?: "default" | "stacked" | "percent";
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
  colors?: Array<"blue" | "emerald" | "pink" | "indigo" | "orange">;
};

export function BarChartExample({
  layout = "vertical",
  type = "default",
  showGridLines = true,
  showLegend = true,
  colors = ["blue", "emerald"],
}: BarChartPreviewProps = {}) {
  return (
    <div className="p-8">
      <BarChart
        data={previewData}
        index="category"
        categories={["value1", "value2"]}
        valueFormatter={value => `$${value.toLocaleString()}`}
        colors={colors}
        layout={layout}
        type={type}
        showGridLines={showGridLines}
        showLegend={showLegend}
      />
    </div>
  );
}

// Preview props for prop explorer
export const BarChartPreviewProps = [
  {
    name: "layout",
    type: "select",
    description: "Chart orientation layout - controls whether bars are vertical or horizontal.",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
  },
  {
    name: "type",
    type: "select",
    description: "Chart stacking type - controls how multiple series are displayed.",
    options: ["default", "stacked", "percent"],
    defaultValue: "default",
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
      { label: "Blue & Emerald", value: ["blue", "emerald"] },
      { label: "Pink & Orange", value: ["pink", "orange"] },
      { label: "Indigo & Pink", value: ["indigo", "pink"] },
    ],
    defaultValue: ["blue", "emerald"],
  },
];
