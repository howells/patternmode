"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { ComponentSize } from "../../lib/size";
/** Avatar status type type definition */

export type AvatarStatusType = "online" | "offline" | "busy" | "away" | "dnd";

export interface AvatarStatusProps {
  /** CSS class name */
  className?: string;
  position?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
  /** Component size */
  size?: ComponentSize;
  status: AvatarStatusType;
  /** With border */
  withBorder?: boolean;
}

const STATUS_COLOR: Record<AvatarStatusType, string> = {
  online: "bg-affirmative-accent",
  offline: "bg-muted",
  busy: "bg-warning-accent",
  away: "bg-warning-accent",
  dnd: "bg-destructive",
};

const STATUS_SIZE: Record<ComponentSize, string> = {
  "2xs": "size-1.5",
  xs: "size-2",
  sm: "size-2",
  base: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
  "2xl": "size-4",
  "3xl": "size-5",
};

const POSITION_CLASS: Record<
  NonNullable<AvatarStatusProps["position"]>,
  string
> = {
  "bottom-right": "bottom-0 right-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-left": "top-0 left-0",
};

/**
 * AvatarStatus UI component.
 * Import from "@patternmode/ui/components/avatar".
 */
export function AvatarStatus({
  status,
  size = "base",
  className,
  position = "bottom-right",
  withBorder = true,
}: AvatarStatusProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute rounded-full",
        STATUS_SIZE[size],
        STATUS_COLOR[status],
        POSITION_CLASS[position],
        withBorder && "ring-2 ring-background",
        className,
      )}
      data-component="avatar-status"
      data-status={status}
    />
  );
}
