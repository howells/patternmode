"use client";

import type { ToggleGroupItemProps, ToggleGroupProps } from "./types";
import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import React, { use } from "react";
import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { Button } from "../button/component";
import { getIconSizeForContext } from "../icon/component";
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
  {
    ref,
    className,
    variant,
    size,
    children,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    iconStrokeWidth,
    render,
    icon,
    fullWidth,
    rounded,
    ...props
  }: ToggleGroupItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> },
) => {
  const finalIconStrokeWidth = iconStrokeWidth ?? config.getIconStrokeWidth();
  const context = use(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  const { item: _item } = toggleGroupVariants({
    variant: finalVariant,
    size: finalSize,
  });

  const _hasChildren = children != null && children !== "";
  const hasLeftIcon = LeftIcon != null;
  const hasRightIcon = RightIcon != null;

  // Check if children contains only screen reader text by checking the rendered string
  const childrenString = React.isValidElement(children)
    ? ""
    : String(children || "").trim();
  const hasVisibleText = childrenString.length > 0;

  // Determine if this is an icon-only button (no visible text content)
  const _isIconOnly = !hasVisibleText && (hasLeftIcon || hasRightIcon);

  // Get appropriate icon size based on the toggle group size
  const _iconSize = getIconSizeForContext(finalSize);

  const renderContent = () => {
    return children;
  };

  return (
    <BaseToggle
      ref={ref}
      render={render || ((toggleProps, state) => {
        const { ref: _, ...buttonProps } = toggleProps;
        return (
          <Button
            {...buttonProps}
            variant={state.pressed ? "secondary" : "ghost"}
            size={finalSize}
            leftIcon={LeftIcon}
            rightIcon={RightIcon}
            icon={icon}
            iconStrokeWidth={finalIconStrokeWidth}
            fullWidth={fullWidth}
            rounded={rounded}
          >
            {renderContent()}
          </Button>
        );
      })}
      {...props}
    />
  );
};

ToggleGroupItem.displayName = "ToggleGroupItem";

// Export the components
export { ToggleGroup, ToggleGroupItem };
