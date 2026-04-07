import { Slot } from "@radix-ui/react-slot";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import { cn } from "../../utils/cn";

export interface CenterProps extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
  inline?: boolean;
}

const Center = forwardRef<ElementRef<"div">, CenterProps>(
  ({ asChild = false, className, inline = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        className={cn(
          inline ? "inline-flex" : "flex",
          "items-center justify-center",
          className
        )}
        data-slot="center"
        ref={ref}
        {...props}
      />
    );
  }
);

Center.displayName = "Center";

export { Center };
