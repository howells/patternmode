import type { Size } from "@patternmode/config/sizes";
import type * as React from "react";
import type * as BaseAvatarExport from "@base-ui-components/react/avatar";

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
  imageProps?: Record<string, unknown>;
} & React.ComponentPropsWithoutRef<"span">;

export type AvatarWithFallbackProps = React.ComponentPropsWithoutRef<"span">;
type BaseAvatarType = typeof BaseAvatarExport.Avatar;
export type AvatarImageProps = React.ComponentPropsWithoutRef<
  BaseAvatarType["Image"]
>;
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<"span">;
