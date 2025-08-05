"use client";

import type { GridProps } from "./types";
import React from "react";
import { Grid, GridCell } from "./component";

export function GridPreview(props: GridProps) {
  return (
    <Grid columns={6} gap={4} {...props}>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">1</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">2</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">3</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">4</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">5</GridCell>
      <GridCell className="bg-blue-100 dark:bg-blue-900 p-4 rounded text-center">6</GridCell>
    </Grid>
  );
}

// Preview props for prop explorer
export const gridPreviewProps = [
  {
    name: "columns",
    type: "number",
    description: "Number of columns - controls the CSS Grid template columns.",
    defaultValue: 6,
  },
  {
    name: "rows",
    type: "number",
    description: "Number of rows - controls the CSS Grid template rows.",
    defaultValue: undefined,
  },
  {
    name: "gap",
    type: "select",
    description: "Gap between grid items using 4px grid scale.",
    defaultValue: 4,
    options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20", "24"],
  },
  {
    name: "minHeight",
    type: "select",
    description: "Minimum height constraint for the grid layout.",
    defaultValue: "none",
    options: ["none", "sm", "md", "lg", "xl"],
  },
];
