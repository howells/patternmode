import { Grid } from "./components/grid";
import { GridCell } from "./components/grid-cell";

export const TestGrid = () => <Grid>Test Grid</Grid>;

export const TestViewportGrid = () => (
  <Grid columns={2} gap={4} viewport="fill">
    <GridCell className="bg-zinc-100 p-4">Viewport Fill Test</GridCell>
    <GridCell className="bg-green-100 p-4">Column 2</GridCell>
  </Grid>
);

export const TestViewportHeightGrid = () => (
  <Grid columns={1} gap={4} viewport="height">
    <GridCell className="flex items-center justify-center bg-red-100 p-4">
      <div>
        <h2 className="font-bold text-xl">Full Height Grid</h2>
        <p>This grid fills the viewport height</p>
      </div>
    </GridCell>
  </Grid>
);

export const TestDebugGrid = () => (
  <Grid columns={3} debug gap={4}>
    <GridCell>Debug Cell 1</GridCell>
    <GridCell>Debug Cell 2</GridCell>
    <GridCell>Debug Cell 3</GridCell>
    <GridCell>Debug Cell 4</GridCell>
    <GridCell>Debug Cell 5</GridCell>
    <GridCell>Debug Cell 6</GridCell>
  </Grid>
);

export const TestDynamicClasses = () => (
  <Grid columns={6} gap={4}>
    <GridCell className="bg-zinc-100 p-4" colSpan={2}>
      Span 2 cols (col-span-2)
    </GridCell>
    <GridCell className="bg-green-100 p-4" colEnd={7} colStart={4}>
      Start 4, End 7 (col-start-4, col-end-7)
    </GridCell>
    <GridCell className="bg-red-100 p-4" rowSpan={2}>
      Span 2 rows (row-span-2)
    </GridCell>
    <GridCell className="bg-yellow-100 p-4" colSpan={3}>
      Span 3 cols (col-span-3)
    </GridCell>
    <GridCell className="bg-purple-100 p-4">Normal cell</GridCell>
    <GridCell className="bg-indigo-100 p-4" colStart={5}>
      Start at col 5 (col-start-5)
    </GridCell>
  </Grid>
);
