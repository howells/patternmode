"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Image as AvatarImagePrimitive } from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";

export interface AvatarImageProps
  extends ComponentProps<typeof AvatarImagePrimitive> {
  /** Accessible alt text describing the avatar. Required for screen readers. */
  alt: string;
}

/**
 * AvatarImage UI component.
 * Import from "@patternmode/ui/components/avatar".
 * Built on Radix UI primitives for accessible behavior.
 *
 * Supports `asChild` to render custom image components (e.g., Next.js Image).
 * The child must accept and forward: src, alt, className, onLoad.
 *
 * @example
 * // With Next.js Image
 * <Avatar size="6xl">
 *   <AvatarImage asChild src={url} alt={name}>
 *     <Image fill sizes="128px" />
 *   </AvatarImage>
 *   <AvatarFallback name={name} size="6xl" />
 * </Avatar>
 */
export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarImagePrimitive
      className={cn("aspect-square size-full object-cover", className)}
      data-component="avatar-image"
      data-slot="avatar-image"
      {...props}
    />
  );
}
