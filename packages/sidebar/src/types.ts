import type { Size } from "@patternmode/config/sizes";
import type { ButtonProps } from "@patternmode/button/types";
import type * as React from "react";

export type SidebarState = "collapsed" | "open" | "pinned" | "locked";

export type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: SidebarItem[];
  [key: string]: unknown;
};

export type SidebarProps = {
  children: React.ReactNode;
  className?: string;
  expandOnHover?: boolean;
  defaultState?: SidebarState;
  onStateChange?: (state: SidebarState) => void;
  size?: Size;
} & React.ComponentPropsWithoutRef<"div">;

export type SidebarContentProps = React.ComponentProps<"div"> & {
  size?: Size;
};

export type SidebarHeaderProps = {
  children: React.ReactNode;
  size?: Size;
  className?: string;
};

export type SidebarFooterProps = React.ComponentProps<"div"> & {
  size?: Size;
};

export type SidebarGroupProps = React.ComponentProps<"div"> & {
  size?: Size;
};

export type SidebarGroupLabelProps = {
  children: React.ReactNode;
  className?: string;
  size?: Size;
  render?: React.ReactElement;
};

export type SidebarItemProps = {
  id: string;
  children: React.ReactNode;
  icon?:
    | React.ReactNode
    | (new (props: { className?: string; strokeWidth?: number }) => any)
    | ((props: { className?: string; strokeWidth?: number }) => any);
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  size?: Size;
  items?: React.ReactNode;
  render?: ButtonProps["render"];
} & Omit<React.ComponentPropsWithoutRef<"button">, "children">;

export type SidebarSeparatorProps = React.ComponentProps<
  typeof import("@patternmode/separator").Separator
> & {
  size?: Size;
};

export type SidebarMobileProps = {
  children: React.ReactNode;
};

export type SidebarSettingsProps = {
  className?: string;
};

export type SidebarOverlayProps = Record<string, never>;

export type SidebarStore = {
  // State
  state: SidebarState;
  isHovering: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  shouldOffsetContent: boolean;
  isHydrated: boolean;

  // Computed getters
  effectiveWidth: string;

  // Actions
  setState: (state: SidebarState) => void;
  setHovering: (hovering: boolean) => void;
  setMobile: (mobile: boolean) => void;
  togglePin: () => void;
  toggleOpen: () => void;
  toggleLock: () => void;
};
