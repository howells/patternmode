"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./component";

export const DefaultExample = () => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue>Select a fruit...</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
    </SelectContent>
  </Select>
);

export const WithGroupsExample = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue>Select a timezone...</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectGroupLabel>North America</SelectGroupLabel>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectGroupLabel>Europe & Africa</SelectGroupLabel>
        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
        <SelectItem value="cet">Central European Time (CET)</SelectItem>
        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const MultipleSelectionExample = () => {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <div className="space-y-4">
      <Select
        multiple
        onValueChange={(v: unknown) => setValues(v as string[])}
        value={values}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue>Select multiple fruits...</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="strawberry">Strawberry</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectContent>
      </Select>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Selected: {values.length > 0 ? values.join(", ") : "None"}
      </div>
    </div>
  );
};

export const ControlledExample = () => {
  const [value, setValue] = React.useState<string>("apple");
  return (
    <div className="space-y-4">
      <Select onValueChange={(v: unknown) => setValue(String(v))} value={value}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <button
          className="rounded bg-blue-100 px-3 py-1 text-sm hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
          onClick={() => setValue("banana")}
          type="button"
        >
          Set to Banana
        </button>
        <button
          className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          onClick={() => setValue("")}
          type="button"
        >
          Clear
        </button>
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Current value: {value || "None"}
      </div>
    </div>
  );
};

export const ObjectValuesExample = () => {
  type User = { id: string; name: string; email: string; role: string };
  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  ];
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  return (
    <div className="space-y-4">
      <Select
        onValueChange={(value) =>
          setSelectedUser(users.find((u) => u.id === value) || null)
        }
        value={selectedUser?.id || ""}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue>Select a user...</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-zinc-500">
                  {user.email} • {user.role}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedUser && (
        <div className="rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-900">
          <div>
            <strong>Selected User:</strong>
          </div>
          <div>Name: {selectedUser.name}</div>
          <div>Email: {selectedUser.email}</div>
          <div>Role: {selectedUser.role}</div>
        </div>
      )}
    </div>
  );
};

export const CustomRenderValueExample = () => {
  type Option = { value: string; label: string; color: string };
  const options: Option[] = [
    { value: "red", label: "Red", color: "#ef4444" },
    { value: "blue", label: "Blue", color: "#3b82f6" },
    { value: "green", label: "Green", color: "#10b981" },
    { value: "purple", label: "Purple", color: "#8b5cf6" },
  ];
  const [selectedValue, setSelectedValue] = React.useState<string>("");
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  return (
    <Select
      onValueChange={(v: unknown) => setSelectedValue(String(v))}
      value={selectedValue}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue>
          {selectedOption ? (
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: selectedOption.color }}
              />
              {selectedOption.label}
            </div>
          ) : (
            "Select a color..."
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: opt.color }}
              />
              {opt.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const ErrorStateExample = () => (
  <Select>
    <SelectTrigger className="w-[200px]" hasError>
      <SelectValue>Select a fruit...</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
    </SelectContent>
  </Select>
);

export const DisabledExample = () => (
  <Select disabled>
    <SelectTrigger className="w-[200px]">
      <SelectValue>Disabled Select</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="a">A</SelectItem>
    </SelectContent>
  </Select>
);

export const SmallSizeExample = () => (
  <Select>
    <SelectTrigger className="w-[160px]" size="sm">
      <SelectValue>Small size</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="a">A</SelectItem>
    </SelectContent>
  </Select>
);

export const FormIntegrationExample = () => (
  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue>Pick one</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
        <SelectItem value="b">B</SelectItem>
      </SelectContent>
    </Select>
    <button
      className="rounded bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800"
      type="submit"
    >
      Submit
    </button>
  </form>
);
