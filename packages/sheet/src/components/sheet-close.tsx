import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetCloseProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Close
>;

export const SheetClose = ({
  ref,
  className,
  ...props
}: SheetCloseProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Close> | null>;
}) => {
  return <Dialog.Close className={cx(className)} ref={ref} {...props} />;
};

SheetClose.displayName = "Sheet.Close";
