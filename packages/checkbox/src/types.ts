export type CheckboxProps = {
	className?: string;
	checked?: boolean | "indeterminate";
} & React.ComponentPropsWithoutRef<
	typeof import("@base-ui-components/react/checkbox").Checkbox.Root
>;
