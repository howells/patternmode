// Divider Component [v1.0.0] - Pure Implementation

/**
 * A versatile divider component for visually separating content sections.
 * Supports both horizontal and vertical orientations with optional text labels.
 * Built with tailwind-variants for consistent styling and theming.
 */

import type React from "react";
import { cx } from "@patternmode/core/utils/cx";
import type { DividerProps } from "./types";
import { dividerLineVariants, dividerVariants } from "./variants";

/**
 * A versatile divider component for visually separating content sections.
 */
const Divider = ({
	ref: forwardedRef,
	className,
	children,
	orientation = "horizontal",
	spacing,
	...props
}: DividerProps & { ref?: React.RefObject<HTMLDivElement | null> }) => (
	<div
		ref={forwardedRef}
		data-testid="divider"
		className={cx(dividerVariants({ orientation, spacing }), className)}
		{...props}
	>
		{children ? (
			<>
				<div className={cx(dividerLineVariants({ orientation }))} />
				<div className="whitespace-nowrap text-inherit">{children}</div>
				<div className={cx(dividerLineVariants({ orientation }))} />
			</>
		) : (
			<div className={cx(dividerLineVariants({ orientation }))} />
		)}
	</div>
);

Divider.displayName = "Divider";

export { Divider };
