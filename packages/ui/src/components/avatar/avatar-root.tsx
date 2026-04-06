"use client";

import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";

export const avatarSizeClasses: Record<ComponentSize, string> = {
  sm: "size-9 text-[0.78rem]",
  base: "size-11 text-[0.9rem]",
  lg: "size-14 text-[1rem]",
};

export interface AvatarProps extends ComponentPropsWithoutRef<typeof Root> {
  size?: ComponentSize;
}

const Avatar = forwardRef<ComponentRef<typeof Root>, AvatarProps>(
  ({ className, size = "base", ...props }, ref) => {
    return (
      <Root
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-secondary/75 text-secondary-foreground shadow-2xs",
          avatarSizeClasses[size],
          className
        )}
        data-size={size}
        data-slot="avatar"
        ref={ref}
        {...props}
      />
    );
  }
);

Avatar.displayName = Root.displayName;

const AvatarImage = forwardRef<
  ComponentRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  return (
    <Image
      className={cn("aspect-square size-full object-cover", className)}
      data-slot="avatar-image"
      ref={ref}
      {...props}
    />
  );
});

AvatarImage.displayName = Image.displayName;

const AvatarFallback = forwardRef<
  ComponentRef<typeof Fallback>,
  ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => {
  return (
    <Fallback
      className={cn(
        "flex size-full items-center justify-center bg-secondary font-medium uppercase tracking-[0.08em]",
        className
      )}
      data-slot="avatar-fallback"
      ref={ref}
      {...props}
    />
  );
});

AvatarFallback.displayName = Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
