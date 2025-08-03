"use client";

import React from "react";
import { BarChart } from "./component";

const previewData = [
  { category: "A", value1: 4000, value2: 2400 },
  { category: "B", value1: 3000, value2: 1398 },
  { category: "C", value1: 2000, value2: 9800 },
  { category: "D", value1: 2780, value2: 3908 },
  { category: "E", value1: 1890, value2: 4800 },
];

export function BarChartExample() {
  return (
    <div className="p-8">
      <BarChart
        data={previewData}
        index="category"
        categories={["value1", "value2"]}
        valueFormatter={value => `$${value.toLocaleString()}`}
        colors={["blue", "emerald"]}
      />
    </div>
  );
}
