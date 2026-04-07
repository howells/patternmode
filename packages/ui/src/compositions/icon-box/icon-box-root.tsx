import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Icon, type IconProps, type IconSize } from "../../components/icon";
import { RADIUS_CLASSES } from "../../lib/radius";
import type { ComponentSize } from "../../lib/size";

const BOX_TO_ICON_SIZE: Record<ComponentSize, IconSize> = {
  "2xs": "3xs",
  xs: "2xs",
  sm: "xs",
  base: "sm",
  lg: "sm",
  xl: "base",
  "2xl": "base",
  "3xl": "lg",
};

const iconBoxVariants = cva(
  "flex shrink-0 items-center justify-center border border-transparent",
  {
    variants: {
      size: {
        "2xs": "size-4",
        xs: "size-6",
        sm: "size-8",
        base: "size-10",
        lg: "size-12",
        xl: "size-16",
        "2xl": "size-20",
        "3xl": "size-24",
      },
      variant: {
        default: "bg-accent text-foreground",
        neutral: "bg-accent text-foreground",
        muted: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        affirmative:
          "bg-affirmative-soft text-affirmative-foreground dark:bg-affirmative-soft/20 dark:text-affirmative-accent",
        info: "bg-info-soft text-info-foreground dark:bg-info-soft/20 dark:text-info-accent",
        warning:
          "bg-warning-soft text-warning-foreground dark:bg-warning-soft/20 dark:text-warning-accent",
        destructive:
          "bg-error-soft text-error-foreground dark:bg-error-soft/20 dark:text-error-accent",
      },
      appearance: {
        solid: "",
        outline: "border-border bg-transparent",
        ghost: "border-transparent bg-transparent",
      },
      radius: RADIUS_CLASSES,
    },
    compoundVariants: [
      { radius: "rounded", size: ["2xs", "xs"], class: "rounded" },
      { radius: "rounded", size: ["sm", "base"], class: "rounded-md" },
      { radius: "rounded", size: ["lg", "xl"], class: "rounded-lg" },
      { radius: "rounded", size: "2xl", class: "rounded-xl" },
      { radius: "rounded", size: "3xl", class: "rounded-2xl" },
    ],
    defaultVariants: {
      size: "base",
      variant: "default",
      appearance: "solid",
      radius: "rounded",
    },
  },
);

export interface IconBoxProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof iconBoxVariants> {
  /** Icon component from lucide-react or any SVG React component. */
  icon: IconProps["icon"];
  /** Additional className for the icon itself. */
  iconClassName?: string;
  /** Size of the icon inside the box. Defaults based on box size. */
  iconSize?: IconProps["size"];
}

/**
 * IconBox UI component.
 * Import from "@patternmode/ui/compositions/icon-box".
 * Uses variant-based styling via class-variance-authority.
 */
export function IconBox({
  icon,
  size,
  variant,
  appearance,
  radius,
  iconSize,
  className,
  iconClassName,
  ...props
}: IconBoxProps) {
  const resolvedSize: ComponentSize = (size as ComponentSize) ?? "base";
  const resolvedIconSize = iconSize ?? BOX_TO_ICON_SIZE[resolvedSize] ?? "sm";

  return (
    <div
      className={cn(
        iconBoxVariants({ size, variant, appearance, radius }),
        className,
      )}
      data-component="icon-box"
      {...props}
    >
      <Icon className={iconClassName} icon={icon} size={resolvedIconSize} />
    </div>
  );
}

// Backward compatibility aliases
/** @deprecated Use IconBox instead */
export const IconContainer = IconBox;
/** @deprecated Use IconBoxProps instead */
export type IconContainerProps = IconBoxProps;
