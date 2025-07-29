"use client";

import React from "react";
import { Grid, GridAuto, GridCell } from "@patternmode/ui";

interface GridExampleProps {
  columns?: number;
  rows?: number;
  gap?: number;
  showColumnGuides?: boolean;
  showRowGuides?: boolean;
  minHeight?: "none" | "sm" | "md" | "lg" | "xl";
  cellBordered?: boolean;
  cellSolid?: boolean;
  cellOverlay?: boolean;
}

// Example component for preview system
export const GridExample = ({
  columns = 3,
  rows = 3,
  gap = 4,
  showColumnGuides = true,
  showRowGuides = true,
  minHeight = "md",
  cellBordered = true,
  cellSolid = false,
  cellOverlay = false,
}: GridExampleProps) => {
  // Generate a reasonable number of cells based on columns and rows
  const cellCount = Math.min(columns * rows, 24);

  return (
    <Grid
      columns={columns}
      rows={rows}
      gap={gap}
      showColumnGuides={showColumnGuides}
      showRowGuides={showRowGuides}
      minHeight={minHeight}
    >
      {Array.from({ length: cellCount }, (_, index) => (
        <GridCell
          key={index}
          bordered={cellBordered}
          solid={cellSolid}
          overlay={cellOverlay}
        >
          {index + 1}
        </GridCell>
      ))}
    </Grid>
  );
};
