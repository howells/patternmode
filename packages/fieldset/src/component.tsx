import { Fieldset as BaseFieldset } from "@base-ui-components/react/fieldset";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { Subheading } from "@patternmode/subheading";

/**
 * Props for the Fieldset component.
 */
type FieldsetProps = {
	/**
	 * Fieldset content including legend and form fields.
	 * Contains the grouped form controls and their associated legend.
	 */
	children?: React.ReactNode;
	/**
	 * Whether the fieldset and its controls are disabled.
	 * When true, all contained form controls become disabled.
	 */
	disabled?: boolean;
	/**
	 * Name for the fieldset group.
	 * Used for form organization and identification.
	 */
	name?: string;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseFieldset.Root>;

/**
 * Root fieldset component for grouping related form fields.
 */
const Fieldset = ({ className, ...props }: FieldsetProps) => (
	<BaseFieldset.Root
		data-testid="fieldset"
		className={cx(
			// base
			"flex flex-col gap-4 border-0 p-0",
			// spacing
			"m-0",
			className,
		)}
		{...props}
	/>
);
Fieldset.displayName = "Fieldset";

/**
 * Props for the FieldsetLegend component.
 */
type FieldsetLegendProps = {
	/**
	 * Legend text content.
	 * Provides an accessible label for the fieldset group.
	 */
	children?: React.ReactNode;
	/**
	 * Additional CSS classes for styling customization.
	 */
	className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseFieldset.Legend>;

/**
 * Fieldset legend component for labeling field groups.
 */
const FieldsetLegend = ({ className, ...props }: FieldsetLegendProps) => (
	<BaseFieldset.Legend
		className={cx(
			// base
			"text-lg font-medium leading-6",
			// text color
			"text-zinc-900 dark:text-zinc-50",
			// border
			"border-b  dark:border-zinc-800",
			// spacing
			"pb-3",
			// disabled
			"data-disabled:text-zinc-400 dark:data-disabled:text-zinc-600",
			className,
		)}
		render={(legendProps) => <Subheading {...legendProps} />}
		{...props}
	/>
);
FieldsetLegend.displayName = "FieldsetLegend";

export {
	Fieldset,
	FieldsetLegend,
	type FieldsetLegendProps,
	type FieldsetProps,
};
