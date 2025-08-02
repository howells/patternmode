"use client";

import type { DonutChartProps } from "./donut-chart";
import { DonutChart } from "@patternmode/ui";

import React from "react";

type DonutChartExampleProps = DonutChartProps;

export function DonutChartExample(props: DonutChartProps) {
  return <DonutChart {...props} />;
}
