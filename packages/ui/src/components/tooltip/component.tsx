"use client";

import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { TooltipProps } from "./types";
import { tooltipVariants } from "./variants";

/**
 * A tooltip component built on Base UI's Tooltip primitive for displaying contextual information.
 */
const Tooltip = ({
	ref: forwardedRef,
	children,
	className,
	content,
	delayDuration: _delayDuration = 150,
	defaultOpen,
	open,
	onClick,
	onOpenChange,
	showArrow = true,
	side = "top",
	sideOffset = 10,
	align = "center",
	alignOffset = 0,
	variant,
	size,
	...props
}: TooltipProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseTooltip.Popup> | null>;
}) => {
	const { popup, arrow } = tooltipVariants({ variant, size });

	return (
		<BaseTooltip.Root
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
			{...props}
		>
			<BaseTooltip.Trigger onClick={onClick}>{children}</BaseTooltip.Trigger>
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner
					side={side}
					sideOffset={sideOffset}
					align={align}
					alignOffset={alignOffset}
				>
					<BaseTooltip.Popup
						data-testid="tooltip"
						ref={forwardedRef}
						className={cx(popup(), className)}
					>
						{content}
						{showArrow && (
							<BaseTooltip.Arrow className={arrow()}>
								<ArrowSvg />
							</BaseTooltip.Arrow>
						)}
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	);
};

Tooltip.displayName = "Tooltip";

// Arrow SVG component matching Base UI example
function ArrowSvg(props: Omit<React.SVGProps<SVGSVGElement>, "ref">) {
	return (
		<svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
			<title>Tooltip arrow</title>
			<path
				d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
				className="fill-zinc-900 dark:fill-zinc-50"
			/>
			<path
				d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
				className="fill-zinc-200 dark:fill-zinc-700"
			/>
			<path
				d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
				className="fill-zinc-800 dark:fill-zinc-300"
			/>
		</svg>
	);
}

// Additional exports for more flexibility
const TooltipProvider = BaseTooltip.Provider;
const TooltipRoot = BaseTooltip.Root;
const TooltipTrigger = BaseTooltip.Trigger;
const TooltipPortal = BaseTooltip.Portal;
const TooltipPositioner = BaseTooltip.Positioner;
const TooltipPopup = BaseTooltip.Popup;
const TooltipArrow = BaseTooltip.Arrow;

export {
	Tooltip,
	TooltipArrow,
	TooltipPopup,
	TooltipPortal,
	TooltipPositioner,
	TooltipProvider,
	TooltipRoot,
	TooltipTrigger,
};
