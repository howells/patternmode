import type React from "react";
import { cx } from "../../utils/cx";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";
import type { CalloutProps } from "./types";
import { calloutVariants } from "./variants";

/**
 * Highlighted content box for important information, warnings, or tips.
 */
const Callout = ({
	ref: forwardedRef,
	title,
	icon: Icon,
	className,
	variant = "default",
	children,
	...props
}: CalloutProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
	return (
		<div
			ref={forwardedRef}
			className={cx(calloutVariants({ variant }), className)}
			data-testid="callout"
			{...props}
		>
			<div className={cx("flex items-start gap-3")}>
				{Icon && (
					<Icon className={cx("size-4 shrink-0 mt-1")} aria-hidden="true" />
				)}
				<div className={cx("flex-1")}>
					{title && <Subheading level={3}>{title}</Subheading>}
					{children && (
						<Text className={cx(title ? "mt-2 max-w-prose" : "")}>
							{children}
						</Text>
					)}
				</div>
			</div>
		</div>
	);
};

Callout.displayName = "Callout";

export { Callout };
