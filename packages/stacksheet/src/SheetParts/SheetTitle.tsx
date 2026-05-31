import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";

import { useSheetPanel } from "../panel-context";
import type { SheetPartProps } from "./SheetPartTypes";

export function SheetTitle({
  asChild,
  className,
  style,
  children,
}: SheetPartProps) {
  const { panelId } = useSheetPanel();
  const Comp = asChild ? Slot : "h2";
  const defaults = asChild ? undefined : "font-semibold text-sm";
  return (
    <Comp
      className={joinClassNames(defaults, className)}
      id={`${panelId}-title`}
      style={style}
    >
      {children}
    </Comp>
  );
}
