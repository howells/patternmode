import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";

import type { SheetPartProps } from "./SheetPartTypes";

export function SheetHeader({
  asChild,
  className,
  style,
  children,
}: SheetPartProps) {
  const Comp = asChild ? Slot : "header";
  // Keep `shrink-0` even on asChild; without it, header collapses in a
  // flex-column panel layout. Drop the rest because it is decorative.
  const defaults = asChild
    ? "shrink-0"
    : "flex h-14 shrink-0 items-center justify-between border-b px-6";
  return (
    <Comp className={joinClassNames(defaults, className)} style={style}>
      {children}
    </Comp>
  );
}
