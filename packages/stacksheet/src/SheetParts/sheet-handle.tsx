import { joinClassNames } from "@patternmode/system";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetOptionalContentPartProps } from "./sheet-part-types";

export const SheetHandle = ({
  render,
  className,
  style,
  children,
}: SheetOptionalContentPartProps) => {
  const { back, side } = useSheetPanel();
  // The grab pill is a top-of-sheet, drag-down affordance — it only belongs on
  // a bottom sheet. Side sheets drag horizontally, so a horizontal pill at the
  // top reads as wrong; render nothing rather than misplaced chrome.
  if (side !== "bottom") {
    return null;
  }
  const defaults = render ? undefined : "patternmode-stacksheet__handle";
  return (
    <SheetPartElement
      defaultTagName="button"
      props={{
        "aria-label": "Dismiss",
        children: children ?? (
          <div aria-hidden="true" className="patternmode-stacksheet__handle-pill" />
        ),
        className: joinClassNames(defaults, className),
        "data-stacksheet-handle": "",
        // `back` pops the top Sheet, which closes the stack when it is the last.
        onClick: back,
        style,
        type: render ? undefined : "button",
      }}
      render={render}
    />
  );
};
