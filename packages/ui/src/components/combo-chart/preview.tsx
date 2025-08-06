"use client";

import React from "react";
import { ComboChart } from "./component";

const previewData = [
  { month: "Jan", revenue: 4000, users: 240 },
  { month: "Feb", revenue: 3000, users: 139 },
  { month: "Mar", revenue: 2000, users: 380 },
  { month: "Apr", revenue: 2780, users: 309 },
  { month: "May", revenue: 1890, users: 400 },
  { month: "Jun", revenue: 2390, users: 280 },
];

export type ComboChartPreviewProps = {
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
   * Whether to show tooltip on hover.
   * Provides detailed information on data point interaction.
   */
  showTooltip?: boolean;
  /**
   * Bar series color scheme.
   * Colors applied to bar categories in order.
   */
  barColors?: Array<"blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia">;
  /**
   * Line series color scheme.
   * Colors applied to line categories in order.
   */
  lineColors?: Array<"blue" | "emerald" | "violet" | "amber" | "gray" | "cyan" | "pink" | "lime" | "fuchsia">;
};

export function ComboChartPreview({
  showGridLines = true,
  showLegend = true,
  showTooltip = true,
  barColors = ["blue"],
  lineColors = ["emerald"],
}: ComboChartPreviewProps = {}) {
  return (
    <div className="p-8 w-full max-w-2xl">
      <ComboChart
        data={previewData}
        index="month"
        barSeries={{
          categories: ["revenue"],
          colors: barColors,
          valueFormatter: value => `$${value}`,
        }}
        lineSeries={{
          categories: ["users"],
          colors: lineColors,
          valueFormatter: value => `${value}`,
        }}
        showGridLines={showGridLines}
        showLegend={showLegend}
        showTooltip={showTooltip}
      />
    </div>
  );
}

// Preview props for prop explorer
export const comboChartPreviewProps = [
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
    name: "showTooltip",
    type: "boolean",
    description: "Whether to show tooltip on hover - provides detailed information on data point interaction.",
    defaultValue: true,
  },
  {
    name: "barColors",
    type: "select",
    description: "Bar series color scheme - colors applied to bar categories in order.",
    options: [
      { label: "Blue", value: ["blue"] },
      { label: "Emerald", value: ["emerald"] },
      { label: "Pink", value: ["pink"] },
      { label: "Indigo", value: ["indigo"] },
      { label: "Orange", value: ["orange"] },
    ],
    defaultValue: ["blue"],
  },
  {
    name: "lineColors",
    type: "select",
    description: "Line series color scheme - colors applied to line categories in order.",
    options: [
      { label: "Emerald", value: ["emerald"] },
      { label: "Blue", value: ["blue"] },
      { label: "Pink", value: ["pink"] },
      { label: "Indigo", value: ["indigo"] },
      { label: "Orange", value: ["orange"] },
    ],
    defaultValue: ["emerald"],
  },
];
