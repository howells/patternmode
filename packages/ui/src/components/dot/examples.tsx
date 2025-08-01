"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Dot } from "@patternmode/ui";

import React from "react";

// Basic example - matches config "basic" id
export function BasicExample() {
  return (
    <div className="flex items-center gap-4">
      <Dot />
      <Dot variant="success" />
      <Dot variant="warning" />
      <Dot variant="error" />
      <Dot variant="info" />
    </div>
  );
}

// Semantic variants example - matches config "semantic-variants" id
export function SemanticVariantsExample() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Dot variant="default" label="Default" />
      <Dot variant="neutral" label="Neutral" />
      <Dot variant="success" label="Success" />
      <Dot variant="info" label="Info" />
      <Dot variant="warning" label="Warning" />
      <Dot variant="error" label="Error" />
      <Dot variant="critical" label="Critical" />
      <Dot variant="positive" label="Positive" />
      <Dot variant="negative" label="Negative" />
    </div>
  );
}

// Color variants example - matches config "color-variants" id
export function ColorVariantsExample() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Dot variant="purple" label="Purple" />
      <Dot variant="pink" label="Pink" />
      <Dot variant="rose" label="Rose" />
      <Dot variant="orange" label="Orange" />
      <Dot variant="amber" label="Amber" />
      <Dot variant="yellow" label="Yellow" />
      <Dot variant="lime" label="Lime" />
      <Dot variant="green" label="Green" />
      <Dot variant="emerald" label="Emerald" />
      <Dot variant="teal" label="Teal" />
      <Dot variant="cyan" label="Cyan" />
      <Dot variant="sky" label="Sky" />
      <Dot variant="blue" label="Blue" />
      <Dot variant="indigo" label="Indigo" />
      <Dot variant="violet" label="Violet" />
      <Dot variant="fuchsia" label="Fuchsia" />
    </div>
  );
}

// Sizes example - matches config "sizes" id
export function SizesExample() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Dot size="sm" variant="success" />
        <span className="text-xs text-zinc-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Dot size="default" variant="success" />
        <span className="text-xs text-zinc-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Dot size="lg" variant="success" />
        <span className="text-xs text-zinc-500">Large</span>
      </div>
    </div>
  );
}

// With labels example - matches config "with-labels" id
export function WithLabelsExample() {
  return (
    <div className="space-y-3">
      <Dot variant="success" label="Service is running normally" />
      <Dot variant="warning" label="High memory usage detected" />
      <Dot variant="error" label="Connection failed" />
      <Dot variant="info" label="Update available" />
      <Dot variant="neutral" label="Service is offline" />
    </div>
  );
}

// Without labels example - matches config "without-labels" id
export function WithoutLabelsExample() {
  return (
    <div className="flex items-center gap-3">
      <Dot variant="success" />
      <Dot variant="warning" />
      <Dot variant="error" />
      <Dot variant="info" />
      <Dot variant="neutral" />
      <Dot variant="purple" />
      <Dot variant="emerald" />
      <Dot variant="sky" />
    </div>
  );
}

// Animated example - matches config "animated" id
export function AnimatedExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <Dot variant="success" label="Live Stream" animated />
        <Dot variant="error" label="Recording" animated />
        <Dot variant="info" label="Processing" animated />
        <Dot variant="warning" label="Syncing" animated />
      </div>
      <div className="text-xs text-zinc-500">
        Animated dots pulse to indicate active states
      </div>
    </div>
  );
}

// Custom styling can be achieved using className prop
// For example: <Dot className="text-purple-600" /> or custom background colors

// Real-world usage examples

export function DotExample() {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
          Recent Deployments
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dot variant="success" size="sm" />
              <span className="font-medium">main branch</span>
            </div>
            <span className="text-zinc-500 text-xs">2 minutes ago</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dot variant="info" size="sm" animated />
              <span className="font-medium">feature/new-ui</span>
            </div>
            <span className="text-zinc-500 text-xs">Building...</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dot variant="warning" size="sm" />
              <span className="font-medium">hotfix/critical-bug</span>
            </div>
            <span className="text-zinc-500 text-xs">In queue</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dot variant="error" size="sm" />
              <span className="font-medium">develop</span>
            </div>
            <span className="text-zinc-500 text-xs">Failed 1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SystemHealthExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">
          Services
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Dot variant="success" label="API Gateway" size="sm" />
            <span className="text-xs text-green-600">99.9% uptime</span>
          </div>
          <div className="flex items-center justify-between">
            <Dot variant="success" label="Database" size="sm" />
            <span className="text-xs text-green-600">100% uptime</span>
          </div>
          <div className="flex items-center justify-between">
            <Dot variant="warning" label="Cache Layer" size="sm" />
            <span className="text-xs text-orange-600">High memory usage</span>
          </div>
          <div className="flex items-center justify-between">
            <Dot variant="info" label="Background Jobs" size="sm" animated />
            <span className="text-xs text-blue-600">Processing queue</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">
          Environments
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Dot variant="success" label="Production" size="sm" />
            <span className="text-xs text-zinc-500">v2.1.0</span>
          </div>
          <div className="flex items-center justify-between">
            <Dot variant="success" label="Staging" size="sm" />
            <span className="text-xs text-zinc-500">v2.2.0-beta</span>
          </div>
          <div className="flex items-center justify-between">
            <Dot variant="default" label="Development" size="sm" />
            <span className="text-xs text-zinc-500">Pending deploy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "BasicExample",
    title: "Basic",
    description: "Basic example",
    component: BasicExample,
  },
  {
    id: "SemanticVariantsExample",
    title: "Semantic Variants",
    description: "Semantic Variants example",
    component: SemanticVariantsExample,
  },
  {
    id: "ColorVariantsExample",
    title: "Color Variants",
    description: "Color Variants example",
    component: ColorVariantsExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "WithLabelsExample",
    title: "With Labels",
    description: "Example with custom labels",
    component: WithLabelsExample,
  },
  {
    id: "WithoutLabelsExample",
    title: "Without Labels",
    description: "Without Labels example",
    component: WithoutLabelsExample,
  },
  {
    id: "AnimatedExample",
    title: "Animated",
    description: "Animated example",
    component: AnimatedExample,
  },
  {
    id: "DotExample",
    title: "Dot",
    description: "Dot example",
    component: DotExample,
  },
  {
    id: "SystemHealthExample",
    title: "System Health",
    description: "System Health example",
    component: SystemHealthExample,
  },
];
