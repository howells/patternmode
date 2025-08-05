"use client";

import React from "react";
import { SparkChart } from "./component";

export function DefaultExample() {
  const data = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 350 },
    { month: "May", sales: 700 },
  ];

  return (
    <SparkChart
      variant="bar"
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
    <SparkChart
      variant="area"
      data={data}
      index="x"
      categories={["y"]}
      colors={["blue"]}
      fill="gradient"
    />
  );
}

export function LineExample() {
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
    <SparkChart
      variant="line"
      data={data}
      index="day"
      categories={["value"]}
      colors={["violet"]}
    />
  );
}

export function MultipleExample() {
  const data = [
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 25 },
    { x: 4, y: 40 },
    { x: 5, y: 30 },
  ];

  return (
    <div className="flex gap-4">
      <SparkChart
        variant="bar"
        data={data}
        index="x"
        categories={["y"]}
        colors={["pink"]}
        className="h-12 w-20"
      />
      <SparkChart
        variant="area"
        data={data}
        index="x"
        categories={["y"]}
        colors={["emerald"]}
        className="h-12 w-20"
      />
      <SparkChart
        variant="line"
        data={data}
        index="x"
        categories={["y"]}
        colors={["amber"]}
        className="h-12 w-20"
      />
    </div>
  );
}
