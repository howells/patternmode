import type React from "react";
import type { GapValue, ResponsiveSpacing } from "../../presentation/spacing-utils";

export type TagGroupProps = {
  /**
   * Whether tags in the group can be dismissed.
   * Individual tags can override this by specifying their own dismissible prop.
   */
  dismissible?: boolean;
  /**
   * Callback when any tag dismiss button is clicked.
   * Individual tags can override this with their own onDismiss handler.
   */
  onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Gap between tags. Can be responsive.
   * Automatically calculated based on tag size if not provided.
   */
  gap?: GapValue | ResponsiveSpacing<GapValue>;
  /**
   * How to distribute tags along the main axis.
   * Controls spacing and distribution of tags within the container.
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Layout direction for the tag group.
   * Controls whether tags flow horizontally or vertically.
   */
  direction?: "row" | "column";
  /**
   * Additional CSS classes for the container.
   * Applied to the tag group wrapper element.
   */
  className?: string;
  /**
   * Child tags to render.
   * Should only contain Tag components.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
