import { cx } from "@patternmode/utils/cx";
import type * as React from "react";

export type SheetBodyProps = React.ComponentPropsWithoutRef<"div">;

export const SheetBody = ({
  ref,
  className,
  ...props
}: SheetBodyProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return <div className={cx("flex-1 py-4", className)} ref={ref} {...props} />;
};

SheetBody.displayName = "Sheet.Body";
