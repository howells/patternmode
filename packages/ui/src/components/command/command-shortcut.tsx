import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";

function CommandShortcut({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-[0.72rem] text-muted-foreground uppercase tracking-[0.08em]",
        className
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

export { CommandShortcut };
