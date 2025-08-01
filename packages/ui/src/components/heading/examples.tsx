"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Heading } from "@patternmode/ui";

import React from "react";

export function HeadingExample() {
  return <Heading level={1}>Page Title</Heading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
    </div>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "HeadingExample",
    title: "Heading",
    description: "Heading example",
    component: HeadingExample,
  },
  {
    id: "LevelsExample",
    title: "Levels",
    description: "Levels example",
    component: LevelsExample,
  },
];
