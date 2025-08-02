"use client";

import type { ComboboxOption } from "@patternmode/ui";
import type { ComponentExample } from "../../../lib/component-config-types";

import { Combobox } from "@patternmode/ui";

import React from "react";

// Sample data
type FruitOption = {
  color: string;
} & ComboboxOption;

const fruits: FruitOption[] = [
  { id: "1", label: "Apple", value: "apple", color: "red" },
  { id: "2", label: "Banana", value: "banana", color: "yellow" },
  { id: "3", label: "Cherry", value: "cherry", color: "red" },
  { id: "4", label: "Date", value: "date", color: "brown" },
  { id: "5", label: "Elderberry", value: "elderberry", color: "purple" },
  { id: "6", label: "Fig", value: "fig", color: "purple" },
  { id: "7", label: "Grape", value: "grape", color: "green" },
  { id: "8", label: "Honeydew", value: "honeydew", color: "green" },
];

// Mock async function to simulate data fetching
async function fetchFruits({ search }: { search?: string }) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const filtered = search
    ? fruits.filter(fruit =>
        fruit.label.toLowerCase().includes(search.toLowerCase()),
      )
    : fruits;

  return {
    data: filtered,
    hasNextPage: false,
  };
}

// Real async function to fetch icons from API
async function fetchIcons({ search }: { search?: string }) {
  const params = new URLSearchParams({
    page: "0",
    limit: "20",
    ...(search && { search }),
  });

  const response = await fetch(`/api/icons?${params}`);
  const data = await response.json();

  // Transform API response to ComboboxOption format
  const options = data.icons.map((icon: { kebab: string; pascal: string }) => ({
    id: icon.kebab,
    label: icon.pascal,
    value: icon.kebab,
  }));

  return {
    data: options,
    hasNextPage: data.hasMore,
  };
}

export function DefaultExample() {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox
        options={fruits}
        value={value}
        onValueChange={setValue}
        placeholder="Choose a fruit..."
      />
    </div>
  );
}

export function AsyncExample() {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox<FruitOption>
        fetchData={fetchFruits}
        queryKey={["fruits"]}
        value={value}
        onValueChange={setValue}
        placeholder="Search fruits..."
        searchPlaceholder="Type to search..."
      />
    </div>
  );
}

export function IconsExample() {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox
        fetchData={fetchIcons}
        queryKey={["icons"]}
        value={value}
        onValueChange={setValue}
        placeholder="Search icons..."
        searchPlaceholder="Type to search icons..."
      />
    </div>
  );
}

export function CustomRenderingExample() {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox<FruitOption>
        options={fruits}
        value={value}
        onValueChange={setValue}
        placeholder="Choose a fruit..."
        renderItem={item => (
          <div className="flex items-center gap-2 py-2 px-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        )}
      />
    </div>
  );
}

export function SizesExample() {
  const [smValue, setSmValue] = React.useState<string>();
  const [baseValue, setBaseValue] = React.useState<string>();
  const [lgValue, setLgValue] = React.useState<string>();

  return (
    <div className="space-y-4">
      <div className="w-48">
        <label className="block text-xs font-medium mb-1">Small</label>
        <Combobox
          size="sm"
          options={fruits}
          value={smValue}
          onValueChange={setSmValue}
          placeholder="Small combobox"
        />
      </div>

      <div className="w-56">
        <label className="block text-sm font-medium mb-1">Base (Default)</label>
        <Combobox
          size="base"
          options={fruits}
          value={baseValue}
          onValueChange={setBaseValue}
          placeholder="Base combobox"
        />
      </div>

      <div className="w-64">
        <label className="block text-base font-medium mb-1">Large</label>
        <Combobox
          size="lg"
          options={fruits}
          value={lgValue}
          onValueChange={setLgValue}
          placeholder="Large combobox"
        />
      </div>
    </div>
  );
}

export function ErrorExample() {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox
        options={fruits}
        value={value}
        onValueChange={setValue}
        placeholder="Choose a fruit..."
        hasError={true}
      />
    </div>
  );
}

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
    id: "AsyncExample",
    title: "Async",
    description: "Async example",
    component: AsyncExample,
  },
  {
    id: "IconsExample",
    title: "Icons",
    description: "Icons example",
    component: IconsExample,
  },
  {
    id: "CustomRenderingExample",
    title: "Custom Rendering",
    description: "Custom Rendering example",
    component: CustomRenderingExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "ErrorExample",
    title: "Error",
    description: "Error example",
    component: ErrorExample,
  },
];
