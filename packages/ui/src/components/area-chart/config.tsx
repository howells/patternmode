import React from "react";
// Configuration data - no React imports or JSX
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import {
  DefaultExample,
  PercentExample,
  SolidFillExample,
  StackedExample,
  WithLabelsExample,
} from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "area-chart",
  name: "Area Chart",
  description:
    "A chart component for displaying data as filled areas, supporting multiple series, stacking, and interactive features.",
  category: "charts" as const,
  icon: "AreaChart",

  installation: {
    npm: "recharts",
  },
  importStatement: `import { AreaChart } from "@/components/ui/area-chart";`,
  componentId: "AreaChartExample",

  // Props that users can experiment with
  props: [
    {
      name: "type",
      type: "select",
      description: "The type of area chart to display.",
      defaultValue: "default",
      options: ["default", "stacked", "percent"],
    },
    {
      name: "fill",
      type: "select",
      description: "The fill style for the areas.",
      defaultValue: "gradient",
      options: ["gradient", "solid", "none"],
    },
    {
      name: "showXAxis",
      type: "boolean",
      description: "Whether to show the X axis.",
      defaultValue: true,
    },
    {
      name: "showYAxis",
      type: "boolean",
      description: "Whether to show the Y axis.",
      defaultValue: true,
    },
    {
      name: "showGridLines",
      type: "boolean",
      description: "Whether to show grid lines.",
      defaultValue: true,
    },
    {
      name: "showTooltip",
      type: "boolean",
      description: "Whether to show tooltips on hover.",
      defaultValue: true,
    },
    {
      name: "showLegend",
      type: "boolean",
      description: "Whether to show the legend.",
      defaultValue: true,
    },
    {
      name: "legendPosition",
      type: "select",
      description: "Position of the legend.",
      defaultValue: "right",
      options: ["left", "center", "right"],
    },
    {
      name: "connectNulls",
      type: "boolean",
      description: "Whether to connect null data points.",
      defaultValue: false,
    },
    {
      name: "allowDecimals",
      type: "boolean",
      description: "Whether to allow decimal values on Y axis.",
      defaultValue: true,
    },
    {
      name: "autoMinValue",
      type: "boolean",
      description: "Whether to automatically calculate minimum Y value.",
      defaultValue: false,
    },
    {
      name: "enableLegendSlider",
      type: "boolean",
      description: "Enable scrollable legend for many categories.",
      defaultValue: false,
    },
    {
      name: "startEndOnly",
      type: "boolean",
      description: "Show only start and end ticks on X axis.",
      defaultValue: false,
    },
    {
      name: "xAxisLabel",
      type: "string",
      description: "Label for the X axis.",
    },
    {
      name: "yAxisLabel",
      type: "string",
      description: "Label for the Y axis.",
    },
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic area chart with sample data.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "stacked",
      title: "Stacked Areas",
      description: "Area chart with stacked data series.",
      code: jsxToString(<StackedExample />),
    },
    {
      id: "percent",
      title: "Percentage Chart",
      description: "Area chart showing percentage distribution.",
      code: jsxToString(<PercentExample />),
    },
    {
      id: "solid-fill",
      title: "Solid Fill",
      description: "Area chart with solid color fills.",
      code: jsxToString(<SolidFillExample />),
    },
    {
      id: "with-labels",
      title: "With Axis Labels",
      description: "Area chart with custom axis labels.",
      code: jsxToString(<WithLabelsExample />),
    },
  ],

  api: [
    {
      name: "AreaChart",
      description:
        "The main area chart component for displaying data as filled areas.",
      properties: [
        {
          name: "data",
          type: "Record<string, any>[]",
          description: "Array of data objects to display in the chart.",
          required: true,
        },
        {
          name: "index",
          type: "string",
          description: "Key in data objects to use as the X-axis value.",
          required: true,
        },
        {
          name: "categories",
          type: "string[]",
          description: "Array of keys in data objects to use as data series.",
          required: true,
        },
        {
          name: "colors",
          type: "AvailableChartColorsKeys[]",
          description: "Array of color keys for styling the areas.",
        },
        {
          name: "valueFormatter",
          type: "(value: number) => string",
          description: "Function to format values in tooltips and axes.",
          default: "(value) => value.toString()",
        },
        {
          name: "type",
          type: '"default" | "stacked" | "percent"',
          description: "The type of area chart to display.",
          default: '"default"',
        },
        {
          name: "fill",
          type: '"gradient" | "solid" | "none"',
          description: "The fill style for the areas.",
          default: '"gradient"',
        },
        {
          name: "showXAxis",
          type: "boolean",
          description: "Whether to show the X axis.",
          default: "true",
        },
        {
          name: "showYAxis",
          type: "boolean",
          description: "Whether to show the Y axis.",
          default: "true",
        },
        {
          name: "showGridLines",
          type: "boolean",
          description: "Whether to show grid lines.",
          default: "true",
        },
        {
          name: "showTooltip",
          type: "boolean",
          description: "Whether to show tooltips on hover.",
          default: "true",
        },
        {
          name: "showLegend",
          type: "boolean",
          description: "Whether to show the legend.",
          default: "true",
        },
        {
          name: "legendPosition",
          type: '"left" | "center" | "right"',
          description: "Position of the legend.",
          default: '"right"',
        },
        {
          name: "connectNulls",
          type: "boolean",
          description: "Whether to connect null data points.",
          default: "false",
        },
        {
          name: "allowDecimals",
          type: "boolean",
          description: "Whether to allow decimal values on Y axis.",
          default: "true",
        },
        {
          name: "autoMinValue",
          type: "boolean",
          description: "Whether to automatically calculate minimum Y value.",
          default: "false",
        },
        {
          name: "enableLegendSlider",
          type: "boolean",
          description: "Enable scrollable legend for many categories.",
          default: "false",
        },
        {
          name: "startEndOnly",
          type: "boolean",
          description: "Show only start and end ticks on X axis.",
          default: "false",
        },
        {
          name: "xAxisLabel",
          type: "string",
          description: "Label for the X axis.",
        },
        {
          name: "yAxisLabel",
          type: "string",
          description: "Label for the Y axis.",
        },
        {
          name: "onValueChange",
          type: "(value: AreaChartEventProps) => void",
          description: "Callback fired when chart interaction occurs.",
        },
        {
          name: "tooltipCallback",
          type: "(tooltipCallbackContent: TooltipProps) => void",
          description: "Callback fired when tooltip state changes.",
        },
        {
          name: "customTooltip",
          type: "React.ComponentType<TooltipProps>",
          description: "Custom tooltip component to render.",
        },
      ],
    },
  ],
};
