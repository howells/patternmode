/**
 * Heading Component.
 *
 * A styled heading component for displaying primary headings with consistent
 * typography and responsive sizing. Built on the semantic HeadingElement
 * component with predefined styling for h1-h6 elements.
 *
 * Features:
 * - Semantic HTML heading levels (h1-h6)
 * - Responsive typography scaling
 * - Dark mode support
 * - Consistent styling across all heading levels
 * - Accessible heading hierarchy.
 *
 * @example
 * ```tsx
 * // Primary page heading
 * <Heading level={1}>Welcome to Patternmode</Heading>
 *
 * // Section heading
 * <Heading level={2}>Getting Started</Heading>
 *
 * // Subsection heading
 * <Heading level={3}>Installation</Heading>
 *
 * // Article headings
 * <article>
 *   <Heading level={1}>Article Title</Heading>
 *   <Heading level={2}>Section One</Heading>
 *   <Heading level={3}>Subsection</Heading>
 *   <Heading level={2}>Section Two</Heading>
 * </article>
 *
 * // Custom styling
 * <Heading level={2} className="text-center mb-8">
 *   Centered Heading
 * </Heading>
 *
 * // With additional props
 * <Heading level={1} id="main-heading" role="banner">
 *   Main Page Title
 * </Heading>
 * ```
 */

import type { HeadingElementProps } from "../heading-element/heading-element";
import { cx } from "../../lib/utils";
import { HeadingElement } from "../heading-element/heading-element";

/**
 * Props for the Heading component.
 *
 * Extends HeadingElementProps with consistent styling applied.
 */
export type HeadingProps = HeadingElementProps;

/**
 * A styled heading component for displaying primary headings.
 *
 * Provides consistent typography and responsive sizing for all heading levels.
 * Automatically renders the appropriate semantic HTML element (h1-h6) based
 * on the level prop.
 *
 * @param className - Additional CSS classes.
 * @param level - Heading level (1-6) determining HTML element and hierarchy.
 * @param props - Additional HTML heading element props.
 *
 * @component
 * @example
 * ```tsx
 * // Primary page heading
 * <Heading level={1}>Welcome to Patternmode</Heading>
 *
 * // Section heading
 * <Heading level={2}>Getting Started</Heading>
 *
 * // Subsection heading
 * <Heading level={3}>Installation</Heading>
 *
 * // Custom styling
 * <Heading level={2} className="text-center mb-8">
 *   Centered Heading
 * </Heading>
 * ```
 */
/**
 * A semantic heading component with consistent typography and hierarchy levels.
 *
 * Heading.
 *
 * @component
 * @id heading
 * @name Heading
 */
export function Heading({ className, level = 1, ...props }: HeadingProps) {
  return (
    <HeadingElement
      level={level}
      className={cx(
        className,
        "m-0 text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white",
      )}
      {...props}
    />
  );
}
