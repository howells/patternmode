/**
 * Description List Components
 *
 * Components for creating structured description lists using semantic HTML.
 * Provides organized display of term-definition pairs with responsive layouts
 * and consistent styling across light and dark themes.
 *
 * Features:
 * - Responsive grid layout
 * - Semantic HTML structure (dl, dt, dd)
 * - Dark mode support
 * - Accessible design
 * - Consistent typography and spacing
 *
 * @example
 * ```tsx
 * // Basic description list
 * <DescriptionList>
 *   <DescriptionTerm>Name</DescriptionTerm>
 *   <DescriptionDetails>John Doe</DescriptionDetails>
 *   <DescriptionTerm>Email</DescriptionTerm>
 *   <DescriptionDetails>john@example.com</DescriptionDetails>
 *   <DescriptionTerm>Role</DescriptionTerm>
 *   <DescriptionDetails>Software Engineer</DescriptionDetails>
 * </DescriptionList>
 *
 * // User profile information
 * <DescriptionList>
 *   <DescriptionTerm>Full Name</DescriptionTerm>
 *   <DescriptionDetails>Sarah Johnson</DescriptionDetails>
 *   <DescriptionTerm>Department</DescriptionTerm>
 *   <DescriptionDetails>Product Design</DescriptionDetails>
 *   <DescriptionTerm>Location</DescriptionTerm>
 *   <DescriptionDetails>San Francisco, CA</DescriptionDetails>
 *   <DescriptionTerm>Start Date</DescriptionTerm>
 *   <DescriptionDetails>March 15, 2023</DescriptionDetails>
 * </DescriptionList>
 *
 * // Project details
 * <DescriptionList>
 *   <DescriptionTerm>Project Name</DescriptionTerm>
 *   <DescriptionDetails>Patternmode Component Library</DescriptionDetails>
 *   <DescriptionTerm>Status</DescriptionTerm>
 *   <DescriptionDetails>In Development</DescriptionDetails>
 *   <DescriptionTerm>Technologies</DescriptionTerm>
 *   <DescriptionDetails>React, TypeScript, Tailwind CSS</DescriptionDetails>
 *   <DescriptionTerm>Team Size</DescriptionTerm>
 *   <DescriptionDetails>5 developers</DescriptionDetails>
 * </DescriptionList>
 * ```
 */

import { cx } from "../../lib/utils";

/**
 * Root container for description lists.
 *
 * Creates a semantic description list using the HTML `dl` element with
 * responsive grid layout. Terms and details are arranged in a two-column
 * layout on larger screens and stacked on mobile devices.
 *
 * @param className - Additional CSS classes
 * @param props - Standard dl element props
 *
 * @component
 * @example
 * ```tsx
 * <DescriptionList>
 *   <DescriptionTerm>Term</DescriptionTerm>
 *   <DescriptionDetails>Definition</DescriptionDetails>
 * </DescriptionList>
 * ```
 */
/**
 * Description List
 *
 * @component
 * @id description-list
 * @name Description List
 */
export function DescriptionList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"dl">) {
  return (
    <dl
      {...props}
      className={cx(
        className,
        "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6"
      )}
    />
  );
}

/**
 * Description term component for definition lists.
 *
 * Represents the term or name being described using the HTML `dt` element.
 * Provides consistent styling with subtle text color and proper spacing.
 * Includes border separators between items.
 *
 * @param className - Additional CSS classes
 * @param props - Standard dt element props
 *
 * @component
 * @example
 * ```tsx
 * <DescriptionTerm>Username</DescriptionTerm>
 * <DescriptionTerm>Email Address</DescriptionTerm>
 * <DescriptionTerm>Last Login</DescriptionTerm>
 * ```
 */
export function DescriptionTerm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"dt">) {
  return (
    <dt
      {...props}
      className={cx(
        className,
        "col-start-1 border-t border-zinc-950/5 pt-3 text-zinc-500 first:border-none sm:border-t sm:border-zinc-950/5 sm:py-3 dark:border-white/5 dark:text-zinc-400 sm:dark:border-white/5"
      )}
    />
  );
}

/**
 * Description details component for definition lists.
 *
 * Represents the description or definition corresponding to a term using
 * the HTML `dd` element. Provides emphasized text styling and proper spacing
 * to create clear term-definition relationships.
 *
 * @param className - Additional CSS classes
 * @param props - Standard dd element props
 *
 * @component
 * @example
 * ```tsx
 * <DescriptionDetails>john.doe</DescriptionDetails>
 * <DescriptionDetails>john.doe@company.com</DescriptionDetails>
 * <DescriptionDetails>2 hours ago</DescriptionDetails>
 *
 * // With complex content
 * <DescriptionDetails>
 *   <span className="font-semibold">Active</span>
 *   <span className="text-green-600 ml-2">●</span>
 * </DescriptionDetails>
 * ```
 */
export function DescriptionDetails({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"dd">) {
  return (
    <dd
      {...props}
      className={cx(
        className,
        "pt-1 pb-3 text-zinc-950 sm:border-t sm:border-zinc-950/5 sm:py-3 sm:nth-2:border-none dark:text-white dark:sm:border-white/5"
      )}
    />
  );
}
