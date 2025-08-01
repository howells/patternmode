"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { iconRegistry, Toggle } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Bold } = iconRegistry;

export function DefaultExample() {
  return (
    <Toggle>
      <span>Toggle me</span>
    </Toggle>
  );
}

export function WithIconExample() {
  return (
    <Toggle>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}

// Default export for prop explorer
export const ToggleExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "ToggleExample",
    title: "Toggle",
    description: "Toggle example",
    component: ToggleExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithIconExample",
    title: "With Icon",
    description: "With Icon example",
    component: WithIconExample,
  },
];
