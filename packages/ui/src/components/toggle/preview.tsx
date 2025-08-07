"use client";

import type { ToggleProps } from "./types";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import React from "react";
import { Toggle } from "./component";

export function TogglePreview(props: ToggleProps) {
  // Remove controlled props to make it interactive
  const { pressed, ...interactiveProps } = props;

  return (
    <Toggle {...interactiveProps}>
      {props.children || "Toggle"}
    </Toggle>
  );
}

// Preview props for prop explorer
export const togglePreviewProps = [
  {
    name: "children",
    type: "select",
    description: "Content of the toggle button.",
    options: [
      { label: "Text", value: "Toggle" },
      { label: "Bold Icon", value: Bold },
      { label: "Italic Icon", value: Italic },
      { label: "Underline Icon", value: Underline },
      { label: "Strikethrough Icon", value: Strikethrough },
    ],
    defaultValue: "Toggle",
  },
  {
    name: "variant",
    type: "select",
    description: "Visual style variant of the toggle button.",
    options: ["default", "outline", "ghost"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Size of the toggle button.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },


  {
    name: "disabled",
    type: "boolean",
    description: "Whether the toggle is disabled.",
    defaultValue: false,
  },
];
