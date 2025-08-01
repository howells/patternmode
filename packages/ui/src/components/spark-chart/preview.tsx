"use client";

import type { SparkLineChartProps } from "./spark-chart";
import { SparkLineChart } from "@patternmode/ui";

import React from "react";

type SparkChartExampleProps = SparkLineChartProps;

export function SparkChartExample(props: SparkLineChartProps) {
  const sampleData = [
    { month: "Jan", sales: 2400 },
    { month: "Feb", sales: 1398 },
    { month: "Mar", sales: 9800 },
    { month: "Apr", sales: 3908 },
    { month: "May", sales: 4800 },
    { month: "Jun", sales: 3800 },
  ];

  return <SparkLineChart data={sampleData} index="month" categories={["sales"]} {...props} />;
}
