import { cx } from "@patternmode/utils/cx";

export const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cx("flex-1 overflow-y-auto", className)}
			{...props}
		/>
	);
};