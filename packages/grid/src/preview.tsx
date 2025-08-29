"use client";

import { Card, CardContent } from "@patternmode/card";
import { Grid, GridCell } from "./component";
import type { GridProps } from "./types";

export function GridPreview(props: GridProps) {
  const { columns = 3, rows = 2, gap = 4, ...rest } = props;
  return (
    <Grid columns={columns} rows={rows} gap={gap} {...rest}>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 1</CardContent>
        </Card>
      </GridCell>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 2</CardContent>
        </Card>
      </GridCell>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 3</CardContent>
        </Card>
      </GridCell>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 4</CardContent>
        </Card>
      </GridCell>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 5</CardContent>
        </Card>
      </GridCell>
      <GridCell>
        <Card variant="dashed">
          <CardContent>Card 6</CardContent>
        </Card>
      </GridCell>
    </Grid>
  );
}

// Preview props for prop explorer
export const gridPreviewProps = [
	{
		name: "columns",
		type: "number",
		description: "Number of columns - controls the CSS Grid template columns.",
		defaultValue: 3,
	},
	{
		name: "rows",
		type: "number",
		description: "Number of rows - controls the CSS Grid template rows.",
		defaultValue: 2,
	},
	{
		name: "gap",
		type: "select",
		description: "Gap between grid items using 4px grid scale.",
		defaultValue: 4,
		options: [
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"8",
			"10",
			"12",
			"16",
			"20",
			"24",
		],
	},
	{
		name: "minHeight",
		type: "select",
		description: "Minimum height constraint for the grid layout.",
		defaultValue: "none",
		options: ["none", "sm", "md", "lg", "xl"],
	},
];
