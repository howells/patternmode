import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import { useEffect } from "react";
import { useSheetPanel } from "../panel-context";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetTitle = ({ asChild, className, style, children }: SheetPartProps) => {
  const { panelId, registerTitle } = useSheetPanel();
  useEffect(() => registerTitle(), [registerTitle]);
  const isAsChild = asChild === true;
  const Comp = isAsChild ? Slot : "h2";
  const defaults = isAsChild ? undefined : "font-semibold text-sm";
  return (
    <Comp className={joinClassNames(defaults, className)} id={`${panelId}-title`} style={style}>
      {children}
    </Comp>
  );
};
