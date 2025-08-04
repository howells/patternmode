"use client";

import * as React from "react";
import { Tag } from "../tag/component";
import { TagGroup } from "./component";

export const TagGroupPreview = () => {
  const [tags, setTags] = React.useState([
    { id: 1, value: "React" },
    { id: 2, value: "TypeScript" },
    { id: 3, value: "Tailwind" },
  ]);

  const handleDismiss = (tagId: number) => {
    setTags(tags => tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="p-6">
      <TagGroup dismissible>
        {tags.map(tag => (
          <Tag
            key={tag.id}
            value={tag.value}
            onDismiss={() => handleDismiss(tag.id)}
          />
        ))}
      </TagGroup>
    </div>
  );
};

// Preview props for prop explorer
export const tagGroupPreviewProps = [
  {
    name: "dismissible",
    type: "boolean",
    description: "Whether tags in the group can be dismissed.",
    defaultValue: false,
  },
  {
    name: "size",
    type: "select",
    description: "Size variant for all tags in the group.",
    options: ["sm", "base", "lg"],
    defaultValue: "base",
  },
];
