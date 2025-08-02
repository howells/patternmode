/**
 * Subheading Component.
 *
 * A styled subheading component for displaying secondary headings with smaller,
 * more subtle typography. Built on the semantic HeadingElement component with
 * predefined styling optimized for subsections and secondary content.
 *
 * Features:
 * - Semantic HTML heading levels (defaults to h2)
 * - Smaller, more subtle typography than main headings
 * - Consistent styling across all heading levels
 * - Dark mode support with current color inheritance
 * - Accessible heading hierarchy support.
 *
 * @category typography
 * @icon Heading2
 * @example
 * ```tsx
 * // Default subheading (h2)
 * <Subheading>Section Overview</Subheading>
 *
 * // Custom heading level
 * <Subheading level={3}>Subsection Details</Subheading>
 *
 * // In a content hierarchy
 * <article>
 *   <Heading level={1}>Main Article Title</Heading>
 *   <Subheading level={2}>Introduction</Subheading>
 *   <Text>Article introduction content...</Text>
 *
 *   <Subheading level={2}>Main Content</Subheading>
 *   <Subheading level={3}>Key Points</Subheading>
 *   <Text>Detailed content...</Text>
 * </article>
 *
 * // With custom styling
 * <Subheading className="text-blue-600 mb-4">
 *   Custom Styled Subheading
 * </Subheading>
 *
 * // In card layouts
 * <Card>
 *   <Subheading level={3}>Card Title</Subheading>
 *   <Text>Card content description</Text>
 * </Card>
 *
 * // Section headers
 * <section>
 *   <Subheading level={2}>Features</Subheading>
 *   <StackedList>
 *     <StackedList.Item>Feature one</StackedList.Item>
 *     <StackedList.Item>Feature two</StackedList.Item>
 *   </StackedList>
 * </section>
 * ```
 */

import type { HeadingElementProps } from "../heading-element/heading-element";

import { cx } from "../../../lib/utils";
import { HeadingElement } from "../heading-element/heading-element";

/**
 * Props for the Subheading component.
 *
 * Extends HeadingElementProps with consistent subtle styling applied.
 */
export type SubheadingProps = HeadingElementProps;

/**
 * A styled subheading component for displaying secondary headings.
 *
 * Provides smaller, more subtle typography than main headings while maintaining
 * semantic HTML structure. Automatically renders the appropriate heading element
 * based on the level prop (defaults to h2).
 *
 * @param className - Additional CSS classes.
 * @param level - Heading level (1-6) determining HTML element, defaults to 2.
 * @param props - Additional HTML heading element props.
 */
/**
 * Secondary heading component for section subtitles and supplementary titles.
 *
 * @id subheading
 * @name Subheading
 * @icon Type
 * @category ui
 * @component
 * @param props - Component properties.
 * @param props.level - Heading level (1-6) determining HTML element and semantic hierarchy (defaults to 2).
 * @param props.className - Additional CSS classes.
 * @param props.children - The subheading text content.
 */
export function Subheading({
  className,
  level = 2,
  ...props
}: SubheadingProps) {
  return (
    <HeadingElement
      level={level}
      className={cx(
        className,
        "m-0 text-sm font-semibold text-current sm:text-sm",
      )}
      {...props}
    />
  );
}
