"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarInputProps } from "../types";
import { toolbarVariants } from "../variants";

export const ToolbarInput = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarInputProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Input> | null>;
}) => {
  const { input } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Input
      className={cx(input(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarInput.displayName = "ToolbarInput";
