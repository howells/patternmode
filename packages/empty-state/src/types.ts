import type { Size } from "@patternmode/config/sizes";
import type React from "react";

export type EmptyStateProps = {
  /**
   * The main heading/title of the empty state.
   * Displayed prominently to identify what is missing or empty.
   */
  title: string;
  /**
   * Optional description text below the title.
   * Provides additional context or guidance for users.
   */
  description?: string;
  /**
   * Optional icon component to display above the title.
   * Should be a Lucide React icon component with className support.
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Primary action button configuration.
   * The main call-to-action for resolving the empty state.
   */
  primaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
  };
  /**
   * Secondary action button configuration.
   * Optional secondary action for alternative paths.
   */
  secondaryAction?: {
    /**
     * Button label text.
     */
    label: string;
    /**
     * Click handler for button action.
     */
    onClick?: () => void;
    /**
     * URL for link action (alternative to onClick).
     */
    href?: string;
  };
  /**
   * Visual variant of the empty state.
   * Default shows background for icon, minimal is text-only.
   */
  variant?: "default" | "minimal";
  /**
   * Size variant affecting spacing and icon size.
   * Controls overall scale and visual hierarchy.
   */
  size?: Size;
} & React.HTMLAttributes<HTMLDivElement>;
