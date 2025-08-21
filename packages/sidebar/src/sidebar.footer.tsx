import { cx } from "@patternmode/utils/cx";

export const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cx("flex-shrink-0 flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}