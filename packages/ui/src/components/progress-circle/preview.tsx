"use client";

import type { ProgressCircleProps } from "./progress-circle";
import { ProgressCircle } from "@patternmode/ui";

import React from "react";

type ProgressCircleExampleProps = ProgressCircleProps;

export function ProgressCircleExample(props: ProgressCircleProps) {
  return <ProgressCircle {...props} />;
}
