"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { DismissButton, iconRegistry } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Trash2 } = iconRegistry;

// Basic dismiss button
export const DefaultExample = () => <DismissButton onClick={() => {}} />;

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <DismissButton size="sm" onClick={() => {}} />
    <DismissButton size="base" onClick={() => {}} />
    <DismissButton size="lg" onClick={() => {}} />
  </div>
);

// Custom icon
export const CustomIconExample = () => (
  <DismissButton icon={Trash2} onClick={() => {}} aria-label="Delete item" />
);

// Positioned in context (like in badges/tags)
export const PositionedExample = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
        Badge-like item
      </span>
      <DismissButton className="-ml-1" onClick={() => {}} />
    </div>

    <div className="flex items-center gap-2">
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 rounded-full text-sm">
        Tag-like item
      </span>
      <DismissButton className="-ml-1.5" size="sm" onClick={() => {}} />
    </div>
  </div>
);

// Interactive example with state
export const InteractiveExample = () => {
  const [items, setItems] = React.useState([
    { id: 1, label: "Item 1" },
    { id: 2, label: "Item 2" },
    { id: 3, label: "Item 3" },
  ]);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
            {item.label}
          </span>
          <DismissButton
            className="-ml-1"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.label}`}
          />
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          All items removed! Refresh to reset.
        </p>
      )}
    </div>
  );
};
export const DismissButtonExample = DefaultExample;

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
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "CustomIconExample",
    title: "Custom Icon",
    description: "Custom Icon example",
    component: CustomIconExample,
  },
  {
    id: "PositionedExample",
    title: "Positioned",
    description: "Positioned example",
    component: PositionedExample,
  },
  {
    id: "InteractiveExample",
    title: "Interactive",
    description: "Interactive example",
    component: InteractiveExample,
  },
  {
    id: "DismissButtonExample",
    title: "Dismiss Button",
    description: "Dismiss Button example",
    component: DismissButtonExample,
  },
];
