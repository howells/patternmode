import type { ComponentConfig } from "../../types/component-types";
import { TrendingUp } from "lucide-react";
import { SparkChart } from "./component";
import { AreaExample, DefaultExample, LineExample, MultipleExample } from "./examples";

export const sparkChartConfig: ComponentConfig = {
  id: "spark-chart",
  name: "Spark Chart",
  description: "Minimal sparkline chart for inline data visualization with area, bar, and line variants.",
  category: "charts",
  icon: TrendingUp,
  importStatement: `import { SparkChart } from "@patternmode/ui/spark-chart";`,
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
      description: "Different spark chart variants side by side",
      component: MultipleExample,
    },
  ],
  components: [
    {
      name: "Spark Chart",
      description: "Minimal sparkline chart with configurable variants",
      component: SparkChart,
      primary: true,
    },
  ],
};
