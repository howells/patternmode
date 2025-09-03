import { cx } from "@patternmode/utils/cx";

export const SidebarContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cx("flex-1 overflow-y-auto p-2.5", className)}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
};
