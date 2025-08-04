"use client";

import type { TextListProps } from "./component";
import React from "react";
import { TextList, TextListItem } from "./component";

export function TextListPreview(props: TextListProps) {
  return (
    <TextList {...props}>
      <TextListItem>First list item with sample content</TextListItem>
      <TextListItem>Second list item explaining features</TextListItem>
      <TextListItem>Third list item demonstrating styling</TextListItem>
      <TextListItem>Fourth item showing list behavior</TextListItem>
    </TextList>
  );
}

// Preview props for prop explorer
export const textListPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Visual style variant for the list display.",
    defaultValue: "marker",
    options: ["marker", "plain"],
  },
  {
    name: "align",
    type: "select",
    description: "Controls the alignment of list items within the container.",
    defaultValue: "start",
    options: ["start", "center", "end"],
  },
  {
    name: "as",
    type: "select",
    description: "The underlying HTML element to render for the list container.",
    defaultValue: "ul",
    options: ["ul", "ol"],
  },
  {
    name: "unstyled",
    type: "boolean",
    description: "Whether to remove all default component styling.",
    defaultValue: false,
  },
];
