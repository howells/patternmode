import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { useSheetPanel } from "../panel-context";
import type { SheetOptionalContentPartProps } from "./SheetPartTypes";

export function SheetHandle({
  asChild,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) {
  const { close, back, isNested } = useSheetPanel();
  const dismiss = isNested ? back : close;
  const Comp = asChild ? Slot : "div";
  const defaults = asChild
    ? undefined
    : "flex shrink-0 cursor-grab touch-none items-center justify-center pt-4 pb-1";
  return (
    <Comp
      aria-label="Dismiss"
      className={joinClassNames(defaults, className)}
      data-stacksheet-handle=""
      onClick={dismiss}
      onKeyDown={(e: ReactKeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          dismiss();
        }
      }}
      role="button"
      style={style}
      tabIndex={0}
    >
      {children ?? (
        <div aria-hidden="true" className="h-1 w-9 rounded-sm bg-current/25" />
      )}
    </Comp>
  );
}
