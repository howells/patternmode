"use client";

import type { LineChartProps } from "./line-chart";
import { LineChart } from "@patternmode/ui";

import React from "react";

type LineChartExampleProps = LineChartProps;

export function LineChartExample(props: LineChartProps) {
  return <LineChart {...props} />;
}
