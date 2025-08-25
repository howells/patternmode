"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

const Tabs = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Root>) => (
  <BaseTabs.Root className={cx("w-full", className)} {...props} />
);

type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List> & {
  variant?: "solid" | "line";
};

const TabsList = ({ className, variant = "solid", ...props }: TabsListProps) => (
  <BaseTabs.List
    className={cx(
      variant === "solid"
        ? "inline-flex items-center gap-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-900"
        : "inline-flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800",
      className,
    )}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) => (
  <BaseTabs.Tab
    className={cx(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
      "text-zinc-700 transition-all disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow",
      "dark:text-zinc-300 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50",
      className,
    )}
    {...props}
  />
);

const TabsContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) => (
  <BaseTabs.Panel className={cx("mt-3", className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
