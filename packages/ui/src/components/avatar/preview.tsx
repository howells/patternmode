"use client";

import type { AvatarProps } from "./component";
import React from "react";
import { Avatar } from "./component";

export function AvatarPreview(props: AvatarProps) {
  // Show a nice example with an actual image if no src is provided
  const defaultProps = {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    alt: "John Doe",
    ...props,
  };

  return <Avatar {...defaultProps} />;
}

// Preview props for prop explorer
export const avatarPreviewProps = [
  {
    name: "src",
    type: "string",
    description: "Image source URL for the avatar.",
    defaultValue: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "initials",
    type: "string",
    description: "Initials to display when no image is provided.",
    defaultValue: "JD",
  },
  {
    name: "text",
    type: "string",
    description: "Arbitrary text content to display when no image is provided.",
    defaultValue: "",
  },
  {
    name: "alt",
    type: "string",
    description: "Alt text for accessibility.",
    defaultValue: "John Doe",
  },
  {
    name: "size",
    type: "select",
    description: "Size variant of the avatar.",
    options: ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
    defaultValue: "base",
  },
  {
    name: "square",
    type: "boolean",
    description: "Whether to use square shape instead of circular.",
    defaultValue: false,
  },
  {
    name: "dynamicBackground",
    type: "boolean",
    description: "Whether to use a dynamic background color based on initials/text/alt text.",
    defaultValue: false,
  },
];
