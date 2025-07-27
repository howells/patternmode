import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { GridExample, ResponsiveExample, SpanningCellsExample, SolidCellsExample, OverlayCellsExample, GuideControlExample, AutoGridExample, CustomLayoutExample, DashboardExample  } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "grid",
  name: "Grid",
  description: "A sophisticated grid layout component with visual guides, responsive columns/rows, cell overlays, and guide clipping features. Perfect for complex layouts and design systems.",
  category: "layout" as const,
  icon: "Grid3X3",

  installation: {
    npm: "@base-ui-components/react"
  },
  importStatement: `import { Grid, GridCell, GridAuto } from "@/components/ui/grid/grid";`,
  componentId: "GridExample",
  props: [
    {
      name: "columns",
      type: "string",
      defaultValue: "12",
      description: "Number of columns or custom grid-template-columns value."
    },
    {
      name: "rows",
      type: "string",
      description: "Number of rows or custom grid-template-rows value."
    },
    {
      name: "gap",
      type: "select",
      options: ["none", "xs", "sm", "base", "md", "lg", "xl"],
      defaultValue: "base",
      description: "Gap between grid cells."
    },
    {
      name: "showColumnGuides",
      type: "boolean",
      defaultValue: false,
      description: "Show column guide lines."
    },
    {
      name: "showRowGuides",
      type: "boolean",
      defaultValue: false,
      description: "Show row guide lines."
    },
    {
      name: "clipGuides",
      type: "boolean",
      defaultValue: true,
      description: "Clip guide lines within grid bounds."
    },
    {
      name: "children",
      type: "string",
      defaultValue: "Grid content",
      description: "Grid cell content."
    }
  ],
  examples: [
    {
      id: "grid",
      title: "Basic Grid",
      description: "A sophisticated grid layout component with visual guides, responsive columns/rows, cell overlays, and guide clipping features. Perfect for complex layouts and design systems.",
      code: jsxToString(<GridExample />)},
    {
      id: "responsive",
      title: "Responsive Grid",
      description: "Grid that adapts columns at different breakpoints.",
      code: jsxToString(<ResponsiveExample />)},
    {
      id: "spanning-cells",
      title: "Spanning Cells",
      description: "Cells that span multiple columns or rows.",
      code: jsxToString(<SpanningCellsExample />)},
    {
      id: "solid-cells",
      title: "Solid Cells",
      description: "Cells with solid backgrounds that occlude grid guides.",
      code: jsxToString(<SolidCellsExample />)},
    {
      id: "overlay-cells",
      title: "Overlay Cells",
      description: "Cells that overlay other cells with elevated styling.",
      code: jsxToString(<OverlayCellsExample />)},
    {
      id: "guide-control",
      title: "Guide Control",
      description: "Control visibility of column and row guides.",
      code: jsxToString(<GuideControlExample />)},
    {
      id: "auto-grid",
      title: "Auto Grid",
      description: "Automatically generate numbered cells with GridAuto.",
      code: jsxToString(<AutoGridExample />)},
    {
      id: "custom-layout",
      title: "Custom Layout",
      description: "Complex grid layout with mixed cell types.",
      code: jsxToString(<CustomLayoutExample />)},
    {
      id: "dashboard",
      title: "Dashboard Layout",
      description: "Real-world dashboard layout example.",
      code: jsxToString(<DashboardExample />)}
  ]
};
