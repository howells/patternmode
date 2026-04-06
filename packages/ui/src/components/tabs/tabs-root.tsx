"use client";

import { Content, List, Root, Trigger } from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/focus-ring";

const Tabs = Root;

function TabsList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof List>) {
  return (
    <List
      className={cn(
        "inline-flex h-11 items-center rounded-[calc(var(--radius-md)-2px)] bg-secondary/90 p-1",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Trigger>) {
  return (
    <Trigger
      className={cn(
        "inline-flex min-w-24 items-center justify-center rounded-[calc(var(--radius-md)-6px)] px-3 py-2 font-medium text-[0.92rem]",
        "text-muted-foreground transition-all duration-200 ease-[var(--ease-snappy)]",
        "data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-2xs",
        ...focusRing(),
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <Content
      className={cn(
        "mt-4 rounded-[var(--radius-xl)] border border-border/80 bg-panel/94 p-5 shadow-sm",
        "focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
