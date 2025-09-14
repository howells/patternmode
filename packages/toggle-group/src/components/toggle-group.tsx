"use client";

import { Toggle as BaseToggle } from "@base-ui-components/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui-components/react/toggle-group";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import React, { use } from "react";
import { ToggleGroupContext } from "../constants";
import type { ToggleGroupItemProps, ToggleGroupProps } from "../types";
import { toggleGroupVariants } from "../variants";

const ToggleGroup = ({
  ref,
  className,
  variant,
  size,
  orientation,
  children,
  ...props
}: ToggleGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggleGroup> | null> }) => {
  const { root } = toggleGroupVariants({ variant, size, orientation });
  const contextValue = React.useMemo(() => ({ size, variant }), [size, variant]);
  return (
    <ToggleGroupContext value={contextValue}>
      <BaseToggleGroup className={cx(root(), className)} data-testid="toggle-group" ref={ref} {...props}>
        {children}
      </BaseToggleGroup>
    </ToggleGroupContext>
  );
};

ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = ({
  ref,
  className: _className,
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
}: ToggleGroupItemProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToggle> | null> }) => {
  const DEFAULT_ICON_STROKE = 1.5;
  const finalIconStrokeWidth = iconStrokeWidth ?? DEFAULT_ICON_STROKE;
  const context = use(ToggleGroupContext);
  const finalSize = size ?? context.size;
  const finalVariant = variant ?? context.variant;
  const { item: _item } = toggleGroupVariants({ variant: finalVariant, size: finalSize });
  const childrenString = React.isValidElement(children) ? "" : String(children || "").trim();
  const _isIconOnly = !childrenString.length && (LeftIcon != null || RightIcon != null);

  const renderContent = () => {
    return children;
  };

  return (
    <BaseToggle
      ref={ref}
      render={
        render ||
        ((toggleProps, state) => {
          const { ref: toggleRef, ...buttonProps } = toggleProps;
          return (
            <Button
              {...buttonProps}
              fullWidth={fullWidth}
              icon={icon}
              iconStrokeWidth={finalIconStrokeWidth}
              leftIcon={LeftIcon}
              render={(renderProps) => (
                <button type="button" {...renderProps} ref={toggleRef as React.Ref<HTMLButtonElement>} />
              )}
              rightIcon={RightIcon}
              rounded={rounded}
              size={finalSize}
              variant={state.pressed ? "secondary" : "ghost"}
            >
              {renderContent()}
            </Button>
          );
        })
      }
      {...props}
    />
  );
};

export { ToggleGroup, ToggleGroupItem };
