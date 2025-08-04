"use client";

import * as React from "react";
import { Tag } from "../tag/component";
import { TagGroup } from "./component";

export const Preview = () => {
  const [tags, setTags] = React.useState([
    { id: 1, value: "React" },
    { id: 2, value: "TypeScript" },
    { id: 3, value: "Tailwind" },
  ]);

  const handleDismiss = (tagId: number) => {
    setTags(tags => tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Basic Tag Group</h3>
        <TagGroup>
          <Tag value="Design" />
          <Tag value="Development" />
          <Tag value="Marketing" />
        </TagGroup>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Dismissible Tags</h3>
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

      <div>
        <h3 className="text-sm font-medium mb-3">Labeled Tags</h3>
        <TagGroup>
          <Tag label="Team" value="Frontend" />
          <Tag label="Location" value="SF" />
          <Tag label="Status" value="Active" />
        </TagGroup>
      </div>
    </div>
  );
};