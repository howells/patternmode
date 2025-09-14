import { MoreHorizontal } from "lucide-react";
import React from "react";
import type { ButtonProps } from "../types";

/**
 * Utility functions for complex button logic and state calculations
 */

export type ButtonState = {
  hasChildren: boolean;
  isIconOnly: boolean;
  effectiveLeftIconProp: ButtonProps["icon"] | ButtonProps["leftIcon"];
  hasLeftIcon: boolean;
  effectiveLeftIcon: ButtonProps["icon"] | ButtonProps["leftIcon"];
  hasRightIcon: boolean;
  shouldShowChildren: boolean;
  isIconButton: boolean;
  hasCustomLayout: boolean;
  kbdKeys: string[] | undefined;
  hasKeyboardShortcuts: boolean;
  kbdVariant: "onDarkButton" | "onLightButton";
  effectiveChildren: React.ReactNode;
  effectiveShouldShowChildren: boolean;
};

const getBaseFlags = (
  children: React.ReactNode,
  size: ButtonProps["size"] | undefined
) => {
  const hasChildren = children != null && children !== "";
  const isIconOnly = size?.includes("icon") ?? false;
  return { hasChildren, isIconOnly, isIconButton: isIconOnly };
};

const getIconsState = (
  isIconOnly: boolean,
  icon: ButtonProps["icon"],
  leftIcon: ButtonProps["leftIcon"],
  rightIcon: ButtonProps["rightIcon"]
) => {
  const effectiveLeftIconProp = icon || leftIcon;
  const hasLeftIcon =
    effectiveLeftIconProp != null ||
    (isIconOnly && effectiveLeftIconProp == null);
  const effectiveLeftIcon =
    effectiveLeftIconProp ||
    (isIconOnly && effectiveLeftIconProp == null ? MoreHorizontal : undefined);
  const hasRightIcon = rightIcon != null && !isIconOnly;
  return {
    effectiveLeftIconProp,
    hasLeftIcon,
    effectiveLeftIcon,
    hasRightIcon,
  };
};

const getKbdState = (
  kbd: ButtonProps["kbd"],
  variant: ButtonProps["variant"]
) => {
  let kbdKeys: string[] | undefined;
  if (Array.isArray(kbd)) {
    kbdKeys = kbd;
  } else if (kbd) {
    kbdKeys = [kbd];
  }
  const hasKeyboardShortcuts = kbdKeys != null;
  const isDarkVariant = variant === "primary" || variant === "destructive";
  const kbdVariant: "onDarkButton" | "onLightButton" = isDarkVariant
    ? "onDarkButton"
    : "onLightButton";
  return { kbdKeys, hasKeyboardShortcuts, kbdVariant };
};

/**
 * Calculates all the complex state variables for a button
 */
export const calculateButtonState = ({
  children,
  size = "base",
  icon,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  kbd,
  variant,
}: Pick<
  ButtonProps,
  | "children"
  | "size"
  | "icon"
  | "leftIcon"
  | "rightIcon"
  | "isLoading"
  | "loadingText"
  | "kbd"
  | "variant"
>): ButtonState => {
  const { hasChildren, isIconOnly, isIconButton } = getBaseFlags(
    children,
    size
  );
  const {
    effectiveLeftIconProp,
    hasLeftIcon,
    effectiveLeftIcon,
    hasRightIcon,
  } = getIconsState(isIconOnly, icon, leftIcon, rightIcon);
  const shouldShowChildren = hasChildren && !isIconOnly;
  const hasCustomLayout = React.isValidElement(children);
  const { kbdKeys, hasKeyboardShortcuts, kbdVariant } = getKbdState(
    kbd,
    variant
  );
  const effectiveChildren = isLoading && loadingText ? loadingText : children;
  const effectiveShouldShowChildren = shouldShowChildren;

  return {
    hasChildren,
    isIconOnly,
    effectiveLeftIconProp,
    hasLeftIcon,
    effectiveLeftIcon,
    hasRightIcon,
    shouldShowChildren,
    isIconButton,
    hasCustomLayout,
    kbdKeys,
    hasKeyboardShortcuts,
    kbdVariant,
    effectiveChildren,
    effectiveShouldShowChildren,
  };
};

/**
 * Determines if a simple render case should be used
 */
export const shouldUseSimpleRender = (
  state: ButtonState,
  isLoading: boolean,
  kbd: ButtonProps["kbd"]
): boolean => {
  const {
    hasCustomLayout,
    hasRightIcon,
    isIconButton,
    hasChildren,
    effectiveLeftIconProp,
  } = state;

  // Handle simple cases first to reduce complexity
  if (
    hasCustomLayout &&
    !effectiveLeftIconProp &&
    !hasRightIcon &&
    !isLoading &&
    !kbd
  ) {
    return true;
  }

  if (
    isIconButton &&
    hasChildren &&
    !effectiveLeftIconProp &&
    !hasRightIcon &&
    !isLoading &&
    !kbd
  ) {
    return true;
  }

  // Handle icon-only cases
  if (isIconButton) {
    if (state.effectiveLeftIconProp && !hasRightIcon && !isLoading && !kbd) {
      return true;
    }

    if (isLoading && !kbd) {
      return true;
    }
  }

  return false;
};

/**
 * Creates the icon button children with screen reader text
 */
export const createIconButtonChildren = (
  state: ButtonState
): React.ReactNode => {
  const { isIconButton, hasChildren, effectiveChildren } = state;

  return (
    isIconButton &&
    hasChildren && <span className="sr-only">{effectiveChildren}</span>
  );
};
