import type { ComponentConfig } from "../../types/component-types";
import { BarChart4 } from "lucide-react";
import { BarList } from "./component";
import {
  AnimatedExample,
  AscendingExample,
  ComplexDataExample,
  DefaultExample,
  InteractiveExample,
  NoSortingExample,
  PercentageExample,
  PerformanceExample,
  SalesByRegionExample,
  WebsiteAnalyticsExample,
  WithFormatterExample,
  WithLinksExample,
} from "./examples";

export const barListConfig: ComponentConfig = {
  id: "bar-list",
  name: "Bar List",
  description: "List-style bar chart component for simple data comparison with text labels.",
  category: "charts",
  icon: BarChart4,
  importStatement: `import { BarList } from "@patternmode/ui/bar-list";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic bar list with city population data",
      component: DefaultExample,
    },
    {
      id: "with-formatter",
      title: "With Formatter",
      description: "Bar list with custom value formatting",
      component: WithFormatterExample,
    },
    {
      id: "interactive",
      title: "Interactive",
      description: "Clickable bar list with selection feedback",
      component: InteractiveExample,
    },
    {
      id: "with-links",
      title: "With Links",
      description: "Bar list with clickable name links",
      component: WithLinksExample,
    },
    {
      id: "animated",
      title: "Animated",
      description: "Bar list with smooth width transitions",
      component: AnimatedExample,
    },
    {
      id: "ascending",
      title: "Ascending",
      description: "Bar list sorted in ascending order",
      component: AscendingExample,
    },
    {
      id: "performance",
      title: "Performance",
      description: "Performance metrics display",
      component: PerformanceExample,
    },
    {
      id: "sales-by-region",
      title: "Sales by Region",
      description: "Regional sales data with animations",
      component: SalesByRegionExample,
    },
    {
      id: "percentage",
      title: "Percentage",
      description: "Progress data shown as percentages",
      component: PercentageExample,
    },
    {
      id: "no-sorting",
      title: "No Sorting",
      description: "Bar list maintaining original data order",
      component: NoSortingExample,
    },
    {
      id: "complex-data",
      title: "Complex Data",
      description: "Extended data structure with additional properties",
      component: ComplexDataExample,
    },
    {
      id: "website-analytics",
      title: "Website Analytics",
      description: "Real-world analytics dashboard example",
      component: WebsiteAnalyticsExample,
    },
  ],
  components: [
    {
      name: "Bar List",
      description: "Main bar list component for displaying ranked data",
      component: BarList,
      primary: true,
    },
  ],
};
