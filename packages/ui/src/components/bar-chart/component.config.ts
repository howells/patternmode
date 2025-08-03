import type { ComponentConfig } from "../../lib/component-config-types";
import { BarChart as BarChartIcon } from "lucide-react";
import { BarChart } from "./component";
import {
  CustomColorsExample,
  CustomGapExample,
  DefaultExample,
  MinimalExample,
  MultipleSeriesExample,
  NegativeValuesExample,
  NoLegendExample,
  PercentExample,
  StackedExample,
  VerticalExample,
  VerticalStackedExample,
  WithLabelsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "bar-chart",
  name: "BarChart",
  description: "Bar chart component for comparing categorical data with horizontal or vertical bars.",
  category: "charts",
  icon: BarChartIcon,
  importStatement: `import { BarChart } from "@patternmode/ui/bar-chart";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic bar chart with single data series",
      component: DefaultExample,
    },
    {
      id: "multiple-series",
      title: "Multiple Series",
      description: "Bar chart with multiple data series",
      component: MultipleSeriesExample,
    },
    {
      id: "stacked",
      title: "Stacked",
      description: "Stacked bar chart for cumulative data",
      component: StackedExample,
    },
    {
      id: "percent",
      title: "Percent",
      description: "Percentage bar chart showing proportional data",
      component: PercentExample,
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Vertical bar chart layout",
      component: VerticalExample,
    },
    {
      id: "with-labels",
      title: "With Labels",
      description: "Bar chart with custom axis labels",
      component: WithLabelsExample,
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Bar chart with custom color scheme",
      component: CustomColorsExample,
    },
    {
      id: "minimal",
      title: "Minimal",
      description: "Minimal bar chart without axes or grid",
      component: MinimalExample,
    },
    {
      id: "no-legend",
      title: "No Legend",
      description: "Bar chart without legend display",
      component: NoLegendExample,
    },
    {
      id: "custom-gap",
      title: "Custom Gap",
      description: "Bar chart with custom spacing between categories",
      component: CustomGapExample,
    },
    {
      id: "vertical-stacked",
      title: "Vertical Stacked",
      description: "Vertical stacked bar chart",
      component: VerticalStackedExample,
    },
    {
      id: "negative-values",
      title: "Negative Values",
      description: "Bar chart with positive and negative values",
      component: NegativeValuesExample,
    },
  ],
  components: [
    {
      name: "BarChart",
      description: "Main bar chart component with comprehensive configuration options",
      component: BarChart,
      primary: true,
    },
  ],
};
