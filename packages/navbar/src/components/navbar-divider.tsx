import { cx } from "@patternmode/utils/cx";

export type NavbarDividerProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export function NavbarDivider({ className, ...props }: NavbarDividerProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cx(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
    />
  );
}

