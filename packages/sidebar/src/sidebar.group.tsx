import { cx } from "@patternmode/utils/cx";

export const SidebarGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cx("relative flex w-full min-w-0 flex-col p-2", className)}
			{...props}
		/>
	);
}