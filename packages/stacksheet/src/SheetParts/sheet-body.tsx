import { joinClassNames } from "@patternmode/system";
import {
  Root as ScrollAreaRoot,
  Scrollbar as ScrollAreaScrollbar,
  Thumb as ScrollAreaThumb,
  Viewport as ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { Slot } from "@radix-ui/react-slot";
import type { SheetPartProps } from "./sheet-part-types";
export const SheetBody = ({ asChild, className, style, children }: SheetPartProps) => {
  if (asChild) {
    // `relative min-h-0 flex-1` is structural for the panel flex layout.
    return (
      <Slot
        className={joinClassNames("relative min-h-0 flex-1", className)}
        data-stacksheet-no-drag=""
        style={style}
      >
        {children}
      </Slot>
    );
  }
  return (
    <ScrollAreaRoot
      className={joinClassNames("relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}
      data-stacksheet-no-drag=""
      style={style}
    >
      <ScrollAreaViewport className="min-h-0 w-full flex-1 overscroll-contain">
        {children}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar className="flex w-2 touch-none select-none p-0.5" orientation="vertical">
        <ScrollAreaThumb className="relative flex-1 rounded bg-current/15" />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
  );
};
