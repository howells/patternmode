"use client";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { cx } from "@patternmode/utils/cx";
import type {
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarInputProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
} from "./types";
import { toolbarVariants } from "./variants";

const Toolbar = ({
  ref,
  className,
  variant,
  size,
  orientation,
  ...props
}: ToolbarProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Root> | null>;
}) => {
  const { root } = toolbarVariants({ variant, size, orientation });
  return (
    <BaseToolbar.Root
      className={cx(root(), className)}
      data-testid="toolbar"
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};
Toolbar.displayName = "Toolbar";

const ToolbarButton = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarButtonProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Button> | null>;
}) => {
  const { button } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Button
      className={cx(button(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarButton.displayName = "ToolbarButton";

const ToolbarLink = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarLinkProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Link> | null>;
}) => {
  const { link } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Link className={cx(link(), className)} ref={ref} {...props} />
  );
};
ToolbarLink.displayName = "ToolbarLink";

const ToolbarInput = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarInputProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Input> | null>;
}) => {
  const { input } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Input
      className={cx(input(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarInput.displayName = "ToolbarInput";

const ToolbarGroup = ({
  ref,
  className,
  variant,
  size,
  ...props
}: ToolbarGroupProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Group> | null>;
}) => {
  const { group } = toolbarVariants({ variant, size });
  return (
    <BaseToolbar.Group
      className={cx(group(), className)}
      ref={ref}
      {...props}
    />
  );
};
ToolbarGroup.displayName = "ToolbarGroup";

const ToolbarSeparator = ({
  ref,
  className,
  variant,
  size,
  orientation,
  ...props
}: ToolbarSeparatorProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Separator> | null>;
}) => {
  const { separator } = toolbarVariants({ variant, size, orientation });
  return (
    <BaseToolbar.Separator
      className={cx(separator(), className)}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  );
};
ToolbarSeparator.displayName = "ToolbarSeparator";

const ToolbarRoot = BaseToolbar.Root;

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
};
