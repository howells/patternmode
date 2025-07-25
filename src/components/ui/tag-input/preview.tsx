"use client";

import { Code, MapPin, User } from "lucide-react";
import React from "react";
import { Tag } from "../tag";
import { TagInput, TagOption, useTagInput } from "./tag-input";

// Sample data for preview
const technologies: TagOption[] = [
  { value: "react", label: "React", leftIcon: Code },
  { value: "typescript", label: "TypeScript", leftIcon: Code },
  { value: "nextjs", label: "Next.js", leftIcon: Code },
  { value: "tailwind", label: "Tailwind CSS", leftIcon: Code },
  { value: "nodejs", label: "Node.js", leftIcon: Code },
];

const users: TagOption[] = [
  {
    value: "1",
    label: "John Doe",
    leftIcon: User,
    data: { email: "john@example.com" },
  },
  {
    value: "2",
    label: "Jane Smith",
    leftIcon: User,
    data: { email: "jane@example.com" },
  },
  {
    value: "3",
    label: "Bob Johnson",
    leftIcon: User,
    data: { email: "bob@example.com" },
  },
];

// TagInput examples
export function TagInputExample({
  showBasic = true,
  showWithUsers = false,
  showWithCreation = false,
  ...props
}: {
  showBasic?: boolean;
  showWithUsers?: boolean;
  showWithCreation?: boolean;
  [key: string]: unknown;
}) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "react",
    "typescript",
  ]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>(["1"]);
  const [createdTags, setCreatedTags] = React.useState<string[]>([]);

  if (showWithUsers) {
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
                .map((n) => n[0])
                .join(""),
            }}
            dismissible
            onDismiss={onRemove}
          />
        )}
        {...props}
      />
    );
  }

  if (showWithCreation) {
    return (
      <TagInput
        options={technologies}
        value={createdTags}
        onValueChange={setCreatedTags}
        placeholder="Add skills (or create new ones)..."
        allowCreate
        maxTags={3}
        validateNewTag={(value) => value.length >= 2}
        {...props}
      />
    );
  }

  return (
    <TagInput
      options={technologies}
      value={selectedTags}
      onValueChange={setSelectedTags}
      placeholder="Add technologies..."
      selectedPlaceholder="Add more technologies..."
      {...props}
    />
  );
}

// Default export for the preview system
export function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Tag Input</h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-2">Basic tag input</p>
            <TagInputExample />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With user avatars</p>
            <TagInputExample showWithUsers />
          </div>
          <div>
            <p className="text-xs text-zinc-500 mb-2">With tag creation</p>
            <TagInputExample showWithCreation />
          </div>
        </div>
      </div>
    </div>
  );
}
