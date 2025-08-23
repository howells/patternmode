import { Separator } from "@patternmode/separator";
import { cx } from "@patternmode/utils/cx";

export const SidebarSeparator = ({
	className,
	...props
}: React.ComponentProps<typeof Separator>) => {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cx("bg-border mx-2 w-auto", className)}
			{...props}
		/>
	);
}
