"use client";

import { cn } from "@patternmode/ui/utils/cn";
import { Root } from "@radix-ui/react-radio-group";
import type { LucideIcon } from "lucide-react";
import type React from "react";

import type { SwatchSize } from "../../lib/size";
import { SwatchGroupContext } from "./swatch-group-context";

type SwatchGroupProps = React.ComponentProps<typeof Root> & {
  size?: SwatchSize;
  /** Icon to display on selected swatch (e.g., Check). When set, replaces the selection ring. */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/**
 * SwatchGroup UI component.
 * Import from "@patternmode/ui/compositions/swatch-group".
 * Built on Radix UI primitives for accessible behavior.
 */
export function SwatchGroup({
  className,
  size = "base",
  icon,
  ...props
}: SwatchGroupProps) {
  return (
    <SwatchGroupContext.Provider value={{ size, icon }}>
      <Root
        className={cn("flex items-center gap-3", className)}
        data-component="swatch-group"
        data-slot="swatch-group"
        {...props}
      />
    </SwatchGroupContext.Provider>
  );
}
