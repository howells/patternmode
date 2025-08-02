"use client";

import type { AreaChartProps } from "./area-chart";

import { AreaChart } from "@patternmode/ui";
import React from "react";

// Realistic revenue data for the area chart
const revenueData = [
  { month: "Jan", revenue: 45000, profit: 12000, expenses: 33000 },
  { month: "Feb", revenue: 52000, profit: 18000, expenses: 34000 },
  { month: "Mar", revenue: 48000, profit: 15000, expenses: 33000 },
  { month: "Apr", revenue: 61000, profit: 24000, expenses: 37000 },
  { month: "May", revenue: 55000, profit: 20000, expenses: 35000 },
  { month: "Jun", revenue: 67000, profit: 28000, expenses: 39000 },
  { month: "Jul", revenue: 72000, profit: 32000, expenses: 40000 },
  { month: "Aug", revenue: 68000, profit: 29000, expenses: 39000 },
  { month: "Sep", revenue: 74000, profit: 35000, expenses: 39000 },
  { month: "Oct", revenue: 81000, profit: 42000, expenses: 39000 },
  { month: "Nov", revenue: 78000, profit: 38000, expenses: 40000 },
  { month: "Dec", revenue: 85000, profit: 45000, expenses: 40000 },
];

export function AreaChartExample(props: AreaChartProps) {
  const {
    data = revenueData,
    index = "month",
    categories = ["revenue", "profit", "expenses"],
    valueFormatter = (value: number) => `$${(value / 1000).toFixed(0)}k`,
    colors = ["blue", "emerald", "pink"],
    showLegend = true,
    showTooltip = true,
    showGridLines = true,
    className = "h-80 w-128 max-w-full",
    ...restProps
  } = props;

  return (
    <div className="space-y-4">

      <AreaChart
        data={data}
        index={index}
        categories={categories}
        valueFormatter={valueFormatter}
        colors={colors}
        showLegend={showLegend}
        showTooltip={showTooltip}
        showGridLines={showGridLines}
        className={className}
        yAxisLabel="Amount ($)"
        xAxisLabel="Month"
        {...restProps}
      />
    </div>
  );
}
