import { cx } from "@patternmode/utils/cx";

export const SidebarGroup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cx("relative flex w-full min-w-0 flex-col", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
};
