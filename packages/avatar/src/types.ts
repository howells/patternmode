import type { Size } from "@patternmode/config/sizes";
import type * as React from "react";

export type AvatarProps = {
  src?: string | null;
  size?: Size;
  square?: boolean;
  initials?: string;
  text?: string;
  alt?: string;
  dynamicBackground?: boolean;
  className?: string;
  ImageComponent?: React.ElementType;
  imageProps?: Record<string, any>;
} & React.ComponentPropsWithoutRef<"span">;

export type AvatarWithFallbackProps = React.ComponentPropsWithoutRef<"span">;
export type AvatarImageProps = React.ComponentPropsWithoutRef<"img">;
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<"span">;
