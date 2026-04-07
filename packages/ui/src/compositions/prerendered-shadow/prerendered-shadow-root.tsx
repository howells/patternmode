import { type ShadowSize, shadows } from "../../lib/shadows";
import { cn } from "../../utils/cn";

export interface PrerenderedShadowProps extends React.ComponentProps<"div"> {
  /** Shadow token size from the design system. */
  size?: ShadowSize;
}

/**
 * Pre-rendered shadow overlay. Place inside a relatively positioned parent.
 * The shadow is always painted by the GPU; consumer controls visibility via
 * className (e.g. `opacity-0 group-hover:opacity-50 transition-opacity`)
 * or style prop.
 */
export function PrerenderedShadow({
  size = "xl",
  className,
  style,
  ...props
}: PrerenderedShadowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className,
      )}
      data-component="prerendered-shadow"
      style={{ boxShadow: shadows[size], ...style }}
      {...props}
    />
  );
}
