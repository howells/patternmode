import React from "react";
import type { ComponentConfig } from "../../lib/component-config-types";
import { jsxToString } from "../../lib/jsx-to-string";
import { AreaExample, DefaultExample, SparkChartExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "spark-chart",
  name: "Spark Chart",
  description: "A minimalist chart for displaying trends and patterns in data.",
  category: "charts" as const,
  icon: "Zap",

  installation: {
    npm: "recharts",
    dependencies: ["recharts"]
  },
  importStatement: `import { SparkChart } from "@patternmode/ui";`,
  componentId: "SparkChartExample",
  props: [
    {
      name: "data",
      type: "array",
      description: "Array of data points",
      defaultValue: []
    },
    {
      name: "categories",
      type: "array",
      description: "Array of category names",
      defaultValue: ["value"]
    },
    {
      name: "index",
      type: "string",
      description: "Key to use for x-axis values",
      defaultValue: "date"
    },
    {
      name: "type",
      type: "select",
      description: "Type of spark chart",
      options: ["line", "area", "bar"],
      defaultValue: "line"
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Spark Chart",
      description: "A simple line spark chart",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "area",
      title: "Area Spark Chart",
      description: "Spark chart with filled area",
      code: jsxToString(<AreaExample />),
    },
  ]
};