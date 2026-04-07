"use client";

import { Item, Root } from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  createContext,
  forwardRef,
  useContext,
} from "react";

import type { ComponentSize } from "../../lib/size";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

const toggleGroupRootVariants = cva(
  "inline-flex items-center gap-1 rounded-[calc(var(--radius-lg)-4px)] bg-secondary/80 p-1"
);

const toggleGroupItemVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-[calc(var(--radius-md)-4px)] font-medium text-muted-foreground",
    "transition-all duration-200 ease-[var(--ease-snappy)]",
    "data-[state=on]:bg-white data-[state=on]:text-foreground data-[state=on]:shadow-2xs",
    "disabled:pointer-events-none disabled:opacity-45",
    ...focusRing(),
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-[0.82rem]",
        base: "h-9 px-3.5 text-[0.9rem]",
        lg: "h-10 px-4 text-[0.96rem]",
      } satisfies Record<Extract<ComponentSize, "sm" | "base" | "lg">, string>,
    },
    defaultVariants: {
      size: "base",
    },
  }
);

type ToggleGroupSize = Extract<ComponentSize, "sm" | "base" | "lg">;

const ToggleGroupContext = createContext<{ size: ToggleGroupSize }>({
  size: "base",
});

export type ToggleGroupProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof toggleGroupRootVariants> & {
    size?: ToggleGroupSize;
  };

function ToggleGroup({ className, size = "base", ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupContext.Provider value={{ size }}>
      <Root
        className={cn(toggleGroupRootVariants({ className }))}
        data-size={size}
        data-slot="toggle-group"
        {...props}
      />
    </ToggleGroupContext.Provider>
  );
}

export interface ToggleGroupItemProps
  extends ComponentPropsWithoutRef<typeof Item>,
    VariantProps<typeof toggleGroupItemVariants> {}

const ToggleGroupItem = forwardRef<
  ComponentRef<typeof Item>,
  ToggleGroupItemProps
>(({ className, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);
  const resolvedSize = size ?? context.size;

  return (
    <Item
      className={cn(toggleGroupItemVariants({ className, size: resolvedSize }))}
      data-slot="toggle-group-item"
      ref={ref}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = Item.displayName;

export { ToggleGroup, ToggleGroupItem };
