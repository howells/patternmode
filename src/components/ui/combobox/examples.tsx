"use client";

import { Code, Globe, Palette, Settings, User } from "lucide-react";
import React from "react";
import { Combobox, ComboboxOption, useComboboxState } from "./combobox";

// Sample data for examples
const fruits: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const languages: ComboboxOption[] = [
  { value: "js", label: "JavaScript", leftIcon: Code },
  { value: "ts", label: "TypeScript", leftIcon: Code },
  { value: "py", label: "Python", leftIcon: Code },
  { value: "go", label: "Go", leftIcon: Code },
  { value: "rust", label: "Rust", leftIcon: Code },
  { value: "java", label: "Java", leftIcon: Code },
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
  {
    value: "4",
    label: "Alice Brown",
    leftIcon: User,
    data: { email: "alice@example.com", role: "Admin" },
  },
];

const themes: ComboboxOption[] = [
  { value: "light", label: "Light Theme", leftIcon: Palette },
  { value: "dark", label: "Dark Theme", leftIcon: Palette },
  { value: "auto", label: "Auto Theme", leftIcon: Settings },
];

// Basic example
export const DefaultExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <Combobox
      options={fruits}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Select a fruit..."
      searchPlaceholder="Search fruits..."
    />
  );
};

// With icons and custom styling
export const WithIconsExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <Combobox
      options={languages}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Select a programming language..."
      searchPlaceholder="Search languages..."
    />
  );
};

// Clearable combobox
export const ClearableExample = () => {
  const [value, setValue] = React.useState("apple");

  return (
    <Combobox
      options={fruits}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Select a fruit..."
      clearable
    />
  );
};

// Custom rendering
export const CustomRenderExample = () => {
  const [value, setValue] = React.useState("");

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
          flex items-center gap-3 p-3
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
    />
  );
};

// Non-searchable combobox
export const NonSearchableExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <Combobox
      options={themes}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Select a theme..."
      searchable={false}
    />
  );
};

// Using the hook for state management
export const WithHookExample = () => {
  const combobox = useComboboxState("", fruits);

  return (
    <div className="space-y-2">
      <Combobox
        options={fruits}
        value={combobox.value}
        onValueChange={combobox.setValue}
        placeholder="Select a fruit..."
      />
      <div className="text-sm text-zinc-600">
        Selected: {combobox.selectedOption?.label || "None"}
        {combobox.selectedOption && (
          <button
            onClick={combobox.clear}
            className="ml-2 text-blue-600 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

// Async example with simulated API
export const AsyncExample = () => {
  const [value, setValue] = React.useState("");

  // Simulate an API call
  const fetchUsers = async ({ pageParam = 0, search = "" }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter users based on search
    const filteredUsers = users.filter(
      (user) =>
        user.label.toLowerCase().includes(search.toLowerCase()) ||
        (user.data?.email as string)
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    // Simulate pagination
    const pageSize = 3;
    const start = pageParam * pageSize;
    const end = start + pageSize;
    const pageUsers = filteredUsers.slice(start, end);

    return {
      items: pageUsers,
      totalCount: filteredUsers.length,
      hasMore: end < filteredUsers.length,
      nextPage: end < filteredUsers.length ? pageParam + 1 : undefined,
    };
  };

  return (
    <Combobox
      queryKey={["users"]}
      fetchData={fetchUsers}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Search users..."
      searchPlaceholder="Type to search users..."
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
              {option.data?.email as string}
            </span>
          </div>
        </div>
      )}
    />
  );
};

// Large dataset example with infinite scroll
export const InfiniteScrollExample = () => {
  const [value, setValue] = React.useState("");

  // Simulate a large dataset
  const generateUsers = (page: number, search: string) => {
    const pageSize = 20;
    const totalUsers = 1000;

    const users = Array.from({ length: pageSize }, (_, i) => {
      const id = page * pageSize + i + 1;
      return {
        value: id.toString(),
        label: `User ${id}`,
        leftIcon: User,
        data: {
          email: `user${id}@example.com`,
          role: ["Admin", "Editor", "Viewer"][id % 3],
        },
      };
    }).filter(
      (user) =>
        search === "" ||
        user.label.toLowerCase().includes(search.toLowerCase()) ||
        user.data.email.toLowerCase().includes(search.toLowerCase())
    );

    return {
      items: users,
      totalCount: totalUsers,
      hasMore: (page + 1) * pageSize < totalUsers,
      nextPage: (page + 1) * pageSize < totalUsers ? page + 1 : undefined,
    };
  };

  const fetchLargeDataset = async ({ pageParam = 0, search = "" }) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateUsers(pageParam, search);
  };

  return (
    <Combobox
      queryKey={["large-users"]}
      fetchData={fetchLargeDataset}
      value={value}
      onValueChange={(newValue) => setValue(newValue || "")}
      placeholder="Search from 1000+ users..."
      searchPlaceholder="Type to search users..."
      maxHeight={400}
    />
  );
};
