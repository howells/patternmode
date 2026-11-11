import { joinClassNames } from "@patternmode/system";
import { useEffect } from "react";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetTitle = ({ render, className, style, children }: SheetPartProps) => {
  const { panelId, registerTitle } = useSheetPanel();
  useEffect(() => registerTitle(), [registerTitle]);
  const defaults = render ? undefined : "patternmode-stacksheet__title";
  return (
    <SheetPartElement
      defaultTagName="h2"
      props={{
        children,
        className: joinClassNames(defaults, className),
        "data-stacksheet-title": "",
        id: `${panelId}-title`,
        style,
      }}
      render={render}
    />
  );
};
