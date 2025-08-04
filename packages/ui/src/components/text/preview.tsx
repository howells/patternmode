"use client";

import type { TextProps } from "./component";
import React from "react";
import { Text } from "./component";

export function TextPreview(props: TextProps) {
  return (
    <Text {...props}>
      {props.children || "This is a text component that demonstrates typography and inherits its styling from the parent or props."}
    </Text>
  );
}

// Preview props for prop explorer
export const textPreviewProps = [
  {
    name: "children",
    type: "string",
    description: "Text content to display.",
    defaultValue: "This is a text component that demonstrates typography and inherits its styling from the parent or props.",
  },
  {
    name: "size",
    type: "select",
    description: "Text size variant controlling font size.",
    options: ["2xs", "xs", "sm", "base", "lg", "xl"],
    defaultValue: "sm",
  },
];
