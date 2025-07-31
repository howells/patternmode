import type { ComponentConfig } from "../../lib/component-config-types";
import React from "react";
import { jsxToString } from "../../lib/jsx-to-string";
import { BiaxialExample, CustomFormattingExample, DefaultExample, InteractiveExample, MultipleLinesExample, StackedBarsExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "combo-chart",
  name: "Combo Chart",
  description: "A combination chart that displays both bar and line charts in a single visualization with shared or separate Y-axes.",
  category: "charts" as const,
  icon: "TrendingUp",

  importStatement: `import { ComboChart } from "@/components/ui/combo-chart";`,
  componentId: "ComboChartExample",
  props: [
    {
      name: "showXAxis",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show the X-axis.",
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
      name: "showGridLines",
      type: "boolean",
      defaultValue: true,
      description: "Whether to show grid lines.",
    },
    {
      name: "enableBiaxial",
      type: "boolean",
      defaultValue: false,
      description: "Whether to enable separate Y-axes for bar and line series.",
    },
    {
      name: "enableLegendSlider",
      type: "boolean",
      defaultValue: false,
      description: "Whether to enable scrollable legend for many categories.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic combo chart with bars and lines sharing the same Y-axis.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "biaxial",
      title: "Biaxial (Dual Y-Axis)",
      description: "Combo chart with separate Y-axes for different data scales.",
      code: jsxToString(<BiaxialExample />),
    },
    {
      id: "stacked-bars",
      title: "Stacked Bars with Line",
      description: "Combo chart with stacked bars and line overlay.",
      code: jsxToString(<StackedBarsExample />),
    },
    {
      id: "multiple-lines",
      title: "Multiple Lines with Bar",
      description: "Single bar series with multiple line series.",
      code: jsxToString(<MultipleLinesExample />),
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Combo chart with click interactions and legend filtering.",
      code: jsxToString(<InteractiveExample />),
    },
    {
      id: "custom-formatting",
      title: "Custom Formatting",
      description: "Combo chart with custom value formatters and labels.",
      code: jsxToString(<CustomFormattingExample />),
    },
  ],
};
