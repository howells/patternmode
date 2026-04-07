"use client";

import { Button } from "@patternmode/ui/components/button";
import { Dot } from "@patternmode/ui/components/dot";
import { Icon } from "@patternmode/ui/components/icon";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { ScrollFade } from "@patternmode/ui/compositions/scroll-fade";
import { cn } from "@patternmode/ui/utils/cn";
import { Item, Root } from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  SEGMENTED_GAP,
  SEGMENTED_INDICATOR_ACTIVE_CLASS,
  SEGMENTED_SHELL_BASE,
  SEGMENTED_SHELL_PADDING,
  SEGMENTED_TRIGGER_PADDING,
} from "../../compositions/segmented";
import { isDevelopmentBrowser } from "../../lib/is-development-browser";
import type { ComponentSize } from "../../lib/size";

const segmentedShellPaddingVariants = (
  Object.entries(SEGMENTED_SHELL_PADDING) as [ComponentSize, string][]
).map(([size, className]) => ({
  variant: "pill" as const,
  size,
  class: className,
}));

// Internal item variants - decoupled from Toggle to allow independent evolution
const toggleGroupItemVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-normal text-sm opacity-75 outline-none transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        "2xs": "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        xs: "h-7 gap-1.5 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        base: "h-9 gap-2 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 gap-2 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        xl: "h-11 gap-2 px-5 text-sm [&_svg:not([class*='size-'])]:size-5",
        "2xl": "h-12 gap-2 px-6 text-sm [&_svg:not([class*='size-'])]:size-5",
        "3xl": "h-14 gap-2 px-7 text-sm [&_svg:not([class*='size-'])]:size-6",
      },
    },
    compoundVariants: [
      { size: "2xs", class: "data-[icon-only]:size-6 data-[icon-only]:p-0" },
      { size: "xs", class: "data-[icon-only]:size-7 data-[icon-only]:p-0" },
      { size: "sm", class: "data-[icon-only]:size-8 data-[icon-only]:p-0" },
      { size: "base", class: "data-[icon-only]:size-9 data-[icon-only]:p-0" },
      { size: "lg", class: "data-[icon-only]:size-10 data-[icon-only]:p-0" },
      { size: "xl", class: "data-[icon-only]:size-11 data-[icon-only]:p-0" },
      { size: "2xl", class: "data-[icon-only]:size-12 data-[icon-only]:p-0" },
      { size: "3xl", class: "data-[icon-only]:size-14 data-[icon-only]:p-0" },
    ],
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  },
);

const toggleGroupVariants = cva(
  "group/toggle-group inline-flex max-w-full items-center overflow-hidden",
  {
    variants: {
      variant: {
        default: "rounded-md",
        outline: "rounded-md",
        pill: SEGMENTED_SHELL_BASE,
      },
      size: {
        "2xs": "",
        xs: "",
        sm: "",
        base: "",
        lg: "",
        xl: "",
        "2xl": "",
        "3xl": "",
      },
    },
    compoundVariants: [
      // Pill variant padding on the shell (gaps move to inner container)
      ...segmentedShellPaddingVariants,
    ],
    defaultVariants: {
      variant: "outline",
      size: "sm",
    },
  },
);

/** Gap classes for the inner flex container by variant */
const VARIANT_GAP = {
  default: "gap-1",
  outline: "gap-0",
};

type ToggleGroupContextValue = VariantProps<typeof toggleGroupVariants>;

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "sm",
  variant: "outline",
});

/**
 * Group of toggle buttons where one or multiple can be active.
 * Built on Radix UI primitives for accessible behavior.
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single" variant="outline">
 *   <ToggleGroupItem value="bold" icon={Bold} aria-label="Bold" />
 *   <ToggleGroupItem value="italic" icon={Italic} aria-label="Italic" />
 * </ToggleGroup>
 * ```
 */
