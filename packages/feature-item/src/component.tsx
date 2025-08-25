"use client";

import { Icon } from "@patternmode/icon";
import type { IconComponent, IconSize } from "@patternmode/icon/types";
import { cx } from "@patternmode/utils/cx";
import type React from "react";

export type FeatureItemProps = React.HTMLAttributes<HTMLDivElement> & {
	icon?: IconComponent;
	iconSize?: IconSize;
	heading: string;
};

export const FeatureItem = ({
	icon: IconComponent,
	iconSize = "sm",
	heading,
	className,
	children,
	...props
}: FeatureItemProps) => {
	return (
		<div data-testid="feature-item" className={cx("relative text-sm", className)} {...props}>
			<dt className="text-zinc-900 dark:text-zinc-100">
				{IconComponent ? (
					<Icon
						aria-hidden="true"
						className="absolute -left-7 top-[0.2rem]"
						size={iconSize}
						icon={IconComponent}
					/>
				) : null}
				{heading}
			</dt>
			<dd className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</dd>
		</div>
	);
};
