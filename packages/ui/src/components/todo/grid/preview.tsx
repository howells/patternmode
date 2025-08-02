"use client";

import type { GridProps } from "./grid";

import { Grid, GridCell } from "@patternmode/ui";
import React from "react";

type GridExampleProps = {
  columns?: number;
  rows?: number;
  gap?: number;
  showColumnGuides?: boolean;
  showRowGuides?: boolean;
  minHeight?: "none" | "sm" | "md" | "lg" | "xl";
  cellBordered?: boolean;
  cellSolid?: boolean;
  cellOverlay?: boolean;
};

export function GridExample(props: GridProps) {
  return (
    <Grid columns={3} gap={4} {...props}>
      {Array.from({ length: 9 }, (_, index) => (
        <GridCell
          key={index}
          className="p-4 rounded text-center border border-gray-300"
        >
          {index + 1}
        </GridCell>
      ))}
    </Grid>
  );
}
