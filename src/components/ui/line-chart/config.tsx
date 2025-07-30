import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { LineChartExample, MultipleLinesExample, WithNullValuesExample, InteractiveExample, CustomFormattingExample, MinimalExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "line-chart",
  name: "Line Chart",
  description: "A line chart for displaying trends and changes over time with multiple data series support.",
  category: "charts" as const,
  icon: "TrendingUp",

  installation: {
    npm: "recharts"
  },
  importStatement: `import { LineChart } from "@patternmode/ui";`,
  componentId: "LineChartExample",
  props: [
    {
      name: "data",
      type: "string",
      defaultValue: "[]",
      description: "Chart data array."
    },
    {
      name: "categories",
      type: "string",
      defaultValue: "[]",
      description: "Data series categories to display."
    },
    {
      name: "index",
      type: "string",
      defaultValue: "name",
      description: "Property name for x-axis values."
    },
    {
      name: "colors",
      type: "string",
      defaultValue: "[]",
      description: "Custom colors for data series."
    },
    {
      name: "valueFormatter",
      type: "function",
      description: "Function to format values."
    },
    {
      name: "showXAxis",
      type: "boolean",
      defaultValue: true,
      description: "Show the x-axis."
    },
    {
      name: "showYAxis",
      type: "boolean",
      defaultValue: true,
      description: "Show the y-axis."
    },
    {
      name: "showGridLines",
      type: "boolean",
      defaultValue: true,
      description: "Show grid lines."
    },
    {
      name: "showLegend",
      type: "boolean",
      defaultValue: true,
      description: "Show the legend."
    },
    {
      name: "showTooltip",
      type: "boolean",
      defaultValue: true,
      description: "Show tooltips on hover."
    },
    {
      name: "curveType",
      type: "select",
      options: ["linear", "monotone", "step"],
      defaultValue: "linear",
      description: "Line curve type."
    },
    {
      name: "connectNulls",
      type: "boolean",
      defaultValue: false,
      description: "Connect lines across null data points."
    },
    {
      name: "enableLegendSlider",
      type: "boolean",
      defaultValue: false,
      description: "Enable horizontal scroll for legend items."
    }
  ],
  examples: [
    {
      id: "line-chart",
      title: "Default",
      description: "A line chart for displaying trends and changes over time with multiple data series support.",
      code: jsxToString(<LineChartExample />),
    },
    {
      id: "multiple-lines",
      title: "Multiple Lines",
      description: "Line chart with multiple data series and custom colors.",
      code: jsxToString(<MultipleLinesExample />),
    },
    {
      id: "with-null-values",
      title: "With Null Values",
      description: "Line chart handling missing data points.",
      code: jsxToString(<WithNullValuesExample />)},
    {
      id: "interactive",
      title: "Interactive",
      description: "Line chart with click interactions and legend filtering.",
      code: jsxToString(<InteractiveExample />),
    },
    {
      id: "custom-formatting",
      title: "Custom Formatting",
      description: "Line chart with custom value formatters and axis labels.",
      code: jsxToString(<CustomFormattingExample />)},
    {
      id: "minimal",
      title: "Minimal",
      description: "Clean line chart without axes or legend.",
      code: jsxToString(<MinimalExample />)}
  ]
};