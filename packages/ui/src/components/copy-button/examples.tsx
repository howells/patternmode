"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { CopyButton } from "@patternmode/ui";

import React from "react";

// Default copy button
export const DefaultExample = () => (
  <CopyButton text="Hello, World!" />
);

// Custom labels
export const CustomLabelsExample = () => (
  <CopyButton
    text="console.log('Hello, World!');"
    copyLabel="Copy Code"
    copiedLabel="Code Copied!"
  />
);

// Long text
export const LongTextExample = () => (
  <CopyButton
    text="This is a longer piece of text that demonstrates how the copy button works with more substantial content that users might want to copy to their clipboard."
    copyLabel="Copy Text"
    copiedLabel="Text Copied!"
  />
); export const CopyButtonExample = DefaultExample;

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
    id: "CustomLabelsExample",
    title: "Custom Labels",
    description: "Custom Labels example",
    component: CustomLabelsExample,
  },
  {
    id: "LongTextExample",
    title: "Long Text",
    description: "Long Text example",
    component: LongTextExample,
  },
  {
    id: "CopyButtonExample",
    title: "Copy Button",
    description: "Copy Button example",
    component: CopyButtonExample,
  },
];
