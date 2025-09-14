"use client";

import { SearchField } from ".";

const sampleItems = [
  {
    id: "1",
    label: "Button",
    description: "Interactive button element",
    category: "inputs",
  },
  {
    id: "2",
    label: "Input",
    description: "Text input field",
    category: "inputs",
  },
  {
    id: "3",
    label: "Card",
    description: "Container for content",
    category: "layout",
  },
  {
    id: "4",
    label: "Stack",
    description: "Layout container",
    category: "layout",
  },
  {
    id: "5",
    label: "Text",
    description: "Text display component",
    category: "content",
  },
];

/**
 * Default SearchField example.
 */
export function DefaultExample() {
  return <SearchField placeholder="Search..." />;
}

/**
 * SearchField with items example.
 */
export function WithItemsExample() {
  return (
    <SearchField
      items={sampleItems}
      onItemSelect={(_item) => {
        /* noop */
      }}
      placeholder="Search components..."
    />
  );
}

/**
 * SearchField with grouped items example.
 */
export function GroupedExample() {
  return (
    <SearchField
      groupByCategory={true}
      items={sampleItems}
      onItemSelect={(_item) => {
        /* noop */
      }}
      placeholder="Search components..."
    />
  );
}
