"use client";

import type { AvatarProps } from "./avatar";
import { Avatar } from "@patternmode/ui";

import React from "react";

export function AvatarExample(props: AvatarProps) {
  // Show a nice example with an actual image if no src is provided
  const defaultProps = {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    alt: "John Doe",
    ...props,
  };

  return <Avatar {...defaultProps} />;
}
