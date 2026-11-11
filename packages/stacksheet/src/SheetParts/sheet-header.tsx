import { joinClassNames } from "@patternmode/system";
import { SheetPartElement } from "./sheet-part-element";
import type { SheetPartProps } from "./sheet-part-types";

/**
 * A navigation bar, as an iOS sheet has: one row, back at the leading edge, the
 * title centred on the sheet and cut to one line, close at the trailing edge.
 * The two edge columns are equal, so the title stays centred whether or not
 * back is shown. A description put in the header gets a row of its own under
 * the bar, centred, rather than squeezing in beside the buttons. Each part is
 * placed by its data attribute, so order in the markup doesn't matter, and a
 * corner-floated Close is brought into the row.
 */
export const SheetHeader = ({ render, className, style, children }: SheetPartProps) => {
  // A custom header keeps `shrink-0`; without it, the header collapses in a
  // flex-column panel layout. No bar, no divider — just a minimal top region.
  const defaults = render
    ? "patternmode-stacksheet__custom-header"
    : "patternmode-stacksheet__header";
  return (
    <SheetPartElement
      defaultTagName="header"
      props={{ children, className: joinClassNames(defaults, className), style }}
      render={render}
    />
  );
};
