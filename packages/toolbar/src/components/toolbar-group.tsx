"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarGroupProps } from "../types";
import { toolbarVariants } from "../variants";

export const ToolbarGroup = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarGroupProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Group> | null>;
}) => {
  const { group } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Group
      className={cx(group(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarGroup.displayName = "ToolbarGroup";
