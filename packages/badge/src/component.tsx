import { useRender } from "@base-ui-components/react/use-render";
import { defaultConfig } from "@patternmode/config/default-config";
import {
	type GlobalSemanticVariant,
	getColorClasses,
	globalSemanticVariants,
	semanticVariants,
	type TailwindColor,
} from "@patternmode/constants/variants";
import { Icon } from "@patternmode/icon";
import type { IconComponent } from "@patternmode/icon/types";
import { getIconComponent } from "@patternmode/icons/icon-registry";
import { cx } from "@patternmode/utils/cx";
import { X } from "lucide-react";
import type * as React from "react";
import { DismissButton } from "./dismiss-button";
import type { BadgeVariant } from "./types";
import {
	badgeToIconSizeMap,
	badgeVariants,
	dotIndicatorVariants,
} from "./variants";

export type BadgeProps = {
	border?: boolean;
	rounded?: boolean;
	statusDot?: boolean;
	statusAnimated?: boolean;
	dismissible?: boolean;
	onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	dismissIcon?: React.ComponentType<{
		className?: string;
		strokeWidth?: number;
	}>;
	variant?: BadgeVariant;
	size?: "xs" | "sm" | "base" | "lg";
	leftIcon?: IconComponent | string;
	rightIcon?: IconComponent | string;
	iconStrokeWidth?: number;
} & useRender.ComponentProps<"span">;

const Badge = ({
	ref: forwardedRef,
	render = <span />,
	variant,
	size = "base",
	border,
	rounded,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	iconStrokeWidth = defaultConfig.components.iconStrokeWidth,
	children,
	dismissible: _dismissible = false,
	onDismiss,
	dismissIcon: DismissIcon = X,
	statusDot,
	statusAnimated = false,
	className,
	...otherProps
}: BadgeProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
	const iconSize = badgeToIconSizeMap[size];
	const effectiveVariant = variant || "default";

	const LeftIconComponent =
		typeof LeftIcon === "string" ? getIconComponent(LeftIcon) : LeftIcon;
	const RightIconComponent =
		typeof RightIcon === "string" ? getIconComponent(RightIcon) : RightIcon;

	const renderBadgeContent = () => {
		const hasLeftIcon = LeftIconComponent && !statusDot;
		const hasRightIcon = RightIconComponent && !statusDot;
		const hasDismissButton = Boolean(_dismissible || onDismiss);
		const hasStatusDot = Boolean(statusDot);

		const statusDotSize: "sm" | "default" | "lg" =
			size === "lg" ? "default" : "sm";
		const shouldAnimate = statusAnimated;

		const getStatusDotColor = (): TailwindColor | GlobalSemanticVariant => {
			const variant = effectiveVariant;
			if (!variant) return "default";
			// If it's already a global semantic variant, use it
			if (variant in globalSemanticVariants) {
				return variant as GlobalSemanticVariant;
			}
			// If it's a button/semantic alias, map it via central definitions
			if (variant in semanticVariants) {
				const mapped =
					semanticVariants[variant as keyof typeof semanticVariants];
				for (const key in globalSemanticVariants) {
					const k = key as keyof typeof globalSemanticVariants;
					if (globalSemanticVariants[k] === mapped) {
						return key as GlobalSemanticVariant;
					}
				}
				return "default";
			}
			// Otherwise treat as Tailwind color (e.g., "blue", "zinc")
			return variant as TailwindColor;
		};

		return (
			<>
				{hasStatusDot && (
					<span
						className={cx(
							dotIndicatorVariants({
								size: statusDotSize,
								animated: shouldAnimate,
							}),
							getColorClasses(getStatusDotColor()).bgSolid,
							shouldAnimate &&
								`before:bg-${getColorClasses(getStatusDotColor()).color}-500`,
						)}
						aria-hidden="true"
					/>
				)}
				{hasLeftIcon && (
					<Icon
						icon={LeftIconComponent}
						size={iconSize}
						strokeWidth={iconStrokeWidth}
					/>
				)}
				{children}
				{hasRightIcon && (
					<Icon
						icon={RightIconComponent}
						size={iconSize}
						strokeWidth={iconStrokeWidth}
					/>
				)}
				{hasDismissButton && (
					<DismissButton
						onClick={onDismiss}
						icon={DismissIcon}
						iconStrokeWidth={iconStrokeWidth}
						size={size}
						className={cx(
							size === "xs" && "-ml-0.5",
							size === "sm" && "-ml-1",
							size === "base" && "-ml-1",
							size === "lg" && "-ml-1.5",
						)}
					/>
				)}
			</>
		);
	};

	const defaultProps: useRender.ElementProps<"span"> & {
		"data-testid": string;
	} = {
		className: cx(
			badgeVariants({ variant: effectiveVariant, size, border, rounded }),
			className,
		),
		children: renderBadgeContent(),
		"data-testid": "badge",
	};

	const element = useRender({
		render,
		ref: forwardedRef ?? undefined,
		props: { ...defaultProps, ...otherProps },
	});
	return element;
};

Badge.displayName = "Badge";

export { Badge };
export type { BadgeVariant } from "./types";
export { badgeVariants } from "./variants";
