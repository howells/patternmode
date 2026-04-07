import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-6 items-center rounded-[calc(var(--radius-sm)-2px)] border border-border/80 bg-white px-2 font-mono text-[0.78rem] text-muted-foreground shadow-2xs",
        className
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

export { Kbd };
