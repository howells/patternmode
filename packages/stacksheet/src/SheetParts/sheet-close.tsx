import { joinClassNames } from "@patternmode/system";
import { Slot } from "@radix-ui/react-slot";
import { XIcon } from "../icons";
import { useSheetPanel } from "../panel-context";
import type { SheetOptionalContentPartProps } from "./sheet-part-types";

export const SheetClose = ({
  asChild,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) => {
  const { close } = useSheetPanel();
  const isAsChild = asChild === true;
  const Comp = isAsChild ? Slot : "button";
  const defaults = isAsChild
    ? undefined
    : "flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-0 text-inherit opacity-60 transition-opacity duration-150 hover:opacity-100";
  return (
    <Comp
      aria-label={children === undefined || children === null ? "Close" : undefined}
      className={joinClassNames(defaults, className)}
      onClick={close}
      style={style}
      type={isAsChild ? undefined : "button"}
    >
      {children ?? <XIcon />}
    </Comp>
  );
};
