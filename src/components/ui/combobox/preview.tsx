import React from "react";
import { Combobox } from "@patternmode/ui";

// Sample data for preview
const fruits = [
  { id: "1", label: "Apple", value: "apple" },
  { id: "2", label: "Banana", value: "banana" },
  { id: "3", label: "Cherry", value: "cherry" },
  { id: "4", label: "Date", value: "date" },
  { id: "5", label: "Elderberry", value: "elderberry" },
  { id: "6", label: "Fig", value: "fig" },
  { id: "7", label: "Grape", value: "grape" },
];

// Example component for preview system
export const ComboboxExample = ({
  size = "base",
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  hasError = false,
  searchDebounce = 300,
  clearSearchOnSelect = true,
  ...props
}: {
  size?: "sm" | "base" | "lg";
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  hasError?: boolean;
  searchDebounce?: number;
  clearSearchOnSelect?: boolean;
  [key: string]: unknown;
}) => {
  const [value, setValue] = React.useState<string>();

  return (
    <div className="w-64">
      <Combobox
        options={fruits}
        value={value}
        onValueChange={setValue}
        size={size}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        disabled={disabled}
        hasError={hasError}
        searchDebounce={searchDebounce}
        clearSearchOnSelect={clearSearchOnSelect}
        {...props}
      />
    </div>
  );
};