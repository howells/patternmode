import { ScrollArea } from "@base-ui/react/scroll-area";
import { joinClassNames } from "@patternmode/system";
import { useRender } from "../render";
import type { RenderProp } from "../render";
import type { SheetPartProps } from "./sheet-part-types";

// When `render` is provided the consumer supplies their own scroll container,
// so the body just forwards the structural flex classes onto it. Isolated so
// the `useRender` hook is only ever called unconditionally.
const SheetBodyRendered = ({
  render,
  className,
  style,
  children,
}: {
  render: RenderProp;
  className?: string;
  style?: SheetPartProps["style"];
  children: SheetPartProps["children"];
}) =>
  useRender({
    props: {
      // `relative min-h-0 flex-1` is structural for the panel flex layout.
      children,
      className: joinClassNames("relative min-h-0 flex-1", className),
      "data-stacksheet-no-drag": "",
      style,
    },
    render,
  });

export const SheetBody = ({ render, className, style, children }: SheetPartProps) => {
  if (render !== undefined) {
    return (
      <SheetBodyRendered className={className} render={render} style={style}>
        {children}
      </SheetBodyRendered>
    );
  }
  return (
    <ScrollArea.Root
      className={joinClassNames("relative flex min-h-0 flex-1 flex-col overflow-hidden", className)}
      data-stacksheet-no-drag=""
      style={style}
    >
      <ScrollArea.Viewport className="min-h-0 w-full flex-1 overscroll-contain">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex w-2 touch-none select-none p-0.5 opacity-0 transition-opacity data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded bg-current/15" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
