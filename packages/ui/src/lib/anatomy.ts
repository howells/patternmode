/**
 * Component anatomy type for documenting compound component structure.
 * Used to generate hierarchical documentation in Storybook.
 */
export interface ComponentAnatomy {
  /** Nested child components */
  children?: ComponentAnatomy[];
  /** Optional description of this part's purpose */
  description?: string;
  /** Display name for this component part */
  label: string;
  /** The data-slot value for this component part */
  slot: string;
}

/**
 * Helper function to define component anatomy with type safety.
 *
 * @example
 * ```ts
 * export const cardAnatomy = defineAnatomy({
 *   slot: "card",
 *   label: "Card",
 *   children: [
 *     { slot: "card-header", label: "CardHeader" },
 *     { slot: "card-content", label: "CardContent" },
 *   ],
 * });
 * ```
 */
export function defineAnatomy(anatomy: ComponentAnatomy): ComponentAnatomy {
  return anatomy;
}
