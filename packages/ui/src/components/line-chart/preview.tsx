"use client";

import React from "react";
import { LineChart } from "./component";

const previewData = [
  { month: "Jan", sales: 2400, profit: 1200 },
  { month: "Feb", sales: 1398, profit: 900 },
  { month: "Mar", sales: 9800, profit: 4500 },
  { month: "Apr", sales: 3908, profit: 2100 },
  { month: "May", sales: 4800, profit: 2700 },
  { month: "Jun", sales: 3800, profit: 2200 },
];

export type LineChartPreviewProps = {
  /**
   * Line curve type.
   * Controls the line interpolation style.
   */
  curveType?: "linear" | "natural" | "monotone" | "step";
  /**
   * Whether to show data points (dots).
   * Displays circles at each data point when enabled.
   */
  showDots?: boolean;
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

export function LineChartPreview({
  curveType = "linear",
  showDots = false,
  showGridLines = true,
  showLegend = true,
  colors = ["blue", "emerald"],
}: LineChartPreviewProps = {}) {
  return (
    <div className="p-8">
      <LineChart
        data={previewData}
        index="month"
        categories={["sales", "profit"]}
        valueFormatter={value => `$${value.toLocaleString()}`}
        colors={colors}
        curveType={curveType}
        showDots={showDots}
        showGridLines={showGridLines}
        showLegend={showLegend}
      />
    </div>
  );
}

// Preview props for prop explorer
export const lineChartPreviewProps = [
  {
    name: "curveType",
    type: "select",
    description: "Line curve type - controls the line interpolation style.",
    options: ["linear", "natural", "monotone", "step"],
    defaultValue: "linear",
  },
  {
    name: "showDots",
    type: "boolean",
    description: "Whether to show data points (dots) - displays circles at each data point when enabled.",
    defaultValue: false,
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
