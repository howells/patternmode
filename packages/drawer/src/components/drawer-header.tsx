import { cx } from "@patternmode/utils/cx";

export type DrawerHeaderProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div className={cx("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);

DrawerHeader.displayName = "DrawerHeader";

