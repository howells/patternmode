/**
 * Empty State Component.
 *
 * A component for displaying empty states when there's no content to show.
 * Provides a structured layout with optional icon, title, description, and
 * action buttons to guide users toward taking action.
 *
 * Features:
 * - Multiple size variants (sm, default, lg)
 * - Visual variants (default, minimal)
 * - Optional icon display
 * - Primary and secondary action buttons
 * - Link and button action support
 * - Responsive design.
 *
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   title="No items found"
 *   description="Get started by creating your first item."
 * />
 *
 * // With icon and actions
 * <EmptyState
 *   icon={Plus}
 *   title="No projects yet"
 *   description="Create your first project to get started."
 *   primaryAction={{
 *     label: "Create Project",
 *     onClick: () => createProject()
 *   }}
 *   secondaryAction={{
 *     label: "Import Project",
 *     onClick: () => openImport()
 *   }}
 * />
 *
 * // Large variant with link actions
 * <EmptyState
 *   size="lg"
 *   icon={FolderOpen}
 *   title="No files uploaded"
 *   description="Upload your first file or drag and drop files here."
 *   primaryAction={{
 *     label: "Upload Files",
 *     href: "/upload"
 *   }}
 *   secondaryAction={{
 *     label: "Learn More",
 *     href: "/docs"
 *   }}
 * />
 *
 * // Minimal variant
 * <EmptyState
 *   variant="minimal"
 *   size="sm"
 *   title="No notifications"
 *   description="You're all caught up!"
 * />
 *
 * // Search results empty state
 * <EmptyState
 *   icon={Search}
 *   title="No results found"
 *   description={`No results for "${searchQuery}". Try adjusting your search.`}
 *   primaryAction={{
 *     label: "Clear Search",
 *     onClick: () => clearSearch()
 *   }}
 * />
 * ```
 */

import React from "react";

import { cx } from "../../../lib/utils";
import { Button } from "../button/button";
import { Heading } from "../heading/heading";
import { Subheading } from "../subheading/subheading";
import { Text } from "../text/text";

/**
 * Props for the EmptyState component.
 *
 * Configuration for empty state display including content, actions,
 * and visual appearance options.
 *
 * @interface EmptyStateProps
 * @augments React.HTMLAttributes<HTMLDivElement>
 */
