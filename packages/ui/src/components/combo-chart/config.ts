import type { ComponentConfig } from "../../lib/component-config-types";
import { BarChart3 } from "lucide-react";
import { ComboChart } from "./component";
import {
  BiaxialExample,
  CustomFormattingExample,
  DefaultExample,
  InteractiveExample,
  MultipleLinesExample,
  StackedBarsExample,
} from "./examples";

export const comboChartConfig: ComponentConfig = {
  id: "combo-chart",
  name: "Combo Chart",
  description: "Combination chart supporting multiple chart types in a single visualization. Built on Recharts with support for bar and line series, biaxial charts, interactive legends, and extensive customization options.",
  category: "charts",
  icon: BarChart3,
  importStatement: `import { ComboChart } from "@patternmode/ui/combo-chart";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic combo chart with bar and line series",
      component: DefaultExample,
    },
    {
      id: "biaxial",
      title: "Biaxial",
      description: "Dual Y-axis chart for different data scales",
      component: BiaxialExample,
    },
    {
      id: "stacked-bars",
      title: "Stacked Bars",
      description: "Stacked bar chart with line overlay",
      component: StackedBarsExample,
    },
    {
      id: "multiple-lines",
      title: "Multiple Lines",
      description: "Multiple line series with bar chart",
      component: MultipleLinesExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Interactive chart with click handlers",
      component: InteractiveExample,
    },
    {
      id: "custom-formatting",
      title: "Custom Formatting",
      description: "Custom value formatting and axis labels",
      component: CustomFormattingExample,
    },
  ],
  components: [
    {
      name: "Combo Chart",
      description: "Combination chart component for mixed visualizations",
      component: ComboChart,
    },
  ],
};
