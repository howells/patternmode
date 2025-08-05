"use client";

import type { IconProps } from "./types";
import { Camera } from "lucide-react";
import React from "react";
import { Icon } from "./component";

export function IconPreview(props: IconProps) {
  const { icon, fallbackIcon, ...otherProps } = props;

  // Use the provided icon or fallback to Camera if none provided
  const mainIcon = icon || Camera;

  return (
    <Icon
      {...otherProps}
      icon={mainIcon}
      fallbackIcon={fallbackIcon}
    />
  );
}

// Preview props for prop explorer
export const iconPreviewProps = [
  {
    name: "icon",
    type: "select",
    description: "The Lucide icon component to render.",
    options: [
      { label: "Camera", value: Camera },
      { label: "Search", value: "Search" },
      { label: "Settings", value: "Settings" },
      { label: "User", value: "User" },
      { label: "Heart", value: "Heart" },
    ],
    defaultValue: Camera,
  },
  {
    name: "size",
    type: "select",
    description: "Visual size of the icon affecting its dimensions.",
    options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
    defaultValue: "base",
  },
  {
    name: "strokeWidth",
    type: "number",
    description: "Custom stroke width for the icon lines.",
    defaultValue: 2,
  },
];
