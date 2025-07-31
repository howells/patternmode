import { SparkBarChart } from "@patternmode/ui";
import React from "react";

export function SparkChartExample() {
  const data = [
    { day: 1, value: 10 },
    { day: 2, value: 25 },
    { day: 3, value: 15 },
    { day: 4, value: 30 },
    { day: 5, value: 20 },
    { day: 6, value: 35 },
    { day: 7, value: 28 },
  ];

  return (
    <SparkBarChart
      data={data}
      index="day"
      categories={["value"]}
      colors={["blue"]}
    />
  );
}

export function DefaultExample() {
  const data = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 350 },
    { month: "May", sales: 700 },
  ];

  return (
    <SparkBarChart
      data={data}
      index="month"
      categories={["sales"]}
      colors={["emerald"]}
    />
  );
}

export function AreaExample() {
  const data = [
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 25 },
    { x: 4, y: 40 },
    { x: 5, y: 30 },
  ];

  return (
    <div className="flex gap-4">
      <SparkBarChart
        data={data}
        index="x"
        categories={["y"]}
        colors={["pink"]}
        className="h-12 w-20"
      />
      <SparkBarChart
        data={data}
        index="x"
        categories={["y"]}
        colors={["emerald"]}
        className="h-12 w-20"
      />
      <SparkBarChart
        data={data}
        index="x"
        categories={["y"]}
        colors={["amber"]}
        className="h-12 w-20"
      />
    </div>
  );
}
