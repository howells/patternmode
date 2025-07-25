"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { PanelLeft, PanelLeftDashed } from "lucide-react";
import Link from "next/link";
import React, { forwardRef, useId } from "react";
import { Button } from "../button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator/separator";
import { Subheading } from "../subheading";

export function Sidebar({
  className,
  children,
  isCollapsed = false,
  onToggle,
  showToggle = false,
  ...props
}: React.ComponentPropsWithoutRef<"nav"> & {
  isCollapsed?: boolean;
  onToggle?: () => void;
  showToggle?: boolean;
}) {
  return (
    <nav
      {...props}
      className={clsx(className, "flex h-full min-h-0 flex-col relative")}
      style={{
        width: "var(--sidebar-width, 16rem)",
      }}
    >
      {/* Toggle button - positioned absolutely within sidebar */}
      {showToggle && (
        <div
          className={clsx(
            "absolute top-0 z-10 group",
            isCollapsed
              ? "inset-x-2 h-12 flex items-center justify-center opacity-0 hover:opacity-100 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-md transition-opacity duration-200"
              : "right-3.5 top-3"
          )}
        >
          <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggle} />
        </div>
      )}
      {children}
    </nav>
  );
}

export function SidebarToggle({
  className,
  isCollapsed,
  onToggle,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <Button
      {...props}
      onClick={onToggle}
      variant="ghost"
      size="icon"
      className={clsx(className)}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      leftIcon={isCollapsed ? PanelLeft : PanelLeftDashed}
    ></Button>
  );
}

export function SidebarHeader({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "h-16 flex flex-col border-b border-zinc-950/5 dark:border-white/5 transition-all duration-200",
        "[&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarBody({
  className,
  isCollapsed,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <ScrollArea
      className={clsx(className, "flex-1")}
      viewportClassName="[&>[data-slot=section]+[data-slot=section]]:mt-8"
      {...props}
    >
      {children}
    </ScrollArea>
  );
}

export function SidebarFooter({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex flex-col border-t border-zinc-950/5 dark:border-white/5 transition-all duration-200",
        isCollapsed ? "p-2" : "p-4",
        "[&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  );
}

export function SidebarContent({
  className,
  isCollapsed,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  isCollapsed?: boolean;
}) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "transition-all duration-200",
        isCollapsed ? "px-2" : "px-4"
      )}
    >
      {children}
    </div>
  );
}

export function SidebarSection({
  className,
  title,
  href,
  defaultOpen = true,
  isCollapsed,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  title?: React.ReactNode;
  href?: string;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}) {
  const id = useId();

  // If no title provided, render as a simple container
  if (!title) {
    return (
      <LayoutGroup id={id}>
        <div
          {...props}
          data-slot="section"
          className={clsx(className, "flex flex-col gap-0.5")}
        >
          {children}
        </div>
      </LayoutGroup>
    );
  }

  // Render as collapsible section with title
  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-slot="section"
        className={clsx(className, "flex flex-col gap-0.5")}
      >
        <Collapsible defaultOpen={defaultOpen}>
          <CollapsibleTrigger
            href={href}
            className={clsx("transition-all duration-200")}
            padding={clsx(isCollapsed ? "px-2" : "px-4")}
          >
            <SidebarHeading isCollapsed={isCollapsed}>{title}</SidebarHeading>
          </CollapsibleTrigger>
          <CollapsibleContent
            className={clsx(
              "transition-all duration-200",
              isCollapsed ? "px-2" : "px-2"
            )}
          >
            {children}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </LayoutGroup>
  );
}

export function SidebarDivider({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<typeof Separator> & {
  isCollapsed?: boolean;
}) {
  if (isCollapsed) return null;

  return <Separator {...props} className={clsx(className, "")} />;
}

export function SidebarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={clsx(className, "mt-8 flex-1")}
    />
  );
}

export function SidebarHeading({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"h3"> & {
  isCollapsed?: boolean;
}) {
  if (isCollapsed) return null;

  return <Subheading {...props} className={clsx(className)} />;
}

export const SidebarItem = forwardRef(function SidebarItem(
  {
    current,
    className,
    children,
    isCollapsed,
    href,
    ...props
  }: {
    current?: boolean;
    className?: string;
    children: React.ReactNode;
    isCollapsed?: boolean;
    href?: string;
  } & Omit<React.ComponentPropsWithoutRef<"button">, "className">,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <span className={clsx(className, "relative")}>
      {current && !isCollapsed && (
        <motion.span
          layoutId="current-indicator"
          className="absolute inset-y-2 -left-2 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
        />
      )}
      <Button
        render={href ? <Link href={href} /> : undefined}
        className={clsx(
          // Base
          "w-full flex px-2 items-center gap-3 rounded-md text-left text-base/6 text-zinc-950 sm:text-sm/5 transition-all duration-200",
          isCollapsed ? "px-1 py-2 justify-center" : "py-2.5 sm:py-2 justify-start",
          // Leading icon/icon-only
          "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
          // Trailing icon (down chevron or similar)
          "*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4",
          // Avatar
          "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6",
          // Hover
          "data-hover:bg-zinc-950/5 data-hover:*:data-[slot=icon]:fill-zinc-950",
          // Active
          "data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950",
          // Current
          "data-current:bg-zinc-950/10 data-current:text-zinc-950 data-current:*:data-[slot=icon]:fill-zinc-950",
          // Dark mode
          "dark:text-white dark:*:data-[slot=icon]:fill-zinc-400",
          "dark:data-hover:bg-white/5 dark:data-hover:*:data-[slot=icon]:fill-white",
          "dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white",
          "dark:data-current:bg-white/10 dark:data-current:text-white dark:data-current:*:data-[slot=icon]:fill-white",
          !href && "cursor-default"
        )}
        variant="ghost"
        data-current={current ? "true" : undefined}
        ref={ref}
        title={isCollapsed && typeof children === "string" ? children : undefined}
        {...props}
      >
        {children}
      </Button>
    </span>
  );
});

export function SidebarLabel({
  className,
  isCollapsed,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  isCollapsed?: boolean;
}) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        "truncate transition-opacity duration-200",
        isCollapsed && "opacity-0 w-0 overflow-hidden"
      )}
    />
  );
}
