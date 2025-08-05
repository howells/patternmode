import type React from "react";
import type { GapValue, ResponsiveSpacing } from "../../lib/spacing-utils";
import type { ButtonProps } from "../button/component";

export type ButtonGroupProps = {
  /**
   * Button variant inherited by all child buttons.
   * Individual buttons can override this by specifying their own variant.
   */
  variant?: ButtonProps["variant"];
  /**
   * Button size inherited by all child buttons.
   * Individual buttons can override this by specifying their own size.
   * Also affects the gap between buttons.
   */
  size?: ButtonProps["size"];
  /**
   * Gap between buttons. Can be responsive.
   * Automatically calculated based on size if not provided.
   */
  gap?: GapValue | ResponsiveSpacing<GapValue>;
  /**
   * Horizontal alignment of the button group.
   * Controls how buttons are distributed within the container.
   */
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  /**
   * Whether buttons should wrap to new lines.
   * When true, buttons will wrap if they exceed container width.
   */
  wrap?: boolean;
  /**
   * Additional CSS classes for the container.
   * Applied to the button group wrapper element.
   */
  className?: string;
  /**
   * Child buttons to render.
   * Should only contain Button components.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;
