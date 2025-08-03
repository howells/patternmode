"use client";

import type { IconProps } from "./component";
import { Camera } from "lucide-react";
import React from "react";
import { Icon } from "./component";

export function IconExample(props: IconProps) {
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
