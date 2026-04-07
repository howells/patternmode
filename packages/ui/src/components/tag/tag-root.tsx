"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { type LucideIcon, X } from "lucide-react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";
import { Dot, type DotProps } from "../dot";
import { Icon } from "../icon";
import {
  PILL_ICON_SIZE_MAP,
  Pill,
  type PillAppearance,
  type PillSize,
  type PillVariant,
  type pillVariants,
} from "../pill";
import { Spinner } from "../spinner";

/** Tag variant — aliased from shared PillVariant */
export type TagVariant = PillVariant;
export type TagSize = PillSize;
export type TagAppearance = PillAppearance;

export const TAG_VARIANTS: TagVariant[] = [
  "default",
  "secondary",
  "affirmative",
  "warning",
  "outline",
  "info",
  "destructive",
  "brand",
];

export const TAG_SIZES: TagSize[] = [
  "2xs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

/** Circular thumbnail image sizes + negative margin to sit at pill edge */
const TAG_IMAGE_SIZES: Record<PillSize, string> = {
  "2xs": "size-2.5",
  xs: "-ml-0.5 size-3",
  sm: "-ml-1 size-4",
  base: "-ml-1.5 size-5",
  lg: "-ml-1.5 size-5",
  xl: "-ml-2 size-6",
  "2xl": "-ml-2.5 size-8",
  "3xl": "-ml-3.5 size-10",
};

/** Dismiss button sizing per tag size */
const TAG_DISMISS_SIZES: Record<PillSize, string> = {
  "2xs": "-mr-px size-2.5 [&_svg]:size-2",
  xs: "-mr-0.5 size-3 [&_svg]:size-2.5",
  sm: "-mr-0.5 size-3.5 [&_svg]:size-3",
  base: "-mr-0.5 size-4 [&_svg]:size-3",
  lg: "-mr-0.5 size-4 [&_svg]:size-3.5",
  xl: "-mr-1 size-5 [&_svg]:size-4",
  "2xl": "-mr-1 size-5 [&_svg]:size-4",
  "3xl": "-mr-1.5 size-6 [&_svg]:size-5",
};

/** Dot color on solid pills — matches text contrast direction */
const SOLID_DOT_COLORS: Record<PillVariant, string> = {
  default: "var(--color-alpha-70)",
  secondary: "var(--color-black-alpha-30)",
  affirmative: "var(--color-alpha-70)",
  warning: "var(--color-black-alpha-30)",
  outline: "var(--color-black-alpha-30)",
  info: "var(--color-alpha-70)",
  destructive: "var(--color-alpha-70)",
  brand: "var(--color-black-alpha-30)",
};

/** Dot sizing per tag size */
const TAG_DOT_SIZES: Record<PillSize, ComponentSize> = {
  "2xs": "2xs",
  xs: "xs",
  sm: "xs",
  base: "sm",
  lg: "sm",
  xl: "base",
  "2xl": "lg",
  "3xl": "xl",
};

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children">,
    Omit<VariantProps<typeof pillVariants>, "disabled"> {
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Custom dismiss icon (defaults to X) */
  dismissIcon?: React.ReactNode;
  /** Leading status dot variant */
  dot?: DotProps["variant"];
  /** Hide dismiss button even when onDismiss is provided */
  hideDismiss?: boolean;
  /** Leading icon */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Leading circular thumbnail image */
  imageUrl?: string;
  /** Show loading spinner (replaces leading visual) */
  loading?: boolean;
  /** Click handler — makes the whole tag a button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Dismiss handler — shows dismiss button */
  onDismiss?: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * Tag - An interactive pill component for selection, filtering, and multi-select scenarios.
 *
 * Uses shared pill styling (identical to Badge) with interactive capabilities:
 * dismissibility, click handling, and keyboard support.
 *
 * The outer element is polymorphic based on interactivity:
 * - `onClick` provided: `<button>`
 * - `onDismiss` only: `<div>` with dismiss `<button>`
 * - Both: `<button>` with dismiss `<span role="button">`
 * - Neither: `<span>` (presentational)
 */
export function Tag({
  className,
  variant,
  size = "base",
  appearance,
  radius,
  disabled,
  children,
  icon,
  dot,
  imageUrl,
  loading = false,
  onClick,
  onDismiss,
  dismissIcon,
  hideDismiss = false,
  ...props
}: TagProps) {
  const resolvedSize = size ?? "base";
  const isClickable = !!onClick;
  const isDismissible = !!onDismiss && !hideDismiss;

  // Polymorphic element selection
  let Element: "button" | "div" | "span" = "span";
  if (isClickable) {
    Element = "button";
  } else if (isDismissible) {
    Element = "div";
  }

  const iconSize = PILL_ICON_SIZE_MAP[resolvedSize] ?? "sm";
  const dotSize = TAG_DOT_SIZES[resolvedSize];

  // Build leading visual
  let leadingVisual: React.ReactNode = null;
  if (loading) {
    leadingVisual = <Spinner size={iconSize} />;
  } else if (imageUrl) {
    leadingVisual = (
      <img
        alt=""
        className={cn(
          "shrink-0 rounded-full object-cover ring-1 ring-black/10 ring-inset",
          TAG_IMAGE_SIZES[resolvedSize],
        )}
        height={24}
        src={imageUrl}
        width={24}
      />
    );
  } else if (dot) {
    const isSolid = !appearance || appearance === "solid";
    const resolvedVariant = variant ?? "default";
    leadingVisual = isSolid ? (
      <Dot color={SOLID_DOT_COLORS[resolvedVariant]} size={dotSize} />
    ) : (
      <Dot size={dotSize} variant={dot} />
    );
  } else if (icon) {
    leadingVisual = <Icon icon={icon} size={iconSize} />;
  }

  // Dismiss click handler
  const handleDismissClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDismiss?.(event);
  };

  // Keyboard dismiss (Backspace/Delete) — only when outer element is a button
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (onDismiss && (event.key === "Backspace" || event.key === "Delete")) {
      event.preventDefault();
      onDismiss(event);
    }
    // Forward any user-provided onKeyDown
    (props as React.HTMLAttributes<HTMLElement>).onKeyDown?.(event);
  };

  // Dismiss element: <button> when outer is div, <span role="button"> when outer is button
  const dismissElement = isDismissible
    ? (() => {
        const DismissElement = isClickable ? "span" : "button";
        const dismissProps = isClickable
          ? { role: "button" as const, tabIndex: -1 }
          : { type: "button" as const };

        return (
          <DismissElement
            aria-label="Remove"
            className={cn(
              "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100",
              TAG_DISMISS_SIZES[resolvedSize],
            )}
            data-slot="tag-dismiss"
            onClick={handleDismissClick}
            {...dismissProps}
          >
            {dismissIcon ?? <X />}
          </DismissElement>
        );
      })()
    : null;

  return (
    <Pill
      appearance={appearance}
      as={Element}
      className={cn(
        isClickable && "cursor-pointer",
        dot && !isDismissible && "pr-[1.25em]",
        className,
      )}
      data-component="tag"
      data-slot="tag"
      disabled={disabled}
      radius={radius}
      size={resolvedSize}
      variant={variant}
      {...(isClickable ? { type: "button", onClick } : {})}
      {...(onDismiss ? { onKeyDown: handleKeyDown } : {})}
      {...props}
    >
      {leadingVisual}
      {children && <span className="truncate">{children}</span>}
      {dismissElement}
    </Pill>
  );
}
