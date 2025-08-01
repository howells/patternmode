"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Badge, iconRegistry } from "@patternmode/ui";

import React from "react";

// Pre-imported icons from registry
const { AlertCircle, ArrowRight, Check, Clock, Info, Star, Trash2, TrendingUp, X } = iconRegistry;

// Default badge
export const DefaultExample = () => <Badge>Badge</Badge>;

// Badge with icons
export const WithIconsExample = () => (
  <Badge leftIcon={Check} rightIcon={ArrowRight} variant="success">
    Success
  </Badge>
);

// Badge with dismiss button
export const DismissExample = () => (
  <div className="flex flex-wrap gap-2">
    <Badge onDismiss={() => {}}>Removable</Badge>
    <Badge
      variant="success"
      leftIcon={Check}
      onDismiss={() => {}}
    >
      Completed
    </Badge>
    <Badge
      variant="error"
      onDismiss={() => {}}
      dismissIcon={Trash2}
    >
      Delete me
    </Badge>
  </div>
);

// Rounded (pill-shaped) badges
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
    id: "WithIconsExample",
    title: "With Icons",
    description: "Example with icon integration",
    component: WithIconsExample,
  },
  {
    id: "DismissExample",
    title: "Dismiss",
    description: "Dismiss example",
    component: DismissExample,
  },
];
