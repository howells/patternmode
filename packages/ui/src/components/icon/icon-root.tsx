import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import type { ComponentSize } from "../../lib/size";

/** Icon supports an additional "3xs" size for tiny icons in small containers */
export type IconSize = ComponentSize | "3xs";

/** Tailwind size classes for each icon size */
export const ICON_SIZE_CLASS: Record<IconSize, string> = {
  "3xs": "size-2.5", // 10px
  "2xs": "size-3", // 12px
  xs: "size-4", // 16px
  sm: "size-4.5", // 18px
  base: "size-5", // 20px
  lg: "size-6", // 24px
  xl: "size-7", // 28px
  "2xl": "size-8", // 32px
  "3xl": "size-10", // 40px
};

function sizeToIconClass(size: IconSize | undefined): string {
  return ICON_SIZE_CLASS[size ?? "base"];
}

/**
 * Renders a Lucide or custom SVG icon with consistent sizing and stroke width.
 *
 * @param props - The icon props
 * @param props.icon - Icon component from lucide-react or any SVG React component (required).
 * @param props.size - Icon size. Options: "2xs" (12px), "xs" (16px), "sm" (18px), "base" (default, 20px), "lg" (24px), "xl" (28px), "2xl" (32px), "3xl" (40px).
 * @param props.className - Additional CSS classes to apply.
 * @param props... - All other standard SVG element props.
 *
 * @example
 * ```tsx
 * <Icon icon={ArrowRight} />
 * <Icon icon={ArrowRight} size="lg" className="text-muted-foreground" />
 * ```
 */
export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "strokeWidth"> {
  /** Icon component from lucide-react or any SVG React component. */
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Size scale for icons. Supports ComponentSize plus "3xs" for tiny icons. Defaults to `base` (20px). */
  size?: IconSize;
}

/**
 * Icon UI component.
 * Import from "@patternmode/ui/components/icon".
 */
export function Icon({
  icon: IconComp,
  size = "base",
  className,
  ...props
}: IconProps) {
  return (
    <IconComp
      aria-hidden
      className={cn("stroke-[1.5]", sizeToIconClass(size), className)}
      data-component="icon"
      focusable={false}
      {...props}
    />
  );
}
