"use client";

import type { IconContainerProps } from "./component";
import { Calendar } from "lucide-react";
import React from "react";
import { IconContainer } from "./component";

export function IconContainerExample(props: IconContainerProps) {
  return <IconContainer icon={Calendar} {...props} />;
}

// Preview props for prop explorer
export const IconContainerPreviewProps = [
  {
    name: "icon",
    type: "select",
    description: "The Lucide icon component to render.",
    options: [
      { label: "Calendar", value: "Calendar" },
      { label: "Heart", value: "Heart" },
      { label: "Star", value: "Star" },
      { label: "User", value: "User" },
      { label: "Settings", value: "Settings" },
    ],
    defaultValue: "Calendar",
  },
  {
    name: "size",
    type: "select",
    description: "Container size variant affecting overall dimensions.",
    options: ["sm", "base", "lg", "xl"],
    defaultValue: "base",
  },
  {
    name: "variant",
    type: "select",
    description: "Background color variant for the container.",
    options: ["default", "neutral", "success", "info", "warning", "error", "critical", "positive", "negative"],
    defaultValue: "neutral",
  },
  {
    name: "iconSize",
    type: "select",
    description: "Icon size within the container.",
    options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
    defaultValue: "base",
  },
  {
    name: "centered",
    type: "boolean",
    description: "Whether to center the container horizontally.",
    defaultValue: false,
  },
];
