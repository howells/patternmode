"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Button, useToast } from "@patternmode/ui";

import React from "react";

export function DefaultExample() {
  const toast = useToast();

  return (
    <Button
      onClick={() => {
        toast.success("Success!", "Your changes have been saved.");
      }}
    >
      Show Toast
    </Button>
  );
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
];
