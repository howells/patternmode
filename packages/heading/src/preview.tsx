"use client";

import type { HeadingProps } from ".";
import { Heading } from ".";

const MIN_HEADING_LEVEL = 1;
const MAX_HEADING_LEVEL = 6;
const HEADING_LEVELS = Array.from(
  { length: MAX_HEADING_LEVEL - MIN_HEADING_LEVEL + 1 },
  (_, i) => i + MIN_HEADING_LEVEL
) as readonly number[];

export function HeadingPreview(props: HeadingProps) {
  return <Heading {...props}>{props.children || "Heading"}</Heading>;
}

export const headingPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Heading text content.",
    defaultValue: "Heading",
  },
  {
    name: "level",
    type: "select",
    description: "HTML heading level (h1-h6).",
    options: [...HEADING_LEVELS],
    defaultValue: 1,
  },
];
