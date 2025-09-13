import { Grid } from "@patternmode/grid";
import type { ResponsiveValue } from "@patternmode/utils/responsive-utils";
import type {
  ResponsiveSpacing,
  SpacingValue,
} from "@patternmode/utils/spacing";
import type React from "react";

export type InputGridProps = {
  /**
   * Number of columns for the input grid layout.
   * Can be responsive for different screen sizes.
   * Defaults to 2 for input cards which is a common pattern.
   */
  columns?: ResponsiveValue<number>;

  /**
   * Gap between input cards using the spacing scale.
   * Defaults to a comfortable gap for input cards.
   */
  gap?: ResponsiveSpacing<SpacingValue>;

  /**
   * Children to render in the grid.
   * Typically InputCard components or similar input-based cards.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes to apply to the grid.
   */
  className?: string;
} & Omit<
  React.ComponentPropsWithoutRef<typeof Grid>,
  "columns" | "gap" | "children"
>;

/**
 * Generic grid component optimized for input cards.
 * Provides consistent layout for collections of input-based cards.
 * Used as a base component for radio-cards, checkbox-cards, etc.
 */
const InputGrid = ({
  columns = 2,
  gap = 2,
  children,
  className,
  ...gridProps
}: InputGridProps) => (
  <Grid className={className} columns={columns} gap={gap} {...gridProps}>
    {children}
  </Grid>
);

InputGrid.displayName = "InputGrid";

export { InputGrid };
