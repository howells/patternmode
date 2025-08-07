import type { TextListIndicatorProps, TextListItemProps, TextListProps } from "./types";

import { cx } from "@patternmode/ui/cx";
import React from "react";
import { Icon } from "../icon/component";
import { indicatorVariants, listItemVariants, listVariants } from "./variants";

/**
 * List component with customizable styling and semantic markup options.
 */
export const TextList = ({
  as = "ul",
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListProps) => {
  const Component: React.ElementType = as || "ul";

  return (
    <Component
      data-testid="text-list"
      className={cx(!unstyled && listVariants({ variant, align }), className)}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Individual list item component with consistent styling and alignment.
 *
 * @component
 */
export function TextListItem({
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListItemProps) {
  return (
    <li
      className={cx(
        !unstyled && listItemVariants({ variant, align }),
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

/**
 * Custom indicator component for list items with flexible icon or content support.
 */
/**
 * Indicator component for list items with icon or custom content support.
 *
 * @component
 */
export function TextListIndicator({
  icon: IconComponent,
  size = "base",
  variant,
  unstyled,
  className,
  children,
  ...props
}: TextListIndicatorProps) {
  return (
    <span
      className={cx(!unstyled && indicatorVariants({ variant }), className)}
      {...props}
    >
      {IconComponent ? <Icon icon={IconComponent} size={size} /> : children}
    </span>
  );
}
