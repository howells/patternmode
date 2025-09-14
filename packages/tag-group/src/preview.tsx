"use client";

import { Tag } from "@patternmode/tag";
import { TagGroup } from ".";
import type { TagGroupProps } from "./types";

export function TagGroupPreview(props: TagGroupProps) {
  return (
    <TagGroup {...props}>
      <Tag value="Tag One" />
      <Tag value="Tag Two" />
      <Tag value="Tag Three" />
    </TagGroup>
  );
}

export const tagGroupPreviewProps = [
  {
    name: "direction",
    type: "select",
    options: ["row", "column"],
    defaultValue: "row",
  },
  {
    name: "justify",
    type: "select",
    options: ["start", "center", "end", "between", "around", "evenly"],
    defaultValue: "start",
  },
];
