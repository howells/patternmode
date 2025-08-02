"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { List, ListItem, Subheading } from "@patternmode/ui";

import React from "react";

export function DefaultExample() {
  return <Subheading>Getting Started</Subheading>;
}

export function LevelsExample() {
  return (
    <div className="space-y-4">
      <Subheading level={1}>Level 1 Subheading</Subheading>
      <Subheading level={2}>Level 2 Subheading</Subheading>
      <Subheading level={3}>Level 3 Subheading</Subheading>
      <Subheading level={4}>Level 4 Subheading</Subheading>
    </div>
  );
}

export function WithContentExample() {
  return (
    <div className="space-y-4">
      <Subheading>Introduction</Subheading>
      <p className="text-zinc-600">
        This is the introduction paragraph that follows the subheading.
        It provides context and information about the section.
      </p>

      <Subheading>Key Features</Subheading>
      <List variant="marker" className="pl-5">
        <ListItem>Feature one description</ListItem>
        <ListItem>Feature two description</ListItem>
        <ListItem>Feature three description</ListItem>
      </List>
    </div>
  );
} export const SubheadingExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "SubheadingExample",
    title: "Subheading",
    description: "Subheading example",
    component: SubheadingExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "LevelsExample",
    title: "Levels",
    description: "Levels example",
    component: LevelsExample,
  },
  {
    id: "WithContentExample",
    title: "With Content",
    description: "Example with pre-filled content",
    component: WithContentExample,
  },
];
