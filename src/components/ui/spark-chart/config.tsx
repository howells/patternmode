import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { SparkChartExample, DefaultExample, AreaExample, BarExample } from "./examples";

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
  importStatement: `import { SparkChart } from "@/components/ui/spark-chart/spark-chart";`,
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
      code: jsxToString(<DefaultExample />),, value: 400 },
    { date: "Feb", value: 300 },
    { date: "Mar", value: 600 },
    { date: "Apr", value: 800 },
    { date: "May", value: 500 },
    { date: "Jun", value: 900 },
  ]}
  categories={["value"]}
  index="date"
/>`
    },
    {
      id: "area",
      title: "Area Spark Chart",
      description: "Spark chart with filled area",
      code: jsxToString(<AreaExample />),, revenue: 2100 },
    { month: "Feb", revenue: 2400 },
    { month: "Mar", revenue: 1800 },
    { month: "Apr", revenue: 2800 },
    { month: "May", revenue: 3200 },
    { month: "Jun", revenue: 2900 },
  ]}
  categories={["revenue"]}
  index="month"
  type="area"
/>`
    },
    {
      id: "bar",
      title: "Bar Spark Chart",
      description: "Spark chart using bars",
      code: jsxToString(<BarExample />),, visits: 120 },
    { day: "Tue", visits: 140 },
    { day: "Wed", visits: 100 },
    { day: "Thu", visits: 160 },
    { day: "Fri", visits: 180 },
    { day: "Sat", visits: 140 },
    { day: "Sun", visits: 100 },
  ]}
  categories={["visits"]}
  index="day"
  type="bar"
/>`
    },
  ]
};