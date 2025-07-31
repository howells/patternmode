"use client";

import type { TagOption } from "@patternmode/ui";
import { Icon, Tag, TagInput, useTagInput } from "@patternmode/ui";
import { Code, MapPin, Palette, User } from "lucide-react";
import React from "react";

// Sample data for examples
const technologies: TagOption[] = [
  { value: "react", label: "React", leftIcon: Code },
  { value: "typescript", label: "TypeScript", leftIcon: Code },
  { value: "nextjs", label: "Next.js", leftIcon: Code },
  { value: "tailwind", label: "Tailwind CSS", leftIcon: Palette },
  { value: "nodejs", label: "Node.js", leftIcon: Code },
  { value: "python", label: "Python", leftIcon: Code },
  { value: "javascript", label: "JavaScript", leftIcon: Code },
  { value: "vue", label: "Vue.js", leftIcon: Code },
  { value: "angular", label: "Angular", leftIcon: Code },
  { value: "svelte", label: "Svelte", leftIcon: Code },
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
  {
    value: "5",
    label: "Charlie Wilson",
    leftIcon: User,
    data: { email: "charlie@example.com", role: "Editor" },
  },
];

const locations: TagOption[] = [
  { value: "nyc", label: "New York City", leftIcon: MapPin },
  { value: "sf", label: "San Francisco", leftIcon: MapPin },
  { value: "london", label: "London", leftIcon: MapPin },
  { value: "tokyo", label: "Tokyo", leftIcon: MapPin },
  { value: "berlin", label: "Berlin", leftIcon: MapPin },
  { value: "sydney", label: "Sydney", leftIcon: MapPin },
];

// Basic tag input
export const /**
              *
              */
  DefaultExample = () => {
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

// With initial values
export const /**
              *
              */
  WithInitialValuesExample = () => {
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

// With max tags limit
export const /**
              *
              */
  WithMaxTagsExample = () => {
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
          Selected:
          {" "}
          {selectedTags.length}
          /3 tags
        </p>
      </div>
    );
  };

// With tag creation
export const /**
              *
              */
  WithTagCreationExample = () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    return (
      <div className="space-y-2">
        <TagInput
          options={skills}
          value={selectedTags}
          onValueChange={setSelectedTags}
          placeholder="Add skills (or create new ones)..."
          allowCreate
          validateNewTag={value => value.length >= 2 && value.length <= 30}
        />
        <p className="text-sm text-zinc-600">
          Type to search existing skills or create new ones
        </p>
      </div>
    );
  };

// Custom tag rendering
export const /**
              *
              */
  CustomTagRenderingExample = () => {
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
            {option.leftIcon && <Icon icon={option.leftIcon} />}
            <div className="flex flex-col">
              <span className="text-sm">{option.label}</span>
              <span className="text-xs text-zinc-500">
                {option.data?.email as string}
                {" "}
                •
                {option.data?.role as string}
              </span>
            </div>
          </div>
        )}
      />
    );
  };

// Disabled state
export const /**
              *
              */
  DisabledExample = () => {
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

// Using the hook
export const /**
              *
              */
  WithHookExample = () => {
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
            onClick={() => tagInput.addTag("javascript")}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
            disabled={tagInput.hasTag("javascript")}
          >
            + JavaScript
          </button>
          <button
            onClick={() => tagInput.addTag("python")}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
            disabled={tagInput.hasTag("python")}
          >
            + Python
          </button>
          <button
            onClick={tagInput.clearTags}
            className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200"
            disabled={tagInput.count === 0}
          >
            Clear All (
            {tagInput.count}
            )
          </button>
        </div>
      </div>
    );
  };

// Complex example with multiple features
export const /**
              *
              */
  ComplexExample = () => {
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
            validateNewTag={value => value.length >= 2}
            createNewTag={value => ({
              value: value.toLowerCase().replace(/\s+/g, "-"),
              label: value,
              leftIcon: MapPin,
            })}
            className="max-w-md"
          />
          <p className="text-xs text-zinc-500">
            Select from existing locations or create new ones (max 4)
          </p>
        </div>

        <div className="text-sm">
          <strong>Selected:</strong>
          {" "}
          {selectedLocations.length > 0 ? selectedLocations.join(", ") : "None"}
        </div>
      </div>
    );
  };

// Real-world blog post example
export const /**
              *
              */
  BlogPostTagsExample = () => {
    const [tags, setTags] = React.useState<string[]>(["react", "tutorial"]);

    const blogTags: TagOption[] = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "tutorial", label: "Tutorial" },
      { value: "beginner", label: "Beginner" },
      { value: "advanced", label: "Advanced" },
      { value: "tips", label: "Tips & Tricks" },
      { value: "best-practices", label: "Best Practices" },
      { value: "performance", label: "Performance" },
      { value: "testing", label: "Testing" },
    ];

    return (
      <div className="space-y-4 max-w-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium">Blog Post Tags</label>
          <TagInput
            options={blogTags}
            value={tags}
            onValueChange={setTags}
            placeholder="Add tags to help readers find your post..."
            selectedPlaceholder="Add more tags..."
            allowCreate
            maxTags={6}
            validateNewTag={value => value.length >= 2 && value.length <= 20}
          />
          <p className="text-xs text-zinc-500">
            Choose relevant tags or create new ones to categorize your post
          </p>
        </div>

        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => {
              const option = blogTags.find(opt => opt.value === tag) || {
                value: tag,
                label: tag,
              };
              return (
                <Tag
                  key={tag}
                  value={option.label}
                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };
