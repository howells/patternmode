import React from "react";
import { Grid, GridAuto, GridCell } from "@patternmode/ui";

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
      <GridCell solid>Solid 1</GridCell>
      <GridCell>Regular 2</GridCell>
      <GridCell solid>Solid 3</GridCell>
      <GridCell>Regular 4</GridCell>

      <GridCell>Regular 5</GridCell>
      <GridCell solid colSpan={2}>
        Solid Spanning
      </GridCell>
      <GridCell>Regular 8</GridCell>
    </Grid>
  );
}

export function OverlayCellsExample() {
  return (
    <Grid columns={4} gap={4}>
      <GridCell>1</GridCell>
      <GridCell overlay>Overlay</GridCell>
      <GridCell>3</GridCell>
      <GridCell>4</GridCell>

      <GridCell>5</GridCell>
      <GridCell>6</GridCell>
      <GridCell overlay solid colSpan={2}>
        Overlay + Solid
      </GridCell>
    </Grid>
  );
}

export function GuideControlExample() {
  return (
    <div className="space-y-6">
      <Grid columns={4} showColumnGuides={true} showRowGuides={false} gap={4}>
        <GridCell>Columns only</GridCell>
        <GridCell>2</GridCell>
        <GridCell>3</GridCell>
        <GridCell>4</GridCell>
      </Grid>

      <Grid columns={4} showColumnGuides={false} showRowGuides={true} gap={4}>
        <GridCell>Rows only</GridCell>
        <GridCell>2</GridCell>
        <GridCell>3</GridCell>
        <GridCell>4</GridCell>
      </Grid>

      <Grid columns={4} showColumnGuides={false} showRowGuides={false} gap={4}>
        <GridCell solid>No guides</GridCell>
        <GridCell solid>2</GridCell>
        <GridCell solid>3</GridCell>
        <GridCell solid>4</GridCell>
      </Grid>
    </div>
  );
}

export function AutoGridExample() {
  return <GridAuto columns={5} cellCount={10} gap={4} solidCells={true} />;
}

export function CustomLayoutExample() {
  return (
    <Grid columns={6} rows={4} gap={3}>
      {/* Header */}
      <GridCell solid colSpan={6} className="bg-blue-100 dark:bg-blue-900">
        Header
      </GridCell>

      {/* Sidebar */}
      <GridCell solid rowSpan={2} className="bg-green-100 dark:bg-green-900">
        Sidebar
      </GridCell>

      {/* Main content */}
      <GridCell overlay colSpan={4} className="bg-white dark:bg-zinc-800">
        Main Content
      </GridCell>

      <GridCell solid className="bg-purple-100 dark:bg-purple-900">
        Widget
      </GridCell>

      {/* Cards */}
      <GridCell colSpan={2}>Card 1</GridCell>
      <GridCell colSpan={2}>Card 2</GridCell>
      <GridCell>Extra</GridCell>

      {/* Footer */}
      <GridCell solid colSpan={6} className="bg-zinc-100 dark:bg-zinc-800">
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
        solid
        colSpan={3}
        className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-xs opacity-75">Users</div>
        </div>
      </GridCell>
      <GridCell
        solid
        colSpan={3}
        className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">$12.3K</div>
          <div className="text-xs opacity-75">Revenue</div>
        </div>
      </GridCell>
      <GridCell
        solid
        colSpan={3}
        className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">98.5%</div>
          <div className="text-xs opacity-75">Uptime</div>
        </div>
      </GridCell>
      <GridCell
        solid
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
        overlay
        colSpan={8}
        rowSpan={3}
        className="bg-white dark:bg-zinc-900"
      >
        Analytics Chart
      </GridCell>

      {/* Side widgets */}
      <GridCell
        solid
        colSpan={4}
        rowSpan={2}
        className="bg-zinc-50 dark:bg-zinc-800"
      >
        Recent Activity
      </GridCell>
      <GridCell solid colSpan={4} className="bg-yellow-50 dark:bg-yellow-900">
        Notifications
      </GridCell>

      {/* Bottom section */}
      <GridCell colSpan={4}>Tasks</GridCell>
      <GridCell colSpan={4}>Performance</GridCell>
      <GridCell colSpan={4}>Settings</GridCell>
    </Grid>
  );
}
