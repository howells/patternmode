"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { IconBox, type IconBoxProps } from "../../compositions/icon-box";
import { useEmptyContext } from "./empty-context";

export interface EmptyMediaProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Icon to display */
  icon: LucideIcon;
  /** Override the icon size */
  size?: IconBoxProps["size"];
  /** Icon box variant */
  variant?: IconBoxProps["variant"];
}

const SIZE_ICON = {
  sm: "lg",
  base: "xl",
  lg: "2xl",
} as const;

/**
 * Media container for empty state icons.
 */
export function EmptyMedia({
  className,
  icon,
  variant = "muted",
  size: sizeProp,
  ...props
}: EmptyMediaProps) {
  const { size: contextSize } = useEmptyContext();
  const iconSize = sizeProp ?? SIZE_ICON[contextSize];

  return (
    <div
      className={cn(className)}
      data-component="empty-media"
      data-slot="empty-media"
      {...props}
    >
      <IconBox icon={icon} radius="full" size={iconSize} variant={variant} />
    </div>
  );
}
