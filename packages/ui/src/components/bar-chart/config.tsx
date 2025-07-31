import React from "react";
// Configuration data - no React imports or JSX
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { BarChartExample, DefaultExample, MultipleSeriesExample, PercentExample, StackedExample, VerticalExample, WithLabelsExample } from "./examples";

// Component configuration - single source of truth
export const componentConfig: ComponentConfig = {
  id: "bar-chart",
  name: "Bar Chart",
  description:
    "A chart component for displaying categorical data as bars, supporting multiple series, stacking, and interactive features.",
  category: "charts" as const,
  icon: "BarChart3",

  installation: {
    npm: "recharts"
  },
  importStatement: `import { BarChart } from "@/components/ui/bar-chart";`,
  componentId: "BarChartExample",

  // Props that users can experiment with
  props: [
    {
      name: "type",
      type: "select",
      description: "The type of bar chart to display.",
      defaultValue: "default",
      options: ["default", "stacked", "percent"]
    },
    {
      name: "layout",
      type: "select",
      description: "The orientation of the bars.",
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"]
    },
    {
      name: "showXAxis",
      type: "boolean",
      description: "Whether to show the X axis.",
      defaultValue: true
    },
    {
      name: "showYAxis",
      type: "boolean",
      description: "Whether to show the Y axis.",
      defaultValue: true
    },
    {
      name: "showGridLines",
      type: "boolean",
      description: "Whether to show grid lines.",
      defaultValue: true
    },
    {
      name: "showTooltip",
      type: "boolean",
      description: "Whether to show tooltips on hover.",
      defaultValue: true
    },
    {
      name: "showLegend",
      type: "boolean",
      description: "Whether to show the legend.",
      defaultValue: true
    },
    {
      name: "legendPosition",
      type: "select",
      description: "Position of the legend.",
      defaultValue: "right",
      options: ["left", "center", "right"]
    },
    {
      name: "allowDecimals",
      type: "boolean",
      description: "Whether to allow decimal values on axes.",
      defaultValue: true
    },
    {
      name: "autoMinValue",
      type: "boolean",
      description: "Whether to automatically calculate minimum Y value.",
      defaultValue: false
    },
    {
      name: "enableLegendSlider",
      type: "boolean",
      description: "Enable scrollable legend for many categories.",
      defaultValue: false
    },
    {
      name: "startEndOnly",
      type: "boolean",
      description: "Show only start and end ticks on axes.",
      defaultValue: false
    },
    {
      name: "xAxisLabel",
      type: "string",
      description: "Label for the X axis."
    },
    {
      name: "yAxisLabel",
      type: "string",
      description: "Label for the Y axis."
    },
    {
      name: "barCategoryGap",
      type: "string",
      description: "Gap between bar categories (e.g., '10%', '20')."
    }
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic bar chart with sample data.",
      code: jsxToString(<DefaultExample />)},
    {
      id: "multiple-series",
      title: "Multiple Series",
      description: "Bar chart with multiple data series.",
      code: jsxToString(<MultipleSeriesExample />)},
    {
      id: "stacked",
      title: "Stacked Bars",
      description: "Bar chart with stacked data series.",
      code: jsxToString(<StackedExample />)},
    {
      id: "percent",
      title: "Percentage Chart",
      description: "Bar chart showing percentage distribution.",
      code: jsxToString(<PercentExample />)},
    {
      id: "vertical",
      title: "Vertical Layout",
      description: "Bar chart with vertical orientation.",
      code: jsxToString(<VerticalExample />)},
    {
      id: "with-labels",
      title: "With Axis Labels",
      description: "Bar chart with custom axis labels.",
      code: jsxToString(<WithLabelsExample />)}
  ],

  api: [
    {
      name: "BarChart",
      description:
        "The main bar chart component for displaying categorical data as bars.",
      properties: [
        {
          name: "data",
          type: "Record<string, any>[]",
          description: "Array of data objects to display in the chart.",
          required: true
        },
        {
          name: "index",
          type: "string",
          description: "Key in data objects to use as the category axis value.",
          required: true
        },
        {
          name: "categories",
          type: "string[]",
          description: "Array of keys in data objects to use as data series.",
          required: true
        },
        {
          name: "colors",
          type: "AvailableChartColorsKeys[]",
          description: "Array of color keys for styling the bars."
        },
        {
          name: "valueFormatter",
          type: "(value: number) => string",
          description: "Function to format values in tooltips and axes.",
          default: "(value) => value.toString()"
        },
        {
          name: "type",
          type: '"default" | "stacked" | "percent"',
          description: "The type of bar chart to display.",
          default: '"default"'
        },
        {
          name: "layout",
          type: '"horizontal" | "vertical"',
          description: "The orientation of the bars.",
          default: '"horizontal"'
        },
        {
          name: "showXAxis",
          type: "boolean",
          description: "Whether to show the X axis.",
          default: "true"
        },
        {
          name: "showYAxis",
          type: "boolean",
          description: "Whether to show the Y axis.",
          default: "true"
        },
        {
          name: "showGridLines",
          type: "boolean",
          description: "Whether to show grid lines.",
          default: "true"
        },
        {
          name: "showTooltip",
          type: "boolean",
          description: "Whether to show tooltips on hover.",
          default: "true"
        },
        {
          name: "showLegend",
          type: "boolean",
          description: "Whether to show the legend.",
          default: "true"
        },
        {
          name: "legendPosition",
          type: '"left" | "center" | "right"',
          description: "Position of the legend.",
          default: '"right"'
        },
        {
          name: "allowDecimals",
          type: "boolean",
          description: "Whether to allow decimal values on axes.",
          default: "true"
        },
        {
          name: "autoMinValue",
          type: "boolean",
          description: "Whether to automatically calculate minimum Y value.",
          default: "false"
        },
        {
          name: "enableLegendSlider",
          type: "boolean",
          description: "Enable scrollable legend for many categories.",
          default: "false"
        },
        {
          name: "startEndOnly",
          type: "boolean",
          description: "Show only start and end ticks on axes.",
          default: "false"
        },
        {
          name: "xAxisLabel",
          type: "string",
          description: "Label for the X axis."
        },
        {
          name: "yAxisLabel",
          type: "string",
          description: "Label for the Y axis."
        },
        {
          name: "barCategoryGap",
          type: "string | number",
          description: "Gap between bar categories."
        },
        {
          name: "onValueChange",
          type: "(value: BarChartEventProps) => void",
          description: "Callback fired when chart interaction occurs."
        },
        {
          name: "tooltipCallback",
          type: "(tooltipCallbackContent: TooltipProps) => void",
          description: "Callback fired when tooltip state changes."
        },
        {
          name: "customTooltip",
          type: "React.ComponentType<TooltipProps>",
          description: "Custom tooltip component to render."
        }
      ]
    }
  ]
};
