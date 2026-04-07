import { cn } from "@patternmode/ui/utils/cn";
import type * as React from "react";

/* ── Timeline Root ───────────────────────────────────────────────── */

export interface TimelineProps extends React.ComponentProps<"div"> {
  /** Orientation of the timeline. Default "vertical". */
  orientation?: "vertical" | "horizontal";
}

/**
 * Vertical or horizontal timeline for activity feeds, changelogs, and step-by-step flows.
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <TimelineItem>
 *     <TimelineDot variant="affirmative" />
 *     <TimelineContent>
 *       <TimelineTitle>Deployed to production</TimelineTitle>
 *       <TimelineDescription>v2.1.0 released</TimelineDescription>
 *     </TimelineContent>
 *   </TimelineItem>
 *   <TimelineItem>
 *     <TimelineDot />
 *     <TimelineContent>
 *       <TimelineTitle>PR merged</TimelineTitle>
 *     </TimelineContent>
 *   </TimelineItem>
 * </Timeline>
 * ```
 */
export function Timeline({
  children,
  className,
  orientation = "vertical",
  ...props
}: TimelineProps) {
  return (
    <div
      className={cn(
        orientation === "vertical" ? "flex flex-col" : "flex flex-row",
        className,
      )}
      data-component="timeline"
      data-slot="timeline"
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Timeline Item ───────────────────────────────────────────────── */

export interface TimelineItemProps extends React.ComponentProps<"div"> {
  /** Whether this is the last item (hides connector line). */
  last?: boolean;
}

export function TimelineItem({
  children,
  className,
  last = false,
  ...props
}: TimelineItemProps) {
  return (
    <div
      className={cn("group relative flex gap-3 pb-6 last:pb-0", className)}
      data-last={last || undefined}
      data-slot="timeline-item"
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Timeline Dot ────────────────────────────────────────────────── */

type TimelineDotVariant =
  | "default"
  | "affirmative"
  | "warning"
  | "destructive"
  | "info";

const DOT_VARIANT_CLASSES: Record<TimelineDotVariant, string> = {
  default: "border-border bg-card",
  affirmative: "border-transparent bg-emerald-500",
  warning: "border-transparent bg-amber-500",
  destructive: "border-transparent bg-red-500",
  info: "border-transparent bg-blue-500",
};

export interface TimelineDotProps extends React.ComponentProps<"div"> {
  /** Custom icon to render inside the dot. */
  icon?: React.ReactNode;
  /** Semantic color variant. */
  variant?: TimelineDotVariant;
}

export function TimelineDot({
  children,
  className,
  icon,
  variant = "default",
  ...props
}: TimelineDotProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Dot */}
      <div
        className={cn(
          "z-10 flex size-3 shrink-0 items-center justify-center rounded-full border-2",
          DOT_VARIANT_CLASSES[variant],
          icon && "size-6 border-0",
          className,
        )}
        data-slot="timeline-dot"
        {...props}
      >
        {icon || children}
      </div>
      {/* Connector line — hidden on last item via group-data-[last]:hidden */}
      <div className="mt-1 w-px flex-1 bg-border group-data-[last]:hidden" />
    </div>
  );
}

/* ── Timeline Content ────────────────────────────────────────────── */

export interface TimelineContentProps extends React.ComponentProps<"div"> {}

export function TimelineContent({
  children,
  className,
  ...props
}: TimelineContentProps) {
  return (
    <div
      className={cn("flex-1 pt-0", className)}
      data-slot="timeline-content"
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Timeline Title ──────────────────────────────────────────────── */

export function TimelineTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm font-medium text-foreground", className)}
      data-slot="timeline-title"
      {...props}
    >
      {children}
    </p>
  );
}

/* ── Timeline Description ────────────────────────────────────────── */

export function TimelineDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs text-muted-foreground", className)}
      data-slot="timeline-description"
      {...props}
    >
      {children}
    </p>
  );
}
