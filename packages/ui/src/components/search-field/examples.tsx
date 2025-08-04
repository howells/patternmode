"use client";

import React from "react";
import { SearchField } from "./component";

const sampleItems = [
  { id: "1", label: "Button", description: "Interactive button element", category: "inputs" },
  { id: "2", label: "Input", description: "Text input field", category: "inputs" },
  { id: "3", label: "Card", description: "Container for content", category: "layout" },
  { id: "4", label: "Stack", description: "Layout container", category: "layout" },
  { id: "5", label: "Text", description: "Text display component", category: "content" },
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
      placeholder="Search components..."
      items={sampleItems}
      onItemSelect={item => console.log("Selected:", item)}
    />
  );
}

/**
 * SearchField with grouped items example.
 */
export function GroupedExample() {
  return (
    <SearchField
      placeholder="Search components..."
      items={sampleItems}
      groupByCategory={true}
      onItemSelect={item => console.log("Selected:", item)}
    />
  );
}

/**
 * Controlled SearchField example.
 */
export function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <SearchField
      placeholder="Controlled search..."
      value={value}
      onValueChange={setValue}
      items={sampleItems.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      )}
      onItemSelect={(item) => {
        setValue(item.label);
        console.log("Selected:", item);
      }}
    />
  );
}
