import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";
import { floatingSurfaceVariants } from "@patternmode/utils/floating-surface";
import type React from "react";

type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List> & {
  variant?: "solid" | "line";
  showIndicator?: boolean;
};

export const TabsList = ({
  className,
  variant = "solid",
  showIndicator = true,
  children,
  ...props
}: TabsListProps) => (
  <BaseTabs.List
    className={cx(
      variant === "solid"
        ? cx(
            "group/tabslist relative inline-flex items-center gap-1",
            floatingSurfaceVariants({
              density: "compact",
              clamp: "none",
              context: "static",
            }).base()
          )
        : "group/tabslist relative inline-flex items-center gap-1 border-zinc-200 border-b dark:border-zinc-800",
      className
    )}
    {...({ "data-variant": variant } as React.HTMLAttributes<HTMLDivElement>)}
    {...props}
  >
    {children}
    {showIndicator && <TabsIndicator variant={variant} />}
  </BaseTabs.List>
);

type IndicatorProps = React.ComponentPropsWithoutRef<
  typeof BaseTabs.Indicator
> & {
  variant?: "solid" | "line";
};

export const TabsIndicator = ({
  className,
  style,
  variant = "solid",
  ...props
}: IndicatorProps) => (
  <BaseTabs.Indicator
    className={cx(
      "pointer-events-none absolute left-0 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] transition-all duration-200 ease-in-out",
      variant === "solid"
        ? "rounded-sm bg-white dark:bg-zinc-800"
        : "bottom-0 h-0.5 bg-zinc-900 dark:bg-zinc-50",
      "z-0",
      className
    )}
    style={
      variant === "solid"
        ? ({
            top: "0.25rem",
            bottom: "0.25rem",
            ...(style as React.CSSProperties),
          } as React.CSSProperties)
        : (style as React.CSSProperties)
    }
    {...props}
  />
);
