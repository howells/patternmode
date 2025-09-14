"use client";

import type { SubheadingProps } from ".";
import { Subheading } from ".";

const MIN_HEADING_LEVEL = 1;
const MAX_HEADING_LEVEL = 6;
const HEADING_LEVELS = Array.from(
  { length: MAX_HEADING_LEVEL - MIN_HEADING_LEVEL + 1 },
  (_, i) => i + MIN_HEADING_LEVEL
) as readonly number[];

export function SubheadingPreview(props: SubheadingProps) {
  return (
    <Subheading {...props}>{props.children || "Section Subheading"}</Subheading>
  );
}

export const subheadingPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Text content of the subheading.",
    defaultValue: "Section Subheading",
  },
  {
    name: "level",
    type: "select",
    description:
      "Heading level determining which HTML element to render (h1-h6).",
    options: [...HEADING_LEVELS],
    defaultValue: 2,
  },
];
