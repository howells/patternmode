import { cx } from "@patternmode/utils/cx";

export type DrawerFooterProps = { className?: string } & React.HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div className={cx("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);

DrawerFooter.displayName = "DrawerFooter";

