"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Loader } from "@patternmode/ui";

import React from "react";

export function DefaultExample() {
  return <Loader aria-label="Loading" />;
}

export function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Loader size="xs" aria-label="Loading" />
      <Loader size="sm" aria-label="Loading" />
      <Loader size="base" aria-label="Loading" />
      <Loader size="lg" aria-label="Loading" />
      <Loader size="xl" aria-label="Loading" />
    </div>
  );
}

export function WithTextExample() {
  return (
    <div className="flex items-center gap-2">
      <Loader size="sm" aria-label="Loading content" />
      <span className="text-sm text-zinc-600">Loading...</span>
    </div>
  );
}
export const LoaderExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "LoaderExample",
    title: "Loader",
    description: "Loader example",
    component: LoaderExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "WithTextExample",
    title: "With Text",
    description: "With Text example",
    component: WithTextExample,
  },
];
