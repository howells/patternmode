"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { BarChart } from "@patternmode/ui";

import React from "react";

// Sample data for examples
const chartData = [
  { month: "Jan", sales: 4000, profit: 2400, desktop: 2400, mobile: 1398, tablet: 800, revenue: 5000, category1: 30, category2: 45, category3: 25 },
  { month: "Feb", sales: 3000, profit: 1398, desktop: 2210, mobile: 1800, tablet: 950, revenue: 4500, category1: 35, category2: 40, category3: 25 },
  { month: "Mar", sales: 2000, profit: 9800, desktop: 2290, mobile: 2000, tablet: 1100, revenue: 6200, category1: 25, category2: 50, category3: 25 },
  { month: "Apr", sales: 2780, profit: 3908, desktop: 2000, mobile: 2780, tablet: 1250, revenue: 5800, category1: 40, category2: 35, category3: 25 },
  { month: "May", sales: 1890, profit: 4800, desktop: 2181, mobile: 2500, tablet: 1400, revenue: 7000, category1: 30, category2: 40, category3: 30 },
  { month: "Jun", sales: 2390, profit: 3800, desktop: 2500, mobile: 2100, tablet: 1200, revenue: 6500, category1: 35, category2: 35, category3: 30 },
];

// Default bar chart
export const DefaultExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales"]}
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Multiple series bar chart
export const MultipleSeriesExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales", "profit"]}
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Stacked bar chart
export const StackedExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["desktop", "mobile", "tablet"]}
    type="stacked"
  />
);

// Percentage bar chart
export const PercentExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["category1", "category2", "category3"]}
    type="percent"
  />
);

// Vertical bar chart
export const VerticalExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales"]}
    layout="vertical"
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Bar chart with axis labels
export const WithLabelsExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["revenue"]}
    xAxisLabel="Time Period"
    yAxisLabel="Revenue ($)"
  />
);

// Bar chart with custom colors
export const CustomColorsExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales", "profit"]}
    colors={["blue", "emerald"]}
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Minimal bar chart
export const MinimalExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales"]}
    showXAxis={false}
    showYAxis={false}
    showGridLines={false}
    showLegend={false}
  />
);

// Bar chart without legend
export const NoLegendExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales", "profit"]}
    showLegend={false}
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Bar chart with custom gap
export const CustomGapExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["sales"]}
    barCategoryGap="20%"
    valueFormatter={value => `$${value.toLocaleString()}`}
  />
);

// Vertical stacked bar chart
export const VerticalStackedExample = () => (
  <BarChart
    data={chartData}
    index="month"
    categories={["desktop", "mobile", "tablet"]}
    type="stacked"
    layout="vertical"
  />
);

// Bar chart with negative values
export const NegativeValuesExample = () => {
  const dataWithNegatives = [
    { month: "Jan", profit: 1200, loss: -800 },
    { month: "Feb", profit: 1800, loss: -600 },
    { month: "Mar", profit: 1400, loss: -1200 },
    { month: "Apr", profit: 2200, loss: -400 },
    { month: "May", profit: 1600, loss: -900 },
    { month: "Jun", profit: 2000, loss: -700 },
  ];

  return (
    <BarChart
      data={dataWithNegatives}
      index="month"
      categories={["profit", "loss"]}
      valueFormatter={value => `$${value.toLocaleString()}`}
    />
  );
};

// Default export for prop explorer
export const BarChartExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "MultipleSeriesExample",
    title: "Multiple Series",
    description: "Multiple Series example",
    component: MultipleSeriesExample,
  },
  {
    id: "StackedExample",
    title: "Stacked",
    description: "Stacked example",
    component: StackedExample,
  },
  {
    id: "PercentExample",
    title: "Percent",
    description: "Percent example",
    component: PercentExample,
  },
  {
    id: "VerticalExample",
    title: "Vertical",
    description: "Vertical example",
    component: VerticalExample,
  },
  {
    id: "WithLabelsExample",
    title: "With Labels",
    description: "Example with custom labels",
    component: WithLabelsExample,
  },
  {
    id: "CustomColorsExample",
    title: "Custom Colors",
    description: "Custom Colors example",
    component: CustomColorsExample,
  },
  {
    id: "MinimalExample",
    title: "Minimal",
    description: "Minimal example",
    component: MinimalExample,
  },
  {
    id: "NoLegendExample",
    title: "No Legend",
    description: "No Legend example",
    component: NoLegendExample,
  },
  {
    id: "CustomGapExample",
    title: "Custom Gap",
    description: "Custom Gap example",
    component: CustomGapExample,
  },
  {
    id: "VerticalStackedExample",
    title: "Vertical Stacked",
    description: "Vertical Stacked example",
    component: VerticalStackedExample,
  },
  {
    id: "NegativeValuesExample",
    title: "Negative Values",
    description: "Negative Values example",
    component: NegativeValuesExample,
  },
  {
    id: "BarChartExample",
    title: "Bar Chart",
    description: "Bar Chart example",
    component: BarChartExample,
  },
];
