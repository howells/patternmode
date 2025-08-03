"use client";

import type { HeadingProps } from "./component";
import React from "react";
import { Heading } from "./component";

export function HeadingExample(props: HeadingProps) {
  return (
    <Heading level={1} {...props}>
      {props.children || "Heading Text"}
    </Heading>
  );
}

// Preview props for prop explorer
export const HeadingPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Text content of the heading.",
    defaultValue: "Heading Text",
  },
  {
    name: "level",
    type: "select",
    description: "Heading level determining which HTML element to render (h1-h6).",
    options: [1, 2, 3, 4, 5, 6],
    defaultValue: 1,
  },
];
