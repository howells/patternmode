"use client";

import { useState } from "react";
import type { SearchFieldProps } from ".";
import { SearchField } from ".";

const sampleItems = [
  {
    id: "1",
    label: "Button",
    description: "Interactive button element",
    category: "Controls",
  },
  {
    id: "2",
    label: "Input",
    description: "Text input field",
    category: "Forms",
  },
  {
    id: "3",
    label: "Card",
    description: "Container for content",
    category: "Layout",
  },
  {
    id: "4",
    label: "Badge",
    description: "Small status indicator",
    category: "Display",
  },
  {
    id: "5",
    label: "Avatar",
    description: "User profile image",
    category: "Display",
  },
  {
    id: "6",
    label: "Dropdown",
    description: "Collapsible menu",
    category: "Controls",
  },
  {
    id: "7",
    label: "Modal",
    description: "Overlay dialog",
    category: "Overlay",
  },
  {
    id: "8",
    label: "Toast",
    description: "Notification message",
    category: "Feedback",
  },
];

export function SearchFieldPreview({
  items = sampleItems,
  placeholder = "Search components...",
  ...props
}: SearchFieldProps) {
  const [value, setValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemSelect = (item: { label: string }) => {
    setSelectedItem(item.label);
    setValue("");
    const RESET_DELAY_MS = 2000;
    setTimeout(() => setSelectedItem(null), RESET_DELAY_MS);
  };

  return (
    <div className="space-y-2">
      <SearchField
        items={items}
        onItemSelect={handleItemSelect}
        onValueChange={setValue}
        placeholder={placeholder}
        value={value}
        {...props}
      />
      {selectedItem && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Selected: {selectedItem}
        </div>
      )}
    </div>
  );
}

// Preview props configuration for the component explorer
export const searchFieldPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    defaultValue: "Search components...",
    description: "Placeholder text shown when the input is empty",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: false,
    description: "Whether the search field is disabled",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: false,
    description: "Whether to show loading state",
  },
  {
    name: "autoFocus",
    type: "boolean",
    defaultValue: false,
    description: "Whether to automatically focus the input on mount",
  },
  {
    name: "groupByCategory",
    type: "boolean",
    defaultValue: false,
    description: "Whether to group results by category",
  },
  {
    name: "showClearButton",
    type: "boolean",
    defaultValue: true,
    description: "Whether to show the clear button when there's text",
  },
  {
    name: "maxResults",
    type: "number",
    defaultValue: undefined,
    description: "Maximum number of results to show",
  },
  {
    name: "emptyStateTitle",
    type: "string",
    defaultValue: "No results found",
    description: "Title shown when no results match the search",
  },
  {
    name: "emptyStateDescription",
    type: "string",
    defaultValue: "",
    description: "Description shown when no results match the search",
  },
];
