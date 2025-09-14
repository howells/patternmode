"use client";

import type { HeadingElementProps } from ".";
import { HeadingElement } from ".";

const MIN_HEADING_LEVEL = 1;
const MAX_HEADING_LEVEL = 6;
const HEADING_LEVELS = Array.from(
  { length: MAX_HEADING_LEVEL - MIN_HEADING_LEVEL + 1 },
  (_, i) => i + MIN_HEADING_LEVEL
) as readonly number[];

export function HeadingElementPreview(props: HeadingElementProps) {
  return (
    <HeadingElement level={2} {...props}>
      {props.children || "Sample Heading"}
    </HeadingElement>
  );
}

// Preview props for prop explorer
export const headingElementPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Heading text content.",
    defaultValue: "Sample Heading",
  },
  {
    name: "level",
    type: "select",
    description:
      "Heading level determining which HTML element to render (h1-h6).",
    defaultValue: 2,
    options: [...HEADING_LEVELS],
  },
];
