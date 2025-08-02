"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Drawer, DrawerContent, DrawerTrigger } from "@patternmode/ui";

import React from "react";

// Default drawer
export const DefaultExample = () => (
  <Drawer>
    <DrawerTrigger>Open Drawer</DrawerTrigger>
    <DrawerContent>
      <div className="p-4">
        <h3>Drawer Content</h3>
        <p>This is the drawer content.</p>
      </div>
    </DrawerContent>
  </Drawer>
);

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
