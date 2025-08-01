"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Label } from "@patternmode/ui";

import React from "react";

export function LabelExample() {
  return <Label htmlFor="email">Email Address</Label>;
}

export function RequiredExample() {
  return (
    <Label htmlFor="name">
      Full Name
      {" "}
      <span className="text-red-500">*</span>
    </Label>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "LabelExample",
    title: "Label",
    description: "Label example",
    component: LabelExample,
  },
  {
    id: "RequiredExample",
    title: "Required",
    description: "Required example",
    component: RequiredExample,
  },
];
