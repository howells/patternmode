import type { useRender } from "@base-ui-components/react/use-render";
import { motion } from "motion/react";
import { Button } from "@patternmode/button";
import { cx } from "@patternmode/utils/cx";

export type NavbarItemProps = {
  ref?: React.RefObject<HTMLButtonElement | null>;
  current?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  render?: useRender.RenderProp<Record<string, unknown>>;
} & Record<string, unknown>;

export const NavbarItem = function NavbarItem({
  ref,
  current,
  className,
  children,
  href,
  render,
  ...props
}: NavbarItemProps) {
  const classes = cx(
    "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5",
    "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
    "*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
    "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6"
  );

  return (
    <span className={cx(className, "relative")}>
      {current && (
        <motion.span
          className="-bottom-2.5 absolute inset-x-2 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
          layoutId="current-indicator"
        />
      )}
      <Button
        className={classes}
        data-current={current ? "true" : undefined}
        ref={ref}
        render={render}
        variant="minimal"
        {...props}
      >
        {children}
      </Button>
    </span>
  );
};

