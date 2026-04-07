import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

const TEXT_SIZE_CLASSES = {
  sm: "text-body",
  base: "text-body-lg",
  lg: "text-title-sm",
} as const;

const TEXT_VARIANT_CLASSES = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
} as const;

const TEXT_WEIGHT_CLASSES = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
} as const;

export interface TextProps extends Omit<ComponentPropsWithoutRef<"p">, "size"> {
  asChild?: boolean;
  size?: keyof typeof TEXT_SIZE_CLASSES;
  variant?: keyof typeof TEXT_VARIANT_CLASSES;
  weight?: keyof typeof TEXT_WEIGHT_CLASSES;
}

function Text({
  asChild = false,
  className,
  size = "sm",
  variant = "default",
  weight = "normal",
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(
        "max-w-prose text-pretty tracking-[var(--tracking-body)]",
        TEXT_SIZE_CLASSES[size],
        TEXT_VARIANT_CLASSES[variant],
        TEXT_WEIGHT_CLASSES[weight],
        className
      )}
      data-slot="text"
      {...props}
    />
  );
}

export { Text };
