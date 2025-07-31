/**
 * Navbar Components.
 *
 * A flexible navigation bar component system for building application headers,
 * toolbars, and navigation areas. Features animated current indicators, flexible
 * layout options, and responsive design.
 *
 * Features:
 * - Flexible horizontal layout system
 * - Animated current page indicators using Framer Motion
 * - Section-based organization with dividers and spacers
 * - Next.js Link integration for navigation
 * - Icon and avatar support
 * - Responsive design with mobile optimizations
 * - Dark mode support
 * - Truncated labels for overflow handling.
 *
 * @example
 * ```tsx
 * // Basic navigation bar
 * <Navbar>
 *   <NavbarSection>
 *     <NavbarItem href="/" current>
 *       Home
 *     </NavbarItem>
 *     <NavbarItem href="/about">
 *       About
 *     </NavbarItem>
 *     <NavbarItem href="/contact">
 *       Contact
 *     </NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 *
 * // Complex navbar with sections and dividers
 * <Navbar>
 *   <NavbarSection>
 *     <NavbarItem href="/" current>
 *       <HomeIcon />
 *       <NavbarLabel>Dashboard</NavbarLabel>
 *     </NavbarItem>
 *     <NavbarItem href="/projects">
 *       <FolderIcon />
 *       <NavbarLabel>Projects</NavbarLabel>
 *     </NavbarItem>
 *   </NavbarSection>
 *
 *   <NavbarDivider />
 *
 *   <NavbarSection>
 *     <NavbarItem href="/settings">
 *       <SettingsIcon />
 *       <NavbarLabel>Settings</NavbarLabel>
 *     </NavbarItem>
 *   </NavbarSection>
 *
 *   <NavbarSpacer />
 *
 *   <NavbarSection>
 *     <NavbarItem href="/profile">
 *       <Avatar src={user.avatar} />
 *       <NavbarLabel>{user.name}</NavbarLabel>
 *     </NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 *
 * // Toolbar style navbar
 * <Navbar className="bg-white border-b">
 *   <NavbarSection>
 *     <NavbarItem onClick={() => undo()}>
 *       <UndoIcon />
 *     </NavbarItem>
 *     <NavbarItem onClick={() => redo()}>
 *       <RedoIcon />
 *     </NavbarItem>
 *   </NavbarSection>
 *
 *   <NavbarDivider />
 *
 *   <NavbarSection>
 *     <NavbarItem onClick={() => cut()}>
 *       <ScissorsIcon />
 *     </NavbarItem>
 *     <NavbarItem onClick={() => copy()}>
 *       <CopyIcon />
 *     </NavbarItem>
 *     <NavbarItem onClick={() => paste()}>
 *       <ClipboardIcon />
 *     </NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 * ```
 */

"use client";

import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import React, { useId } from "react";
import { cx } from "../../lib/utils";
import { Button } from "../button/button";

/**
 * Root navbar component for horizontal navigation layouts.
 *
 * Creates a flexible horizontal container for navigation items, sections,
 * and other navbar components. Provides consistent spacing and alignment.
 *
 * @id navbar
 * @name Navbar
 * @param className - Additional CSS classes.
 * @param props - Additional HTML nav element props.
 *
 * @component
 * @example
 * ```tsx
 * <Navbar className="bg-white border-b px-4">
 *   <NavbarSection>
 *     <NavbarItem href="/home">Home</NavbarItem>
 *     <NavbarItem href="/about">About</NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 * ```
 */
/**
 * A navigation bar component with branding, sections, and items.
 *
 * @id navbar
 * @name Navbar
 * @component
 */
export function Navbar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={cx(className, "flex flex-1 items-center gap-4 py-2.5")}
    />
  );
}

/**
 * Navbar divider component for visual separation.
 *
 * Creates a vertical line separator between navbar sections for visual
 * grouping and organization. Automatically adapts to light and dark themes.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * <Navbar>
 *   <NavbarSection>
 *     <NavbarItem>Item 1</NavbarItem>
 *     <NavbarItem>Item 2</NavbarItem>
 *   </NavbarSection>
 *   <NavbarDivider />
 *   <NavbarSection>
 *     <NavbarItem>Item 3</NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 * ```
 */
