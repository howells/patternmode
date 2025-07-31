import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { AnimatedExample, AscendingExample, BarListExample, ComplexDataExample, DefaultExample, InteractiveExample, NoSortingExample, PercentageExample, PerformanceExample, SalesByRegionExample, WebsiteAnalyticsExample, WithFormatterExample, WithLinksExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "bar-list",
  name: "BarList",
  description:
    "A horizontal bar chart component for displaying comparative data with optional interactivity.",
  category: "charts" as const,
  icon: "BarChart",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { BarList } from "@/components/ui/bar-list";`,
  componentId: "BarListExample",
  props: [
    {
      name: "showAnimation",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show animation when bars appear.",
    },
    {
      name: "sortOrder",
      type: "select",
      options: ["ascending", "descending", "none"],
      defaultValue: "descending",
      description: "How to sort the bars by their values.",
    },
    {
      name: "showFormatter",
      type: "boolean",
      defaultValue: false,
      description: "Show example with value formatter (sales data).",
    },
    {
      name: "showInteractive",
      type: "boolean",
      defaultValue: false,
      description: "Make bars interactive with click handlers.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic bar list with default settings.",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "with-formatter",
      title: "With Value Formatter",
      description: "Bar list with custom value formatting.",
      code: jsxToString(<WithFormatterExample />),
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Clickable bars with hover effects and state tracking.",
      code: jsxToString(<InteractiveExample />),
    },
    {
      id: "animated",
      title: "Animated",
      description: "Bar list with smooth animations and dynamic data updates.",
      code: jsxToString(<AnimatedExample />),
    },
    {
      id: "with-links",
      title: "With Links",
      description: "Bar list items with external links.",
      code: jsxToString(<WithLinksExample />),
    },
    {
      id: "ascending",
      title: "Ascending Order",
      description: "Bars sorted in ascending order by value.",
      code: jsxToString(<AscendingExample />),
    },
    {
      id: "percentage",
      title: "Percentage Values",
      description: "Bar list displaying percentage data.",
      code: jsxToString(<PercentageExample />),
    },
    {
      id: "performance",
      title: "Performance Metrics",
      description: "Real-world example showing performance scores.",
      code: jsxToString(<PerformanceExample />),
    },
    {
      id: "sales-by-region",
      title: "Sales by Region",
      description: "Financial data with custom formatting and animations.",
      code: jsxToString(<SalesByRegionExample />),
    },
    {
      id: "no-sorting",
      title: "No Sorting",
      description: "Bar list with original data order preserved.",
      code: jsxToString(<NoSortingExample />),
    },
    {
      id: "complex-data",
      title: "Complex Data",
      description:
        "Extended data types with additional properties and interactions.",
      code: jsxToString(<ComplexDataExample />),
    },
    {
      id: "website-analytics",
      title: "Website Analytics",
      description:
        "Real-world analytics dashboard example with clickable pages.",
      code: jsxToString(<WebsiteAnalyticsExample />),
    },
  ],
};
