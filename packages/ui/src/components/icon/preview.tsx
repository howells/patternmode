"use client";

import type { IconProps } from "./icon";
import { Icon } from "@patternmode/ui";
import { Camera } from "lucide-react";
import React from "react";

import { getIconComponent } from "../../lib/icon-registry";

type IconExampleProps = IconProps;

export function IconExample(props: IconProps) {
  const { icon, fallbackIcon, ...otherProps } = props;

  // Convert string icon name to icon component
  const processIcon = (iconProp: any) => {
    if (typeof iconProp === "string" && iconProp) {
      return getIconComponent(iconProp);
    }
    return iconProp;
  };

  // Process both main icon and fallback icon
  const mainIcon = processIcon(icon) || Camera;
  const processedFallbackIcon = fallbackIcon ? processIcon(fallbackIcon) : undefined;

  return (
    <Icon
      {...otherProps}
      icon={mainIcon}
      fallbackIcon={processedFallbackIcon}
    />
  );
}
