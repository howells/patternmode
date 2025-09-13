import { RadioGroup as BaseRadioGroup } from "@base-ui-components/react/radio-group";
import { InputGrid } from "@patternmode/input-grid";
import { cx } from "@patternmode/utils/cx";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import type {
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import React from "react";

type EventDetails = {
  reason: "none";
  event: Event;
  cancel: () => void;
  allowPropagation: () => void;
  isCanceled: boolean;
  isPropagationAllowed: boolean;
};

// Context for RadioCards configuration
type RadioCardsContextValue = {
  showIndicator: boolean;
  selectedValue?: string;
};

const RadioCardsContext = React.createContext<RadioCardsContextValue | null>(
  null
);

type RadioCardsProps = React.ComponentPropsWithoutRef<typeof BaseRadioGroup> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseRadioGroup> | null>;
  /**
   * Number of columns for the radio cards grid layout.
   * Can be responsive for different screen sizes.
   */
  columns?: ResponsiveValue<number>;
  /**
   * Gap between radio cards using the spacing scale.
   */
  gap?: ResponsiveSpacing<SpacingValue>;
  /**
   * Whether to show the radio indicator on individual cards.
   * Defaults to true for backwards compatibility.
   */
  showIndicator?: boolean;
};

/**
 * Card-style radio group with enhanced visual presentation for option selection.
 * Uses Grid component for responsive layout and consistent spacing.
 */
const RadioCards = ({
  ref,
  className,
  columns = 2,
  gap,
  showIndicator = true,
  children,
  value,
  onValueChange,
  ...props
}: RadioCardsProps & {
  onValueChange?: (value: string) => void;
}) => {
  const handleValueChange = React.useCallback(
    (newValue: unknown, eventDetails: EventDetails) => {
      const stringValue = String(newValue);
      onValueChange?.(stringValue);
    },
    [onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({ showIndicator, selectedValue: value as string | undefined }),
    [showIndicator, value]
  );

  return (
    <RadioCardsContext.Provider value={contextValue}>
      <BaseRadioGroup
        className={cx("w-full", className)}
        data-testid="radio-cards"
        onValueChange={handleValueChange}
        ref={ref}
        value={value}
        {...props}
        render={<InputGrid className="w-full" columns={columns} gap={gap} />}
      >
        {children}
      </BaseRadioGroup>
    </RadioCardsContext.Provider>
  );
};
RadioCards.displayName = "RadioCards";

export { RadioCards };
export type { RadioCardsProps };
