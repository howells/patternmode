import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";
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

/** Badge variant — aliased from shared PillVariant */
export type BadgeVariant = PillVariant;
export type BadgeSize = PillSize;
export type BadgeAppearance = PillAppearance;

function badgeSizeToIconSize(
  badgeSize: PillSize | null | undefined,
): ComponentSize {
  const key = badgeSize ?? "base";
  return PILL_ICON_SIZE_MAP[key] ?? "sm";
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {
  asChild?: boolean;
  disabled?: boolean;
  dotClassName?: string;
  /** Force focus ring display (for documentation/testing) */
  focused?: boolean;
  /** Force hover state display (for documentation/testing) */
  hovered?: boolean;
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPlacement?: "start" | "end";
  label?: string;
  /** Show loading spinner */
  loading?: boolean;
  /** Label shown during loading */
  loadingLabel?: string;
  testid?: string;
  value?: string;
}

/**
 * Badge UI component.
 * Import from "@patternmode/ui/components/badge".
 * Uses variant-based styling via class-variance-authority.
 */
export function Badge({
  className,
  variant,
  size,
  appearance,
  radius,
  asChild = false,
  disabled,
  testid,
  label,
  value,
  icon,
  iconPlacement = "start",
  focused,
  hovered,
  loading = false,
  loadingLabel,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof pillVariants> & {
    asChild?: boolean;
    testid?: string;
    label?: string;
    value?: string;
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPlacement?: "start" | "end";
    focused?: boolean;
    hovered?: boolean;
    loading?: boolean;
    loadingLabel?: string;
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : "span";
  const iconSize = badgeSizeToIconSize(size);
  const spinnerSize = iconSize;
  const iconElement = icon ? <Icon icon={icon} size={iconSize} /> : null;

  // If both label and value are provided, render split badge with divider
  // If only value is provided, render it as content
  // Otherwise use children
  let textContent: React.ReactNode;
  if (label && value) {
    textContent = (
      <>
        <span className="trim-both">{label}</span>
        <span aria-hidden="true" className="h-3.5 w-px bg-current opacity-20" />
        <span className="trim-both font-medium">{value}</span>
      </>
    );
  } else if (value) {
    textContent = <span className="trim-both">{value}</span>;
  } else {
    textContent = children;
  }

  // Handle loading state
  let content: React.ReactNode;
  if (loading) {
    content = (
      <>
        <Spinner size={spinnerSize} />
        {loadingLabel ?? textContent}
      </>
    );
  } else if (icon) {
    content = (
      <>
        {iconPlacement === "start" && iconElement}
        {textContent}
        {iconPlacement === "end" && iconElement}
      </>
    );
  } else {
    content = textContent;
  }

  return (
    <Pill
      appearance={appearance}
      as={Comp}
      className={className}
      data-focused={focused || undefined}
      data-hovered={hovered || undefined}
      data-loading={loading || undefined}
      data-slot="badge"
      data-testid={testid}
      disabled={disabled ?? undefined}
      radius={radius}
      size={size}
      variant={variant}
      {...props}
    >
      {content}
    </Pill>
  );
}
