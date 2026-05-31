import { Slot } from "@radix-ui/react-slot";
import { useEffect } from "react";

import { useSheetPanel } from "../panel-context";
import type { SheetPartProps } from "./SheetPartTypes";

export function SheetDescription({
  asChild,
  className,
  style,
  children,
}: SheetPartProps) {
  const { panelId, registerDescription } = useSheetPanel();

  useEffect(() => registerDescription(), [registerDescription]);
  const Comp = asChild ? Slot : "p";
  return (
    <Comp className={className} id={`${panelId}-desc`} style={style}>
      {children}
    </Comp>
  );
}
