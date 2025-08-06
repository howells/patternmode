import type React from "react";

export type DescriptionListProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the root dl element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dl">;

export type DescriptionTermProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the dt element for term labels.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dt">;

export type DescriptionDetailsProps = {
  /**
   * Additional CSS classes for styling.
   * Applied to the dd element for term descriptions.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"dd">;
