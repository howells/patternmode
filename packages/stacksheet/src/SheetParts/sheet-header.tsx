import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetHeader = ({ asChild, className, style, children }: SheetPartProps) => {
  const isAsChild = asChild === true;
  const Comp = isAsChild ? Slot : "header";
  // Keep `shrink-0` even on asChild; without it, header collapses in a
  // flex-column panel layout. No bar, no divider — just a minimal top region.
  const defaults = isAsChild ? "shrink-0" : "flex shrink-0 items-center justify-between gap-3";
  return (
    <Comp className={joinClassNames(defaults, className)} style={style}>
      {children}
    </Comp>
  );
};
