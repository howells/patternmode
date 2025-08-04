"use client";

import * as React from "react";
import { Tag } from "../tag/component";
import { TagGroup } from "./component";

export const TagGroupExample = () => {
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
