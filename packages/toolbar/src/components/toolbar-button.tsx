"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarButtonProps } from "../types";
import { toolbarVariants } from "../variants";

export const ToolbarButton = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarButtonProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Button> | null>;
}) => {
  const { button } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Button
      className={cx(button(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarButton.displayName = "ToolbarButton";
