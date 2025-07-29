"use client";

import React from "react";
import { ProgressCircle } from "@patternmode/ui";

export function DefaultExample() {
  return <ProgressCircle value={75} />;
}

export function SmallExample() {
  return <ProgressCircle value={60} size="sm" />;
}

export function LargeExample() {
  return <ProgressCircle value={85} size="lg" />;
}

export function WithLabelExample() {
  return <ProgressCircle value={90} showLabel />;
}

export function IndeterminateExample() {
  return <ProgressCircle indeterminate />;
}