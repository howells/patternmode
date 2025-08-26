"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

const Tabs = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Root>) => (
  <BaseTabs.Root className={cx("w-full", className)} {...props} />
);

type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List> & {
  variant?: "solid" | "line";
  showIndicator?: boolean;
};

const TabsList = ({ className, variant = "solid", showIndicator = true, children, ...props }: TabsListProps) => (
  <BaseTabs.List
    className={cx(
      variant === "solid"
        ? "relative inline-flex items-center gap-1 rounded-md bg-zinc-100 p-1 dark:bg-zinc-900 group/tabslist"
        : "relative inline-flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 group/tabslist",
      className,
    )}
    {...({ "data-variant": variant } as React.HTMLAttributes<HTMLDivElement>)}
    {...props}
  >
    {children}
    {showIndicator && <TabsIndicator variant={variant} />}
  </BaseTabs.List>
);

const TabsTrigger = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) => (
  <BaseTabs.Tab
    className={cx(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium",
      "text-zinc-700 transition-all disabled:pointer-events-none disabled:opacity-50",
      // Default active styles
      "data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow",
      // In solid variant, let the indicator provide the background instead
      "group-data-[variant=solid]/tabslist:data-[state=active]:bg-transparent group-data-[variant=solid]/tabslist:data-[state=active]:shadow-none",
      "dark:text-zinc-300 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50",
      className,
    )}
    {...props}
  />
);

// Indicator
const TabsIndicator = (
  { className, style, variant = "solid", ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Indicator> & {
    variant?: "solid" | "line";
  },
) => (
  <BaseTabs.Indicator
    className={cx(
      "pointer-events-none absolute left-0 translate-x-[var(--active-tab-left)] w-[var(--active-tab-width)] transition-all duration-200 ease-in-out",
      variant === "solid"
        ? "rounded-sm bg-white dark:bg-zinc-800"
        : "bottom-0 h-0.5 bg-zinc-900 dark:bg-zinc-50",
      // Keep behind triggers
      "z-0",
      className,
    )}
    style={
      variant === "solid"
        ? { top: "0.25rem", bottom: "0.25rem", ...(style as React.CSSProperties) }
        : (style as React.CSSProperties)
    }
    {...props}
  />
);

const TabsContent = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>) => (
  <BaseTabs.Panel className={cx("mt-3", className)} {...props} />
);

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator };
