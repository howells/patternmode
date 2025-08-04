"use client";

import type { TagProps } from "./component";

import React from "react";

import { Tag } from "./component";

export function TagPreview(props: TagProps) {
  return <Tag value="Sales" label="Department" {...props} />;
}

// Preview props for prop explorer
export const tagPreviewProps = [
  {
    name: "value",
    type: "string",
    description: "The value text (e.g., 'Sales', 'Zurich'). The primary content of the tag.",
    defaultValue: "Sales",
  },
  {
    name: "label",
    type: "string",
    description: "The label text (e.g., 'Department', 'Location'). Displays as a subtle prefix.",
    defaultValue: "Department",
  },
  {
    name: "count",
    type: "string",
    description: "Optional count or secondary text to display after the value.",
    defaultValue: "",
  },
  {
    name: "dismissible",
    type: "boolean",
    description: "Whether the tag can be dismissed. Shows a dismiss button when true.",
    defaultValue: false,
  },
];
