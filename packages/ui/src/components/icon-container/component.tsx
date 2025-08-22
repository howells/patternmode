import { cx } from "@patternmode/utils/cx";
import { getColorClasses } from "@patternmode/constants/variants";
import { Icon } from "@patternmode/icon";
import type { IconContainerProps } from "./types";
import { iconContainerVariants } from "./variants";

/**
 * Container component for icons with consistent padding and background styling.
 */
export const IconContainer = ({
	icon,
	size,
	variant,
	color,
	iconSize = "base",
	centered = false,
	className,
	iconClassName,
	...props
}: IconContainerProps) => {
	// Get color classes if custom color is provided
	const colorClasses = color ? getColorClasses(color) : null;

	return (
		<div
			data-testid="icon-container"
			className={cx(
				iconContainerVariants({ size, variant }),
				colorClasses?.bgMuted,
				centered && "mx-auto",
				className,
			)}
			{...props}
		>
			<Icon
				icon={icon}
				size={iconSize}
				className={cx(colorClasses?.textLight, iconClassName)}
			/>
		</div>
	);
};
