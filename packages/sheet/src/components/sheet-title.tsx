import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetTitleProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Title
>;

export const SheetTitle = ({
  ref: forwardedRef,
  className,
  ...props
}: SheetTitleProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Title> | null>;
}) => (
  <Dialog.Title
    className={cx("text-base", "text-zinc-900 dark:text-zinc-50", className)}
    ref={forwardedRef}
    {...props}
  />
);

SheetTitle.displayName = "SheetTitle";
