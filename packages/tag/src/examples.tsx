"use client";

import { useState } from "react";
import { Tag } from ".";

export const DefaultExample = () => (
  <div className="flex flex-wrap gap-2">
    <Tag value="Design" />
    <Tag value="Development" />
    <Tag value="Marketing" />
  </div>
);

export const DismissibleExample = () => {
  const [tags, setTags] = useState([
    { id: 1, value: "React" },
    { id: 2, value: "TypeScript" },
    { id: 3, value: "Tailwind" },
  ]);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          dismissible
          key={tag.id}
          onDismiss={() => setTags((t) => t.filter((x) => x.id !== tag.id))}
          value={tag.value}
        />
      ))}
    </div>
  );
};

export const WithLabelsExample = () => (
  <div className="flex gap-2">
    <Tag label="Department" value="Engineering" />
    <Tag label="Location" value="San Francisco" />
    <Tag label="Team" value="Frontend" />
  </div>
);

export const TagsWithCountExample = () => (
  <div className="flex gap-2">
    <Tag count={42} value="JavaScript" />
    <Tag count={28} value="Python" />
    <Tag count={15} value="Go" />
  </div>
);
