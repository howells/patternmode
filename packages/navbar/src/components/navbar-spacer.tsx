import { cx } from "@patternmode/utils/cx";

export type NavbarSpacerProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export function NavbarSpacer({ className, ...props }: NavbarSpacerProps) {
  return (
    <div aria-hidden="true" {...props} className={cx(className, "-ml-4 flex-1")} />
  );
}

