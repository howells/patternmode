import { cx } from "@patternmode/utils/cx";

export const SidebarFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cx("flex flex-shrink-0 flex-col gap-2 p-2", className)}
      data-sidebar="footer"
      data-slot="sidebar-footer"
      {...props}
    />
  );
};
