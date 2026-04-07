"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { focusInput } from "@patternmode/ui/utils/focus-input";
import { hasErrorInput } from "@patternmode/ui/utils/has-error-input";
import { Slot } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import type { RefObject } from "react";
import { Icon } from "../../components/icon";
import type { ComponentSize } from "../../lib/size";

/**
 * inputCardSizeStyles helper for InputCard.
 * Import from "@patternmode/ui/compositions/input-card".
 * Built on Radix UI primitives for accessible behavior.
 */
const inputCardSizeStyles: Record<ComponentSize, string> = {
  "2xs": "gap-1 px-2 py-1",
  xs: "gap-1.5 px-2.5 py-1.5",
  sm: "gap-1.5 px-3 py-2",
  base: "gap-2 px-3.5 py-2.5",
  lg: "gap-2 px-4 py-3",
  xl: "gap-2 px-5 py-3.5",
  "2xl": "gap-2 px-6 py-4",
  "3xl": "gap-2 px-7 py-5",
};

/**
 * Size-aware corner radius for InputCard.
 * Smaller controls should not look pill-like.
 */
const inputCardRadiusStyles: Record<ComponentSize, string> = {
  "2xs": "rounded-md",
  xs: "rounded-md",
  sm: "rounded-lg",
  base: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-2xl",
};

/**
 * Map card size to icon size.
 * Following Button's restrained pattern: icons stay small (xs) for most sizes.
 */
const INPUT_CARD_ICON_SIZE: Record<ComponentSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "2xs",
  sm: "xs",
  base: "xs",
  lg: "xs",
  xl: "xs",
  "2xl": "xs",
  "3xl": "xs",
};

/** Get the appropriate icon size for a given card size */
const getInputCardIconSize = (cardSize: ComponentSize): ComponentSize =>
  INPUT_CARD_ICON_SIZE[cardSize];

interface InputCardIconProps {
  className?: string;
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  selected?: boolean;
  size: ComponentSize;
}

/** Renders an icon for InputCard with proper sizing and selection state styling */
const InputCardIcon = ({
  icon,
  size,
  selected,
  className,
}: InputCardIconProps) => (
  <Icon
    className={cn(
      "mt-0.5 text-muted-foreground transition-colors",
      selected === true && "text-primary",
      className,
    )}
    icon={icon}
    size={getInputCardIconSize(size)}
  />
);

/**
 * inputCardBaseStyles helper for InputCard.
 * Import from "@patternmode/ui/compositions/input-card".
 * Built on Radix UI primitives for accessible behavior.
 */
const inputCardBaseStyles = cn(
  "group relative flex cursor-pointer items-center",
  "border border-border/70 bg-card",
  "text-card-foreground",
  "transition-[color,background-color,box-shadow,border-color]",
  "hover:border-border hover:bg-accent/50",
  focusInput(),
  hasErrorInput,
  // Disabled styles - support both disabled attribute and data-disabled
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
);

/**
 * inputCardSelectedStyles helper for InputCard.
 * Import from "@patternmode/ui/compositions/input-card".
 * Built on Radix UI primitives for accessible behavior.
 */
const inputCardSelectedStyles = cn(
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary/[0.02] data-[state=checked]:shadow-sm",
  "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary/[0.02] data-[state=indeterminate]:shadow-sm",
  "data-[selected=true]:border-primary data-[selected=true]:bg-primary/[0.02] data-[selected=true]:shadow-sm",
);

export interface InputCardProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Merge props onto child */
  asChild?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  selected?: boolean;
  /** Component size */
  size?: ComponentSize;
}

/**
 * InputCard UI component.
 * Import from "@patternmode/ui/compositions/input-card".
 * Built on Radix UI primitives for accessible behavior.
 */
const InputCard = ({
  asChild = false,
  selected,
  disabled,
  size = "base",
  className,
  ref,
  ...props
}: InputCardProps & { ref?: RefObject<HTMLDivElement | null> }) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        inputCardBaseStyles,
        inputCardSelectedStyles,
        inputCardSizeStyles[size],
        inputCardRadiusStyles[size],
        className,
      )}
      data-disabled={disabled || undefined}
      data-selected={selected || undefined}
      ref={ref}
      {...props}
      {...(disabled === undefined ? {} : { disabled })}
    />
  );
};

InputCard.displayName = "InputCard";

export {
  getInputCardIconSize,
  INPUT_CARD_ICON_SIZE,
  InputCard,
  InputCardIcon,
  inputCardBaseStyles,
  inputCardSelectedStyles,
  inputCardSizeStyles,
};
