"use client";

import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import type { SidebarGroupLabelProps } from "../types";
import { sidebarGroupLabelVariants } from "../variants";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ render = <div />, className, size = "base", ...props }, _ref) => {
  const defaultProps = {
    className: cx(sidebarGroupLabelVariants({ size }), className),
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
  } as useRender.ElementProps<"div">;

  const element = useRender({
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
});

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export { SidebarGroupLabel };
