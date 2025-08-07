"use client";

import React from "react";
import { Grid, GridAuto, GridCell } from "./component";

// Basic grid example
export const DefaultExample = () => {
  return (
    <Grid columns={6} gap={4}>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">1</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">2</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">3</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">4</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">5</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">6</GridCell>
    </Grid>
  );
};

// Responsive grid example
export const ResponsiveExample = () => {
  return (
    <div className="space-y-8">
      {/* Mobile-first responsive columns */}
      <div>
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Mobile-first columns</h4>
        <p className="text-xs text-zinc-600 mb-3">1 col on mobile → 2 cols sm → 4 cols md → 6 cols lg</p>
        <Grid columns={{ sm: 2, md: 4, lg: 6 }} gap={4}>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">1</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">2</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">3</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">4</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">5</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">6</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">7</GridCell>
          <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">8</GridCell>
        </Grid>
      </div>

      {/* Explicit default with responsive overrides */}
      <div>
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Explicit default</h4>
        <p className="text-xs text-zinc-600 mb-3">3 cols default → 2 cols on large screens</p>
        <Grid columns={{ default: 3, lg: 2 }} gap={4}>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">A</GridCell>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">B</GridCell>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">C</GridCell>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">D</GridCell>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">E</GridCell>
          <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">F</GridCell>
        </Grid>
      </div>

      {/* Max-width breakpoints */}
      <div>
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Max-width breakpoints</h4>
        <p className="text-xs text-zinc-600 mb-3">4 cols default → 2 cols on max-lg and below</p>
        <Grid columns={{ default: 4, "max-lg": 2 }} gap={4}>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">1</GridCell>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">2</GridCell>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">3</GridCell>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">4</GridCell>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">5</GridCell>
          <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">6</GridCell>
        </Grid>
      </div>

      {/* Responsive gap */}
      <div>
        <h4 className="text-sm font-medium text-zinc-700 mb-3">Responsive gap</h4>
        <p className="text-xs text-zinc-600 mb-3">Small gap on mobile → larger gap on desktop</p>
        <Grid columns={3} gap={{ sm: 2, md: 4, lg: 6 }}>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">A</GridCell>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">B</GridCell>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">C</GridCell>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">D</GridCell>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">E</GridCell>
          <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">F</GridCell>
        </Grid>
      </div>
    </div>
  );
};

// Spanning cells example
export const SpanningCellsExample = () => {
  return (
    <Grid columns={6} rows={3} gap={4}>
      <GridCell colSpan={2} className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
        Span 2 cols
      </GridCell>
      <GridCell className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">3</GridCell>
      <GridCell className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">4</GridCell>
      <GridCell rowSpan={2} className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">
        Span 2 rows
      </GridCell>
      <GridCell className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">6</GridCell>

      <GridCell className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">7</GridCell>
      <GridCell colSpan={3} className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded text-center">
        Span 3 cols
      </GridCell>

      <GridCell colStart={2} colSpan={2} className="bg-red-100 dark:bg-red-900 p-4 rounded text-center">
        Start col 2
      </GridCell>
      <GridCell className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">Last</GridCell>
    </Grid>
  );
};

// Auto-generated grid
export const AutoGridExample = () => {
  return (
    <GridAuto
      columns={5}
      cellCount={10}
      gap={4}
      renderCell={index => (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
          Cell {index + 1}
        </div>
      )}
    />
  );
};

// Layout grid (like a webpage layout)
export const LayoutGridExample = () => {
  return (
    <Grid columns={12} gap={2} className="min-h-[300px]">
      {/* Header */}
      <GridCell colSpan={12} className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
        Header
      </GridCell>

      {/* Sidebar */}
      <GridCell colSpan={3} className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
        Sidebar
      </GridCell>

      {/* Main Content */}
      <GridCell colSpan={9} className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">
        Main Content
      </GridCell>

      {/* Footer */}
      <GridCell colSpan={12} className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
        Footer
      </GridCell>
    </Grid>
  );
};

// Dashboard example
export const DashboardExample = () => {
  return (
    <Grid columns={4} gap={4} className="min-h-[250px]">
      {/* Metrics */}
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">
        <div className="text-lg font-bold">1,234</div>
        <div className="text-sm opacity-75">Users</div>
      </GridCell>
      <GridCell className="bg-green-100 dark:bg-green-900 p-4 rounded text-center">
        <div className="text-lg font-bold">$12.3K</div>
        <div className="text-sm opacity-75">Revenue</div>
      </GridCell>
      <GridCell className="bg-purple-100 dark:bg-purple-900 p-4 rounded text-center">
        <div className="text-lg font-bold">98.5%</div>
        <div className="text-sm opacity-75">Uptime</div>
      </GridCell>
      <GridCell className="bg-orange-100 dark:bg-orange-900 p-4 rounded text-center">
        <div className="text-lg font-bold">156</div>
        <div className="text-sm opacity-75">Orders</div>
      </GridCell>

      {/* Main chart area */}
      <GridCell colSpan={3} rowSpan={2} className="bg-white dark:bg-zinc-900 p-4 rounded text-center">
        Analytics Chart
      </GridCell>

      {/* Side widget */}
      <GridCell rowSpan={2} className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-center">
        Recent Activity
      </GridCell>
    </Grid>
  );
};
