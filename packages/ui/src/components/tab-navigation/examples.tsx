"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { TabNavigation, TabNavigationLink } from "@patternmode/ui";

import React from "react";

export function TabNavigationExample() {
  return (
    <TabNavigation>
      <TabNavigationLink href="#home">Home</TabNavigationLink>
      <TabNavigationLink href="#about">About</TabNavigationLink>
      <TabNavigationLink href="#contact">Contact</TabNavigationLink>
    </TabNavigation>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "TabNavigationExample",
    title: "Tab Navigation",
    description: "Tab Navigation example",
    component: TabNavigationExample,
  },
];
