import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetTriggerProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Trigger
>;

export const SheetTrigger = ({
  ref,
  className,
  ...props
}: SheetTriggerProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Trigger> | null>;
}) => {
  return <Dialog.Trigger className={cx(className)} ref={ref} {...props} />;
};

SheetTrigger.displayName = "Sheet.Trigger";
