"use client";

import type { SparkAreaChartProps } from "./component";
import React from "react";
import { SparkAreaChart } from "./component";

export function SparkChartExample(props: SparkAreaChartProps) {
  const data = [
    { x: "Jan", y: 10 },
    { x: "Feb", y: 20 },
    { x: "Mar", y: 15 },
    { x: "Apr", y: 30 },
    { x: "May", y: 25 },
    { x: "Jun", y: 35 },
    { x: "Jul", y: 20 },
  ];

  return <SparkAreaChart data={data} index="x" categories={["y"]} {...props} />;
}
