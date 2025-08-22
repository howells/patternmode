import {
	Button,
	type ButtonProps,
} from "@patternmode/button";
import type { buttonVariants } from "@patternmode/button/types";
import { useSidebar } from "./sidebar-store";

export const SidebarItem = ({ children, icon, ...props }: ButtonProps) => {
	const isExpanded = useSidebar((s) => s.isExpanded);
	const buttonSize  = isExpanded ? "base" : "icon";
	const buttonVariant: (typeof buttonVariants)[number] = "ghost";
	const effectiveLabel = isExpanded ? children : null;

	return (
		<Button icon={icon} size={buttonSize} variant={buttonVariant} {...props}>
			{effectiveLabel}
		</Button>
	);
};
