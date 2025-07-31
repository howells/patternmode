"use client";

import { ProgressCircle } from "@patternmode/ui";
import React from "react";

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
  return <ProgressCircle value={90} showValue />;
}

export function IndeterminateExample() {
  return <ProgressCircle value={null} label="Loading..." />;
}
