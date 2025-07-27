// Tremor Command [v1.0.0] - CMDK

"use client";

import { cx, focusRing } from "@/lib/utils";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { tv, type VariantProps } from "tailwind-variants";

import { Input } from "../input/input";

const commandVariants = tv({
  slots: {
    root: [
      // base
      "flex h-full w-full flex-col overflow-hidden rounded-md",
      // background
      "bg-white dark:bg-zinc-950",
      // border
      "border border-zinc-200 dark:border-zinc-800",
      // text
      "text-zinc-950 dark:text-zinc-50",
      // command group heading styles
      "[&_[cmdk-group-heading]]:px-1.5 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 dark:[&_[cmdk-group-heading]]:text-zinc-600",
    ],
    input: [
      // base
      "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-50",
      // padding
      "px-3",
      // focus
      focusRing,
    ],
    list: [
      // base
      "max-h-[300px] overflow-y-auto overflow-x-hidden",
      // scrollbar styling
      "scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600",
    ],
    empty: [
      // base
      "py-6 text-center text-sm",
      // text color
      "text-zinc-500 dark:text-zinc-400",
    ],
    group: [
      // base
      "overflow-hidden p-1",
      // text
      "text-zinc-950 dark:text-zinc-50",
    ],
    item: [
      // base
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
      // hover/focus
      "hover:bg-zinc-100 focus:bg-zinc-100 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800",
      // disabled
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      // selected
      "data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800",
    ],
    shortcut: [
      // base
      "ml-auto text-xs tracking-widest",
      // text color
      "text-zinc-500 dark:text-zinc-400",
    ],
    separator: [
      // base
      "-mx-1 h-px",
      // background
      "bg-zinc-200 dark:bg-zinc-800",
    ],
    dialog: [
      // base
      "fixed inset-0 z-50 bg-black/80 transition-opacity duration-200",
    ],
    dialogContent: [
      // base
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg transition-all duration-200 sm:rounded-lg",
      // background
      "bg-white dark:bg-zinc-950",
      // border
      "border-zinc-200 dark:border-zinc-800",
    ],
  },
  variants: {
    size: {
      default: {
        root: "h-auto",
        input: "h-11 text-sm",
        item: "px-2 py-1.5 text-sm",
      },
      sm: {
        root: "h-auto",
        input: "h-9 text-sm",
        item: "px-2 py-1 text-sm",
      },
      lg: {
        root: "h-auto",
        input: "h-12 text-base",
        item: "px-3 py-2 text-base",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * Variant props for command components.
 *
 * Defines size variants that affect input height, item padding,
 * and overall component dimensions.
 */
type CommandVariants = VariantProps<typeof commandVariants>;

/**
 * A command palette component built on CMDK.
 *
 * Based on CMDK (https://cmdk.paco.me/), providing a fast, composable command menu
 * with search functionality. Perfect for command palettes, quick actions, and
 * searchable lists. Features keyboard navigation, filtering, and grouping.
 *
 * @param size - Size variant affecting input and item dimensions
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * // Basic command palette
 * <Command>
 *   <CommandInput placeholder="Search commands..." />
 *   <CommandList>
 *     <CommandGroup heading="Actions">
 *       <CommandItem>New File</CommandItem>
 *       <CommandItem>Save</CommandItem>
 *       <CommandItem>Exit</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // Large size variant
 * <Command size="lg">
 *   <CommandInput placeholder="Type a command" />
 *   <CommandList>
 *     <CommandItem leftIcon={FileIcon}>New Document</CommandItem>
 *     <CommandItem leftIcon={FolderIcon}>New Folder</CommandItem>
 *   </CommandList>
 * </Command>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & CommandVariants
>(({ className, size, ...props }, ref) => {
  const { root } = commandVariants({ size });
  return (
    <CommandPrimitive ref={ref} className={cx(root(), className)} {...props} />
  );
});
Command.displayName = CommandPrimitive.displayName;

// Custom VisuallyHidden component to replace Radix
const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => (
  <span
    ref={ref}
    className="absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden"
    {...props}
  >
    {children}
  </span>
));
VisuallyHidden.displayName = "VisuallyHidden";

// Custom Dialog components to replace Radix
interface DialogRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const DialogRoot: React.FC<DialogRootProps> = ({
  open = false,
  onOpenChange,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <DialogPortal>
      <DialogOverlay onClick={() => handleOpenChange(false)} />
      <DialogContent>{children}</DialogContent>
    </DialogPortal>
  );
};

const DialogPortal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return createPortal(children, document.body);
};

const DialogOverlay: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { dialog } = commandVariants();
  return <div className={dialog()} onClick={onClick} role="presentation" />;
};

const DialogContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { dialogContent } = commandVariants();
  return (
    <div className={dialogContent()} role="dialog" aria-modal="true">
      {children}
    </div>
  );
};

/**
 * A modal dialog wrapper for the command palette.
 *
 * Custom implementation without Radix dependencies, providing a full-screen modal overlay
 * for command palette interfaces. Features backdrop blur, animations,
 * and proper focus management.
 *
 * @param children - Command components to render inside dialog
 * @param open - Whether dialog is open
 * @param onOpenChange - Callback when dialog open state changes
 *
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandGroup heading="Quick Actions">
 *       <CommandItem>Create New</CommandItem>
 *       <CommandItem>Open Recent</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
const CommandDialog = ({ children, ...props }: DialogRootProps) => {
  return (
    <DialogRoot {...props}>
      <VisuallyHidden>
        <span>Command Menu</span>
      </VisuallyHidden>
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </DialogRoot>
  );
};

/**
 * Search input for filtering command items.
 *
 * Based on our Input component, providing real-time filtering of command items.
 * Features a search icon, proper focus styling, and matches the design system.
 * Automatically filters items based on text content.
 *
 * @param placeholder - Placeholder text for the input
 * @param value - Controlled input value
 * @param onValueChange - Callback when input value changes
 *
 * @example
 * ```tsx
 * <CommandInput
 *   placeholder="Type to search commands..."
 *   value={search}
 *   onValueChange={setSearch}
 * />
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      className="border-b border-zinc-200 dark:border-zinc-800"
      cmdk-input-wrapper=""
    >
      <CommandPrimitive.Input
        ref={ref}
        asChild
        className={className}
        {...props}
      >
        <Input prefixIcon={Search} prefixStyling={false} minimal />
      </CommandPrimitive.Input>
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * Scrollable container for command groups and items.
 *
 * Based on CMDK's List component, providing a scrollable area for command items
 * with custom scrollbar styling. Handles keyboard navigation and selection
 * automatically.
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup heading="Files">
 *     <CommandItem>New File</CommandItem>
 *     <CommandItem>Open File</CommandItem>
 *   </CommandGroup>
 *   <CommandSeparator />
 *   <CommandGroup heading="Edit">
 *     <CommandItem>Cut</CommandItem>
 *     <CommandItem>Copy</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
  const { list } = commandVariants();
  return (
    <CommandPrimitive.List
      ref={ref}
      className={cx(list(), className)}
      {...props}
    />
  );
});

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * Fallback component displayed when no commands match the search.
 *
 * Based on CMDK's Empty component, shown automatically when no command items
 * match the current filter. Provides user feedback for empty search results.
 *
 * @example
 * ```tsx
 * <CommandEmpty>No results found.</CommandEmpty>
 *
 * // Custom empty state
 * <CommandEmpty>
 *   <div className="text-center py-8">
 *     <SearchIcon className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
 *     <p className="text-lg font-medium">No commands found</p>
 *     <p className="text-zinc-500">Try searching for something else</p>
 *   </div>
 * </CommandEmpty>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => {
  const { empty } = commandVariants();
  return (
    <CommandPrimitive.Empty
      ref={ref}
      className={cx(empty(), className)}
      {...props}
    />
  );
});

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * Grouping component for organizing related commands.
 *
 * Based on CMDK's Group component, providing logical grouping with optional
 * headings. Groups can be filtered independently and provide visual separation
 * between different command categories.
 *
 * @param heading - Optional heading text for the group
 *
 * @example
 * ```tsx
 * <CommandGroup heading="File Operations">
 *   <CommandItem>New File</CommandItem>
 *   <CommandItem>Open File</CommandItem>
 *   <CommandItem>Save File</CommandItem>
 * </CommandGroup>
 *
 * // Group without heading
 * <CommandGroup>
 *   <CommandItem>About</CommandItem>
 *   <CommandItem>Settings</CommandItem>
 * </CommandGroup>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { group } = commandVariants();
  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cx(group(), className)}
      {...props}
    />
  );
});

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * Visual separator between command groups or items.
 *
 * Based on CMDK's Separator component, providing a subtle divider line
 * to organize command sections visually.
 *
 * @example
 * ```tsx
 * <CommandGroup heading="Files">
 *   <CommandItem>New</CommandItem>
 *   <CommandItem>Open</CommandItem>
 * </CommandGroup>
 * <CommandSeparator />
 * <CommandGroup heading="Edit">
 *   <CommandItem>Copy</CommandItem>
 *   <CommandItem>Paste</CommandItem>
 * </CommandGroup>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { separator } = commandVariants();
  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cx(separator(), className)}
      {...props}
    />
  );
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * Props for the CommandItem component.
 *
 * @interface CommandItemProps
 * @extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
 */
interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  /** Icon component to display on the left side */
  leftIcon?: React.ComponentType<{ className?: string }>;
}

/**
 * Individual selectable command item.
 *
 * Based on CMDK's Item component, providing keyboard navigation and selection.
 * Supports optional left icons, keyboard shortcuts, and custom content.
 * Automatically handles hover, focus, and selection states.
 *
 * @param leftIcon - Icon component to show on the left
 * @param onSelect - Callback when item is selected
 * @param disabled - Whether the item is disabled
 * @param value - Search value for filtering (defaults to children text)
 *
 * @example
 * ```tsx
 * // Basic item
 * <CommandItem onSelect={() => createNewFile()}>New File</CommandItem>
 *
 * // Item with icon and shortcut
 * <CommandItem leftIcon={FileIcon} onSelect={handleNew}>
 *   New File
 *   <CommandShortcut>⌘N</CommandShortcut>
 * </CommandItem>
 *
 * // Disabled item
 * <CommandItem disabled>Unavailable Action</CommandItem>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, leftIcon: LeftIcon, children, ...props }, ref) => {
  const { item } = commandVariants();

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cx(item(), className)}
      {...props}
    >
      {LeftIcon && <LeftIcon className="mr-2 h-4 w-4 shrink-0" />}
      {children}
    </CommandPrimitive.Item>
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * Keyboard shortcut display component.
 *
 * Displays keyboard shortcuts aligned to the right of command items.
 * Provides consistent styling for shortcuts across the command palette.
 *
 * @example
 * ```tsx
 * <CommandItem>
 *   Save File
 *   <CommandShortcut>⌘S</CommandShortcut>
 * </CommandItem>
 *
 * <CommandItem>
 *   Open File
 *   <CommandShortcut>⌘O</CommandShortcut>
 * </CommandItem>
 * ```
 */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  const { shortcut } = commandVariants();
  return <span className={cx(shortcut(), className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

/**
 * Loading state component for async command loading.
 *
 * Based on CMDK's Loading component, displayed when commands are being
 * loaded asynchronously. Provides user feedback during loading states.
 *
 * @example
 * ```tsx
 * {isLoading && <CommandLoading>Loading commands...</CommandLoading>}
 *
 * // Custom loading indicator
 * <CommandLoading>
 *   <div className="flex items-center gap-2">
 *     <Spinner className="h-4 w-4" />
 *     <span>Fetching results...</span>
 *   </div>
 * </CommandLoading>
 * ```
 *
 * @see https://cmdk.paco.me/ - CMDK documentation
 */
const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => {
  const { empty } = commandVariants();
  return (
    <CommandPrimitive.Loading
      ref={ref}
      className={cx(empty(), className)}
      {...props}
    />
  );
});

CommandLoading.displayName = CommandPrimitive.Loading.displayName;

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
};
