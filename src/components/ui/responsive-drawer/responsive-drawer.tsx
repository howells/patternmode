/**
 * Responsive Drawer Components
 *
 * An adaptive drawer system that automatically switches between mobile drawer
 * (bottom sheet) and desktop sheet (side panel) based on screen size. Provides
 * consistent API across different device types while optimizing UX for each.
 *
 * Features:
 * - Automatic mobile/desktop detection
 * - Mobile: Bottom drawer using Vaul library
 * - Desktop: Side sheet using Base UI Dialog
 * - Consistent component API across implementations
 * - Touch gestures on mobile, click interactions on desktop
 * - Proper accessibility support on both platforms
 * - Responsive behavior with screen size changes
 *
 * Mobile Implementation:
 * - Uses Vaul drawer library for bottom sheet behavior
 * - Touch-friendly gestures and animations
 * - Optimized for thumb navigation
 *
 * Desktop Implementation:
 * - Uses Base UI Dialog as side sheet
 * - Keyboard navigation support
 * - Optimized for mouse interactions
 *
 * @example
 * ```tsx
 * // Basic responsive drawer
 * <ResponsiveDrawer>
 *   <ResponsiveDrawerTrigger>
 *     <button>Open Menu</button>
 *   </ResponsiveDrawerTrigger>
 *   <ResponsiveDrawerContent>
 *     <ResponsiveDrawerHeader>
 *       <ResponsiveDrawerTitle>Settings</ResponsiveDrawerTitle>
 *       <ResponsiveDrawerDescription>
 *         Manage your account settings
 *       </ResponsiveDrawerDescription>
 *     </ResponsiveDrawerHeader>
 *     <ResponsiveDrawerBody>
 *       <div className="space-y-4">
 *         <div>Setting 1</div>
 *         <div>Setting 2</div>
 *       </div>
 *     </ResponsiveDrawerBody>
 *     <ResponsiveDrawerFooter>
 *       <ResponsiveDrawerClose>
 *         <button>Close</button>
 *       </ResponsiveDrawerClose>
 *     </ResponsiveDrawerFooter>
 *   </ResponsiveDrawerContent>
 * </ResponsiveDrawer>
 *
 * // Controlled state
 * const [open, setOpen] = useState(false);
 *
 * <ResponsiveDrawer open={open} onOpenChange={setOpen}>
 *   <ResponsiveDrawerTrigger>
 *     <button>Open Navigation</button>
 *   </ResponsiveDrawerTrigger>
 *   <ResponsiveDrawerContent>
 *     <ResponsiveDrawerHeader>
 *       <ResponsiveDrawerTitle>Navigation</ResponsiveDrawerTitle>
 *     </ResponsiveDrawerHeader>
 *     <ResponsiveDrawerBody>
 *       <nav>
 *         <a href="/dashboard">Dashboard</a>
 *         <a href="/settings">Settings</a>
 *         <a href="/profile">Profile</a>
 *       </nav>
 *     </ResponsiveDrawerBody>
 *   </ResponsiveDrawerContent>
 * </ResponsiveDrawer>
 * ```
 */

"use client";

import React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

// Mobile drawer (Vaul)
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer/drawer";

// Desktop sheet (Base UI Dialog)
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet/sheet";

/**
 * Props for the ResponsiveDrawer root component.
 *
 * Configuration for the adaptive drawer container.
 */
interface ResponsiveDrawerProps {
  /** Drawer content including trigger and content components */
  children: React.ReactNode;
  /** Whether the drawer is open (controlled mode) */
  open?: boolean;
  /** Callback when drawer open state changes */
  onOpenChange?: (open: boolean) => void;
}

/**
 * Props for the ResponsiveDrawerTrigger component.
 *
 * Configuration for the element that opens the drawer.
 */
