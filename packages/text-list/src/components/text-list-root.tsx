"use client";

import { cx } from "@patternmode/utils/cx";
import type { TextListProps } from "../types";
import { listVariants } from "../variants";
import { TextListContext } from "./text-list-context";

export const TextList = ({
  as = "ul",
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListProps) => {
  const Component: React.ElementType = as || "ul";
  return (
    <TextListContext.Provider value={{}}>
      <Component
        className={cx(!unstyled && listVariants({ variant, align }), className)}
        data-testid="text-list"
        {...props}
      >
        {children}
      </Component>
    </TextListContext.Provider>
  );
};

export { TextListContext };
