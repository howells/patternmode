"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root as AvatarRootPrimitive } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import type { Radius } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";

/**
 * Avatar-specific extended sizes beyond ComponentSize.
 * Use for large display avatars (e.g., brand cards, profiles).
 */
export type AvatarExtendedSize = "4xl" | "5xl" | "6xl";

/**
 * All available Avatar sizes (standard + extended).
 */
export type AvatarSize = ComponentSize | AvatarExtendedSize;

/**
 * AVATAR_SIZE_CLASS class name map for Avatar.
 * Import from "@patternmode/ui/components/avatar".
 * Built on Radix UI primitives for accessible behavior.
 */
export const AVATAR_SIZE_CLASS: Record<AvatarSize, string> = {
  "2xs": "size-5",
  xs: "size-6",
  sm: "size-7",
  base: "size-8",
  lg: "size-10",
  xl: "size-12",
  "2xl": "size-14",
  "3xl": "size-16",
  "4xl": "size-20",
  "5xl": "size-24",
  "6xl": "size-32",
};

/**
 * AVATAR_SIZE_PX pixel size map for Avatar.
 * Import from "@patternmode/ui/components/avatar".
 * Built on Radix UI primitives for accessible behavior.
 */
export const AVATAR_SIZE_PX: Record<AvatarSize, number> = {
  "2xs": 20,
  xs: 24,
  sm: 28,
  base: 32,
  lg: 40,
  xl: 48,
  "2xl": 56,
  "3xl": 64,
  "4xl": 80,
  "5xl": 96,
  "6xl": 128,
};

const RADIUS_CLASS: Record<Radius, string> = {
  full: "rounded-full",
  square: "rounded-none",
  rounded: "rounded-md",
};

export type AvatarRootProps = ComponentProps<typeof AvatarRootPrimitive> & {
  /** Component size */
  size?: AvatarSize;
  /** Border radius. Defaults to "full" (circular). */
  radius?: Radius;
  /** With ring */
  withRing?: boolean;
  /** Ring color */
  ringColor?: string;
};

/**
 * AvatarRoot UI component.
 * Import from "@patternmode/ui/components/avatar".
 * Built on Radix UI primitives for accessible behavior.
 */
export function AvatarRoot({
  className,
  size = "base",
  radius = "full",
  withRing = false,
  ringColor,
  ...props
}: AvatarRootProps) {
  return (
    <AvatarRootPrimitive
      className={cn(
        "relative flex shrink-0 overflow-hidden bg-muted",
        AVATAR_SIZE_CLASS[size],
        RADIUS_CLASS[radius],
        withRing && [
          "ring-2 ring-offset-2 ring-offset-background",
          ringColor || "ring-primary",
        ],
        className,
      )}
      data-component="avatar"
      data-radius={radius}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
}
