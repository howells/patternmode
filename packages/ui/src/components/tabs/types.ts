import type { Tabs as BaseTabs } from "@base-ui-components/react/tabs";
import type * as React from "react";
import type { ButtonSize } from "../button/types";

export type TabsListVariant = "solid" | "line";

export type TabsProps = Omit<React.ComponentPropsWithoutRef<typeof BaseTabs.Root>, "orientation"> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Root> | null>;
};

export type TabsListProps = {
  /**
   * Style variant for the tabs list.
   * "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
   * @default "line"
   */
  variant?: TabsListVariant;
  /**
   * Hide the bottom divider line (only applies to "line" variant).
   * @default false
   */
  hideDivider?: boolean;
  /**
   * Hide the active tab border/indicator (only applies to "line" variant).
   * @default false
   */
  hideBorder?: boolean;
  /**
   * Size for solid variant buttons. Affects padding and text size.
   * @default "default"
   */
  size?: ButtonSize;
} & React.ComponentPropsWithoutRef<typeof BaseTabs.List>;

export type TabsTriggerProps = {
  /**
   * Icon component to display on the left side of the tab trigger.
   */
  leftIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Icon component to display on the right side of the tab trigger.
   */
  rightIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /**
   * Stroke width for icons.
   * @default 1.5
   */
  iconStrokeWidth?: number;
} & React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>;

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseTabs.Panel> | null>;
};
