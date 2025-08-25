import type { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import type React from "react";
import type { VariantProps } from "tailwind-variants";
import type { toolbarVariants } from "./variants";

export type ToolbarProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
  orientation?: VariantProps<typeof toolbarVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Root>;

export type ToolbarButtonProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Button>;

export type ToolbarLinkProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Link>;

export type ToolbarInputProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
} & Omit<React.ComponentPropsWithoutRef<typeof BaseToolbar.Input>, "size">;

export type ToolbarGroupProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Group>;

export type ToolbarSeparatorProps = {
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  size?: VariantProps<typeof toolbarVariants>["size"];
  orientation?: VariantProps<typeof toolbarVariants>["orientation"];
} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator>;