export function NavbarDivider({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cx(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
    />
  );
}

/**
 * Navbar section component for grouping related items.
 *
 * Groups related navbar items together with consistent spacing and
 * shared animation context using Framer Motion LayoutGroup. Each section
 * has its own animation scope for current indicators.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * <Navbar>
 *   <NavbarSection>
 *     <NavbarItem href="/dashboard" current>Dashboard</NavbarItem>
 *     <NavbarItem href="/projects">Projects</NavbarItem>
 *   </NavbarSection>
 *
 *   <NavbarSection>
 *     <NavbarItem href="/settings">Settings</NavbarItem>
 *     <NavbarItem href="/help">Help</NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 * ```
 */
export function NavbarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={cx(className, "flex items-center gap-3")} />
    </LayoutGroup>
  );
}

/**
 * Navbar spacer component for flexible spacing.
 *
 * Creates flexible space between navbar sections, pushing subsequent
 * sections to the right. Useful for creating left/right layouts.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML div element props.
 *
 * @component
 * @example
 * ```tsx
 * <Navbar>
 *   <NavbarSection>
 *     <NavbarItem>Logo</NavbarItem>
 *     <NavbarItem>Home</NavbarItem>
 *   </NavbarSection>
 *
 *   <NavbarSpacer />
 *
 *   <NavbarSection>
 *     <NavbarItem>Profile</NavbarItem>
 *     <NavbarItem>Settings</NavbarItem>
 *   </NavbarSection>
 * </Navbar>
 * ```
 */
export function NavbarSpacer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cx(className, "-ml-4 flex-1")}
    />
  );
}

/**
 * Navbar item component for navigation links and buttons.
 *
 * Interactive navigation item that can function as a link (with href)
 * or button (with onClick). Features animated current page indicators,
 * icon support, and responsive design.
 *
 * @param current - Whether this item represents the current page.
 * @param className - Additional CSS classes.
 * @param children - Content including icons, labels, and other elements.
 * @param href - Optional URL for link behavior (uses Next.js Link).
 * @param props - Additional button element props.
 *
 *
 * @id navbar
 * @name Navbar
 * @component
 * @example
 * ```tsx
 * // Link navigation item
 * <NavbarItem href="/dashboard" current>
 *   <DashboardIcon />
 *   <NavbarLabel>Dashboard</NavbarLabel>
 * </NavbarItem>
 *
 * // Button navigation item
 * <NavbarItem onClick={() => handleAction()}>
 *   <ActionIcon />
 *   <NavbarLabel>Action</NavbarLabel>
 * </NavbarItem>
 *
 * // Simple text item
 * <NavbarItem href="/about">
 *   About
 * </NavbarItem>
 *
 * // With avatar
 * <NavbarItem href="/profile">
 *   <Avatar src={user.avatar} />
 *   <NavbarLabel>{user.name}</NavbarLabel>
 *   <ChevronDownIcon />
 * </NavbarItem>
 * ```
 */
export const /**
              *
              */
  NavbarItem = function NavbarItem(
    { ref, current, className, children, href, ...props },
  ) {
    const classes = cx(
    // Base - let the minimal variant handle background and colors
      "relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium sm:text-sm/5",
      // Leading icon/icon-only
      "*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
      // Trailing icon (down chevron or similar)
      "*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
      // Avatar
      "*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6",
    );

    return (
      <span className={cx(className, "relative")}>
        {current && (
          <motion.span
            layoutId="current-indicator"
            className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
          />
        )}
        <Button
          ref={ref}
          variant="minimal"
          className={classes}
          data-current={current ? "true" : undefined}
          render={href ? <Link href={href} /> : undefined}
          {...props}
        >
          {children}
        </Button>
      </span>
    );
  };

/**
 * Navbar label component for text content within navbar items.
 *
 * Renders text labels with automatic truncation for overflow handling.
 * Typically used within NavbarItem components for displaying navigation text.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional HTML span element props.
 *
 * @component
 * @example
 * ```tsx
 * <NavbarItem href="/dashboard">
 *   <DashboardIcon />
 *   <NavbarLabel>Dashboard Overview</NavbarLabel>
 * </NavbarItem>
 *
 * <NavbarItem>
 *   <UserIcon />
 *   <NavbarLabel>{user.fullName}</NavbarLabel>
 * </NavbarItem>
 *
 * // Long text gets truncated
 * <NavbarItem>
 *   <NavbarLabel>Very Long Navigation Item Name</NavbarLabel>
 * </NavbarItem>
 * ```
 */
export function NavbarLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={cx(className, "truncate")} />;
}
