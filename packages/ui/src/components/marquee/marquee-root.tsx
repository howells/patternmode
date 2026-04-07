import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

export interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Animation duration in seconds. Default 30. */
  duration?: number;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Reverse direction. Default false. */
  reverse?: boolean;
}

/**
 * Infinite scrolling ticker. Duplicates children to create seamless loop.
 *
 * @example
 * ```tsx
 * <Marquee duration={20}>
 *   <Badge>React</Badge>
 *   <Badge>TypeScript</Badge>
 *   <Badge>Tailwind</Badge>
 * </Marquee>
 * ```
 */
export function Marquee({
  children,
  className,
  duration = 30,
  pauseOnHover = true,
  reverse = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      data-component="marquee"
      data-slot="marquee"
      {...props}
    >
      {[0, 1].map((copy) => (
        <div
          className={cn(
            "flex shrink-0 items-center gap-4",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          key={copy}
          style={{ animationDuration: `${duration}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
