import type { ComponentConfig } from "../../lib/component-config-types";
import { BarChart2 } from "lucide-react";
import { CategoryBar } from "./component";
import {
  BinaryExample,
  BudgetAllocationExample,
  DefaultExample,
  EqualDistributionExample,
  ManyCategoriesExample,
  NoLabelsExample,
  PerformanceMetricsExample,
  ProgressTrackingExample,
  SurveyResultsExample,
  UnevenDistributionExample,
  WithMarkerExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "category-bar",
  name: "CategoryBar",
  description: "Horizontal bar chart component for categorical data comparison and ranking with optional markers and animations.",
  category: "charts",
  icon: BarChart2,
  importStatement: `import { CategoryBar } from "@patternmode/ui/category-bar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic category bar with default settings",
      component: DefaultExample,
    },
    {
      id: "with-marker",
      title: "With Marker",
      description: "Category bar with position marker and tooltip",
      component: WithMarkerExample,
    },
    {
      id: "no-labels",
      title: "No Labels",
      description: "Category bar without value labels",
      component: NoLabelsExample,
    },
    {
      id: "uneven-distribution",
      title: "Uneven Distribution",
      description: "Category bar with uneven value distribution",
      component: UnevenDistributionExample,
    },
    {
      id: "many-categories",
      title: "Many Categories",
      description: "Category bar with multiple data segments",
      component: ManyCategoriesExample,
    },
    {
      id: "performance-metrics",
      title: "Performance Metrics",
      description: "Multiple category bars for system monitoring",
      component: PerformanceMetricsExample,
    },
    {
      id: "budget-allocation",
      title: "Budget Allocation",
      description: "Budget breakdown with category labels",
      component: BudgetAllocationExample,
    },
    {
      id: "survey-results",
      title: "Survey Results",
      description: "Customer satisfaction survey visualization",
      component: SurveyResultsExample,
    },
    {
      id: "progress-tracking",
      title: "Progress Tracking",
      description: "Project progress with target marker",
      component: ProgressTrackingExample,
    },
    {
      id: "binary",
      title: "Binary",
      description: "Two-category comparison with success/failure rates",
      component: BinaryExample,
    },
    {
      id: "equal-distribution",
      title: "Equal Distribution",
      description: "Evenly distributed categories",
      component: EqualDistributionExample,
    },
  ],
  components: [
    {
      name: "CategoryBar",
      description: "Horizontal bar chart for categorical data visualization",
      component: CategoryBar,
    },
  ],
};
