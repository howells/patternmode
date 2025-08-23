"use client";

import { TextList, TextListItem } from "./component";
import type { TextListProps } from "./types";

export function TextListPreview(props: TextListProps) {
  return (
    <TextList {...props}>
      <TextListItem>First line of copy</TextListItem>
      <TextListItem>Second line of copy</TextListItem>
      <TextListItem>Third line of copy</TextListItem>
    </TextList>
  );
}

export const textListPreviewProps = [
  { name: "variant", type: "select", options: ["marker", "plain"], defaultValue: "marker" },
  { name: "align", type: "select", options: ["start", "center", "end"], defaultValue: "start" },
];

