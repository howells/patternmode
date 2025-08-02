"use client";

import type { TagInputProps } from "./tag-input";
import { Tag, TagInput } from "@patternmode/ui";

import React from "react";

// Sample structured data for preview
const defaultOptions = [
  { value: "dept-sales", label: "Sales", category: "Department" },
  { value: "dept-marketing", label: "Marketing", category: "Department" },
  { value: "dept-engineering", label: "Engineering", category: "Department" },
  { value: "loc-nyc", label: "New York", category: "Location" },
  { value: "loc-sf", label: "San Francisco", category: "Location" },
  { value: "loc-london", label: "London", category: "Location" },
  { value: "skill-react", label: "React", category: "Skill" },
  { value: "skill-typescript", label: "TypeScript", category: "Skill" },
  { value: "skill-design", label: "Design", category: "Skill" },
].map(item => ({
  value: item.value,
  label: `${item.category}: ${item.label}`,
  data: { category: item.category, name: item.label },
}));

export function TagInputExample({
  options = defaultOptions,
  placeholder = "Add tags...",
  selectedPlaceholder = "Add more...",
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  ...props
}: TagInputProps) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = React.useState<string[]>([]);

  // Determine if this is truly controlled (has both value and onValueChange that are not defaults)
  const isControlled = controlledValue !== undefined && controlledOnValueChange !== undefined;

  // Use controlled value if truly controlled, otherwise use internal state
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback((newValues: string[]) => {
    console.warn("TagInput value change:", newValues);
    if (isControlled && controlledOnValueChange) {
      controlledOnValueChange(newValues);
    }
    else {
      setInternalValue(newValues);
    }
  }, [isControlled, controlledOnValueChange]);

  console.warn("TagInput render - isControlled:", isControlled, "currentValue:", currentValue, "options:", options.length);

  return (
    <TagInput
      options={options}
      placeholder={placeholder}
      selectedPlaceholder={selectedPlaceholder}
      value={currentValue}
      onValueChange={handleValueChange}
      renderTag={(option, onRemove) => {
        // Extract category and name from the data
        const category = option.data?.category as string;
        const name = option.data?.name as string;

        return (
          <Tag
            key={option.value}
            label={category}
            value={name}
            dismissible
            onDismiss={onRemove}
          />
        );
      }}
      {...props}
    />
  );
}
