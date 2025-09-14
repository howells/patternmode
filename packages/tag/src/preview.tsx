"use client";

import type { TagProps } from ".";
import { Tag } from ".";

export function TagPreview(props: TagProps) {
  return <Tag {...props} value={props.value || "Example"} />;
}

export const tagPreviewProps = [
  {
    name: "label",
    type: "string",
    description: "Optional label",
    defaultValue: "",
  },
  {
    name: "value",
    type: "string",
    description: "Tag value",
    defaultValue: "Example",
  },
  {
    name: "count",
    type: "string",
    description: "Optional count",
    defaultValue: "",
  },
  {
    name: "dismissible",
    type: "boolean",
    description: "Show dismiss button",
    defaultValue: false,
  },
];
