import { joinClassNames } from "@patternmode/system";
import { XIcon } from "../icons";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetOptionalContentPartProps } from "./sheet-part-types";

export const SheetClose = ({
  render,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) => {
  const { close } = useSheetPanel();
  const defaults = render ? undefined : "patternmode-stacksheet__close";
  return (
    <SheetPartElement
      defaultTagName="button"
      props={{
        "aria-label": children === undefined || children === null ? "Close" : undefined,
        children: children ?? <XIcon />,
        className: joinClassNames(defaults, className),
        "data-stacksheet-close": "",
        onClick: close,
        style,
        type: render ? undefined : "button",
      }}
      render={render}
    />
  );
};
