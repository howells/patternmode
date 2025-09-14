import { cx } from "@patternmode/utils/cx";

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cx(
      "flex flex-col-reverse border-t pt-4 sm:flex-row sm:justify-end sm:space-x-2 dark:border-zinc-900",
      className
    )}
    {...props}
  />
);

SheetFooter.displayName = "SheetFooter";
