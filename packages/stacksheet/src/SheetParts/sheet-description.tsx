import { useEffect } from "react";
import { useSheetPanel } from "../panel-context";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

export const SheetDescription = ({ render, className, style, children }: SheetPartProps) => {
  const { panelId, registerDescription } = useSheetPanel();
  useEffect(() => registerDescription(), [registerDescription]);
  return (
    <SheetPartElement
      defaultTagName="p"
      props={{ children, className, id: `${panelId}-desc`, style }}
      render={render}
    />
  );
};
