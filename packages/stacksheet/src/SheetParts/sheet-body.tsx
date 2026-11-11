import { ScrollArea } from "@base-ui/react/scroll-area";
import { joinClassNames } from "@patternmode/system";
import { useRender } from "@base-ui/react/use-render";
import { SAFE_BOTTOM_PADDING } from "../stacking";
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
  render: useRender.RenderProp;
  className?: string;
  style?: SheetPartProps["style"];
  children: SheetPartProps["children"];
}) =>
  useRender({
    props: {
      // The custom body keeps its structural place in the panel flex layout.
      children,
      className: joinClassNames("patternmode-stacksheet__custom-body", className),
      style,
    },
    render,
  });

// The body takes part in Drag: pulled toward dismissal while scrolled to its
// edge, it hands the gesture to the Sheet (the iOS scroll-to-drag handoff);
// otherwise it scrolls. See `commitGesture`.
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
      className={joinClassNames("patternmode-stacksheet__body", className)}
      style={style}
    >
      <ScrollArea.Viewport
        className="patternmode-stacksheet__body-viewport"
        // Content scrolls under the home indicator and its end clears it.
        style={{ paddingBottom: SAFE_BOTTOM_PADDING }}
      >
        {children}
      </ScrollArea.Viewport>
      {/* Dragging the thumb scrolls; it must never move the Sheet. */}
      <ScrollArea.Scrollbar
        data-stacksheet-no-drag=""
        className="patternmode-stacksheet__scrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="patternmode-stacksheet__scrollbar-thumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
