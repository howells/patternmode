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
  const { close, back, isNested, side } = useSheetPanel();
  // The grab pill is a top-of-sheet, drag-down affordance — it only belongs on
  // a bottom sheet. Side sheets drag horizontally, so a horizontal pill at the
  // top reads as wrong; render nothing rather than misplaced chrome.
  if (side !== "bottom") {
    return null;
  }
  const dismiss = isNested ? back : close;
  const isAsChild = asChild === true;
  const Comp = isAsChild ? Slot : "button";
  const defaults = isAsChild
    ? undefined
    : "flex shrink-0 cursor-grab touch-none items-center justify-center border-none bg-transparent pt-4 pb-1 text-inherit";
  return (
    <Comp
      aria-label="Dismiss"
      className={joinClassNames(defaults, className)}
      data-stacksheet-handle=""
      onClick={dismiss}
      style={style}
      type={isAsChild ? undefined : "button"}
    >
      {children ?? <div aria-hidden="true" className="h-1 w-9 rounded-sm bg-current/25" />}
    </Comp>
  );
};
