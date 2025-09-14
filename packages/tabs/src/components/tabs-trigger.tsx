import { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import { cx } from "@patternmode/utils/cx";

export const TabsTrigger = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>) => (
  <BaseTabs.Tab
    className={cx(
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium text-sm",
      "text-zinc-700 transition-all disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-zinc-900",
      "group-data-[variant=solid]/tabslist:data-[state=active]:bg-transparent",
      "dark:text-zinc-300 dark:data-[state=active]:bg-zinc-800 dark:data-[state=active]:text-zinc-50",
      className
    )}
    {...props}
  />
);
