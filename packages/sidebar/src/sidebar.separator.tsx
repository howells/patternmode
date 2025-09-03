import { Separator } from "@patternmode/separator";
import { cx } from "@patternmode/utils/cx";

export const SidebarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      className={cx("mx-2 w-auto bg-border", className)}
      data-sidebar="separator"
      data-slot="sidebar-separator"
      {...props}
    />
  );
};
