"use client";

import { PopoverContent, PopoverPortal } from "@patternmode/popover";
import { cx } from "@patternmode/utils/cx";
import * as React from "react";

export const CalendarPopover = ({
  ref: forwardedRef,
  className,
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent> & {
  ref?: React.RefObject<React.ElementRef<typeof PopoverContent> | null>;
}) => {
  return (
    <PopoverPortal>
      <PopoverContent
        className={cx("w-fit text-sm", "max-w-[95vw]", className)}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </PopoverContent>
    </PopoverPortal>
  );
};

CalendarPopover.displayName = "DatePicker.CalendarPopover";

