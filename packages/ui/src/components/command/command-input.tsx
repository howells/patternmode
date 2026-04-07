import { cn } from "@patternmode/ui/utils/cn";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import type * as React from "react";
import { Icon } from "../icon";

/**
 * CommandInput renders the search field for a Command.
 * Import from "@patternmode/ui/components/command".
 */
export function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      className="flex h-9 items-center gap-2 border-b px-3"
      data-component="command-input-wrapper"
      data-slot="command-input-wrapper"
    >
      <Icon className="shrink-0 opacity-50" icon={Search} size="xs" />
      <CommandPrimitive.Input
        className={cn(
          "flex h-10 w-full rounded-lg bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        data-component="command-input"
        data-slot="command-input"
        {...props}
      />
    </div>
  );
}
