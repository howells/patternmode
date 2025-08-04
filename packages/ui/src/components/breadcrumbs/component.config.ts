import type { ComponentConfig } from "../../lib/component-config-types";
import { ChevronRight } from "lucide-react";
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "./component";
import {
  CustomSeparatorExample,
  DeepNavigationExample,
  DefaultExample,
  SingleLevelExample,
  TwoLevelsExample,
  WithEllipsisExample,
  WithIconsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "breadcrumbs",
  name: "Breadcrumbs",
  description: "Navigation component that shows the current page location within a site hierarchy, helping users understand their position and navigate back to parent pages.",
  category: "navigation",
  featured: true,
  icon: ChevronRight,
  importStatement: `import { Breadcrumbs, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@patternmode/ui/breadcrumbs";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic breadcrumb navigation with three levels",
      component: DefaultExample,
    },
    {
      id: "with-ellipsis",
      title: "With Ellipsis",
      description: "Breadcrumbs with ellipsis to indicate truncated paths",
      component: WithEllipsisExample,
    },
    {
      id: "custom-separator",
      title: "Custom Separator",
      description: "Using custom text separators instead of icons",
      component: CustomSeparatorExample,
    },
    {
      id: "single-level",
      title: "Single Level",
      description: "Simple breadcrumb with only current page",
      component: SingleLevelExample,
    },
    {
      id: "deep-navigation",
      title: "Deep Navigation",
      description: "Multi-level breadcrumb navigation for deep site hierarchies",
      component: DeepNavigationExample,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Breadcrumbs enhanced with icons for visual clarity",
      component: WithIconsExample,
    },
    {
      id: "two-levels",
      title: "Two Levels",
      description: "Simple two-level breadcrumb navigation",
      component: TwoLevelsExample,
    },
  ],
  components: [
    {
      component: Breadcrumbs,
      name: "Breadcrumbs",
      primary: true,
      description: "Root container for breadcrumb navigation with semantic structure.",
    },
    {
      component: BreadcrumbList,
      name: "BreadcrumbList",
      description: "Ordered list container that holds all breadcrumb items and separators.",
    },
    {
      component: BreadcrumbItem,
      name: "BreadcrumbItem",
      description: "Individual container for each breadcrumb link or page indicator.",
    },
    {
      component: BreadcrumbLink,
      name: "BreadcrumbLink",
      description: "Clickable link element for navigating to parent pages in the hierarchy.",
    },
    {
      component: BreadcrumbPage,
      name: "BreadcrumbPage",
      description: "Current page indicator that shows the active location (non-clickable).",
    },
    {
      component: BreadcrumbSeparator,
      name: "BreadcrumbSeparator",
      description: "Visual separator between breadcrumb items, hidden from screen readers.",
    },
    {
      component: BreadcrumbEllipsis,
      name: "BreadcrumbEllipsis",
      description: "Ellipsis indicator for truncated breadcrumb paths to save space.",
    },
  ],
};
