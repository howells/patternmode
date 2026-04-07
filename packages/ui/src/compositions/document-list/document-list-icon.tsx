"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Icon, type IconSize } from "../../components/icon";
import type { ComponentSize } from "../../lib/size";
import { useDocumentListContext } from "./document-list-context";

const ICON_SIZE_MAP: Record<ComponentSize, IconSize> = {
  "2xs": "2xs",
  xs: "xs",
  sm: "xs",
  base: "sm",
  lg: "base",
  xl: "lg",
  "2xl": "xl",
  "3xl": "2xl",
};

export interface DocumentListIconProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * DocumentListIcon UI component.
 * Import from "@patternmode/ui/compositions/document-list".
 */
export function DocumentListIcon({
  className,
  icon,
  ...props
}: DocumentListIconProps) {
  const { size = "base" } = useDocumentListContext();

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground",
        className,
      )}
      data-component="document-list-icon"
      data-slot="document-list-icon"
      {...props}
    >
      <Icon icon={icon} size={ICON_SIZE_MAP[size]} />
    </div>
  );
}
