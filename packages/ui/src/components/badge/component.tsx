import { useRender } from "@base-ui-components/react/use-render";
import { X } from "lucide-react";
import type React from "react";
import { defaultConfig } from "@patternmode/core/config/default-config";
import { getColorClasses, type TailwindColor } from "../../constants/variants";
import { getIconComponent } from "@patternmode/icons/icon-registry";
import { cx } from "@patternmode/core/utils/cx";
import { DismissButton } from "../dismiss-button/component";
import { Icon } from "../icon/component";
import type { IconComponent } from "../icon/types";
import type { BadgeVariant } from "./types";
import {
	badgeToIconSizeMap,
	badgeVariants,
	dotIndicatorVariants,
} from "./variants";

type BadgeProps = {
	/**
	 * Whether to show a border around the badge.
	 * Adds a subtle ring border for enhanced visual definition.
	 */
	border?: boolean;
	/**
	 * Whether to use full border radius for a pill shape.
	 * Automatically adds extra horizontal padding for better visual balance.
	 */
	rounded?: boolean;
	/**
	 * Whether to show a status dot instead of icons.
	 * Displays a colored dot indicator on the left side.
	 */
	statusDot?: boolean;
	/**
	 * Whether to animate the status dot for active statuses.
	 * Creates a pulsing animation with ping effect when true.
	 */
	statusAnimated?: boolean;
	/**
	 * Whether the badge can be dismissed.
	 * When true, a dismiss button (X) will be shown on the right.
	 */
	dismissible?: boolean;
	/**
	 * Callback function called when the dismiss button is clicked.
	 * Used for handling badge removal or dismissal actions.
	 */
	onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Custom icon component for the dismiss button.
	 * Defaults to X icon from lucide-react.
	 */
	dismissIcon?: React.ComponentType<{
		className?: string;
		strokeWidth?: number;
	}>;
	/**
	 * Visual style variant of the badge.
	 * Controls color scheme and supports semantic variants, all Tailwind colors, and button-like variants.
	 *
	 * @example
	 * // Semantic variants
	 * <Badge variant="success">Success</Badge>
	 * <Badge variant="error">Error</Badge>
	 *
	 * @example
	 * // Tailwind colors
	 * <Badge variant="blue">Blue</Badge>
	 * <Badge variant="emerald">Emerald</Badge>
	 *
	 * @example
	 * // Button-like variants (for consistent styling)
	 * <Badge variant="secondary">Secondary</Badge>
	 * <Badge variant="outline">Outline</Badge>
	 * <Badge variant="destructive">Destructive</Badge>
	 */
	variant?: BadgeVariant;
	/**
	 * Size variant of the badge.
	 * Controls padding, text size, and overall dimensions.
	 */
	size?: "xs" | "sm" | "base" | "lg";
	/**
	 * Icon component to display on the left side.
	 */
	leftIcon?: IconComponent | string;
	/**
	 * Icon component to display on the right side.
	 */
	rightIcon?: IconComponent | string;
	/**
	 * Stroke width for icons (defaults to global config).
	 */
	iconStrokeWidth?: number;
} & useRender.ComponentProps<"span">;

/**
 * Small status indicator component for labels, counts, and categorical information.
 */
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
	// Get appropriate icon size for badge size
	const iconSize = badgeToIconSizeMap[size];

	// Use default variant when statusDot is true (unless custom color or variant provided)
	const effectiveVariant = variant || "default";

	// Convert string icon names to components
	const LeftIconComponent =
		typeof LeftIcon === "string" ? getIconComponent(LeftIcon) : LeftIcon;
	const RightIconComponent =
		typeof RightIcon === "string" ? getIconComponent(RightIcon) : RightIcon;

	const renderBadgeContent = () => {
		const hasLeftIcon = LeftIconComponent && !statusDot; // Dot overrides left icon
		const hasRightIcon = RightIconComponent && !statusDot; // Dot overrides right icon
		const hasDismissButton = Boolean(_dismissible || onDismiss);
		const hasStatusDot = Boolean(statusDot);

		// Status dot size mapping - one size smaller than badge for better balance
		const statusDotSize =
			size === "xs"
				? "sm"
				: size === "sm"
					? "sm"
					: size === "base"
						? "sm"
						: "default";

		// Use statusAnimated prop directly since statusDot is just boolean
		const shouldAnimate = statusAnimated;

		// Handle button-like variants for status dot color
		const getStatusDotColor = ():
			| "default"
			| "neutral"
			| "success"
			| "info"
			| "warning"
			| "error"
			| "critical"
			| "positive"
			| "negative"
			| "slate"
			| "gray"
			| "zinc"
			| "stone"
			| "red"
			| "orange"
			| "amber"
			| "yellow"
			| "lime"
			| "green"
			| "emerald"
			| "teal"
			| "cyan"
			| "sky"
			| "blue"
			| "indigo"
			| "violet"
			| "purple"
			| "fuchsia"
			| "pink"
			| "rose" => {
			if (!effectiveVariant) return "default";

			// Map button-like variants to semantic variants for status dot
			if (effectiveVariant === "destructive") return "error";
			if (
				[
					"secondary",
					"outline",
					"outline-dashed",
					"ghost",
					"inverse-ghost",
					"minimal",
				].includes(effectiveVariant)
			)
				return "neutral";
			if (["primary", "link"].includes(effectiveVariant)) return "default";

			return effectiveVariant as TailwindColor;
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
							// Add dynamic before: color for animation
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
							// Negative margin to pull closer like Tag does
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

export { Badge, type BadgeProps };
export type { BadgeVariant } from "./types";
export { badgeVariants } from "./variants";
