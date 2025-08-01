/**
 * Responsive drawer component that adapts behavior based on screen size.
 *
 * @id responsive-drawer
 * @name ResponsiveDrawer
 * @icon PanelLeft
 * @category ui
 * @component
 * @param props - Component properties.
 *
 * Features:
 * - Automatic mobile/desktop detection
 * - Mobile: Bottom drawer using Vaul library
 * - Desktop: Side sheet using Base UI Dialog
 * - Consistent component API across implementations
 * - Touch gestures on mobile, click interactions on desktop
 * - Proper accessibility support on both platforms
 * - Responsive behavior with screen size changes.
 *
 * Mobile Implementation:
 * - Uses Vaul drawer library for bottom sheet behavior
 * - Touch-friendly gestures and animations
 * - Optimized for thumb navigation.
 *
 * Desktop Implementation:
 * - Uses Base UI Dialog as side sheet
 * - Keyboard navigation support
 * - Optimized for mouse interactions.
 *
 * @example
 * ```tsx
 * // Basic responsive drawer
 * <ResponsiveDrawer>
 *   <ResponsiveDrawerTrigger render={<button>Open Menu</button>} />
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
 *       <ResponsiveDrawerClose render={<button>Close</button>} />
 *     </ResponsiveDrawerFooter>
 *   </ResponsiveDrawerContent>
 * </ResponsiveDrawer>
 *
 * // Controlled state
 * const [open, setOpen] = useState(false);
 *
 * <ResponsiveDrawer open={open} onOpenChange={setOpen}>
 *   <ResponsiveDrawerTrigger render={<button>Open Navigation</button>} />
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

import { useIsMobile } from "../../hooks/use-mobile";
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
type ResponsiveDrawerProps = {
  /**
   * Drawer content including trigger and content components.
   */
  children: React.ReactNode;
  /**
   * Whether the drawer is open (controlled mode).
   */
  open?: boolean;
  /**
   * Callback when drawer open state changes.
   */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Props for the ResponsiveDrawerTrigger component.
 *
 * Configuration for the element that opens the drawer.
 */
type ResponsiveDrawerTriggerProps = {
  /**
   * Trigger element content.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Render prop for custom trigger element. When provided, the trigger
   * functionality is merged with the rendered element.
   */
  render?: React.ReactElement<Record<string, unknown>>;
};

/**
 * Props for the ResponsiveDrawerContent component.
 *
 * Configuration for the main drawer content container.
 */
type ResponsiveDrawerContentProps = {
  /**
   * Content elements including header, body, and footer.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerHeader component.
 *
 * Configuration for the drawer header section.
 */
type ResponsiveDrawerHeaderProps = {
  /**
   * Header content including title and description.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerTitle component.
 *
 * Configuration for the drawer title text.
 */
type ResponsiveDrawerTitleProps = {
  /**
   * Title text content.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerDescription component.
 *
 * Configuration for the drawer description text.
 */
type ResponsiveDrawerDescriptionProps = {
  /**
   * Description text content.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerBody component.
 *
 * Configuration for the main scrollable content area.
 */
type ResponsiveDrawerBodyProps = {
  /**
   * Main content elements.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerFooter component.
 *
 * Configuration for the drawer footer section.
 */
type ResponsiveDrawerFooterProps = {
  /**
   * Footer content including action buttons.
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
};

/**
 * Props for the ResponsiveDrawerClose component.
 *
 * Configuration for elements that close the drawer.
 */
type ResponsiveDrawerCloseProps = {
  /**
   * Close trigger element content.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Render prop for custom close trigger element. When provided, the close
   * functionality is merged with the rendered element.
   */
  render?: React.ReactElement<Record<string, unknown>>;
};

/**
 * Responsive drawer component that adapts behavior based on screen size.
 *
 * @id responsive-drawer
 * @name ResponsiveDrawer
 * @icon PanelLeft
 * @category ui
 * @component
 * @param props - Component properties.
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
 * @param children - Trigger element content (button, link, etc.).
 * @param className - Additional CSS classes.
 * @param render - Render prop for custom trigger element.
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerTrigger render={<button className="px-4 py-2 bg-blue-500 text-white rounded">Open Menu</button>} />
 *
 * <ResponsiveDrawerTrigger className="custom-trigger-class">
 *   <div>Custom trigger</div>
 * </ResponsiveDrawerTrigger>
 * ```
 */
const ResponsiveDrawerTrigger: React.FC<ResponsiveDrawerTriggerProps> = ({
  children,
  render,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Vaul uses asChild pattern, so we need to convert render prop to asChild
    if (render) {
      return <DrawerTrigger asChild {...props}>{render}</DrawerTrigger>;
    }
    return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
  }

  // Desktop uses Base UI which supports render prop natively
  if (render) {
    return <SheetTrigger render={render} {...props}>{children}</SheetTrigger>;
  }
  return <SheetTrigger {...props}>{children}</SheetTrigger>;
};

/**
 * Responsive drawer content container component.
 *
 * Renders the main content area with appropriate styling for each platform.
 * Mobile version slides up from bottom, desktop version slides in from side.
 *
 * @param children - Content elements including header, body, footer.
 * @param className - Additional CSS classes.
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
 * @param children - Header content (title, description, close button).
 * @param className - Additional CSS classes.
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
 * @param children - Title text content.
 * @param className - Additional CSS classes.
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
 * @param children - Description text content.
 * @param className - Additional CSS classes.
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
 * @param children - Main content elements.
 * @param className - Additional CSS classes.
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
 * @param children - Footer content (buttons, links, etc.).
 * @param className - Additional CSS classes.
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
 * @param children - Close trigger element (button, icon, etc.).
 * @param className - Additional CSS classes.
 * @param render - Render prop for custom close trigger element.
 *
 * @component
 * @example
 * ```tsx
 * <ResponsiveDrawerClose render={<button className="px-4 py-2 bg-red-500 text-white rounded">Close</button>} />
 *
 * <ResponsiveDrawerClose render={<button className="p-2 rounded-full hover:bg-zinc-100"><X className="w-4 h-4" /></button>} />
 * ```
 */
const ResponsiveDrawerClose: React.FC<ResponsiveDrawerCloseProps> = ({
  children,
  render,
  ...props
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Vaul uses asChild pattern, so we need to convert render prop to asChild
    if (render) {
      return <DrawerClose asChild {...props}>{render}</DrawerClose>;
    }
    return <DrawerClose {...props}>{children}</DrawerClose>;
  }

  // Desktop uses Base UI which supports render prop natively
  if (render) {
    return <SheetClose render={render} {...props}>{children}</SheetClose>;
  }
  return <SheetClose {...props}>{children}</SheetClose>;
};

export { ResponsiveDrawer, ResponsiveDrawerBody, ResponsiveDrawerClose, ResponsiveDrawerContent, ResponsiveDrawerDescription, ResponsiveDrawerFooter, ResponsiveDrawerHeader, type ResponsiveDrawerProps, ResponsiveDrawerTitle, ResponsiveDrawerTrigger };
