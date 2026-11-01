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
const HEADER = [
  "grid min-h-11 shrink-0 grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-x-2",
  "[&>[data-stacksheet-back]]:col-start-1 [&>[data-stacksheet-back]]:row-start-1 [&>[data-stacksheet-back]]:justify-self-start",
  "[&>[data-stacksheet-title]]:col-start-2 [&>[data-stacksheet-title]]:row-start-1 [&>[data-stacksheet-title]]:min-w-0 [&>[data-stacksheet-title]]:truncate [&>[data-stacksheet-title]]:text-center",
  "[&>[data-stacksheet-close]]:static [&>[data-stacksheet-close]]:col-start-3 [&>[data-stacksheet-close]]:row-start-1 [&>[data-stacksheet-close]]:justify-self-end",
  "[&>[data-stacksheet-description]]:col-span-3 [&>[data-stacksheet-description]]:row-start-2 [&>[data-stacksheet-description]]:text-center [&>[data-stacksheet-description]]:text-balance",
].join(" ");

export const SheetHeader = ({ render, className, style, children }: SheetPartProps) => {
  // Keep `shrink-0` even in render mode; without it, the header collapses in a
  // flex-column panel layout. No bar, no divider — just a minimal top region.
  const defaults = render ? "shrink-0" : HEADER;
  return (
    <SheetPartElement
      defaultTagName="header"
      props={{ children, className: joinClassNames(defaults, className), style }}
      render={render}
    />
  );
};
