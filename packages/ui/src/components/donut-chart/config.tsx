import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { CustomColorsExample, DefaultExample, InteractiveExample, PieVariantExample, SmallSizeExample, WithLabelExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "donut-chart",
  name: "Donut Chart",
  description: "A donut chart component for displaying data with a hollow center.",
  category: "charts" as const,
  componentId: "donut-chart",
  icon: "PieChart",

  installation: {
    npm: "recharts",
  },
  importStatement: `import { DonutChart } from "@patternmode/ui";`,

  props: [
    {
      name: "data",
      type: "array",
      defaultValue: "[]",
      description: "Array of data objects for the chart.",
    },
    {
      name: "category",
      type: "string",
      defaultValue: "name",
      description: "The key to access the category/name of each data item.",
    },
    {
      name: "value",
      type: "string",
      defaultValue: "value",
      description: "The key to access the value of each data item.",
    },
    {
      name: "valueFormatter",
      type: "function",
      defaultValue: undefined,
      description: "Function to format the displayed values.",
    },
    {
      name: "showLegend",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show the legend.",
    },
    {
      name: "showTooltip",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show tooltips on hover.",
    },
    {
      name: "colors",
      type: "array",
      defaultValue: undefined,
      description: "Array of colors for the chart segments.",
    },
  ],

  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic donut chart showing data segments.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "pie-variant",
      title: "Pie Variant",
      description: "Donut chart displayed as a pie chart.",
      code: jsxToString(<PieVariantExample />),
    },
    {
      id: "with-label",
      title: "With Label",
      description: "Donut chart with labels displayed.",
      code: jsxToString(<WithLabelExample />),
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Donut chart with custom color palette.",
      code: jsxToString(<CustomColorsExample />),
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Interactive donut chart with hover effects.",
      code: jsxToString(<InteractiveExample />),
    },
    {
      id: "small-size",
      title: "Small Size",
      description: "Compact donut chart for small spaces.",
      code: jsxToString(<SmallSizeExample />),
    },
  ],
};
