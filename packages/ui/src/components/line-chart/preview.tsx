"use client";

import type { LineChartProps } from "./component";
import React from "react";

import { LineChart } from "./component";

export function LineChartExample(props: LineChartProps) {
  return <LineChart {...props} />;
}
