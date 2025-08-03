import type { ComponentConfig } from "../../lib/component-config-types";
import { TrendingUp } from "lucide-react";
import { LineChart } from "./component";
import {
  BasicExample,
  CustomFormattingExample,
  InteractiveExample,
  MinimalExample,
  MultipleLinesExample,
  WithNullValuesExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "line-chart",
  name: "LineChart",
  description: "A comprehensive line chart component built on Recharts for displaying time series data, trends, and multi-category comparisons. Features interactive legends, tooltips, and extensive customization options.",
  category: "charts",
  icon: TrendingUp,
  importStatement: `import { LineChart } from "@patternmode/ui/line-chart";`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Basic line chart with two data series",
      component: BasicExample,
    },
    {
      id: "multiple-lines",
      title: "Multiple Lines",
      description: "Chart with multiple data series and custom formatting",
      component: MultipleLinesExample,
    },
    {
      id: "with-null-values",
      title: "With Null Values",
      description: "Handling null values in data with optional connection",
      component: WithNullValuesExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Interactive chart with click handlers and event feedback",
      component: InteractiveExample,
    },
    {
      id: "custom-formatting",
      title: "Custom Formatting",
      description: "Custom value formatting and axis labels",
      component: CustomFormattingExample,
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Minimal chart without axes, legend, or grid lines",
      component: MinimalExample,
    },
  ],
  components: [
    {
      name: "LineChart",
      description: "Interactive line chart component for time series data visualization",
      component: LineChart,
    },
  ],
};
