import type { ComponentConfig } from "@patternmode/config/component-types";
import { Grid3X3 } from "lucide-react";
import { Grid } from "./components/grid";
import { GridCell } from "./components/grid-cell";
import {
  AutoFlowExample,
  DashboardExample,
  DebugExample,
  DefaultExample,
  EndPositionsExample,
  FullViewportExample,
  LayoutGridExample,
  ResponsiveExample,
  SpanningCellsExample,
  TemplateAreasExample,
  ViewportHeightExample,
} from "./examples";

export const gridConfig: ComponentConfig = {
  id: "grid",
  name: "Grid",
  description:
    "A flexible grid system for creating responsive layouts. Provides CSS Grid-based components with support for responsive breakpoints and customizable spacing.",
  category: "layout",
  featured: true,
  icon: Grid3X3,
  importStatement: `import { Grid, GridCell } from "@patternmode/grid";`,
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
      id: "end-positions",
      title: "End Positions",
      description: "Using colEnd and rowEnd for precise positioning",
      component: EndPositionsExample,
    },
    {
      id: "template-areas",
      title: "Template Areas",
      description: "Semantic layouts using named grid areas",
      component: TemplateAreasExample,
    },
    {
      id: "auto-flow",
      title: "Auto Flow",
      description: "Different grid auto-flow behaviors (row, column, dense)",
      component: AutoFlowExample,
    },
    {
      id: "debug",
      title: "Debug Mode",
      description: "Visualize grid cell boundaries with debug backgrounds",
      component: DebugExample,
    },
    {
      id: "viewport-fill",
      title: "Full Viewport",
      description:
        "Grid that fills the entire viewport using dynamic viewport height",
      component: FullViewportExample,
    },
    {
      id: "viewport-height",
      title: "Viewport Height",
      description: "Grid that fills viewport height with responsive width",
      component: ViewportHeightExample,
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
  ],
};
