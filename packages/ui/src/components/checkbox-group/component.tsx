// Checkbox Group Component [v1.0.0]

import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui-components/react/checkbox-group";
import type * as React from "react";
import { cx } from "../../utils/cx";
import { Checkbox } from "../checkbox/component";
import type { CheckboxGroupItemProps, CheckboxGroupProps } from "./types";
import {
	checkboxGroupItemTextVariants,
	checkboxGroupItemVariants,
	checkboxGroupLabelVariants,
	checkboxGroupVariants,
} from "./variants";

/**
 * A powerful checkbox group component for managing multiple checkbox selections with comprehensive state management and accessibility.
 */
const CheckboxGroup = ({
	ref,
	className,
	label,
	labelId,
	children,
	...props
}: CheckboxGroupProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseCheckboxGroup> | null>;
}) => (
	<BaseCheckboxGroup
		ref={ref}
		aria-labelledby={labelId}
		className={cx(checkboxGroupVariants(), className)}
		data-testid="checkbox-group"
		{...props}
	>
		{label && (
			<div className={checkboxGroupLabelVariants()} id={labelId}>
				{label}
			</div>
		)}
		{children}
	</BaseCheckboxGroup>
);
CheckboxGroup.displayName = "CheckboxGroup";

/**
 * Individual checkbox item component designed for use within CheckboxGroup containers.
 */
const CheckboxGroupItem = ({
	ref,
	value,
	name,
	children,
	disabled,
	className,
	...props
}: CheckboxGroupItemProps & {
	ref?: React.RefObject<HTMLLabelElement | null>;
}) => (
	<label
		ref={ref}
		className={cx(checkboxGroupItemVariants({ disabled }), className)}
		{...props}
	>
		<Checkbox
			name={name}
			value={value}
			disabled={disabled}
			className="size-4"
		/>
		<span className={checkboxGroupItemTextVariants()}>{children}</span>
	</label>
);
CheckboxGroupItem.displayName = "CheckboxGroupItem";

export { CheckboxGroup, CheckboxGroupItem };
