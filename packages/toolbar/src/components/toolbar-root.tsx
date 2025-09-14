"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarProps } from "../types";
import { toolbarVariants } from "../variants";

export const Toolbar = ({
  ref,
  className,
  variant,
  size,
  orientation,
  ...props
}: ToolbarProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Root> | null>;
}) => {
  const { root } = toolbarVariants({ variant, size, orientation });
  return (
    <BaseToolbar.Root
      className={cx(root(), className)}
      data-testid="toolbar"
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};
Toolbar.displayName = "Toolbar";
