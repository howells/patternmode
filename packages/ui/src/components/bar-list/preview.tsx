"use client";

import type { BarListProps } from "./bar-list";
import { BarList } from "@patternmode/ui";

import React from "react";

// Sample data for preview
const defaultData = [
  { name: "React", value: 45 },
  { name: "Vue", value: 32 },
  { name: "Angular", value: 28 },
  { name: "Svelte", value: 15 },
  { name: "Solid", value: 8 },
];

export function BarListExample({ data = defaultData, ...props }: BarListProps) {
  return <BarList data={data} {...props} className="w-128" />;
}