function ToggleGroup({
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}: React.ComponentProps<typeof Root> &
  VariantProps<typeof toggleGroupVariants>) {
  const resolvedSize = size ?? "sm";
  const resolvedVariant = variant ?? "outline";
  const containerRef = useRef<HTMLDivElement>(null);
  const [showEndFade, setShowEndFade] = useState(false);

  const gapClass =
    resolvedVariant === "pill"
      ? SEGMENTED_GAP[resolvedSize]
      : (VARIANT_GAP[resolvedVariant as keyof typeof VARIANT_GAP] ?? "gap-0");

  useEffect(() => {
    if (resolvedVariant !== "pill") {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const viewport = container.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    if (!viewport) {
      return;
    }

    function checkScroll() {
      if (!viewport) {
        return;
      }
      const isScrollable = viewport.scrollWidth > viewport.clientWidth + 1;
      const isAtEnd =
        viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
      setShowEndFade(isScrollable && !isAtEnd);
    }

    checkScroll();

    const observer = new ResizeObserver(checkScroll);
    observer.observe(viewport);
    viewport.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", checkScroll);
    };
  }, [resolvedVariant]);

  return (
    <Root
      className={cn(toggleGroupVariants({ variant, size }), className)}
      data-size={size}
      data-slot="toggle-group"
      data-variant={variant}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        <div className="relative min-w-0 flex-1" ref={containerRef}>
          <ScrollArea hideScrollbar orientation="horizontal">
            <div className={cn("inline-flex items-center", gapClass)}>
              {children}
            </div>
          </ScrollArea>
          {resolvedVariant === "pill" && showEndFade && (
            <ScrollFade
              className="rounded-r-full"
              orientation="horizontal"
              position="end"
              size="sm"
              theme="gray"
            />
          )}
        </div>
      </ToggleGroupContext.Provider>
    </Root>
  );
}

/** Props for a single item within a ToggleGroup. */
export interface ToggleGroupItemProps
  extends React.ComponentProps<typeof Item> {
  /** Optional count to display alongside the item label. */
  count?: number;
  /** Dot color indicator (CSS color value). */
  dot?: string;
  /** Icon component to display in the item. */
  icon?: LucideIcon;
  /** Size override (inherited from ToggleGroup context when not set). */
  size?: ComponentSize;
  /** Variant override (inherited from ToggleGroup context when not set). */
  variant?: "default" | "outline" | "pill";
}

/** Individual item within a ToggleGroup. Supports icons, dots, and count badges. */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  icon,
  count,
  dot,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  const resolvedVariant = context.variant ?? variant;
  const resolvedSize = context.size ?? size ?? "sm";

  if (
    isDevelopmentBrowser() &&
    icon &&
    !children &&
    !props["aria-label"] &&
    !props["aria-labelledby"]
  ) {
    console.warn(
      "ToggleGroupItem: Icon-only item is missing `aria-label` or `aria-labelledby`. " +
        "Screen readers will announce this as an unlabelled toggle. " +
        `Icon: ${icon?.displayName ?? icon?.name ?? "unknown"}`,
    );
  }

  // For pill variant, use Radix Item with asChild wrapping a real Button
  if (resolvedVariant === "pill") {
    return (
      <Item
        asChild
        data-slot="toggle-group-item"
        data-variant={resolvedVariant}
        {...props}
      >
        <Button
          className={cn(
            "text-muted-foreground data-[state=on]:text-foreground",
            SEGMENTED_INDICATOR_ACTIVE_CLASS,
            // Override Button's built-in padding with shared segmented padding
            // so pill items match Tabs/TabNavigation triggers exactly
            SEGMENTED_TRIGGER_PADDING[resolvedSize],
            "h-auto",
            className,
          )}
          icon={icon}
          pressed={false}
          radius="full"
          size={resolvedSize}
          variant="ghost"
        >
          {dot && <Dot color={dot} size="xs" />}
          {children}
          {count !== undefined && (
            <span className="text-gray-400 text-xs tabular-nums">{count}</span>
          )}
        </Button>
      </Item>
    );
  }

  // For other variants, use internal toggleGroupItemVariants
  return (
    <Item
      className={cn(
        toggleGroupItemVariants({
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        "shrink-0 shadow-none focus:z-10 focus-visible:z-10 data-[variant=outline]:rounded-none data-[variant=outline]:border-s-0 data-[variant=outline]:last:rounded-e-md data-[variant=outline]:first:rounded-s-md data-[variant=outline]:first:border-s",
        className,
      )}
      data-size={resolvedSize}
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      {...props}
    >
      {dot && <Dot color={dot} size="xs" />}
      {icon ? <Icon icon={icon} size="xs" /> : null}
      {children}
      {count !== undefined && (
        <span className="text-gray-400 text-xs tabular-nums">{count}</span>
      )}
    </Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
