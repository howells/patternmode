"use client";

import { Code, Palette, User } from "lucide-react";
import React from "react";
import { Combobox, ComboboxOption, useComboboxState } from "./combobox";

// Sample data for preview
const languages: ComboboxOption[] = [
  { value: "js", label: "JavaScript", leftIcon: Code },
  { value: "ts", label: "TypeScript", leftIcon: Code },
  { value: "py", label: "Python", leftIcon: Code },
  { value: "go", label: "Go", leftIcon: Code },
  { value: "rust", label: "Rust", leftIcon: Code },
];

const users: ComboboxOption[] = [
  {
    value: "1",
    label: "John Doe",
    leftIcon: User,
    data: { email: "john@example.com", role: "Admin" },
  },
  {
    value: "2",
    label: "Jane Smith",
    leftIcon: User,
    data: { email: "jane@example.com", role: "Editor" },
  },
  {
    value: "3",
    label: "Bob Johnson",
    leftIcon: User,
    data: { email: "bob@example.com", role: "Viewer" },
  },
];

// Example component for preview system
export const ComboboxExample = ({
  showAsync = false,
  showCustomRender = false,
  showClearable = false,
  ...props
}: {
  showAsync?: boolean;
  showCustomRender?: boolean;
  showClearable?: boolean;
  [key: string]: unknown;
}) => {
  const [value, setValue] = React.useState("");

  // Async example
  if (showAsync) {
    const fetchUsers = async ({ pageParam = 0, search = "" }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const filteredUsers = users.filter(
        (user) =>
          user.label.toLowerCase().includes(search.toLowerCase()) ||
          (user.data?.email as string)
            .toLowerCase()
            .includes(search.toLowerCase())
      );

      return {
        items: filteredUsers,
        totalCount: filteredUsers.length,
        hasMore: false,
      };
    };

    return (
      <Combobox
        queryKey={["preview-users"]}
        fetchData={fetchUsers}
        value={value}
        onValueChange={(newValue) => setValue(newValue || "")}
        placeholder="Search users..."
        searchPlaceholder="Type to search users..."
        {...props}
      />
    );
  }

  // Custom render example
  if (showCustomRender) {
    return (
      <Combobox
        options={users}
        value={value}
        onValueChange={(newValue) => setValue(newValue || "")}
        placeholder="Select a user..."
        renderTrigger={(selectedOption) => {
          if (!selectedOption) return null;

          return (
            <div className="flex items-center gap-2">
              {selectedOption.leftIcon && (
                <selectedOption.leftIcon className="size-4" />
              )}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {selectedOption.label}
                </span>
                <span className="text-xs text-zinc-500">
                  {selectedOption.data?.email as string}
                </span>
              </div>
            </div>
          );
        }}
        renderItem={(option, isHighlighted, isSelected) => (
          <div
            className={`
            flex items-center gap-3 p-2
            ${isHighlighted ? "bg-zinc-100 dark:bg-zinc-800" : ""}
            ${isSelected ? "font-medium" : ""}
          `}
          >
            {option.leftIcon && <option.leftIcon className="size-4" />}
            <div className="flex flex-col">
              <span className="text-sm">{option.label}</span>
              <span className="text-xs text-zinc-500">
                {option.data?.email as string} • {option.data?.role as string}
              </span>
            </div>
          </div>
        )}
        {...props}
      />
    );
  }

  // Default example with optional clearable
  return (
    <Combobox
      options={languages}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Select a programming language..."
      searchPlaceholder="Search languages..."
      clearable={showClearable}
      {...props}
    />
  );
};

// Default export for the preview system
export function Example() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Combobox</h3>
        <ComboboxExample />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Clear Button</h3>
        <ComboboxExample showClearable />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Rendering</h3>
        <ComboboxExample showCustomRender />
      </div>
    </div>
  );
}
