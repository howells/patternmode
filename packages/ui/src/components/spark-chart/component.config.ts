import type { ComponentConfig } from "../../lib/component-config-types";
import { TrendingUp } from "lucide-react";
import { SparkAreaChart, SparkBarChart, SparkLineChart } from "./component";
import { AreaExample, DefaultExample, LineExample, MultipleExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "spark-chart",
  name: "Spark Chart",
  description: "Minimal sparkline charts for inline data visualization and trend indication, available in bar, area, and line variants.",
  category: "charts",
  icon: TrendingUp,
  importStatement: `import { SparkAreaChart, SparkBarChart, SparkLineChart } from "@patternmode/ui/spark-chart";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic spark bar chart showing sales data",
      component: DefaultExample,
    },
    {
      id: "area",
      title: "Area",
      description: "Spark area chart with gradient fill",
      component: AreaExample,
    },
    {
      id: "line",
      title: "Line",
      description: "Spark line chart for trend visualization",
      component: LineExample,
    },
    {
      id: "multiple",
      title: "Multiple",
      description: "Different spark chart types side by side",
      component: MultipleExample,
    },
  ],
  components: [
    {
      name: "SparkBarChart",
      description: "Minimal bar chart for inline data visualization",
      component: SparkBarChart,
      primary: true,
    },
    {
      name: "SparkAreaChart",
      description: "Minimal area chart with optional gradient fill",
      component: SparkAreaChart,
    },
    {
      name: "SparkLineChart",
      description: "Minimal line chart for trend indication",
      component: SparkLineChart,
    },
  ],
};
