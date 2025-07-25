"use client";

import React from "react";
import { BarList } from "./bar-list";

// Sample data for different preview scenarios
const defaultData = [
  { name: "New York", value: 400 },
  { name: "London", value: 300 },
  { name: "Tokyo", value: 200 },
  { name: "Paris", value: 100 },
];

const salesData = [
  { name: "Product A", value: 125000 },
  { name: "Product B", value: 89000 },
  { name: "Product C", value: 67000 },
  { name: "Product D", value: 45000 },
];

const percentageData = [
  { name: "Completed", value: 85 },
  { name: "In Progress", value: 12 },
  { name: "Pending", value: 8 },
];

interface BarListExampleProps {
  showAnimation?: boolean;
  sortOrder?: "ascending" | "descending" | "none";
  showFormatter?: boolean;
  showInteractive?: boolean;
  [key: string]: unknown;
}

export function BarListExample({
  showAnimation = false,
  sortOrder = "descending",
  showFormatter = false,
  showInteractive = false,
  ...props
}: BarListExampleProps) {
  const handleValueChange = React.useCallback(
    (item: { name: string; value: number; key?: string; href?: string }) => {
      console.log("Clicked bar:", item.name, item.value);
    },
    []
  );

  // Choose data and formatter based on props
  const data = showFormatter ? salesData : defaultData;
  const valueFormatter = showFormatter
    ? (value: number) => `$${(value / 1000).toFixed(0)}K`
    : undefined;

  return (
    <BarList
      data={data}
      valueFormatter={valueFormatter}
      showAnimation={showAnimation}
      sortOrder={sortOrder}
      onValueChange={showInteractive ? handleValueChange : undefined}
      {...props}
    />
  );
}

// Default export for the preview system
export default function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">BarList</h3>
        <div className="space-y-6">
          <div>
            <p className="text-xs text-zinc-500 mb-3">Basic bar list</p>
            <BarList data={defaultData} />
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">With value formatter</p>
            <BarList
              data={salesData}
              valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">Percentage values</p>
            <BarList
              data={percentageData}
              valueFormatter={(value) => `${value}%`}
            />
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">Ascending order</p>
            <BarList data={defaultData} sortOrder="ascending" />
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-3">
              Interactive (click bars)
            </p>
            <BarList
              data={defaultData}
              onValueChange={(item) => console.log("Clicked:", item.name)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
