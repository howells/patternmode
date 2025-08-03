"use client";

import type { AvatarProps } from "./component";
import React from "react";
import { Avatar } from "./component";

export function AvatarExample(props: AvatarProps) {
  // Show a nice example with an actual image if no src is provided
  const defaultProps = {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    alt: "John Doe",
    ...props,
  };

  return <Avatar {...defaultProps} />;
}
