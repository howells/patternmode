import { cx } from "@patternmode/utils/cx";

export const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cx(
				"flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
				className,
			)}
			{...props}
		/>
	);
}