"use client";

import React from "react";
import { RadioCard } from "./components/radio-card";
import { RadioCards } from "./components/radio-cards";

type Props = {
  orientation?: "vertical" | "horizontal";
  defaultValue?: string;
};

// Minimal, straightforward preview: three simple options
export function RadioCardsPreview({
  orientation = "vertical",
  defaultValue = "pro",
}: Props = {}) {
  const items = [
    { value: "basic", label: "Basic" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise" },
  ];

  const layoutClass =
    orientation === "horizontal"
      ? "grid grid-cols-1 md:grid-cols-3 gap-2 w-full"
      : "space-y-2 w-full";

  const [value, setValue] = React.useState<string>(defaultValue);

  return (
    <RadioCards
      className={layoutClass}
      onValueChange={(v) => setValue(String(v))}
      value={value}
    >
      {items.map((item) => (
        <RadioCard key={item.value} value={item.value}>
          <div className="font-medium text-sm text-zinc-900 dark:text-zinc-50">
            {item.label}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose the {item.label.toLowerCase()} option
          </div>
        </RadioCard>
      ))}
    </RadioCards>
  );
}

export const radioCardsPreviewProps = [
  {
    name: "orientation",
    type: "select",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
  },
  {
    name: "defaultValue",
    type: "select",
    options: ["basic", "pro", "enterprise"],
    defaultValue: "pro",
  },
];
