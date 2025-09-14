"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarSeparatorProps } from "../types";
import { toolbarVariants } from "../variants";

export const ToolbarSeparator = ({
  ref,
  className,
  variant,
  size,
  orientation,
  ...props
}: ToolbarSeparatorProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Separator> | null>;
}) => {
  const { separator } = toolbarVariants({ variant, size, orientation });
  return (
    <BaseToolbar.Separator
      className={cx(separator(), className)}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};
ToolbarSeparator.displayName = "ToolbarSeparator";
