"use client";

import type { TagInputProps } from "./component";
import React from "react";
import { TagInput } from "./component";

export function TagInputExample(props: TagInputProps) {
  const options = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "nextjs", label: "Next.js" },
  ];

  return (
    <TagInput
      options={options}
      placeholder="Add tags..."
      value={["react", "typescript"]}
      {...props}
    />
  );
}
