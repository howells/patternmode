import { LayoutGroup } from "motion/react";
import { cx } from "@patternmode/utils/cx";
import { useId } from "react";

export type NavbarSectionProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export function NavbarSection({ className, ...props }: NavbarSectionProps) {
  const id = useId();
  return (
    <LayoutGroup id={id}>
      <div {...props} className={cx(className, "flex items-center gap-3")} />
    </LayoutGroup>
  );
}

