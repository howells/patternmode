/**
 * Toolbar Components.
 *
 * A comprehensive toolbar system built on Base UI Toolbar for creating organized
 * collections of interactive controls, actions, and inputs. Perfect for application
 * headers, editing interfaces, and action bars.
 *
 * Features:
 * - Base UI Toolbar integration for full accessibility
 * - Multiple visual variants (default, outline, ghost)
 * - Size variants (sm, default, lg) for different contexts
 * - Horizontal and vertical orientation support
 * - Button, link, and input components with consistent styling
 * - Grouping and separator components for organization
 * - Keyboard navigation and focus management
 * - Toggle button states for pressed/unpressed actions
 * - Disabled state handling
 * - Dark mode compatibility
 * - Flexible layout with proper spacing.
 *
 * @example
 * ```tsx
 * // Basic editing toolbar
 * <Toolbar>
 *   <ToolbarButton>
 *     <Bold className="h-4 w-4" />
 *   </ToolbarButton>
 *   <ToolbarButton>
 *     <Italic className="h-4 w-4" />
 *   </ToolbarButton>
 *   <ToolbarButton>
 *     <Underline className="h-4 w-4" />
 *   </ToolbarButton>
 *   <ToolbarSeparator />
 *   <ToolbarButton>
 *     <AlignLeft className="h-4 w-4" />
 *   </ToolbarButton>
 * </Toolbar>
 *
 * // Application toolbar with mixed controls
 * <Toolbar variant="outline" size="lg">
 *   <ToolbarGroup>
 *     <ToolbarButton>
 *       <Save className="h-4 w-4" />
 *     </ToolbarButton>
 *     <ToolbarButton>
 *       <Undo className="h-4 w-4" />
 *     </ToolbarButton>
 *     <ToolbarButton>
 *       <Redo className="h-4 w-4" />
 *     </ToolbarButton>
 *   </ToolbarGroup>
 *
 *   <ToolbarSeparator />
 *
 *   <ToolbarGroup>
 *     <ToolbarInput placeholder="Search..." />
 *     <ToolbarLink href="/help">Help</ToolbarLink>
 *   </ToolbarGroup>
 * </Toolbar>
 *
 * // Vertical toolbar
 * <Toolbar orientation="vertical" className="w-12">
 *   <ToolbarButton>
 *     <Home className="h-4 w-4" />
 *   </ToolbarButton>
 *   <ToolbarButton>
 *     <Settings className="h-4 w-4" />
 *   </ToolbarButton>
 *   <ToolbarSeparator />
 *   <ToolbarButton>
 *     <User className="h-4 w-4" />
 *   </ToolbarButton>
 * </Toolbar>
 * ```
 */

// Tremor Toolbar [v1.0.0] - Base UI

"use client";

import type { VariantProps } from "tailwind-variants";

import { Toolbar as BaseToolbar } from "@base-ui-components/react/toolbar";
import { tv } from "tailwind-variants";

import { cx, focusRing } from "../../lib/utils";

