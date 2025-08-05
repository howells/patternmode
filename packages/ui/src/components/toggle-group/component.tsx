"use client";

import type { ToggleGroupItemProps, ToggleGroupProps } from "./types";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React, { use } from "react";
import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { getIconSizeForContext, Icon } from "../icon/component";
import { ToggleGroupContext } from "./constants";
import { toggleGroupVariants } from "./variants";

/**
 * A group of related toggle buttons that work together as a cohesive unit for multi-select or single-select interactions.
 */
const ToggleGroup = ({ ref, className, variant, size, orientation, children, ...props }: ToggleGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggleGroup> | null> }) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });
  const contextValue = React.useMemo(() => ({ size, variant }), [size, variant]);

  return (
    <ToggleGroupContext value={contextValue}>
      <BaseToggleGroup data-testid="toggle-group" ref={ref} className={cx(root(), className)} {...props}>
        {children}
      </BaseToggleGroup>
    </ToggleGroupContext>
  );
};

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = (
  { ref, className, variant, size, children, leftIcon: LeftIcon, rightIcon: RightIcon, iconStrokeWidth, ...props }: ToggleGroupItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> },
) => {
  const finalIconStrokeWidth = iconStrokeWidth ?? config.getIconStrokeWidth();
  const context = use(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  const { item } = toggleGroupVariants({
    variant: finalVariant,
    size: finalSize,
  });

  const hasChildren = children != null && children !== "";
  const hasLeftIcon = LeftIcon != null;
  const hasRightIcon = RightIcon != null;

  // Check if children contains only screen reader text by checking the rendered string
  const childrenString = React.isValidElement(children)
    ? ""
    : String(children || "").trim();
  const hasVisibleText = childrenString.length > 0;

  // Determine if this is an icon-only button (no visible text content)
  const isIconOnly = !hasVisibleText && (hasLeftIcon || hasRightIcon);

  // Get appropriate icon size based on the toggle group size
  const iconSize = getIconSizeForContext(finalSize);

  const renderContent = () => {
    // If no icons, return children directly
    if (!hasLeftIcon && !hasRightIcon) {
      return children;
    }

    // For icon-only buttons, render just the icon
    if (isIconOnly && hasLeftIcon) {
      return (
        <Icon icon={LeftIcon} size={iconSize} strokeWidth={finalIconStrokeWidth} />
      );
    }

    if (isIconOnly && hasRightIcon) {
      return (
        <Icon
          icon={RightIcon}
          size={iconSize}
          strokeWidth={finalIconStrokeWidth}
        />
      );
    }

    // For buttons with text and icons
    return (
      <span className="flex items-center justify-center gap-2">
        {hasLeftIcon && (
          <Icon
            icon={LeftIcon}
            size={iconSize}
            strokeWidth={finalIconStrokeWidth}
          />
        )}
        {hasChildren && children}
        {hasRightIcon && (
          <Icon
            icon={RightIcon}
            size={iconSize}
            strokeWidth={finalIconStrokeWidth}
          />
        )}
      </span>
    );
  };

  return (
    <BaseToggle
      ref={ref}
      className={cx(
        item(),
        // For icon-only buttons, make them square like button icon sizes
        isIconOnly && finalSize === "xs" && "min-w-4 w-4",
        isIconOnly && finalSize === "sm" && "min-w-6 w-6",
        isIconOnly && finalSize === "default" && "min-w-8 w-8",
        isIconOnly && finalSize === "lg" && "min-w-10 w-10",
        className,
      )}
      {...props}
    >
      {renderContent()}
    </BaseToggle>
  );
};

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem };
