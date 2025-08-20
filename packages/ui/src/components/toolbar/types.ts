import type { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { toolbarVariants } from "./variants";

export type ToolbarProps = {
	/**
	 * The visual style variant of the toolbar.
	 * @default "default"
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the toolbar and its items.
	 * @default "default"
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
	/**
	 * The layout orientation of the toolbar.
	 * @default "horizontal"
	 */
	orientation?: VariantProps<typeof toolbarVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>;

export type ToolbarButtonProps = {
	/**
	 * The visual style variant of the button. Inherits from parent Toolbar if not specified.
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the button. Inherits from parent Toolbar if not specified.
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Button>;

export type ToolbarLinkProps = {
	/**
	 * The visual style variant of the link. Inherits from parent Toolbar if not specified.
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the link. Inherits from parent Toolbar if not specified.
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>;

export type ToolbarInputProps = {
	/**
	 * The visual style variant of the input. Inherits from parent Toolbar if not specified.
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the input. Inherits from parent Toolbar if not specified.
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
} & Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Input>, "size">;

export type ToolbarGroupProps = {
	/**
	 * The visual style variant of the group. Inherits from parent Toolbar if not specified.
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the group. Inherits from parent Toolbar if not specified.
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>;

export type ToolbarSeparatorProps = {
	/**
	 * The visual style variant of the separator. Inherits from parent Toolbar if not specified.
	 */
	variant?: VariantProps<typeof toolbarVariants>["variant"];
	/**
	 * The size of the separator. Inherits from parent Toolbar if not specified.
	 */
	size?: VariantProps<typeof toolbarVariants>["size"];
	/**
	 * The orientation of the separator. Should match the parent Toolbar orientation.
	 */
	orientation?: VariantProps<typeof toolbarVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>;
