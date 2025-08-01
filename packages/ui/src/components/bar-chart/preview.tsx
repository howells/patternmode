"use client";

import type { BarChartProps } from "./bar-chart";

import { BarChart } from "@patternmode/ui";
import React from "react";

type BarChartExampleProps = {
  [key: string]: unknown;
};

// Sample data for the bar chart
const sampleData = [
  { month: "Jan", sales: 2400, profit: 1200, expenses: 1000 },
  { month: "Feb", sales: 1398, profit: 800, expenses: 1200 },
  { month: "Mar", sales: 9800, profit: 4900, expenses: 2000 },
  { month: "Apr", sales: 3908, profit: 2000, expenses: 1800 },
  { month: "May", sales: 4800, profit: 2400, expenses: 1500 },
  { month: "Jun", sales: 3800, profit: 1900, expenses: 1300 },
  { month: "Jul", sales: 4300, profit: 2150, expenses: 1400 },
  { month: "Aug", sales: 3200, profit: 1600, expenses: 1100 },
  { month: "Sep", sales: 5100, profit: 2550, expenses: 1600 },
  { month: "Oct", sales: 4600, profit: 2300, expenses: 1450 },
  { month: "Nov", sales: 5800, profit: 2900, expenses: 1700 },
  { month: "Dec", sales: 6200, profit: 3100, expenses: 1800 },
];

export function BarChartExample(props: BarChartProps) {
  return (
    <BarChart
      data={sampleData}
      index="month"
      categories={["sales", "profit", "expenses"]}
      valueFormatter={value => `$${value.toLocaleString()}`}
      {...props}
    />
  );
}
