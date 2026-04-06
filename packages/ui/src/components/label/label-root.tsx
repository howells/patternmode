import { Root } from "@radix-ui/react-label";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

const Label = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return (
    <Root
      className={cn(
        "text-label text-muted-foreground uppercase tracking-[0.08em]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Label.displayName = Root.displayName;

export { Label };
