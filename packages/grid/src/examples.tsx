"use client";

import { Grid, GridAuto, GridCell } from "./component";

// Basic grid example
export const DefaultExample = () => {
  return (
    <Grid columns={6} gap={4}>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        1
      </GridCell>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        2
      </GridCell>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        3
      </GridCell>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        4
      </GridCell>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        5
      </GridCell>
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        6
      </GridCell>
    </Grid>
  );
};

// Responsive grid example
export const ResponsiveExample = () => {
  return (
    <div className="space-y-8">
      {/* Mobile-first responsive columns */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Mobile-first columns
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          1 col on mobile → 2 cols sm → 4 cols md → 6 cols lg
        </p>
        <Grid columns={{ sm: 2, md: 4, lg: 6 }} gap={4}>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            1
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            2
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            3
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            4
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            5
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            6
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            7
          </GridCell>
          <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
            8
          </GridCell>
        </Grid>
      </div>

      {/* Explicit default with responsive overrides */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Explicit default
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          3 cols default → 2 cols on large screens
        </p>
        <Grid columns={{ default: 3, lg: 2 }} gap={4}>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            A
          </GridCell>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            B
          </GridCell>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            C
          </GridCell>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            D
          </GridCell>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            E
          </GridCell>
          <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
            F
          </GridCell>
        </Grid>
      </div>

      {/* Max-width breakpoints */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Max-width breakpoints
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          4 cols default → 2 cols on max-lg and below
        </p>
        <Grid columns={{ default: 4, "max-lg": 2 }} gap={4}>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            1
          </GridCell>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            2
          </GridCell>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            3
          </GridCell>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            4
          </GridCell>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            5
          </GridCell>
          <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
            6
          </GridCell>
        </Grid>
      </div>

      {/* Responsive gap */}
      <div>
        <h4 className="mb-3 font-medium text-sm text-zinc-700">
          Responsive gap
        </h4>
        <p className="mb-3 text-xs text-zinc-600">
          Small gap on mobile → larger gap on desktop
        </p>
        <Grid columns={3} gap={{ sm: 2, md: 4, lg: 6 }}>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            A
          </GridCell>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            B
          </GridCell>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            C
          </GridCell>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            D
          </GridCell>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            E
          </GridCell>
          <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
            F
          </GridCell>
        </Grid>
      </div>
    </div>
  );
};

// Spanning cells example
export const SpanningCellsExample = () => {
  return (
    <Grid columns={6} gap={4} rows={3}>
      <GridCell
        className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900"
        colSpan={2}
      >
        Span 2 cols
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        3
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        4
      </GridCell>
      <GridCell
        className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900"
        rowSpan={2}
      >
        Span 2 rows
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        6
      </GridCell>

      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        7
      </GridCell>
      <GridCell
        className="rounded bg-yellow-100 p-4 text-center dark:bg-yellow-900"
        colSpan={3}
      >
        Span 3 cols
      </GridCell>

      <GridCell
        className="rounded bg-red-100 p-4 text-center dark:bg-red-900"
        colSpan={2}
        colStart={2}
      >
        Start col 2
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800">
        Last
      </GridCell>
    </Grid>
  );
};

// Auto-generated grid
export const AutoGridExample = () => {
  return (
    <GridAuto
      cellCount={10}
      columns={5}
      gap={4}
      renderCell={(index) => (
        <div className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
          Cell {index + 1}
        </div>
      )}
    />
  );
};

// Layout grid (like a webpage layout)
export const LayoutGridExample = () => {
  return (
    <Grid className="min-h-[300px]" columns={12} gap={2}>
      {/* Header */}
      <GridCell
        className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900"
        colSpan={12}
      >
        Header
      </GridCell>

      {/* Sidebar */}
      <GridCell
        className="rounded bg-green-100 p-4 text-center dark:bg-green-900"
        colSpan={3}
      >
        Sidebar
      </GridCell>

      {/* Main Content */}
      <GridCell
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800"
        colSpan={9}
      >
        Main Content
      </GridCell>

      {/* Footer */}
      <GridCell
        className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900"
        colSpan={12}
      >
        Footer
      </GridCell>
    </Grid>
  );
};

// Dashboard example
export const DashboardExample = () => {
  return (
    <Grid className="min-h-[250px]" columns={4} gap={4}>
      {/* Metrics */}
      <GridCell className="rounded bg-blue-100 p-4 text-center dark:bg-blue-900">
        <div className="text-lg">1,234</div>
        <div className="text-sm opacity-75">Users</div>
      </GridCell>
      <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
        <div className="text-lg">$12.3K</div>
        <div className="text-sm opacity-75">Revenue</div>
      </GridCell>
      <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
        <div className="text-lg">98.5%</div>
        <div className="text-sm opacity-75">Uptime</div>
      </GridCell>
      <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
        <div className="text-lg">156</div>
        <div className="text-sm opacity-75">Orders</div>
      </GridCell>

      {/* Main chart area */}
      <GridCell
        className="rounded bg-white p-4 text-center dark:bg-zinc-900"
        colSpan={3}
        rowSpan={2}
      >
        Analytics Chart
      </GridCell>

      {/* Side widget */}
      <GridCell
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800"
        rowSpan={2}
      >
        Recent Activity
      </GridCell>
    </Grid>
  );
};