const toolbarVariants = tv({
  slots: {
    root: [
      // base
      "flex items-center gap-px rounded-md border p-0.5",
      // colors
      "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
    ],
    button: [
      // base
      "flex items-center justify-center rounded-sm font-medium select-none transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-600 dark:text-zinc-400",
      // hover
      "hover:bg-zinc-100 dark:hover:bg-zinc-700",
      // active
      "active:bg-zinc-200 dark:active:bg-zinc-600",
      // highlighted (keyboard navigation)
      "data-[highlighted]:bg-zinc-100 dark:data-[highlighted]:bg-zinc-700",
      // pressed (for toggle buttons)
      "data-[pressed]:bg-zinc-100 data-[pressed]:text-zinc-900 dark:data-[pressed]:bg-zinc-700 dark:data-[pressed]:text-zinc-100",
      // disabled
      "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // focus
      focusRing,
      "focus-visible:bg-none focus-visible:-outline-offset-1",
    ],
    link: [
      // base
      "flex items-center justify-center rounded-sm font-medium select-none transition-all duration-100 ease-in-out no-underline",
      // colors
      "text-zinc-500 dark:text-zinc-400",
      // hover
      "hover:text-blue-600 dark:hover:text-blue-400",
      // highlighted
      "data-[highlighted]:text-blue-600 dark:data-[highlighted]:text-blue-400",
      // focus
      focusRing,
      "focus-visible:-outline-offset-2",
    ],
    input: [
      // base
      "flex items-center justify-center rounded-sm font-medium transition-all duration-100 ease-in-out",
      // colors
      "text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950",
      // border
      "border border-zinc-200 dark:border-zinc-600",
      // hover
      "hover:border-zinc-400 dark:hover:border-zinc-500",
      // highlighted
      "data-[highlighted]:border-blue-500 dark:data-[highlighted]:border-blue-400",
      // focus
      "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
      // disabled
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    group: [
      // base
      "flex items-center gap-1",
    ],
    separator: [
      // base
      "mx-1 h-4 w-px",
      // colors
      "bg-zinc-300 dark:bg-zinc-600",
    ],
  },
  variants: {
    variant: {
      default: {
        root: "border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
      },
      outline: {
        root: "border-zinc-200 bg-transparent dark:border-zinc-600",
      },
      ghost: {
        root: "border-transparent bg-transparent",
      },
    },
    size: {
      sm: {
        root: "gap-0.5 p-0.5",
        button: "h-6 min-w-6 px-1.5 text-xs",
        link: "h-6 px-1.5 text-xs",
        input: "h-6 px-1.5 text-xs",
      },
      default: {
        root: "gap-px p-0.5",
        button: "h-8 min-w-8 px-3 text-sm",
        link: "h-8 px-3 text-sm",
        input: "h-8 px-3 text-sm",
      },
      lg: {
        root: "gap-1 p-1",
        button: "h-10 min-w-10 px-4 text-base",
        link: "h-10 px-4 text-base",
        input: "h-10 px-4 text-base",
      },
    },
    orientation: {
      horizontal: {
        root: "flex-row",
        separator: "h-4 w-px",
      },
      vertical: {
        root: "flex-col",
        separator: "h-px w-4",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
});

type ToolbarProps = {} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Root> & VariantProps<typeof toolbarVariants>;

/**
 * Action toolbar component containing grouped buttons and controls.
 *
 * @id toolbar
 * @name Toolbar
 * @icon Settings
 * @category navigation
 * @component
 * @param props - Component properties.
 */
const Toolbar = ({ ref, className, variant, size, orientation, ...props }: ToolbarProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Root> | null> }) => {
  const { root } = toolbarVariants({ variant, size, orientation });

  return (
    <BaseToolbar.Root
      ref={ref}
      orientation={orientation}
      className={cx(root(), className)}
      {...props}
    />
  );
};

Toolbar.displayName = "Toolbar";

type ToolbarButtonProps = {} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Button> & VariantProps<typeof toolbarVariants>;

/**
 * Interactive button component for toolbar actions.
 *
 * Creates clickable buttons with hover, focus, and pressed states.
 * Supports toggle functionality for stateful actions and proper
 * keyboard navigation within the toolbar context.
 *
 * @param children - Button content (typically icons or text).
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI ToolbarButton props.
 *
 * @component
 * @example
 * ```tsx
 * // Icon button
 * <ToolbarButton aria-label="Save document">
 *   <Save className="h-4 w-4" />
 * </ToolbarButton>
 *
 * // Toggle button with pressed state
 * <ToolbarButton data-pressed={isBold} aria-label="Bold text">
 *   <Bold className="h-4 w-4" />
 * </ToolbarButton>
 * ```
 */
const ToolbarButton = ({ ref, className, variant, size, ...props }: ToolbarButtonProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Button> | null> }) => {
  const { button } = toolbarVariants({ variant, size });

  return (
    <BaseToolbar.Button
      ref={ref}
      className={cx(button(), className)}
      {...props}
    />
  );
};

ToolbarButton.displayName = "ToolbarButton";

type ToolbarLinkProps = {} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Link> & VariantProps<typeof toolbarVariants>;

/**
 * Link component for toolbar navigation actions.
 *
 * Creates styled links with hover effects and proper focus management
 * within the toolbar context. Perfect for navigation or external links.
 *
 * @param href - URL for the link.
 * @param children - Link content (typically text or icons).
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI ToolbarLink props.
 *
 * @component
 * @example
 * ```tsx
 * <ToolbarLink href="/help">Help</ToolbarLink>
 * <ToolbarLink href="/settings">Settings</ToolbarLink>
 * ```
 */
const ToolbarLink = ({ ref, className, variant, size, ...props }: ToolbarLinkProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Link> | null> }) => {
  const { link } = toolbarVariants({ variant, size });

  return (
    <BaseToolbar.Link ref={ref} className={cx(link(), className)} {...props} />
  );
};

ToolbarLink.displayName = "ToolbarLink";

type ToolbarInputProps = {} & Omit<
  React.ComponentPropsWithoutRef<typeof BaseToolbar.Input>,
  "size"
> & VariantProps<typeof toolbarVariants>;

/**
 * Input component for toolbar search and data entry.
 *
 * Creates styled input fields with proper focus states and sizing
 * that integrates seamlessly with other toolbar components.
 *
 * @param placeholder - Placeholder text for the input.
 * @param value - Current input value.
 * @param onChange - Change handler for input updates.
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI ToolbarInput props.
 *
 * @component
 * @example
 * ```tsx
 * <ToolbarInput
 *   placeholder="Search..."
 *   value={searchValue}
 *   onChange={(e) => setSearchValue(e.target.value)}
 * />
 * ```
 */
const ToolbarInput = ({ ref, className, variant, size, ...props }: ToolbarInputProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Input> | null> }) => {
  const { input } = toolbarVariants({ variant, size });

  return (
    <BaseToolbar.Input
      ref={ref}
      className={cx(input(), className)}
      {...props}
    />
  );
};

ToolbarInput.displayName = "ToolbarInput";

type ToolbarGroupProps = {} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Group> & VariantProps<typeof toolbarVariants>;

/**
 * Group component for organizing related toolbar items.
 *
 * Creates logical groupings of toolbar items with consistent spacing.
 * Useful for organizing related actions and improving keyboard navigation.
 *
 * @param children - Toolbar items to group together.
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI ToolbarGroup props.
 *
 * @component
 * @example
 * ```tsx
 * <ToolbarGroup>
 *   <ToolbarButton>Undo</ToolbarButton>
 *   <ToolbarButton>Redo</ToolbarButton>
 * </ToolbarGroup>
 * ```
 */
const ToolbarGroup = ({ ref, className, variant, size, ...props }: ToolbarGroupProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Group> | null> }) => {
  const { group } = toolbarVariants({ variant, size });

  return (
    <BaseToolbar.Group
      ref={ref}
      className={cx(group(), className)}
      {...props}
    />
  );
};

ToolbarGroup.displayName = "ToolbarGroup";

type ToolbarSeparatorProps = {} & React.ComponentPropsWithoutRef<typeof BaseToolbar.Separator> & VariantProps<typeof toolbarVariants>;

/**
 * Visual separator for dividing toolbar sections.
 *
 * Creates visual separation between toolbar groups or sections.
 * Automatically adjusts orientation based on toolbar layout.
 *
 * @param orientation - Separator orientation (matches toolbar orientation).
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI ToolbarSeparator props.
 *
 * @component
 * @example
 * ```tsx
 * <Toolbar>
 *   <ToolbarButton>Bold</ToolbarButton>
 *   <ToolbarButton>Italic</ToolbarButton>
 *   <ToolbarSeparator />
 *   <ToolbarButton>Align Left</ToolbarButton>
 * </Toolbar>
 * ```
 */
const ToolbarSeparator = ({ ref, className, variant, size, orientation, ...props }: ToolbarSeparatorProps & { ref?: React.RefObject<React.ElementRef<typeof BaseToolbar.Separator> | null> }) => {
  const { separator } = toolbarVariants({ variant, size, orientation });

  return (
    <BaseToolbar.Separator
      ref={ref}
      orientation={orientation}
      className={cx(separator(), className)}
      {...props}
    />
  );
};

ToolbarSeparator.displayName = "ToolbarSeparator";

// Export individual components for advanced usage
const ToolbarRoot = BaseToolbar.Root;

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
  toolbarVariants,
};

export type {
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarInputProps,
  ToolbarLinkProps,
  ToolbarProps,
  ToolbarSeparatorProps,
};
