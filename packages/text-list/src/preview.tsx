"use client";

import { TextList, TextListItem } from ".";
import type { TextListProps } from "./types";

export function TextListPreview(props: TextListProps) {
  return (
    <TextList {...props}>
      <TextListItem>
        A concise example that wraps naturally on smaller screens.
      </TextListItem>
      <TextListItem>
        Briefly describe a step or provide helpful context.
      </TextListItem>
      <TextListItem>
        Keep items clear and scannable with minimal detail.
      </TextListItem>
    </TextList>
  );
}

export const textListPreviewProps = [
  {
    name: "variant",
    type: "select",
    options: ["marker", "plain"],
    defaultValue: "marker",
  },
  {
    name: "align",
    type: "select",
    options: ["start", "center", "end"],
    defaultValue: "start",
  },
];
