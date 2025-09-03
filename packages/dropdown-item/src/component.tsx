"use client";

import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { DropdownItemProps } from "./types";
import { dropdownItemVariants } from "./variants";

const DropdownItem = ({
  ref,
  className,
  variant,
  highlighted = false,
  selected = false,
  hint,
  children,
  role = "option",
  ...props
}: DropdownItemProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <Button
      aria-selected={selected}
      className={cx(dropdownItemVariants({ variant }), className)}
      data-highlighted={highlighted ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      data-testid="dropdown-item"
      ref={ref}
      render={<div />}
      role={role}
      variant="ghost"
      {...props}
    >
      {children}
      {hint && (
        <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
          {hint}
        </span>
      )}
    </Button>
  );
};

DropdownItem.displayName = "DropdownItem";

export { DropdownItem };