interface ResponsiveDrawerTriggerProps {
  /** Trigger element content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerContent component.
 *
 * Configuration for the main drawer content container.
 */
interface ResponsiveDrawerContentProps {
  /** Content elements including header, body, and footer */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerHeader component.
 *
 * Configuration for the drawer header section.
 */
interface ResponsiveDrawerHeaderProps {
  /** Header content including title and description */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerTitle component.
 *
 * Configuration for the drawer title text.
 */
interface ResponsiveDrawerTitleProps {
  /** Title text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerDescription component.
 *
 * Configuration for the drawer description text.
 */
interface ResponsiveDrawerDescriptionProps {
  /** Description text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerBody component.
 *
 * Configuration for the main scrollable content area.
 */
interface ResponsiveDrawerBodyProps {
  /** Main content elements */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerFooter component.
 *
 * Configuration for the drawer footer section.
 */
interface ResponsiveDrawerFooterProps {
  /** Footer content including action buttons */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the ResponsiveDrawerClose component.
 *
 * Configuration for elements that close the drawer.
 */
interface ResponsiveDrawerCloseProps {
  /** Close trigger element content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Root responsive drawer component that adapts to screen size.
 *
 * Automatically renders either a mobile bottom drawer or desktop side sheet
 * based on the current viewport size. Provides consistent API while optimizing
 * UX for each platform.
 *
 * @param children - Drawer content including trigger and content
 * @param open - Whether drawer is open (controlled mode)
 * @param onOpenChange - Callback for open state changes
 *
 * @component
 * @example
 * ```tsx
 * // Uncontrolled drawer
 * <ResponsiveDrawer>
 *   <ResponsiveDrawerTrigger>
 *     <button>Open</button>
 *   </ResponsiveDrawerTrigger>
 *   <ResponsiveDrawerContent>
 *     Content here
 *   </ResponsiveDrawerContent>
 * </ResponsiveDrawer>
 *
 * // Controlled drawer
 * <ResponsiveDrawer open={isOpen} onOpenChange={setIsOpen}>
 *   <ResponsiveDrawerTrigger>
 *     <button>Toggle</button>
 *   </ResponsiveDrawerTrigger>
 *   <ResponsiveDrawerContent>
 *     Content here
 *   </ResponsiveDrawerContent>
 * </ResponsiveDrawer>
 * ```
 */
const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Drawer {...props}>{children}</Drawer>;
  }

  return <Sheet {...props}>{children}</Sheet>;
};

/**
 * Responsive drawer trigger component.
 *
 * Renders the appropriate trigger element based on screen size.
 * On mobile uses drawer trigger, on desktop uses sheet trigger.
 *
 * @param children - Trigger element content (button, link, etc.)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerTrigger>
 *   <button className="px-4 py-2 bg-blue-500 text-white rounded">
 *     Open Menu
 *   </button>
 * </ResponsiveDrawerTrigger>
 *
 * <ResponsiveDrawerTrigger className="custom-trigger-class">
 *   <div>Custom trigger</div>
 * </ResponsiveDrawerTrigger>
 * ```
 */
const ResponsiveDrawerTrigger: React.FC<ResponsiveDrawerTriggerProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
  }

  return <SheetTrigger {...props}>{children}</SheetTrigger>;
};

/**
 * Responsive drawer content container component.
 *
 * Renders the main content area with appropriate styling for each platform.
 * Mobile version slides up from bottom, desktop version slides in from side.
 *
 * @param children - Content elements including header, body, footer
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerContent>
 *   <ResponsiveDrawerHeader>
 *     <ResponsiveDrawerTitle>Title</ResponsiveDrawerTitle>
 *   </ResponsiveDrawerHeader>
 *   <ResponsiveDrawerBody>
 *     Main content here
 *   </ResponsiveDrawerBody>
 * </ResponsiveDrawerContent>
 * ```
 */
const ResponsiveDrawerContent: React.FC<ResponsiveDrawerContentProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerContent {...props}>{children}</DrawerContent>;
  }

  return <SheetContent {...props}>{children}</SheetContent>;
};

/**
 * Responsive drawer header component.
 *
 * Renders the header section with title and description.
 * Provides consistent styling across mobile and desktop implementations.
 *
 * @param children - Header content (title, description, close button)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerHeader>
 *   <ResponsiveDrawerTitle>Settings</ResponsiveDrawerTitle>
 *   <ResponsiveDrawerDescription>
 *     Manage your account preferences
 *   </ResponsiveDrawerDescription>
 * </ResponsiveDrawerHeader>
 * ```
 */
const ResponsiveDrawerHeader: React.FC<ResponsiveDrawerHeaderProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerHeader {...props}>{children}</DrawerHeader>;
  }

  return <SheetHeader {...props}>{children}</SheetHeader>;
};

