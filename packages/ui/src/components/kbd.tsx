/** biome-ignore-all lint/performance/noBarrelFile: needed for ui package */
import { cn } from "@patternmode/ui/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import type { ComponentSize } from "../lib/size";

/** Context for sharing size across KbdGroup children */
const KbdGroupContext = createContext<ComponentSize | undefined>(undefined);

/**
 * Size classes for kbd - maps component size to dimensions and text
 */
const KBD_SIZE_CLASSES: Record<ComponentSize, string> = {
  "2xs": "h-4 min-w-4 px-0.5 text-[10px] [&_svg:not([class*='size-'])]:size-2",
  xs: "h-4.5 min-w-4.5 px-0.5 text-[11px] [&_svg:not([class*='size-'])]:size-2.5",
  sm: "h-5 min-w-5 px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
  base: "h-5.5 min-w-5.5 px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
  lg: "h-6 min-w-6 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
  xl: "h-7 min-w-7 px-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
  "2xl": "h-8 min-w-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
  "3xl": "h-9 min-w-9 px-2 text-base [&_svg:not([class*='size-'])]:size-5",
};

/**
 * kbdVariants variant class helper for Kbd.
 * Import from "@patternmode/ui/components/kbd".
 * Uses variant-based styling via class-variance-authority.
 */
const kbdVariants = cva(
  "pointer-events-none inline-flex w-fit select-none items-center justify-center gap-1 rounded-sm font-medium font-sans",
  {
    variants: {
      size: KBD_SIZE_CLASSES,
      variant: {
        default: "border border-border bg-input text-muted-foreground",
        primary: "border border-primary/20 bg-primary/10 text-primary",
        secondary:
          "border border-secondary bg-secondary text-secondary-foreground",
        destructive:
          "border border-destructive/20 bg-destructive/10 text-destructive",
        brand: "border border-brand/20 bg-brand/10 text-brand",
        ghost: "border-transparent bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
    },
  },
);

type KbdProps = React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>;

/**
 * Keyboard key indicator for displaying keyboard shortcuts.
 *
 * @param props - The kbd props
 * @param props.size - Kbd size. Options: "2xs", "xs", "sm" (default), "base", "lg", "xl", "2xl", "3xl".
 * @param props.variant - Visual variant. Options: "default", "primary", "secondary", "destructive", "brand", "ghost".
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Key text or icon (e.g., "⌘", "K", "Enter").
 * @param props... - All other standard HTML kbd element props.
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd size="xs" variant="secondary">K</Kbd>
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 * ```
 */
function Kbd({ className, size, variant, ...props }: KbdProps) {
  const groupSize = useContext(KbdGroupContext);
  const resolvedSize = size ?? groupSize;

  return (
    <kbd
      className={cn(
        kbdVariants({ size: resolvedSize, variant }),
        "[[data-slot=tooltip-content]_&]:border-transparent [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background [[data-slot=tooltip-content]_&]:shadow-none dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

type KbdGroupProps = React.ComponentProps<"div"> & {
  /** Size to apply to all child Kbd components */
  size?: ComponentSize;
};

/**
 * Container for grouping multiple keyboard keys together (e.g., "⌘ + K").
 *
 * @param props - The kbd group props
 * @param props.size - Size to apply to all child Kbd components. Options: "2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl".
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Kbd components to group.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <KbdGroup size="xs">
 *   <Kbd>⌘</Kbd>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 * ```
 */
function KbdGroup({ className, size, children, ...props }: KbdGroupProps) {
  return (
    <KbdGroupContext.Provider value={size}>
      <kbd
        className={cn("inline-flex items-center gap-1", className)}
        data-slot="kbd-group"
        {...props}
      >
        {children}
      </kbd>
    </KbdGroupContext.Provider>
  );
}

export type { KbdGroupProps, KbdProps };
export { KBD_SIZE_CLASSES, Kbd, KbdGroup, kbdVariants };
