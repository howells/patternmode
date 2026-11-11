import { joinClassNames } from "@patternmode/system";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetFooter = ({ render, className, style, children }: SheetPartProps) => {
  // A custom footer keeps only its place in the panel's flex column.
  const defaults = render
    ? "patternmode-stacksheet__custom-footer"
    : "patternmode-stacksheet__footer";
  return (
    <SheetPartElement
      defaultTagName="footer"
      props={{ children, className: joinClassNames(defaults, className), style }}
      render={render}
    />
  );
};
