import { joinClassNames } from "@patternmode/system";
import { ArrowLeftIcon } from "../icons";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetOptionalContentPartProps } from "./sheet-part-types";

export const SheetBack = ({
  render,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) => {
  const { back, isNested } = useSheetPanel();
  if (!isNested) {
    return null;
  }
  const defaults = render ? undefined : "patternmode-stacksheet__back";
  return (
    <SheetPartElement
      defaultTagName="button"
      props={{
        "aria-label": children === undefined || children === null ? "Back" : undefined,
        children: children ?? <ArrowLeftIcon />,
        className: joinClassNames(defaults, className),
        "data-stacksheet-back": "",
        onClick: back,
        style,
        type: render ? undefined : "button",
      }}
      render={render}
    />
  );
};
