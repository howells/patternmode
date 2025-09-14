import { cx } from "@patternmode/utils/cx";
import { useContext } from "react";
import type { TextListItemProps } from "../types";
import { listItemVariants } from "../variants";
import { TextListContext } from "./text-list-context";

export function TextListItem({
  variant,
  align,
  unstyled,
  className,
  children,
  ...props
}: TextListItemProps) {
  useContext(TextListContext);
  return (
    <li
      className={cx(
        !unstyled && listItemVariants({ variant, align }),
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}
