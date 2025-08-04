"use client";

import React from "react";
import { BarList } from "./component";

const previewData = [
  { name: "Product A", value: 4000, color: "blue" },
  { name: "Product B", value: 3200, color: "emerald" },
  { name: "Product C", value: 2800, color: "pink" },
  { name: "Product D", value: 1900, color: "indigo" },
  { name: "Product E", value: 1200, color: "orange" },
];

export type BarListPreviewProps = {
  /**
   * Whether to animate bar width transitions.
   * Creates smooth transitions when data changes.
   */
  showAnimation?: boolean;
  /**
   * Color scheme for the bars.
   * When set to "auto", uses colors from data objects.
   */
  color?: "blue" | "emerald" | "pink" | "indigo" | "orange" | "auto";
  /**
   * Whether to sort bars by value.
   * When true, displays bars in descending value order.
   */
  sortOrder?: "ascending" | "descending" | "none";
};

export function BarListPreview({
  showAnimation = true,
  color = "auto",
  sortOrder = "none",
}: BarListPreviewProps = {}) {
  let data = [...previewData];

  // Apply sorting if specified
  if (sortOrder === "ascending") {
    data = data.sort((a, b) => a.value - b.value);
  }
  else if (sortOrder === "descending") {
    data = data.sort((a, b) => b.value - a.value);
  }

  // Apply color override if not auto
  if (color !== "auto") {
    data = data.map(item => ({ ...item, color }));
  }

  return (
    <div className="p-8">
      <BarList
        data={data}
        valueFormatter={value => `$${value.toLocaleString()}`}
        showAnimation={showAnimation}
      />
    </div>
  );
}

// Preview props for prop explorer
export const barListPreviewProps = [
  {
    name: "showAnimation",
    type: "boolean",
    description: "Whether to animate bar width transitions - creates smooth transitions when data changes.",
    defaultValue: true,
  },
  {
    name: "color",
    type: "select",
    description: "Color scheme for the bars - when set to 'auto', uses colors from data objects.",
    options: ["blue", "emerald", "pink", "indigo", "orange", "auto"],
    defaultValue: "auto",
  },
  {
    name: "sortOrder",
    type: "select",
    description: "Whether to sort bars by value - when set, displays bars in specified order.",
    options: ["ascending", "descending", "none"],
    defaultValue: "none",
  },
];
