import type { ComponentConfig } from "../../lib/component-config-types";
import { BarChart } from "lucide-react";
import { AreaChart } from "./component";
import {
  ConnectedNullsExample,
  CustomColorsExample,
  DefaultExample,
  FormattedValuesExample,
  MinimalExample,
  NoLegendExample,
  PercentExample,
  SolidFillExample,
  StackedExample,
  WithLabelsExample,
} from "./examples";

export const areaChartConfig: ComponentConfig = {
  id: "area-chart",
  name: "Area Chart",
  description: "Area chart component for visualizing data trends over time with filled regions.",
  category: "charts",
  icon: BarChart,
  importStatement: `import { AreaChart } from "@patternmode/ui/area-chart";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic area chart with two data series",
      component: DefaultExample,
    },
    {
      id: "stacked",
      title: "Stacked",
      description: "Stacked area chart for comparing cumulative values",
      component: StackedExample,
    },
    {
      id: "percent",
      title: "Percent",
      description: "Percentage area chart showing proportional data",
      component: PercentExample,
    },
    {
      id: "solid-fill",
      title: "Solid Fill",
      description: "Area chart with solid fill instead of gradient",
      component: SolidFillExample,
    },
    {
      id: "with-labels",
      title: "With Labels",
      description: "Area chart with custom axis labels",
      component: WithLabelsExample,
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Area chart with custom color scheme",
      component: CustomColorsExample,
    },
    {
      id: "no-legend",
      title: "No Legend",
      description: "Area chart without legend display",
      component: NoLegendExample,
    },
    {
      id: "formatted-values",
      title: "Formatted Values",
      description: "Area chart with custom value formatting",
      component: FormattedValuesExample,
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Minimal area chart without axes or grid",
      component: MinimalExample,
    },
    {
      id: "connected-nulls",
      title: "Connected Nulls",
      description: "Area chart that connects over null values",
      component: ConnectedNullsExample,
    },
  ],
  components: [
    {
      name: "Area Chart",
      description: "Main area chart component with comprehensive configuration options",
      component: AreaChart,
      primary: true,
    },
  ],
};
