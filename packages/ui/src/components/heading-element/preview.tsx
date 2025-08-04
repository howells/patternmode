"use client";

import type { HeadingElementProps } from "./component";
import React from "react";
import { HeadingElement } from "./component";

export function HeadingElementExample(props: HeadingElementProps) {
  return <HeadingElement level={2} {...props}>{props.children || "Sample Heading"}</HeadingElement>;
}

// Preview props for prop explorer
export const HeadingElementPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Heading text content.",
    defaultValue: "Sample Heading",
  },
  {
    name: "level",
    type: "select",
    description: "Heading level determining which HTML element to render (h1-h6).",
    defaultValue: 2,
    options: [1, 2, 3, 4, 5, 6],
  },
];
