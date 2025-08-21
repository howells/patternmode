import { X } from "lucide-react";
import type React from "react";
import { defaultConfig } from "@patternmode/core/config/default-config";
import { cx } from "@patternmode/core/utils/cx";
import { Icon } from "../icon/component";
import type { DismissButtonProps } from "./types";
import { dismissButtonVariants } from "./variants";

// Map dismiss button sizes to icon sizes (direct 1:1 mapping)
const dismissButtonToIconSizeMap = {
	xs: "xs",
	sm: "sm",
	base: "base",
	lg: "lg",
} as const;

/**
 * Close button component for dismissing modals, alerts, and temporary content.
 */
const DismissButton = ({
	ref,
	onClick,
	icon: IconComponent = X,
	iconStrokeWidth = defaultConfig.components.iconStrokeWidth,
	size = "base",
	className,
	"aria-label": ariaLabel = "Remove",
	...props
}: DismissButtonProps & {
	ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
	// Get appropriate icon size for dismiss button size (matching badge icon sizing)
	const iconSize = dismissButtonToIconSizeMap[size];

	return (
		<button
			ref={ref}
			type="button"
			onClick={onClick}
			data-testid="dismiss-button"
			className={cx(dismissButtonVariants({ size }), className)}
			aria-label={ariaLabel}
			{...props}
		>
			<Icon
				icon={IconComponent}
				size={iconSize}
				strokeWidth={iconStrokeWidth}
			/>
		</button>
	);
};

DismissButton.displayName = "DismissButton";

export { DismissButton };
