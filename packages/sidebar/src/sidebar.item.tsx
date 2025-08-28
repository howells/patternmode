import { Button, type ButtonProps } from "@patternmode/button";
import type { buttonVariants } from "@patternmode/button/types";

// Tooltip is optional; fall back to a title attribute if unavailable
const TooltipShim = ({
	content,
	children,
}: {
	content: React.ReactNode;
	children: React.ReactNode;
}) => (
	<span title={typeof content === "string" ? content : undefined}>
		{children}
	</span>
);

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
		<TooltipShim content={children}>{button}</TooltipShim>
	) : (
		button
	);
};
