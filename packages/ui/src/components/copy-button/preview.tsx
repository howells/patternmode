"use client";

import type { CopyButtonProps } from "./component";
import React from "react";
import { CopyButton } from "./component";

export function CopyButtonExample(props: CopyButtonProps) {
  return (
    <CopyButton
      text="Hello, World!"
      {...props}
    />
  );
}

// Preview props for prop explorer
export const CopyButtonPreviewProps = [
  {
    name: "text",
    type: "string",
    description: "Text content to copy to clipboard.",
    defaultValue: "Hello, World!",
  },
  {
    name: "copyLabel",
    type: "string",
    description: "Label text for the copy state.",
    defaultValue: "Copy",
  },
  {
    name: "copiedLabel",
    type: "string",
    description: "Label text for the copied state.",
    defaultValue: "Copied",
  },
];
