import { cx } from "@patternmode/utils/cx";

export type NavbarLabelProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"span">;

export function NavbarLabel({ className, ...props }: NavbarLabelProps) {
  return <span {...props} className={cx(className, "truncate")} />;
}

