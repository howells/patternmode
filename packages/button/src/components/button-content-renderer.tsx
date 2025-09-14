import { Icon } from "@patternmode/icon";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import type { ButtonProps } from "../types";
import { getIconContainerSize, getIconSize, getLoaderSize } from "../utils";
import { getButtonLayoutClass } from "../utils/button-utils";
import {
  renderCenterLayout,
  renderDefaultLayout,
  renderNormalWidthLayout,
  renderRightIconLayout,
} from "../utils/layout-renderers";

export type ButtonContentRendererProps = {
  size: ButtonProps["size"];
  fullWidth?: boolean;
  textAlign?: ButtonProps["textAlign"];
  icon?: ButtonProps["icon"];
  leftIcon?: ButtonProps["leftIcon"];
  rightIcon?: ButtonProps["rightIcon"];
  iconStrokeWidth?: number;
  children?: ButtonProps["children"];
  isLoading?: boolean;
  loadingText?: string;
  showLeftIconOnHover?: boolean;
  showRightIconOnHover?: boolean;
  kbd?: ButtonProps["kbd"];
  kbdPlatform?: ButtonProps["kbdPlatform"];
  variant?: ButtonProps["variant"];
};

/**
 * Component responsible for rendering button content with various layout options
 */
export const ButtonContentRenderer: React.FC<ButtonContentRendererProps> = ({
  size = "base",
  fullWidth,
  textAlign,
  icon,
  leftIcon,
  rightIcon,
  iconStrokeWidth,
  children,
  isLoading = false,
  loadingText,
  showLeftIconOnHover = false,
  showRightIconOnHover = false,
  kbd,
  kbdPlatform = "auto",
  variant,
}) => {
  const hasChildren = children != null && children !== "";
  const isIconOnly = size?.includes("icon") ?? false;

  // Prioritize icon prop over leftIcon prop
  const effectiveLeftIconProp = icon || leftIcon;
  const hasLeftIcon =
    effectiveLeftIconProp != null ||
    (isIconOnly && effectiveLeftIconProp == null);
  const effectiveLeftIcon =
    effectiveLeftIconProp ||
    (isIconOnly && effectiveLeftIconProp == null ? MoreHorizontal : undefined);
  const hasRightIcon = rightIcon != null && !isIconOnly;
  const shouldShowChildren = hasChildren && !isIconOnly;
  const isIconButton = isIconOnly;

  // Check if children is a complex element (custom layout)
  const hasCustomLayout = React.isValidElement(children);

  // Determine kbd variant based on button variant
  const kbdVariant =
    variant === "primary" || variant === "destructive"
      ? "onDarkButton"
      : "onLightButton";

  // When loading, Loader replaces leftIcon, and we show loadingText or original children
  const effectiveChildren = isLoading && loadingText ? loadingText : children;
  const effectiveShouldShowChildren = shouldShowChildren;

  const renderIconOnly = () => {
    if (!isIconButton) {
      return null;
    }
    if (effectiveLeftIconProp && !hasRightIcon && !isLoading && !kbd) {
      return (
        <span
          className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
        >
          <Icon
            icon={effectiveLeftIconProp}
            size={getIconSize(size)}
            strokeWidth={iconStrokeWidth}
          />
        </span>
      );
    }
    if (isLoading && !kbd) {
      return (
        <Loader
          aria-label={loadingText || "Loading"}
          size={getLoaderSize(size)}
        />
      );
    }
    return null;
  };

  const renderButtonContent = () => {
    // Handle simple cases first to reduce complexity
    if (hasCustomLayout && !leftIcon && !hasRightIcon && !isLoading && !kbd) {
      return children;
    }

    if (
      isIconButton &&
      hasChildren &&
      !leftIcon &&
      !hasRightIcon &&
      !isLoading &&
      !kbd
    ) {
      return children;
    }

    const iconOnly = renderIconOnly();
    if (iconOnly) {
      return iconOnly;
    }

    return renderComplexLayout();
  };

  const renderComplexLayout = () => {
    const iconButtonChildren = isIconButton && hasChildren && (
      <span className="sr-only">{effectiveChildren}</span>
    );

    const layoutClass = getButtonLayoutClass(size, {
      fullWidth,
      textAlign,
      hasLeftIcon,
      isLoading,
    });

    const layoutClassName = cx(
      "flex items-center w-full transition-colors duration-150 ease-in-out",
      layoutClass
    );

    // Handle different layout scenarios
    if (!fullWidth) {
      return renderNormalWidthLayout({
        size,
        fullWidth,
        textAlign,
        hasLeftIcon,
        hasRightIcon,
        isLoading,
        isIconButton,
        hasChildren,
        effectiveChildren,
        effectiveShouldShowChildren,
        iconButtonChildren,
        effectiveLeftIcon,
        RightIcon: rightIcon,
        loadingText,
        showLeftIconOnHover,
        showRightIconOnHover,
        kbd,
        kbdPlatform,
        kbdVariant,
        iconStrokeWidth,
        layoutClassName,
      });
    }

    if (textAlign === "center") {
      return renderCenterLayout({
        size,
        fullWidth,
        textAlign,
        hasLeftIcon,
        hasRightIcon,
        isLoading,
        isIconButton,
        hasChildren,
        effectiveChildren,
        effectiveShouldShowChildren,
        iconButtonChildren,
        effectiveLeftIcon,
        RightIcon: rightIcon,
        loadingText,
        showLeftIconOnHover,
        showRightIconOnHover,
        kbd,
        kbdPlatform,
        kbdVariant,
        iconStrokeWidth,
        layoutClassName,
      });
    }

    if (hasRightIcon) {
      return renderRightIconLayout({
        size,
        fullWidth,
        textAlign,
        hasLeftIcon,
        hasRightIcon,
        isLoading,
        isIconButton,
        hasChildren,
        effectiveChildren,
        effectiveShouldShowChildren,
        iconButtonChildren,
        effectiveLeftIcon,
        RightIcon: rightIcon,
        loadingText,
        showLeftIconOnHover,
        showRightIconOnHover,
        kbd,
        kbdPlatform,
        kbdVariant,
        iconStrokeWidth,
        layoutClassName,
      });
    }

    return renderDefaultLayout({
      size,
      fullWidth,
      textAlign,
      hasLeftIcon,
      hasRightIcon,
      isLoading,
      isIconButton,
      hasChildren,
      effectiveChildren,
      effectiveShouldShowChildren,
      iconButtonChildren,
      effectiveLeftIcon,
      RightIcon: rightIcon,
      loadingText,
      showLeftIconOnHover,
      showRightIconOnHover,
      kbd,
      kbdPlatform,
      kbdVariant,
      iconStrokeWidth,
      layoutClassName,
    });
  };

  return <>{renderButtonContent()}</>;
};
