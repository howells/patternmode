import { joinClassNames } from "@patternmode/system";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetFooter = ({ render, className, style, children }: SheetPartProps) => {
  const defaults = render ? "shrink-0" : "flex shrink-0 items-center gap-2 border-t px-6 py-3";
  return (
    <SheetPartElement
      defaultTagName="footer"
      props={{ children, className: joinClassNames(defaults, className), style }}
      render={render}
    />
  );
};
