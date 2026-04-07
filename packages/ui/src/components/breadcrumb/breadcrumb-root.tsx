import { cn } from "@patternmode/ui/utils/cn";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import type * as React from "react";

/**
 * Breadcrumb UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
function Breadcrumb({
  ...props
}: React.ComponentProps<"nav"> & {
  separator?: React.ReactNode;
}) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * BreadcrumbList UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-muted-foreground text-sm",
        '[&>li[data-slot="breadcrumb-item"]:first-of-type]:text-foreground [&>li[data-slot="breadcrumb-item"]:last-of-type]:text-foreground',
        className,
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  );
}

/**
 * BreadcrumbItem UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      data-slot="breadcrumb-item"
      {...props}
    />
  );
}

/**
 * BreadcrumbLink UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? SlotPrimitive.Slot : "a";

  return (
    <Comp
      className={cn("transition-colors hover:text-foreground", className)}
      data-slot="breadcrumb-link"
      {...props}
    />
  );
}

/**
 * BreadcrumbPage UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      data-slot="breadcrumb-page"
      {...props}
    />
  );
}

/**
 * BreadcrumbSeparator UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    aria-hidden="true"
    className={cn("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
    data-slot="breadcrumb-separator"
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight className="rtl:rotate-180" />}
  </li>
);

/**
 * BreadcrumbEllipsis UI component.
 * Import from "@patternmode/ui/components/breadcrumb".
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
