"use client";

import type { TrackerProps } from "./component";
import React from "react";
import { Tracker } from "./component";

export function TrackerExample(props: TrackerProps) {
  const data = [
    { color: "bg-emerald-500", tooltip: "Operational" },
    { color: "bg-emerald-500", tooltip: "Operational" },
    { color: "bg-yellow-500", tooltip: "Degraded" },
    { color: "bg-emerald-500", tooltip: "Operational" },
    { color: "bg-red-500", tooltip: "Down" },
    { color: "bg-emerald-500", tooltip: "Operational" },
  ];

  return <Tracker data={data} {...props} />;
}

// Preview props for prop explorer
export const TrackerPreviewProps = [
  {
    name: "data",
    type: "array",
    description: "Array of block configurations for the tracker.",
    defaultValue: [
      { color: "bg-emerald-500", tooltip: "Operational" },
      { color: "bg-emerald-500", tooltip: "Operational" },
      { color: "bg-yellow-500", tooltip: "Degraded" },
      { color: "bg-emerald-500", tooltip: "Operational" },
      { color: "bg-red-500", tooltip: "Down" },
      { color: "bg-emerald-500", tooltip: "Operational" },
    ],
  },
  {
    name: "defaultBackgroundColor",
    type: "string",
    description: "Default background color for blocks that don't have a specific color defined.",
    defaultValue: "bg-zinc-400 dark:bg-zinc-400",
  },
  {
    name: "hoverEffect",
    type: "boolean",
    description: "Enable hover effects (opacity change) on all blocks in the tracker.",
    defaultValue: false,
  },
];