/**
 * Responsive drawer title component.
 *
 * Renders the title text with appropriate typography and accessibility attributes.
 * Essential for screen reader support and semantic structure.
 *
 * @param children - Title text content
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerTitle>
 *   User Settings
 * </ResponsiveDrawerTitle>
 *
 * <ResponsiveDrawerTitle className="text-lg font-bold">
 *   Custom Styled Title
 * </ResponsiveDrawerTitle>
 * ```
 */
const ResponsiveDrawerTitle: React.FC<ResponsiveDrawerTitleProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerTitle {...props}>{children}</DrawerTitle>;
  }

  return <SheetTitle {...props}>{children}</SheetTitle>;
};

/**
 * Responsive drawer description component.
 *
 * Renders descriptive text below the title with proper accessibility attributes.
 * Provides additional context about the drawer's purpose or content.
 *
 * @param children - Description text content
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerDescription>
 *   Configure your account settings and preferences
 * </ResponsiveDrawerDescription>
 *
 * <ResponsiveDrawerDescription className="text-sm text-zinc-600">
 *   This action cannot be undone
 * </ResponsiveDrawerDescription>
 * ```
 */
const ResponsiveDrawerDescription: React.FC<
  ResponsiveDrawerDescriptionProps
> = ({ children, ...props }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerDescription {...props}>{children}</DrawerDescription>;
  }

  return <SheetDescription {...props}>{children}</SheetDescription>;
};

/**
 * Responsive drawer body component.
 *
 * Renders the main scrollable content area of the drawer.
 * On mobile uses a padded div, on desktop uses the sheet body component.
 *
 * @param children - Main content elements
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerBody>
 *   <div className="space-y-4">
 *     <div>Content item 1</div>
 *     <div>Content item 2</div>
 *     <div>Content item 3</div>
 *   </div>
 * </ResponsiveDrawerBody>
 *
 * <ResponsiveDrawerBody className="custom-scrollbar">
 *   <nav>
 *     <a href="/dashboard">Dashboard</a>
 *     <a href="/settings">Settings</a>
 *   </nav>
 * </ResponsiveDrawerBody>
 * ```
 */
const ResponsiveDrawerBody: React.FC<ResponsiveDrawerBodyProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile drawer doesn't have a specific body component, just use a div
    return (
      <div className="px-4" {...props}>
        {children}
      </div>
    );
  }

  return <SheetBody {...props}>{children}</SheetBody>;
};

/**
 * Responsive drawer footer component.
 *
 * Renders the footer section typically containing action buttons.
 * Provides consistent spacing and layout across implementations.
 *
 * @param children - Footer content (buttons, links, etc.)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerFooter>
 *   <div className="flex gap-2">
 *     <button className="flex-1 bg-zinc-200">Cancel</button>
 *     <button className="flex-1 bg-blue-500 text-white">Save</button>
 *   </div>
 * </ResponsiveDrawerFooter>
 *
 * <ResponsiveDrawerFooter>
 *   <ResponsiveDrawerClose>
 *     <button>Close</button>
 *   </ResponsiveDrawerClose>
 * </ResponsiveDrawerFooter>
 * ```
 */
const ResponsiveDrawerFooter: React.FC<ResponsiveDrawerFooterProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerFooter {...props}>{children}</DrawerFooter>;
  }

  return <SheetFooter {...props}>{children}</SheetFooter>;
};

/**
 * Responsive drawer close component.
 *
 * Renders elements that close the drawer when activated.
 * Automatically handles the appropriate close mechanism for each platform.
 *
 * @param children - Close trigger element (button, icon, etc.)
 * @param className - Additional CSS classes
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerClose>
 *   <button className="px-4 py-2 bg-red-500 text-white rounded">
 *     Close
 *   </button>
 * </ResponsiveDrawerClose>
 *
 * <ResponsiveDrawerClose>
 *   <button className="p-2 rounded-full hover:bg-zinc-100">
 *     <X className="w-4 h-4" />
 *   </button>
 * </ResponsiveDrawerClose>
 * ```
 */
const ResponsiveDrawerClose: React.FC<ResponsiveDrawerCloseProps> = ({
  children,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerClose {...props}>{children}</DrawerClose>;
  }

  return <SheetClose {...props}>{children}</SheetClose>;
};

export {
  ResponsiveDrawer,
  ResponsiveDrawerBody,
  ResponsiveDrawerClose,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerFooter,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
};