type EmptyStateProps = {
  /**
   * The main heading/title of the empty state.
   */
  title: string;
  /**
   * Optional description text below the title.
   */
  description?: string;
  /**
   * Optional icon component to display above the title.
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Primary action button configuration.
   */
  primaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
  };
  /**
   * Secondary action button configuration.
   */
  secondaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
  };
  /**
   * Visual variant of the empty state.
   */
  variant?: "default" | "minimal";
  /**
   * Size variant affecting spacing and icon size.
   */
  size?: "sm" | "default" | "lg";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A component for displaying empty states when there's no content to show.
 *
 * Provides a structured layout with optional icon, title, description, and
 * action buttons to guide users toward taking action. Supports multiple
 * size and visual variants for different contexts. Perfect for search results,
 * data tables, dashboards, and any content areas that can be empty.
 *
 * @param title - The main heading/title of the empty state.
 * @param description - Optional description text below the title.
 * @param icon - Optional icon component to display above the title.
 * @param primaryAction - Primary action button configuration.
 * @param secondaryAction - Secondary action button configuration.
 * @param variant - Visual variant (default shows background for icon, minimal is text-only).
 * @param size - Size variant affecting spacing and icon size.
 * @param className - Additional CSS classes.
 *
 * @component
 * @category ui
 * @icon FileX
 * @id empty-state
 * @name Empty State
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   title="No items found"
 *   description="Get started by creating your first item."
 * />
 *
 * // With icon and actions
 * <EmptyState
 *   icon={Plus}
 *   title="No projects yet"
 *   description="Create your first project to get started."
 *   primaryAction={{
 *     label: "Create Project",
 *     onClick: () => createProject()
 *   }}
 *   secondaryAction={{
 *     label: "Import Project",
 *     onClick: () => openImport()
 *   }}
 * />
 *
 * // Large variant with link actions
 * <EmptyState
 *   size="lg"
 *   icon={FolderOpen}
 *   title="No files uploaded"
 *   description="Upload your first file or drag and drop files here."
 *   primaryAction={{
 *     label: "Upload Files",
 *     href: "/upload"
 *   }}
 *   secondaryAction={{
 *     label: "Learn More",
 *     href: "/docs"
 *   }}
 * />
 *
 * // Minimal variant
 * <EmptyState
 *   variant="minimal"
 *   size="sm"
 *   title="No notifications"
 *   description="You're all caught up!"
 * />
 *
 * // Search results empty state
 * <EmptyState
 *   icon={Search}
 *   title="No results found"
 *   description={`No results for "${searchQuery}". Try adjusting your search.`}
 *   primaryAction={{
 *     label: "Clear Search",
 *     onClick: () => clearSearch()
 *   }}
 * />
 *
 * // Error empty state
 * <EmptyState
 *   icon={AlertCircle}
 *   title="Something went wrong"
 *   description="We encountered an error loading your data."
 *   primaryAction={{
 *     label: "Try Again",
 *     onClick: () => retry()
 *   }}
 *   secondaryAction={{
 *     label: "Contact Support",
 *     href: "/support"
 *   }}
 * />
 * ```
 */
/**
 * Placeholder component for displaying empty states with helpful messaging.
 *
 * @id empty-state
 * @name EmptyState
 * @icon FileX
 * @category utility
 * @component
 * @param props - Component properties.
 * @param props.title - The main heading/title of the empty state.
 * @param props.description - Optional description text below the title.
 * @param props.icon - Optional icon component to display above the title.
 * @param props.primaryAction - Primary action button configuration with label, onClick/href, and disabled state.
 * @param props.secondaryAction - Secondary action button configuration with label and onClick/href.
 * @param props.variant - Visual variant (default shows background for icon, minimal is text-only).
 * @param props.size - Size variant affecting spacing and icon size (sm, default, lg).
 * @param props.className - Additional CSS classes.
 */
const EmptyState = (
  { ref, title, description, icon: Icon, primaryAction, secondaryAction, variant = "default", size = "default", className, ...props }: EmptyStateProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  return (
    <div
      ref={ref}
      className={cx(
        // Base styles
        "flex flex-col items-center justify-center text-center",
        // Spacing based on size
        size === "sm" && "gap-3 py-8 px-4",
        size === "default" && "gap-4 py-12 px-6",
        size === "lg" && "gap-6 py-16 px-12",
        // Max width
        "max-w-md mx-auto",
        className,
      )}
      {...props}
    >
      {/* Icon */}
      {Icon && (
        <div
          className={cx(
            "flex items-center justify-center rounded-full",
            // Background styling based on variant
            variant === "default"
            && "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400",
            variant === "minimal" && "text-zinc-500 dark:text-zinc-500",
            // Size
            size === "sm" && "size-12",
            size === "default" && "size-16",
            size === "lg" && "size-20",
          )}
        >
          <Icon
            className={cx(
              size === "sm" && "size-5",
              size === "default" && "size-6",
              size === "lg" && "size-8",
            )}
          />
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        {size === "lg"
          ? (
              <Heading level={2}>{title}</Heading>
            )
          : (
              <Subheading>{title}</Subheading>
            )}

        {/* Description */}
        {description && <Text>{description}</Text>}
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div
          className={cx(
            "flex flex-col items-center",
            size === "sm" && "gap-2 mt-2",
            size === "default" && "gap-3 mt-4",
            size === "lg" && "gap-4 mt-6",
            // Stack on mobile, inline on larger screens if both actions exist
            primaryAction && secondaryAction && "sm:flex-row sm:gap-3",
          )}
        >
          {/* Primary Action */}
          {primaryAction && (
            <Button
              variant="default"
              size={size === "sm" ? "sm" : "default"}
              disabled={primaryAction.disabled}
              onClick={primaryAction.onClick}
              render={
                primaryAction.href
                  ? (
                      <a href={primaryAction.href} />
                    )
                  : undefined
              }
            >
              {primaryAction.label}
            </Button>
          )}

          {/* Secondary Action */}
          {secondaryAction && (
            <Button
              variant="ghost"
              size={size === "sm" ? "sm" : "default"}
              onClick={secondaryAction.onClick}
              render={
                secondaryAction.href
                  ? (
                      <a href={secondaryAction.href} />
                    )
                  : undefined
              }
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";

export { EmptyState, type EmptyStateProps };
