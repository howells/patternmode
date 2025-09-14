"use client";

import { DismissButton } from ".";
import type { DismissButtonProps } from "./types";

export function DismissButtonPreview(props: DismissButtonProps) {
  return (
    <DismissButton
      onClick={() => {
        /* noop */
      }}
      {...props}
    />
  );
}

export const dismissButtonPreviewProps = [
  {
    name: "size",
    type: "select",
    description: "Size of the dismiss button.",
    options: ["sm", "base", "lg"],
    defaultValue: "base",
  },
  {
    name: "aria-label",
    type: "string",
    description: "Accessible label for the button.",
    defaultValue: "Remove",
  },
  {
    name: "iconStrokeWidth",
    type: "number",
    description: "Icon stroke width.",
    defaultValue: 2,
  },
];
