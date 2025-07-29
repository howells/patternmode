"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import { DismissButton } from "@patternmode/ui";

// Basic dismiss button
export const DefaultExample = () => (
  <DismissButton onClick={() => console.log("Dismissed!")} />
);

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <DismissButton size="sm" onClick={() => console.log("Small dismissed")} />
    <DismissButton size="base" onClick={() => console.log("Base dismissed")} />
    <DismissButton size="lg" onClick={() => console.log("Large dismissed")} />
  </div>
);

// Custom icon
export const CustomIconExample = () => (
  <DismissButton
    icon={Trash2}
    onClick={() => console.log("Trashed!")}
    aria-label="Delete item"
  />
);

// Positioned in context (like in badges/tags)
export const PositionedExample = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
        Badge-like item
      </span>
      <DismissButton
        className="-ml-1"
        onClick={() => console.log("Badge dismissed")}
      />
    </div>

    <div className="flex items-center gap-2">
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 rounded-full text-sm">
        Tag-like item
      </span>
      <DismissButton
        className="-ml-1.5"
        size="sm"
        onClick={() => console.log("Tag dismissed")}
      />
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
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
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
