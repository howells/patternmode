import { Dialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetDescriptionProps = React.ComponentPropsWithoutRef<
  typeof Dialog.Description
>;

export const SheetDescription = ({
  ref: forwardedRef,
  className,
  ...props
}: SheetDescriptionProps & {
  ref?: React.RefObject<React.ElementRef<typeof Dialog.Description> | null>;
}) => {
  return (
    <Dialog.Description
      className={cx("text-zinc-500 dark:text-zinc-500", className)}
      ref={forwardedRef}
      {...props}
    />
  );
};

SheetDescription.displayName = "SheetDescription";
