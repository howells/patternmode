"use client";

import React from "react";
import { AreaChart } from "./component";

const previewData = [
  { month: "Jan", sales: 4000, expenses: 2400 },
  { month: "Feb", sales: 3000, expenses: 1398 },
  { month: "Mar", sales: 2000, expenses: 9800 },
  { month: "Apr", sales: 2780, expenses: 3908 },
  { month: "May", sales: 1890, expenses: 4800 },
  { month: "Jun", sales: 2390, expenses: 3800 },
];

export function AreaChartExample() {
  return (
    <div className="p-8">
      <AreaChart
        data={previewData}
        index="month"
        categories={["sales", "expenses"]}
        valueFormatter={value => `$${value.toLocaleString()}`}
        colors={["blue", "pink"]}
      />
    </div>
  );
}
