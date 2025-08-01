"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Progress } from "@patternmode/ui";

import React from "react";

export function ProgressExample() {
  return (
    <div className="space-y-2">
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "ProgressExample",
    title: "Progress",
    description: "Progress example",
    component: ProgressExample,
  },
];
