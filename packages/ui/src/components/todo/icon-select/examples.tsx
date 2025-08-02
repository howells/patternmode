"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { IconSelect } from "@patternmode/ui";

import React from "react";

export function IconSelectExample() {
  return <IconSelect onValueChange={icon => console.log(icon)} />;
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "IconSelectExample",
    title: "Icon Select",
    description: "Icon Select example",
    component: IconSelectExample,
  },
];
