"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Grid, GridAuto, GridCell } from "@patternmode/ui";

import React from "react";

export function GridExample() {
  return (
    <Grid columns={6} gap={4}>
      <GridCell>1</GridCell>
      <GridCell>2</GridCell>
      <GridCell>3</GridCell>
      <GridCell>4</GridCell>
      <GridCell>5</GridCell>
      <GridCell>6</GridCell>
    </Grid>
  );
}

export function ResponsiveExample() {
  return (
    <Grid columns={{ sm: 2, md: 4, lg: 6 }} gap={4}>
      <GridCell>1</GridCell>
      <GridCell>2</GridCell>
      <GridCell>3</GridCell>
      <GridCell>4</GridCell>
      <GridCell>5</GridCell>
      <GridCell>6</GridCell>
      <GridCell>7</GridCell>
      <GridCell>8</GridCell>
    </Grid>
  );
}

export function SpanningCellsExample() {
  return (
    <Grid columns={6} rows={3} gap={4}>
      <GridCell colSpan={2}>Span 2 cols</GridCell>
      <GridCell>3</GridCell>
      <GridCell>4</GridCell>
      <GridCell rowSpan={2}>Span 2 rows</GridCell>
      <GridCell>6</GridCell>

      <GridCell>7</GridCell>
      <GridCell colSpan={3}>Span 3 cols</GridCell>

      <GridCell colStart={2} colSpan={2}>
        Start col 2
      </GridCell>
      <GridCell>Last</GridCell>
    </Grid>
  );
}

export function SolidCellsExample() {
  return (
    <Grid columns={4} gap={4}>
      <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Solid 1</GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">Regular 2</GridCell>
      <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Solid 3</GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">Regular 4</GridCell>

      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">Regular 5</GridCell>
      <GridCell colSpan={2} className="bg-blue-100 border border-blue-300 p-4 rounded">
        Solid Spanning
      </GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">Regular 8</GridCell>
    </Grid>
  );
}

export function OverlayCellsExample() {
  return (
    <Grid columns={4} gap={4}>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">1</GridCell>
      <GridCell className="bg-purple-100 border border-purple-300 p-4 rounded shadow-md">Overlay</GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">3</GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">4</GridCell>

      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">5</GridCell>
      <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">6</GridCell>
      <GridCell colSpan={2} className="bg-purple-100 border border-purple-300 p-4 rounded shadow-md">
        Overlay + Solid
      </GridCell>
    </Grid>
  );
}

export function GuideControlExample() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Standard Grid</h4>
        <Grid columns={4} gap={4}>
          <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">1</GridCell>
          <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">2</GridCell>
          <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">3</GridCell>
          <GridCell className="bg-gray-50 border border-gray-200 p-4 rounded">4</GridCell>
        </Grid>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">With Background</h4>
        <Grid columns={4} gap={4} className="bg-gray-100 p-4 rounded">
          <GridCell className="bg-white border border-gray-300 p-4 rounded shadow-sm">1</GridCell>
          <GridCell className="bg-white border border-gray-300 p-4 rounded shadow-sm">2</GridCell>
          <GridCell className="bg-white border border-gray-300 p-4 rounded shadow-sm">3</GridCell>
          <GridCell className="bg-white border border-gray-300 p-4 rounded shadow-sm">4</GridCell>
        </Grid>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Clean Layout</h4>
        <Grid columns={4} gap={4}>
          <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Clean 1</GridCell>
          <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Clean 2</GridCell>
          <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Clean 3</GridCell>
          <GridCell className="bg-blue-100 border border-blue-300 p-4 rounded">Clean 4</GridCell>
        </Grid>
      </div>
    </div>
  );
}

export function AutoGridExample() {
  return (
    <GridAuto
      columns={5}
      cellCount={10}
      gap={4}
      renderCell={index => (
        <div className="bg-blue-100 border border-blue-300 p-4 rounded text-center">
          {index + 1}
        </div>
      )}
    />
  );
}

export function CustomLayoutExample() {
  return (
    <Grid columns={6} rows={4} gap={3}>
      {/* Header */}
      <GridCell colSpan={6} className="bg-blue-100 dark:bg-blue-900">
        Header
      </GridCell>

      {/* Sidebar */}
      <GridCell rowSpan={2} className="bg-green-100 dark:bg-green-900">
        Sidebar
      </GridCell>

      {/* Main content */}
      <GridCell colSpan={4} className="bg-white dark:bg-zinc-800">
        Main Content
      </GridCell>

      <GridCell className="bg-purple-100 dark:bg-purple-900">
        Widget
      </GridCell>

      {/* Cards */}
      <GridCell colSpan={2}>Card 1</GridCell>
      <GridCell colSpan={2}>Card 2</GridCell>
      <GridCell>Extra</GridCell>

      {/* Footer */}
      <GridCell colSpan={6} className="bg-zinc-100 dark:bg-zinc-800">
        Footer
      </GridCell>
    </Grid>
  );
}

export function DashboardExample() {
  return (
    <Grid columns={12} rows={6} gap={4} className="h-[400px]">
      {/* Top metrics */}
      <GridCell

        colSpan={3}
        className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-xs opacity-75">Users</div>
        </div>
      </GridCell>
      <GridCell

        colSpan={3}
        className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">$12.3K</div>
          <div className="text-xs opacity-75">Revenue</div>
        </div>
      </GridCell>
      <GridCell

        colSpan={3}
        className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">98.5%</div>
          <div className="text-xs opacity-75">Uptime</div>
        </div>
      </GridCell>
      <GridCell

        colSpan={3}
        className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">156</div>
          <div className="text-xs opacity-75">Orders</div>
        </div>
      </GridCell>

      {/* Main chart */}
      <GridCell
        colSpan={8}
        rowSpan={3}
        className="bg-white dark:bg-zinc-900"
      >
        Analytics Chart
      </GridCell>

      {/* Side widgets */}
      <GridCell

        colSpan={4}
        rowSpan={2}
        className="bg-zinc-50 dark:bg-zinc-800"
      >
        Recent Activity
      </GridCell>
      <GridCell colSpan={4} className="bg-yellow-50 dark:bg-yellow-900">
        Notifications
      </GridCell>

      {/* Bottom section */}
      <GridCell colSpan={4}>Tasks</GridCell>
      <GridCell colSpan={4}>Performance</GridCell>
      <GridCell colSpan={4}>Settings</GridCell>
    </Grid>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "GridExample",
    title: "Grid",
    description: "Grid example",
    component: GridExample,
  },
  {
    id: "ResponsiveExample",
    title: "Responsive",
    description: "Responsive example",
    component: ResponsiveExample,
  },
  {
    id: "SpanningCellsExample",
    title: "Spanning Cells",
    description: "Spanning Cells example",
    component: SpanningCellsExample,
  },
  {
    id: "SolidCellsExample",
    title: "Solid Cells",
    description: "Solid Cells example",
    component: SolidCellsExample,
  },
  {
    id: "OverlayCellsExample",
    title: "Overlay Cells",
    description: "Overlay Cells example",
    component: OverlayCellsExample,
  },
  {
    id: "GuideControlExample",
    title: "Guide Control",
    description: "Guide Control example",
    component: GuideControlExample,
  },
  {
    id: "AutoGridExample",
    title: "Auto Grid",
    description: "Auto Grid example",
    component: AutoGridExample,
  },
  {
    id: "CustomLayoutExample",
    title: "Custom Layout",
    description: "Custom Layout example",
    component: CustomLayoutExample,
  },
  {
    id: "DashboardExample",
    title: "Dashboard",
    description: "Dashboard example",
    component: DashboardExample,
  },
];
