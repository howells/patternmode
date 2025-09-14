"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { ToolbarLinkProps } from "../types";
import { toolbarVariants } from "../variants";

export const ToolbarLink = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarLinkProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Link> | null>;
}) => {
  const { link } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Link className={cx(link(), className)} ref={ref} {...props} />
  );
};
ToolbarLink.displayName = "ToolbarLink";
