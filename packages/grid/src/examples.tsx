"use client";

import { Grid } from "./components/grid";
import { GridCell } from "./components/grid-cell";

// Basic grid example
export const DefaultExample = () => {
  return (
    <Grid columns={6} gap={4}>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
        1
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
        2
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
        3
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
        4
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
        5
      </GridCell>
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
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
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            A
          </GridCell>
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            B
          </GridCell>
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            C
          </GridCell>
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            D
          </GridCell>
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            E
          </GridCell>
          <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
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

// Full viewport grid example
export const FullViewportExample = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Full Viewport Grid</h4>
      <p className="text-xs text-zinc-600">
        Grid that fills the entire viewport using h-dvh for mobile compatibility
      </p>
      <Grid columns={3} gap={4} viewport="fill">
        <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
          <div className="flex h-full flex-col justify-center">
            <div>Full Viewport</div>
            <div className="text-xs opacity-75">Column 1</div>
          </div>
        </GridCell>
        <GridCell className="rounded bg-green-100 p-4 text-center dark:bg-green-900">
          <div className="flex h-full flex-col justify-center">
            <div>Height & Width</div>
            <div className="text-xs opacity-75">Column 2</div>
          </div>
        </GridCell>
        <GridCell className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900">
          <div className="flex h-full flex-col justify-center">
            <div>Dynamic Viewport</div>
            <div className="text-xs opacity-75">Column 3</div>
          </div>
        </GridCell>
      </Grid>
    </div>
  );
};

// Viewport height only example
export const ViewportHeightExample = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Viewport Height Only</h4>
      <p className="text-xs text-zinc-600">
        Grid fills viewport height but maintains responsive width
      </p>
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4} viewport="height">
        <GridCell className="rounded bg-red-100 p-4 text-center dark:bg-red-900">
          <div className="flex h-full flex-col justify-center">
            <div>Viewport Height</div>
            <div className="text-xs opacity-75">Responsive Width</div>
          </div>
        </GridCell>
        <GridCell className="rounded bg-yellow-100 p-4 text-center dark:bg-yellow-900">
          <div className="flex h-full flex-col justify-center">
            <div>Full Height</div>
            <div className="text-xs opacity-75">Auto Width</div>
          </div>
        </GridCell>
        <GridCell className="rounded bg-indigo-100 p-4 text-center dark:bg-indigo-900">
          <div className="flex h-full flex-col justify-center">
            <div>Dynamic Viewport</div>
            <div className="text-xs opacity-75">Mobile Compatible</div>
          </div>
        </GridCell>
      </Grid>
    </div>
  );
};

// Debug mode example
export const DebugExample = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Debug Mode</h4>
      <p className="text-xs text-zinc-600">
        Enable debug mode to visualize grid cell boundaries with red backgrounds
        and borders
      </p>
      <Grid columns={3} debug gap={4}>
        <GridCell>Cell 1</GridCell>
        <GridCell>Cell 2</GridCell>
        <GridCell>Cell 3</GridCell>
        <GridCell>Cell 4</GridCell>
        <GridCell>Cell 5</GridCell>
        <GridCell>Cell 6</GridCell>
      </Grid>
    </div>
  );
};

// Layout grid (like a webpage layout)
export const LayoutGridExample = () => {
  return (
    <Grid className="min-h-[300px]" columns={12} gap={2}>
      {/* Header */}
      <GridCell
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900"
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
      <GridCell className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900">
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

// Template areas example
export const TemplateAreasExample = () => {
  return (
    <Grid
      className="min-h-[300px]"
      gap={4}
      templateAreas={`
        "header header header"
        "sidebar main main"
        "sidebar footer footer"
      `}
    >
      <GridCell
        area="header"
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900"
      >
        Header
      </GridCell>
      <GridCell
        area="sidebar"
        className="rounded bg-green-100 p-4 text-center dark:bg-green-900"
      >
        Sidebar
      </GridCell>
      <GridCell
        area="main"
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-800"
      >
        Main Content
      </GridCell>
      <GridCell
        area="footer"
        className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900"
      >
        Footer
      </GridCell>
    </Grid>
  );
};

// Auto-flow example
export const AutoFlowExample = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm">Grid Flow Row (default)</h4>
      <Grid autoFlow="row" className="min-h-[200px]" columns={3} gap={4}>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
          <GridCell
            className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900"
            key={id}
          >
            {id}
          </GridCell>
        ))}
      </Grid>

      <h4 className="font-medium text-sm">Grid Flow Column</h4>
      <Grid autoFlow="column" className="min-h-[200px]" columns={3} gap={4}>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((id) => (
          <GridCell
            className="rounded bg-green-100 p-4 text-center dark:bg-green-900"
            key={id}
          >
            {id}
          </GridCell>
        ))}
      </Grid>

      <h4 className="font-medium text-sm">Grid Flow Dense</h4>
      <Grid autoFlow="dense" className="min-h-[200px]" columns={3} gap={4}>
        <GridCell
          className="rounded bg-red-100 p-4 text-center dark:bg-red-900"
          colSpan={2}
        >
          Wide 1
        </GridCell>
        <GridCell className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900">
          Narrow 1
        </GridCell>
        <GridCell className="rounded bg-yellow-100 p-4 text-center dark:bg-yellow-900">
          Narrow 2
        </GridCell>
        <GridCell
          className="rounded bg-red-100 p-4 text-center dark:bg-red-900"
          colSpan={2}
        >
          Wide 2
        </GridCell>
      </Grid>
    </div>
  );
};

// End positions example
export const EndPositionsExample = () => {
  return (
    <Grid className="min-h-[300px]" columns={6} gap={4} rows={4}>
      <GridCell
        className="rounded bg-zinc-100 p-4 text-center dark:bg-zinc-900"
        colEnd={3}
        colStart={1}
        rowEnd={3}
        rowStart={1}
      >
        Top Left
        <br />
        (1-2, 1-2)
      </GridCell>
      <GridCell
        className="rounded bg-green-100 p-4 text-center dark:bg-green-900"
        colEnd={7}
        colStart={4}
        rowEnd={2}
        rowStart={1}
      >
        Top Right
        <br />
        (4-6, 1-1)
      </GridCell>
      <GridCell
        className="rounded bg-purple-100 p-4 text-center dark:bg-purple-900"
        colEnd={4}
        colStart={1}
        rowEnd={5}
        rowStart={3}
      >
        Bottom Left
        <br />
        (1-3, 3-4)
      </GridCell>
      <GridCell
        className="rounded bg-orange-100 p-4 text-center dark:bg-orange-900"
        colEnd={7}
        colStart={5}
        rowEnd={5}
        rowStart={2}
      >
        Bottom Right
        <br />
        (5-6, 2-4)
      </GridCell>
    </Grid>
  );
};
