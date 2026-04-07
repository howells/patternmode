"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { Icon } from "../icon";
import { useInputGroup } from "./input-group-context";
import { inputGroupSizeToIconSize } from "./input-group-variants";

export type InputGroupIconProps = Omit<
  React.SVGProps<SVGSVGElement>,
  "strokeWidth"
> & {
  /** Icon component from lucide-react or any SVG React component. */
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/**
 * Decorative icon for use inside InputGroup.
 * Automatically sizes based on InputGroup context.
 *
 * @example
 * ```tsx
 * <InputGroup size="base">
 *   <InputGroupIcon icon={Search} />
 *   <InputGroupInput placeholder="Search..." />
 * </InputGroup>
 * ```
 */
export function InputGroupIcon({
  icon,
  className,
  ...props
}: InputGroupIconProps) {
  const { size } = useInputGroup();
  const iconSize = inputGroupSizeToIconSize(size);

  return (
    <Icon
      className={cn("shrink-0 text-muted-foreground", className)}
      data-component="input-group-icon"
      data-slot="input-group-icon"
      icon={icon}
      size={iconSize}
      {...props}
    />
  );
}
