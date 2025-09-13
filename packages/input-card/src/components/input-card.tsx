import { Card, CardContent } from "@patternmode/card";
import { cx } from "@patternmode/utils/cx";
import { focusRing } from "@patternmode/utils/focus-ring";
import type React from "react";

export type InputCardProps = {
  /**
   * Content to display inside the input card.
   * Can include rich content like text, icons, pricing, descriptions, or any JSX elements.
   */
  children?: React.ReactNode;

  /**
   * The input element to render (e.g., Radio, Checkbox, etc.)
   * This allows the card to work with any input type.
   */
  input?: React.ReactNode;

  /**
   * Whether to show the input element.
   * Defaults to true for backwards compatibility.
   */
  showInput?: boolean;

  /**
   * Whether the input card is disabled.
   * When true, the card cannot be interacted with and displays with muted styling.
   */
  disabled?: boolean;

  /**
   * Additional CSS classes to apply to the card.
   */
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Card>,
  "children" | "disabled"
> & {
    ref?: React.RefObject<React.ElementRef<typeof Card> | null>;
  };

/**
 * Generic input card component that can contain any input element.
 * Provides consistent styling and layout for input-based cards.
 * Used as a base component for radio-cards, checkbox-cards, etc.
 */
const InputCard = ({
  ref,
  className,
  children,
  input,
  showInput = true,
  disabled = false,
  ...cardProps
}: InputCardProps) => (
  <Card
    className={cx(
      // base
      "group relative w-full cursor-pointer text-left transition focus:outline-hidden",
      // card-like visual styling applied to input card
      "rounded-xl border bg-white dark:bg-[#090E1A]",
      "border-zinc-200 dark:border-zinc-800",
      // disabled state - muted styling
      disabled && [
        "border-zinc-100 dark:border-zinc-800",
        "bg-zinc-50 dark:bg-zinc-900",
        "cursor-not-allowed",
      ],
      // focus styling
      !disabled && focusRing,
      className
    )}
    ref={ref}
    {...cardProps}
  >
    <CardContent>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">{children}</div>
        {showInput && input && <div className="flex-shrink-0">{input}</div>}
      </div>
    </CardContent>
  </Card>
);

InputCard.displayName = "InputCard";

export { InputCard };
