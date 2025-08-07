"use client";

import type { TagOption } from "./component";
import { Code, MapPin, Palette, User } from "lucide-react";
import React from "react";
import { Icon } from "../icon/component";
import { Tag } from "../tag/component";
import { TagInput, useTagInput } from "./component";

// Sample data for examples
const technologies: TagOption[] = [
  { value: "react", label: "React", icon: Code },
  { value: "typescript", label: "TypeScript", icon: Code },
  { value: "nextjs", label: "Next.js", icon: Code },
  { value: "tailwind", label: "Tailwind CSS", icon: Palette },
  { value: "nodejs", label: "Node.js", icon: Code },
  { value: "python", label: "Python", icon: Code },
  { value: "javascript", label: "JavaScript", icon: Code },
  { value: "vue", label: "Vue.js", icon: Code },
  { value: "angular", label: "Angular", icon: Code },
  { value: "svelte", label: "Svelte", icon: Code },
];

const skills: TagOption[] = [
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend Development" },
  { value: "fullstack", label: "Full Stack Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "devops", label: "DevOps" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "data-science", label: "Data Science" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "security", label: "Cybersecurity" },
];

const users: TagOption[] = [
  {
    value: "1",
    label: "John Doe",
    icon: User,
    data: { email: "john@example.com", role: "Admin" },
  },
  {
    value: "2",
    label: "Jane Smith",
    icon: User,
    data: { email: "jane@example.com", role: "Editor" },
  },
  {
    value: "3",
    label: "Bob Johnson",
    icon: User,
    data: { email: "bob@example.com", role: "Viewer" },
  },
  {
    value: "4",
    label: "Alice Brown",
    icon: User,
    data: { email: "alice@example.com", role: "Admin" },
  },
  {
    value: "5",
    label: "Charlie Wilson",
    icon: User,
    data: { email: "charlie@example.com", role: "Editor" },
  },
];

const locations: TagOption[] = [
  { value: "nyc", label: "New York City", icon: MapPin },
  { value: "sf", label: "San Francisco", icon: MapPin },
  { value: "london", label: "London", icon: MapPin },
  { value: "tokyo", label: "Tokyo", icon: MapPin },
  { value: "berlin", label: "Berlin", icon: MapPin },
  { value: "sydney", label: "Sydney", icon: MapPin },
];

export const DefaultExample = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  return (
    <TagInput
      options={technologies}
      value={selectedTags}
      onValueChange={setSelectedTags}
      placeholder="Add technologies..."
      selectedPlaceholder="Add more technologies..."
    />
  );
};

export const WithInitialValuesExample = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "react",
    "typescript",
  ]);

  return (
    <TagInput
      options={technologies}
      value={selectedTags}
      onValueChange={setSelectedTags}
      placeholder="Add technologies..."
      selectedPlaceholder="Add more technologies..."
    />
  );
};

export const WithMaxTagsExample = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "react",
    "typescript",
  ]);

  return (
    <div className="space-y-2">
      <TagInput
        options={technologies}
        value={selectedTags}
        onValueChange={setSelectedTags}
        placeholder="Add up to 3 technologies..."
        maxTags={3}
      />
      <p className="text-sm text-zinc-600">
        Selected: {selectedTags.length}/3 tags
      </p>
    </div>
  );
};

export const WithTagCreationExample = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  return (
    <div className="space-y-2">
      <TagInput
        options={skills}
        value={selectedTags}
        onValueChange={setSelectedTags}
        placeholder="Add skills (or create new ones)..."
        allowCreate
        onValidate={value => value.length >= 2 && value.length <= 30}
        onCreate={value => ({
          value: value.toLowerCase().replace(/\s+/g, "-"),
          label: value,
        })}
      />
      <p className="text-sm text-zinc-600">
        Type to search existing skills or create new ones
      </p>
    </div>
  );
};

export const CustomTagRenderingExample = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([
    "1",
    "2",
  ]);

  return (
    <TagInput
      options={users}
      value={selectedUsers}
      onValueChange={setSelectedUsers}
      placeholder="Add team members..."
      renderTag={(option, onRemove) => (
        <Tag
          key={option.value}
          value={option.label}
          avatar={{
            initials: option.label
              .split(" ")
              .map(n => n[0])
              .join(""),
          }}
          dismissible
          onDismiss={onRemove}
          className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 ring-blue-200 dark:ring-blue-800"
        />
      )}
      renderItem={(option, isHighlighted, isSelected) => (
        <div
          className={`
          flex items-center gap-3 p-2
          ${isHighlighted ? "bg-zinc-100 dark:bg-zinc-800" : ""}
          ${isSelected ? "font-medium" : ""}
        `}
        >
          {option.icon && <Icon icon={option.icon} />}
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

export const DisabledExample = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "react",
    "typescript",
  ]);

  return (
    <TagInput
      options={technologies}
      value={selectedTags}
      onValueChange={setSelectedTags}
      placeholder="This input is disabled..."
      disabled
    />
  );
};

export const WithHookExample = () => {
  const tagInput = useTagInput(["frontend", "react"]);

  return (
    <div className="space-y-4">
      <TagInput
        options={skills}
        value={tagInput.values}
        onValueChange={tagInput.setValues}
        placeholder="Add your skills..."
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => tagInput.addTag("javascript")}
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
          disabled={tagInput.hasTag("javascript")}
        >
          + JavaScript
        </button>
        <button
          type="button"
          onClick={() => tagInput.addTag("python"))
          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
          disabled={tagInput.hasTag("python")}
        >
          + Python
        </button>
        <button
          type="button"
          onClick={tagInput.clearTags}
          className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200"
          disabled={tagInput.count === 0}
        >
          Clear All ({tagInput.count})
        </button>
      </div>
    </div>
  );
};

export const ComplexExample = () => {
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([
    "nyc",
  ]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Preferred Locations</label>
        <TagInput
          options={locations}
          value={selectedLocations}
          onValueChange={setSelectedLocations}
          placeholder="Add locations..."
          selectedPlaceholder="Add more locations..."
          allowCreate
          maxTags={4}
          onValidate={value => value.length >= 2}
          onCreate={value => ({
            value: value.toLowerCase().replace(/\s+/g, "-"),
            label: value,
            icon: MapPin,
          })}
          className="max-w-md"
        />
        <p className="text-xs text-zinc-500">
          Select from existing locations or create new ones (max 4)
        </p>
      </div>

      <div className="text-sm">
        <strong>Selected:</strong>{" "}
        {selectedLocations.length > 0 ? selectedLocations.join(", ") : "None"}
      </div>
    </div>
  );
};
