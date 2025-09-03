import type { ComponentConfig } from "@patternmode/config/component-types";
import { Grid3X3 } from "lucide-react";
import { Grid, GridAuto, GridCell } from "./component";
import {
  AutoGridExample,
  DashboardExample,
  DefaultExample,
  LayoutGridExample,
  ResponsiveExample,
  SpanningCellsExample,
} from "./examples";

export const gridConfig: ComponentConfig = {
  id: "grid",
  name: "Grid",
  description:
    "A flexible grid system for creating responsive layouts. Provides CSS Grid-based components with support for responsive breakpoints and customizable spacing.",
  category: "layout",
  featured: true,
  icon: Grid3X3,
  importStatement: `import { Grid, GridCell, GridAuto } from "@patternmode/grid";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic grid with 6 columns and consistent spacing",
      component: DefaultExample,
    },
    {
      id: "responsive",
      title: "Responsive",
      description: "Grid that adapts columns based on screen size",
      component: ResponsiveExample,
    },
    {
      id: "spanning-cells",
      title: "Spanning Cells",
      description: "Grid cells that span multiple columns and rows",
      component: SpanningCellsExample,
    },
    {
      id: "auto-grid",
      title: "Auto Grid",
      description: "Automatically generated grid with custom cell content",
      component: AutoGridExample,
    },
    {
      id: "layout-grid",
      title: "Layout Grid",
      description:
        "Website layout using grid for header, sidebar, content, and footer",
      component: LayoutGridExample,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Dashboard layout with metrics and chart areas",
      component: DashboardExample,
    },
  ],
  components: [
    {
      name: "Grid",
      description:
        "Root grid component for creating responsive CSS Grid layouts",
      component: Grid,
      primary: true,
    },
    {
      name: "Grid Cell",
      description: "Grid cell component for positioning content within a grid",
      component: GridCell,
    },
    {
      name: "Grid Auto",
      description: "Auto-generating grid component for rapid prototyping",
      component: GridAuto,
    },
  ],
};
