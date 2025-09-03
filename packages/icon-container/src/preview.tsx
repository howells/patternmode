"use client";

import { Package } from "lucide-react";
import { IconContainer } from "./component";
import type { IconContainerProps } from "./types";

export function IconContainerPreview(props: Partial<IconContainerProps>) {
  return <IconContainer icon={Package} {...props} />;
}

export const iconContainerPreviewProps = [
  {
    name: "size",
    type: "select",
    options: ["sm", "base", "lg", "xl"],
    defaultValue: "base",
  },
  {
    name: "variant",
    type: "select",
    options: [
      "neutral",
      "default",
      "success",
      "info",
      "warning",
      "error",
      "critical",
      "positive",
      "negative",
    ],
    defaultValue: "neutral",
  },
  { name: "centered", type: "boolean", defaultValue: false },
  { name: "color", type: "string", defaultValue: "" },
];
