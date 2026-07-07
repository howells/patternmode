import { joinClassNames } from "@patternmode/system";
import { useEffect } from "react";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetTitle = ({ render, className, style, children }: SheetPartProps) => {
  const { panelId, registerTitle } = useSheetPanel();
  useEffect(() => registerTitle(), [registerTitle]);
  const defaults = render ? undefined : "font-semibold text-sm";
  return (
    <SheetPartElement
      defaultTagName="h2"
      props={{
        children,
        className: joinClassNames(defaults, className),
        id: `${panelId}-title`,
        style,
      }}
      render={render}
    />
  );
};
