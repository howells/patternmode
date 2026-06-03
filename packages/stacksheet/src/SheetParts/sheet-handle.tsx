import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import { useSheetPanel } from "../panel-context";
import type { SheetOptionalContentPartProps } from "./sheet-part-types";
export const SheetHandle = ({
  asChild,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) => {
  const { close, back, isNested } = useSheetPanel();
  const dismiss = isNested ? back : close;
  const Comp = asChild ? Slot : "button";
  const defaults = asChild
    ? undefined
    : "flex shrink-0 cursor-grab touch-none items-center justify-center border-none bg-transparent pt-4 pb-1 text-inherit";
  return (
    <Comp
      aria-label="Dismiss"
      className={joinClassNames(defaults, className)}
      data-stacksheet-handle=""
      onClick={dismiss}
      style={style}
      type={asChild ? undefined : "button"}
    >
      {children ?? <div aria-hidden="true" className="h-1 w-9 rounded-sm bg-current/25" />}
    </Comp>
  );
};
