"use client";

import type { TagOption } from "./component";
import React from "react";
import { TagInput } from "./component";

// Sample tag options
const sampleOptions: TagOption[] = [
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "nodejs", label: "Node.js" },
  { value: "python", label: "Python" },
  { value: "design", label: "Design" },
];

export function TagInputExample() {
  const [basicTags, setBasicTags] = React.useState<string[]>([]);
  const [preselectedTags, setPreselectedTags] = React.useState<string[]>(["react", "typescript"]);
  const [createTags, setCreateTags] = React.useState<string[]>(["custom"]);

  return (
    <div className="space-y-8">
      <TagInput
        options={sampleOptions}
        value={basicTags}
        onValueChange={setBasicTags}
        placeholder="Select technologies..."
      />

      <TagInput
        options={sampleOptions}
        value={preselectedTags}
        onValueChange={setPreselectedTags}
        placeholder="Add more skills..."
        maxTags={5}
      />

      <TagInput
        options={sampleOptions}
        value={createTags}
        onValueChange={setCreateTags}
        placeholder="Type to create new tags..."
        allowCreate
      />
    </div>
  );
}
