/**
 * Text Components.
 *
 * A collection of typography components for displaying text content with consistent
 * styling and semantic meaning. Includes the main Text component along with related
 * inline elements like links, strong text, and inline code.
 *
 * Features:
 * - Flexible text sizing with consistent scale
 * - Current color inheritance for flexible theming
 * - Semantic HTML elements (p, strong, code, a)
 * - Next.js Link integration for navigation
 * - Responsive typography scaling
 * - Accessible color contrast and styling.
 *
 * @category typography
 * @icon Type
 * @example
 * ```tsx
 * // Basic text content
 * <Text>This is a paragraph of text with default styling.</Text>
 *
 * // Different text sizes
 * <Text size="xs">Small text for captions</Text>
 * <Text size="sm">Default body text</Text>
 * <Text size="base">Slightly larger text</Text>
 * <Text size="lg">Large text for emphasis</Text>
 *
 * // Rich text content
 * <Text>
 *   This paragraph contains <Strong>bold text</Strong>,
 *   <TextLink href="/docs">a navigation link</TextLink>,
 *   and some <Code>inline code</Code> examples.
 * </Text>
 *
 * // Article content
 * <article>
 *   <Heading level={1}>Article Title</Heading>
 *   <Text size="lg">
 *     Introduction paragraph with larger text for better readability
 *     and emphasis on the opening content.
 *   </Text>
 *   <Text>
 *     Regular body text continues here with normal sizing. This is
 *     perfect for <Strong>emphasizing important points</Strong> and
 *     linking to <TextLink href="/references">external resources</TextLink>.
 *   </Text>
 * </article>
 *
 * // Code documentation
 * <Stack gap={4}>
 *   <Text>
 *     Use the <Code>useState</Code> hook to manage component state:
 *   </Text>
 *   <CodeBlock language="javascript">
 *     const [count, setCount] = useState(0);
 *   </CodeBlock>
 *   <Text size="sm">
 *     Remember to import <Code>useState</Code> from React.
 *   </Text>
 * </Stack>
 *
 * // Description content
 * <StackedList>
 *   <StackedList.Item>
 *     <StackedList.Content
 *       title="Feature Name"
 *       description={
 *         <Text size="sm">
 *           Detailed description with <Strong>key benefits</Strong>
 *           and <TextLink href="/learn-more">additional resources</TextLink>.
 *         </Text>
 *       }
 *     />
 *   </StackedList.Item>
 * </StackedList>
 * ```
 */

import type { VariantProps } from "tailwind-variants";

import Link from "next/link";
import { tv } from "tailwind-variants";

import { cx } from "../../lib/utils";

const textVariants = tv({
  base: "m-0 text-current leading-relaxed",
  variants: {
    size: {
      "2xs": "text-2xs",
      "xs": "text-xs",
      "sm": "text-sm",
      "base": "text-base",
      "lg": "text-lg",
      "xl": "text-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

/**
 * Props for the Text component.
 *
 * Configuration for text styling and standard paragraph element props.
 */
type TextProps = {} & React.ComponentPropsWithoutRef<"p"> & VariantProps<typeof textVariants>;

/**
 * Main text component for displaying paragraph content.
 *
 * Renders semantic paragraph elements with flexible sizing and current color
 * inheritance. Provides consistent typography scaling and spacing.
 *
 * @param size - Text size variant (2xs, xs, sm, base, lg, xl).
 * @param className - Additional CSS classes.
 * @param props - Standard paragraph element props.
 */
/**
 * Typography component with consistent text styling and semantic meaning.
 *
 * @id text
 * @name Text
 * @icon Type
 * @category ui
 * @component
 * @param props - Component properties.
 */
export function Text({ className, size, ...props }: TextProps) {
  return (
    <p
      data-slot="text"
      {...props}
      className={cx(textVariants({ size }), className)}
    />
  );
}

/**
 * Text link component for navigation within text content.
 *
 * Styled Next.js Link component with consistent underline styling and hover effects.
 * Inherits current text color for flexible theming.
 *
 * @param className - Additional CSS classes.
 * @param props - Next.js Link component props.
 */
export function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cx(
        className,
        "text-current underline decoration-current/50 data-hover:decoration-current",
      )}
    />
  );
}

/**
 * Strong text component for emphasis within text content.
 *
 * Semantic strong element with medium font weight styling. Inherits current
 * text color for consistent theming.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard strong element props.
 */
export function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong {...props} className={cx(className, "font-medium text-current")} />
  );
}

/**
 * Inline code component for displaying code within text content.
 *
 * Semantic code element with background, border, and monospace styling.
 * Designed for short code snippets and technical terms within paragraphs.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard code element props.
 */
export function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cx(
        className,
        "rounded-sm border border-current/10 bg-current/5 px-0.5 text-sm font-medium text-current sm:text-[0.8125rem]",
      )}
    />
  );
}

export type { TextProps };
