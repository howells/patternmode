"use client";

import type { TagGroupProps } from "./types";
import * as React from "react";
import { Tag } from "../tag/component";
import { TagGroup } from "./component";

export function TagGroupPreview({
  children,
  dismissible = false,
  ...props
}: TagGroupProps) {
  const [tags, setTags] = React.useState([
    { id: 1, value: "React", category: "Frontend" },
    { id: 2, value: "TypeScript", category: "Language" },
    { id: 3, value: "Tailwind", category: "Styling" },
    { id: 4, value: "Node.js", category: "Backend" },
  ]);

  const handleDismiss = (tagId: number) => {
    setTags(currentTags => currentTags.filter(tag => tag.id !== tagId));
  };

  const handleReset = () => {
    setTags([
      { id: 1, value: "React", category: "Frontend" },
      { id: 2, value: "TypeScript", category: "Language" },
      { id: 3, value: "Tailwind", category: "Styling" },
      { id: 4, value: "Node.js", category: "Backend" },
    ]);
  };

  return (
    <div className="space-y-4">
      <TagGroup dismissible={dismissible} {...props}>
        {children || tags.map(tag => (
          <Tag
            key={tag.id}
            value={tag.value}
            dismissible={dismissible}
            onDismiss={dismissible ? () => handleDismiss(tag.id) : undefined}
          />
        ))}
      </TagGroup>

      {dismissible && tags.length < 4 && (
        <button
          onClick={handleReset}
          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Reset tags to see dismissible behavior
        </button>
      )}
    </div>
  );
}

// Preview props for prop explorer
export const tagGroupPreviewProps = [
  {
    name: "dismissible",
    type: "boolean",
    description: "Whether tags in the group can be dismissed.",
    defaultValue: false,
  },
  {
    name: "align",
    type: "select",
    description: "Horizontal alignment of tags within the container.",
    options: ["start", "center", "end", "between", "around", "evenly"],
    defaultValue: "start",
  },
  {
    name: "direction",
    type: "select",
    description: "Layout direction for the tag group.",
    options: ["row", "column"],
    defaultValue: "row",
  },
  {
    name: "gap",
    type: "select",
    description: "Gap between tags (overrides automatic spacing).",
    options: [
      { label: "Auto", value: undefined },
      { label: "0.5", value: 0.5 },
      { label: "1", value: 1 },
      { label: "1.5", value: 1.5 },
      { label: "2", value: 2 },
      { label: "2.5", value: 2.5 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
    ],
    defaultValue: 2,
  },
];
