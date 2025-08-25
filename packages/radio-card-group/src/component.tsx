// Use Base UI components directly to avoid cross-component dependencies
import { Radio } from "@base-ui-components/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";
import { focusInput } from "@patternmode/utils/focus-input";

type RadioCardGroupProps = React.ComponentPropsWithoutRef<
	typeof BaseRadioGroup
> & {
	ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null>;
};

type RadioCardItemProps = {
	/**
	 * The value this radio card represents in the group.
	 * Must be unique within the RadioCardGroup and is used to track selection state.
	 */
	value: string;

	/**
	 * Whether this radio card option is disabled.
	 * When true, the card cannot be selected and displays with muted styling.
	 */
	disabled?: boolean;

	/**
	 * Content to display inside the radio card.
	 * Can include rich content like text, icons, pricing, descriptions, or any JSX elements.
	 */
	children?: React.ReactNode;
} & Omit<
	React.ComponentPropsWithoutRef<typeof Radio.Root>,
	"value" | "disabled"
> & {
		ref?: React.RefObject<React.ElementRef<typeof Radio.Root> | null>;
	};

type RadioCardIndicatorProps = React.ComponentPropsWithoutRef<
	typeof Radio.Indicator
> & {
	ref?: React.RefObject<React.ElementRef<typeof Radio.Indicator> | null>;
};

/**
 * Card-style radio group with enhanced visual presentation for option selection.
 */
const RadioCardGroup = ({ ref, className, ...props }: RadioCardGroupProps) => (
	<BaseRadioGroup
		data-testid="radio-card-group"
		ref={ref}
		className={cx("grid gap-2", className)}
		{...props}
	>
		{props.children}
	</BaseRadioGroup>
);
RadioCardGroup.displayName = "RadioCardGroup";

/**
 * Individual radio card item with enhanced styling and rich content support.
 */
const RadioCardItem = ({
	ref,
	className,
	children,
	...props
}: RadioCardItemProps) => (
	<Radio.Root
		ref={ref}
		className={cx(
			// base
			"group relative w-full rounded-md border p-4 text-left  transition cursor-pointer focus:outline-hidden",
			// background color
			"bg-white dark:bg-zinc-950",
			// border color
			" dark:border-zinc-800",
			// checked
			"data-[checked]:border-blue-500 dark:data-[checked]:border-blue-500",
			// disabled
			"data-[disabled]:border-zinc-100 dark:data-[disabled]:border-zinc-800",
			"data-[disabled]:bg-zinc-50 data-[disabled]:shadow-none dark:data-[disabled]:bg-zinc-900",
			"data-[disabled]:cursor-not-allowed",
			// focus
			focusInput,
			className,
		)}
		{...props}
	>
		{children}
	</Radio.Root>
);
RadioCardItem.displayName = "RadioCardItem";

/**
 * Visual indicator for radio card selection state with circular design.
 */
const RadioCardIndicator = ({
	ref,
	className,
	...props
}: RadioCardIndicatorProps) => (
	<Radio.Indicator
		ref={ref}
		className={cx(
			// base
			"relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border  outline-hidden",
			// border color
			" dark:border-zinc-800",
			// background color
			"bg-white dark:bg-zinc-950",
			// checked
			"group-data-[checked]:border-0 group-data-[checked]:border-transparent group-data-[checked]:bg-blue-500",
			// disabled
			"group-data-[disabled]: group-data-[disabled]:bg-zinc-100 group-data-[disabled]:text-zinc-400",
			"dark:group-data-[disabled]:border-zinc-700 dark:group-data-[disabled]:bg-zinc-800",
			// focus
			focusRing,
			className,
		)}
		{...props}
	>
		<div
			className={cx(
				// base
				"size-1.5 shrink-0 rounded-full opacity-0",
				// indicator - shows when checked
				"bg-white group-data-[checked]:opacity-100",
				// disabled
				"group-data-[disabled]:bg-zinc-400 dark:group-data-[disabled]:bg-zinc-500",
			)}
		/>
	</Radio.Indicator>
);
RadioCardIndicator.displayName = "RadioCardIndicator";

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
export type {
	RadioCardGroupProps,
	RadioCardIndicatorProps,
	RadioCardItemProps,
};
