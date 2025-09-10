"use client";

import { Card, CardContent } from "@patternmode/card";
import { Stack } from "./components/stack";
import type { StackProps } from "./types";

export function StackPreview(props: StackProps) {
  return (
    <Stack {...props}>
      <Card variant="dashed">
        <CardContent>Card 1</CardContent>
      </Card>
      <Card variant="dashed">
        <CardContent>Card 2</CardContent>
      </Card>
      <Card variant="dashed">
        <CardContent>Card 3</CardContent>
      </Card>
    </Stack>
  );
}

// Preview props for prop explorer
export const stackPreviewProps = [
  {
    name: "direction",
    type: "select",
    description:
      "The direction of the stack - controls whether children are arranged vertically or horizontally.",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
  },
  {
    name: "gap",
    type: "select",
    description: "Gap between items (4px grid scale).",
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
    defaultValue: "4",
  },
  {
    name: "align",
    type: "select",
    description: "Cross-axis alignment of stack items.",
    options: ["start", "center", "end", "stretch", "baseline"],
    defaultValue: "start",
  },
  {
    name: "justify",
    type: "select",
    description: "Main-axis distribution of stack items.",
    options: ["start", "center", "end", "between", "around", "evenly"],
    defaultValue: "start",
  },
  {
    name: "wrap",
    type: "boolean",
    description:
      "Whether items should wrap to new lines when space is limited.",
    defaultValue: false,
  },
  {
    name: "padding",
    type: "select",
    description: "Padding around the stack (4px grid scale).",
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
    defaultValue: "0",
  },
];
