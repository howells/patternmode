"use client";

import type { BarChartProps } from "./component";
import React from "react";
import { SparkChart } from "./component";

export function SparkChartPreview(props: BarChartProps) {
  const data = [
    { x: "Jan", y: 10 },
    { x: "Feb", y: 20 },
    { x: "Mar", y: 15 },
    { x: "Apr", y: 30 },
    { x: "May", y: 25 },
    { x: "Jun", y: 35 },
    { x: "Jul", y: 20 },
  ];

  return (
    <div className="w-full max-w-lg">
      <SparkChart variant="bar" data={data} index="x" categories={["y"]} {...props} />
    </div>
  );
}

// Preview props for prop explorer
export const sparkChartPreviewProps = [
  {
    name: "autoMinValue",
    type: "boolean",
    description: "Whether to automatically calculate minimum value for better scaling.",
    defaultValue: false,
  },
  {
    name: "colors",
    type: "array",
    description: "Array of color names for chart styling.",
    defaultValue: ["emerald"],
  },
  {
    name: "type",
    type: "select",
    description: "Chart stacking type for multiple data series.",
    options: ["default", "stacked", "percent"],
    defaultValue: "default",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for custom styling.",
    defaultValue: "",
  },
];
