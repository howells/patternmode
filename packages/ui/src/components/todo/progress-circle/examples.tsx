"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
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

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "SmallExample",
    title: "Small",
    description: "Small example",
    component: SmallExample,
  },
  {
    id: "LargeExample",
    title: "Large",
    description: "Large example",
    component: LargeExample,
  },
  {
    id: "WithLabelExample",
    title: "With Label",
    description: "With Label example",
    component: WithLabelExample,
  },
  {
    id: "IndeterminateExample",
    title: "Indeterminate",
    description: "Indeterminate example",
    component: IndeterminateExample,
  },
];
