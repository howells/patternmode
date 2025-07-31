"use client";

import { Grid, GridCell } from "@patternmode/ui";
import React from "react";

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
export const /**
              *
              */
  GridExample = ({
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
        minHeight={minHeight}
      >
        {Array.from({ length: cellCount }, (_, index) => (
          <GridCell
            key={index}
            className={`p-4 rounded text-center ${
              cellSolid
                ? "bg-blue-100 border border-blue-300"
                : cellOverlay
                  ? "bg-purple-100 border border-purple-300 shadow-md"
                  : cellBordered
                    ? "border border-gray-300"
                    : "bg-gray-50 border border-gray-200"
            }`}
          >
            {index + 1}
          </GridCell>
        ))}
      </Grid>
    );
  };
