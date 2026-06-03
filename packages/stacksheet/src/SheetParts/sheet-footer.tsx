import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import type { SheetPartProps } from "./sheet-part-types";
export const SheetFooter = ({ asChild, className, style, children }: SheetPartProps) => {
  const Comp = asChild ? Slot : "footer";
  const defaults = asChild ? "shrink-0" : "flex shrink-0 items-center gap-2 border-t px-6 py-3";
  return (
    <Comp className={joinClassNames(defaults, className)} style={style}>
      {children}
    </Comp>
  );
};
