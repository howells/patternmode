"use client";

import type { CategoryBarProps } from "./component";
import React from "react";

import { CategoryBar } from "./component";

export function CategoryBarExample(props: CategoryBarProps) {
  return (
    <CategoryBar
      values={[456, 351, 271, 191]}
      colors={["blue", "teal", "amber", "rose"]}
      showLabels={true}
      {...props}
    />
  );
}

// Preview props for prop explorer
export const CategoryBarPreviewProps = [
  {
    name: "values",
    type: "array",
    description: "Array of numeric values for each category.",
    defaultValue: [456, 351, 271, 191],
  },
  {
    name: "colors",
    type: "array",
    description: "Color themes for each category.",
    defaultValue: ["blue", "teal", "amber", "rose"],
  },
  {
    name: "showLabels",
    type: "boolean",
    description: "Whether to show numeric labels above the bar.",
    defaultValue: true,
  },
];
