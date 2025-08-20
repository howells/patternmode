import type { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import type React from "react";

export type CheckboxProps = {
	/**
	 * Checked state of the checkbox.
	 *
	 * - `true`: Checkbox is checked
	 * - `false`: Checkbox is unchecked
	 * - `"indeterminate"`: Checkbox shows indeterminate state (partial selection).
	 */
	checked?: boolean | "indeterminate";
} & Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, "checked">;
