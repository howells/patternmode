/**
 * Heading Element Component.
 *
 * A semantic heading element component that dynamically renders the appropriate
 * HTML heading tag (h1-h6) based on the level prop. Provides the foundation
 * for styled heading components while maintaining semantic HTML structure.
 *
 * Features:
 * - Dynamic HTML element rendering (h1-h6)
 * - Type-safe heading levels
 * - Semantic HTML for accessibility
 * - Flexible styling with className
 * - Full HTML heading element props support.
 *
 * @example
 * ```tsx
 * // Basic heading elements
 * <HeadingElement level={1}>Page Title</HeadingElement>
 * <HeadingElement level={2}>Section</HeadingElement>
 * <HeadingElement level={3}>Subsection</HeadingElement>
 *
 * // With custom styling
 * <HeadingElement level={2} className="text-blue-600 font-bold">
 *   Custom Styled Heading
 * </HeadingElement>
 *
 * // With additional props
 * <HeadingElement
 *   level={1}
 *   id="main-title"
 *   className="sr-only"
 *   aria-label="Main page title"
 * >
 *   Hidden Title for Screen Readers
 * </HeadingElement>
 * ```
 */

import { cx } from "../../lib/utils";

/**
 * Props for the HeadingElement component.
 *
 * Configuration for semantic heading elements with flexible styling.
 * Combines heading-specific props with all standard HTML heading attributes.
 */
export type HeadingElementProps = {
  /**
   * Heading level determining which HTML element to render (h1-h6).
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Additional CSS classes.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

/**
 * A semantic heading element that renders the appropriate HTML tag.
 *
 * Dynamically creates h1-h6 elements based on the level prop while maintaining
 * type safety and semantic HTML structure. Forms the foundation for styled
 * heading components.
 *
 * @param level - Heading level (1-6) determining HTML element.
 * @param className - Additional CSS classes.
 * @param props - Additional HTML heading element props.
 *
 * @component
 * @example
 * ```tsx
 * // Semantic heading hierarchy
 * <HeadingElement level={1}>Main Title</HeadingElement>
 * <HeadingElement level={2}>Section Title</HeadingElement>
 * <HeadingElement level={3}>Subsection Title</HeadingElement>
 *
 * // With styling
 * <HeadingElement level={2} className="text-2xl font-semibold">
 *   Styled Section
 * </HeadingElement>
 * ```
 */
/**
 * Heading Element.
 *
 * @component
 * @id heading-element
 * @name Heading Element
 */
export function HeadingElement({
  level = 1,
  className,
  ...props
}: HeadingElementProps) {
  const /**
         *
         */
    Element: `h${typeof level}` = `h${level}`;

  return <Element {...props} className={cx(className)} />;
}
