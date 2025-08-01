"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Icon, iconRegistry } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Download, Heart, Search, Settings, Star, User } = iconRegistry;

export function DefaultExample() {
  return <Icon icon={Search} />;
}

export function SizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={Heart} size="xs" />
      <Icon icon={Heart} size="sm" />
      <Icon icon={Heart} size="base" />
      <Icon icon={Heart} size="lg" />
      <Icon icon={Heart} size="xl" />
      <Icon icon={Heart} size="2xl" />
      <Icon icon={Heart} size="3xl" />
    </div>
  );
}

export function WithTextExample() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon icon={User} />
        <span>Profile</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon={Settings} />
        <span>Settings</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon={Download} />
        <span>Download</span>
      </div>
    </div>
  );
}

export function CustomStrokeExample() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={Star} strokeWidth={1} />
      <Icon icon={Star} strokeWidth={1.5} />
      <Icon icon={Star} strokeWidth={2} />
      <Icon icon={Star} strokeWidth={2.5} />
    </div>
  );
}

export function LayoutExample() {
  return (
    <div className="space-y-4">
      {/* Flex with gap */}
      <div className="flex items-center gap-2 p-3 border rounded">
        <Icon icon={Search} />
        <span>Search with flex gap</span>
      </div>

      {/* Manual margin */}
      <div className="flex items-center p-3 border rounded">
        <Icon icon={User} className="mr-2" />
        <span>User with margin-right</span>
      </div>

      {/* Different gap sizes */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Icon icon={Star} size="sm" />
          <span className="text-sm">Small gap</span>
        </div>
        <div className="flex items-center gap-3">
          <Icon icon={Heart} />
          <span>Large gap</span>
        </div>
      </div>
    </div>
  );
} export const IconExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "IconExample",
    title: "Icon",
    description: "Icon example",
    component: IconExample,
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
  {
    id: "CustomStrokeExample",
    title: "Custom Stroke",
    description: "Custom Stroke example",
    component: CustomStrokeExample,
  },
  {
    id: "LayoutExample",
    title: "Layout",
    description: "Layout example",
    component: LayoutExample,
  },
];
