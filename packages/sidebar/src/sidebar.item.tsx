import {
	Button,
	type ButtonProps,
} from "@patternmode/button";
import type { buttonVariants } from "@patternmode/button/types";
import { Tooltip } from "@patternmode/ui/components/tooltip";
import { useSidebar } from "./sidebar-store";

export const SidebarItem = ({ children, icon, ...props }: ButtonProps) => {
	const isExpanded = useSidebar((s) => s.isExpanded);
	const state = useSidebar((s) => s.state);
	const buttonSize = isExpanded ? "base" : "icon";
	const buttonVariant: (typeof buttonVariants)[number] = "ghost";

	const button = (
		<Button
			icon={icon}
			size={buttonSize}
			variant={buttonVariant}
			aria-label={typeof children === "string" ? children : undefined}
			{...props}
		>
			{isExpanded ? children : null}
		</Button>
	);

	const showTooltip = state === "locked" && !isExpanded;

	return showTooltip ? (
		<Tooltip
			content={children}
			side="right"
			align="center"
			sideOffset={6}
			delayDuration={0}
			skipDelayDuration={0}
		>
			{button}
		</Tooltip>
	) : (
		button
	);
};
