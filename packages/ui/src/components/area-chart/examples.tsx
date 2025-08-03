"use client";

import React from "react";
import { AreaChart } from "./component";

// Sample data for examples
const chartData = [
  { date: "Jan", sales: 4000, profit: 2400, desktop: 2400, mobile: 1398, tablet: 800, revenue: 5000, expenses: 3000, value: 4567, category1: 30, category2: 45, category3: 25 },
  { date: "Feb", sales: 3000, profit: 1398, desktop: 2210, mobile: 1800, tablet: 950, revenue: 4500, expenses: 2800, value: 3456, category1: 35, category2: 40, category3: 25 },
  { date: "Mar", sales: 2000, profit: 9800, desktop: 2290, mobile: 2000, tablet: 1100, revenue: 6200, expenses: 3200, value: 5678, category1: 25, category2: 50, category3: 25 },
  { date: "Apr", sales: 2780, profit: 3908, desktop: 2000, mobile: 2780, tablet: 1250, revenue: 5800, expenses: 3100, value: 4567, category1: 40, category2: 35, category3: 25 },
  { date: "May", sales: 1890, profit: 4800, desktop: 2181, mobile: 2500, tablet: 1400, revenue: 7000, expenses: 3500, value: 6789, category1: 30, category2: 40, category3: 30 },
  { date: "Jun", sales: 2390, profit: 3800, desktop: 2500, mobile: 2100, tablet: 1200, revenue: 6500, expenses: 3300, value: 5678, category1: 35, category2: 35, category3: 30 },
];

// Default area chart
export const DefaultExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["sales", "profit"]}
  />
);

// Stacked area chart
export const StackedExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["desktop", "mobile", "tablet"]}
    type="stacked"
  />
);

// Percentage area chart
export const PercentExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["category1", "category2", "category3"]}
    type="percent"
  />
);

// Solid fill area chart
export const SolidFillExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["revenue", "expenses"]}
    fill="solid"
  />
);

// Area chart with axis labels
export const WithLabelsExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["value"]}
    xAxisLabel="Time Period"
    yAxisLabel="Amount ($)"
  />
);

// Area chart with custom colors
export const CustomColorsExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["sales", "profit"]}
    colors={["blue", "emerald"]}
  />
);

// Area chart without legend
export const NoLegendExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["sales", "profit"]}
    showLegend={false}
  />
);

// Area chart with value formatter
export const FormattedValuesExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["revenue", "expenses"]}
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Minimal area chart
export const MinimalExample = () => (
  <AreaChart
    data={chartData}
    index="date"
    categories={["sales"]}
    showXAxis={false}
    showYAxis={false}
    showGridLines={false}
    showLegend={false}
  />
);

// Area chart with connected nulls
export const ConnectedNullsExample = () => {
  const dataWithNulls = [
    { date: "Jan", value: 4000 },
    { date: "Feb", value: 3000 },
    { date: "Mar", value: null },
    { date: "Apr", value: 2780 },
    { date: "May", value: 1890 },
    { date: "Jun", value: 2390 },
  ];

  return (
    <AreaChart
      data={dataWithNulls}
      index="date"
      categories={["value"]}
      connectNulls={true}
    />
  );
};
